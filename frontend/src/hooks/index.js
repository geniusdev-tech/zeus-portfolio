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

/**
 * useCursor — custom neon cursor with a trailing ring.
 * Returns refs to attach to the cursor dot and ring elements.
 */
export function useCursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const posRef    = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
      }
    };

    const onOver = (e) => {
      const interactive = e.target.closest(
        'a, button, .z-exp-card, .z-stack-item, .z-proj-card, .z-contact-link, .z-itservices__card'
      );
      if (interactive) {
        cursorRef.current?.classList.add('big');
        ringRef.current?.classList.add('big');
      }
    };

    const onOut = (e) => {
      const interactive = e.target.closest(
        'a, button, .z-exp-card, .z-stack-item, .z-proj-card, .z-contact-link, .z-itservices__card'
      );
      if (interactive) {
        cursorRef.current?.classList.remove('big');
        ringRef.current?.classList.remove('big');
      }
    };

    // Smooth trailing ring via RAF
    const animateRing = () => {
      if (ringRef.current) {
        ringRef.current.style.left = `${posRef.current.x}px`;
        ringRef.current.style.top  = `${posRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { cursorRef, ringRef };
}
