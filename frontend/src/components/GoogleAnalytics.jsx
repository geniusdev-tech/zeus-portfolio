import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-V8HWM8CB7T';

export default function GoogleAnalytics() {
  const location = useLocation();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (
      typeof window === 'undefined'
      || !MEASUREMENT_ID
      || typeof window.gtag !== 'function'
    ) {
      hasMounted.current = true;
      return;
    }

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    window.gtag('config', MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
