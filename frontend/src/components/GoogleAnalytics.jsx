import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MEASUREMENT_ID = 'G-V8HWM8CB7T';

export default function GoogleAnalytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) {
      return;
    }

    // Standard GA4 Page View Tracking
    window.gtag('config', MEASUREMENT_ID, {
      page_path: pathname + search,
    });

    // Also log a manual event to ensure tracking in PWAs
    window.gtag('event', 'page_view_pwa', {
      page_path: pathname + search,
      send_to: MEASUREMENT_ID
    });

  }, [pathname, search]);

  return null;
}
