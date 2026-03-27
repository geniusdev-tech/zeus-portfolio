import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveApiBaseUrl } from '../lib/apiUrls';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-V8HWM8CB7T';
const ANALYTICS_API_URL = `${resolveApiBaseUrl(import.meta.env.VITE_API_URL)}/api/analytics`;
const CLIENT_ID_KEY = 'zeus-ga-client-id';
const SESSION_ID_KEY = 'zeus-ga-session-id';
const RECENT_EVENT_WINDOW_MS = 1500;
const recentEvents = new Map();

function getStoredValue(storage, key, createValue) {
  if (typeof window === 'undefined' || !storage) {
    return createValue();
  }

  try {
    const existing = storage.getItem(key);
    if (existing) {
      return existing;
    }

    const next = createValue();
    storage.setItem(key, next);
    return next;
  } catch {
    return createValue();
  }
}

function getClientId() {
  return getStoredValue(window.localStorage, CLIENT_ID_KEY, () => (
    `cid-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  ));
}

function getSessionId() {
  return getStoredValue(window.sessionStorage, SESSION_ID_KEY, () => String(Math.floor(Date.now() / 1000)));
}

function pruneRecentEvents(now) {
  for (const [key, timestamp] of recentEvents.entries()) {
    if (now - timestamp > RECENT_EVENT_WINDOW_MS * 4) {
      recentEvents.delete(key);
    }
  }
}

function shouldSkipEvent(eventKey) {
  const now = Date.now();
  pruneRecentEvents(now);

  const lastSentAt = recentEvents.get(eventKey);
  if (lastSentAt && now - lastSentAt < RECENT_EVENT_WINDOW_MS) {
    return true;
  }

  recentEvents.set(eventKey, now);
  return false;
}

function sendGtagFallback({ pageTitle, pageLocation, pageReferrer }) {
  if (typeof window.gtag !== 'function') {
    return false;
  }

  window.gtag('event', 'page_view', {
    page_title: pageTitle,
    page_location: pageLocation,
    page_referrer: pageReferrer,
  });
  return true;
}

async function sendAnalytics(payload) {
  try {
    const response = await fetch(ANALYTICS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      keepalive: true,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    return true;
  } catch {
    return false;
  }
}

export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !MEASUREMENT_ID) {
      return;
    }

    const pageLocation = window.location.href;
    const pageTitle = document.title;
    const pageReferrer = document.referrer || '';
    const pageKey = `${location.pathname}${location.search}${location.hash}`;

    if (shouldSkipEvent(pageKey)) {
      return;
    }

    const payload = {
      measurement_id: MEASUREMENT_ID,
      client_id: getClientId(),
      session_id: getSessionId(),
      event_name: 'page_view',
      page_title: pageTitle,
      page_location: pageLocation,
      page_referrer: pageReferrer,
      engagement_time_msec: 1000,
    };

    void (async () => {
      const forwarded = await sendAnalytics(payload);
      if (!forwarded) {
        sendGtagFallback({ pageTitle, pageLocation, pageReferrer });
      }
    })();
  }, [location.pathname, location.search, location.hash]);

  return null;
}
