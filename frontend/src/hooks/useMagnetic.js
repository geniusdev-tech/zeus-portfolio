import { useRef, useState, useEffect } from 'react';

/**
 * Custom hook to apply a magnetic "pull" effect to an element when the mouse is nearby.
 * @param {number} pull - How strongly the element is pulled (default: 0.3)
 * @param {number} radius - The distance at which the effect starts (default: 100)
 */
export default function useMagnetic(pull = 0.3, radius = 100) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius) {
        // Apply magnetic pull
        setPosition({ 
          x: dx * pull, 
          y: dy * pull 
        });
      } else {
        // Reset position
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    ref.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pull, radius]);

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: position.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.1s linear',
  };

  return { ref, style };
}
