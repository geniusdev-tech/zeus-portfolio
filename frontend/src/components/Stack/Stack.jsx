import { useEffect, useRef, useState } from 'react';
import { stackData } from '../../data';
import './Stack.css';

function StackItem({ name, type, pct }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setWidth(pct), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div className="z-stack__item" ref={ref}>
      <div className="z-stack__name">{name}</div>
      <div className="z-stack__type">{type}</div>
      <div className="z-stack__bar">
        <div className="z-stack__fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function Stack() {
  return (
    <div className="z-full" id="stack">
      <div className="z-section">
        {/* Header */}
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag cyan">04 — Technical Stack</div>
          <div className="z-sec-title cyan">
            Tools of the<br />
            <em>Trade.</em>
          </div>
        </div>

        {/* Grid */}
        <div className="z-stack__grid z-reveal">
          {stackData.map((item) => (
            <StackItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
