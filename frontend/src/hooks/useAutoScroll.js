import { useEffect, useRef } from 'react';

/**
 * useAutoScroll
 * @param {Object} options
 * @param {RefObject} options.scrollRef - Ref for the scrollable container.
 * @param {number} [options.speed=0.55] - Pixels per tick.
 * @param {number} [options.interval=20] - ms per tick.
 * @param {number} [options.pauseDelay=1800] - ms to pause after interaction.
 * @param {boolean} [options.enabled=true] - Toggle auto-scroll.
 */
export function useAutoScroll({
  scrollRef,
  speed = 0.55,
  interval = 24,
  pauseDelay = 1800,
  enabled = true,
}) {
  const pauseTimerRef = useRef(null);

  const pauseAutoScroll = (customDelay) => {
    if (typeof window === 'undefined') return;
    window.clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = window.setTimeout(() => {
      pauseTimerRef.current = null;
    }, customDelay || pauseDelay);
  };

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;

    const el = scrollRef.current;
    if (!el) return undefined;

    const tick = window.setInterval(() => {
      if (pauseTimerRef.current) return;
      if (el.scrollHeight <= el.clientHeight) return;

      el.scrollTop += speed;
      // Loop if at bottom
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
        el.scrollTop = 0;
      }
    }, interval);

    return () => window.clearInterval(tick);
  }, [enabled, speed, interval, pauseDelay, scrollRef]);

  // Return interaction handlers
  return {
    onWheel: () => pauseAutoScroll(),
    onTouchStart: () => pauseAutoScroll(3500), // longer pause for mobile
    onMouseEnter: () => pauseAutoScroll(1200),
    onFocusCapture: () => pauseAutoScroll(1200),
    onScroll: () => pauseAutoScroll(1000),
    pauseAutoScroll,
  };
}
