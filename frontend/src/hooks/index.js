import { useEffect, useRef } from 'react';

/**
 * useReveal — adds `.visible` to every `.z-reveal` element
 * when it enters the viewport via IntersectionObserver.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.z-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}


