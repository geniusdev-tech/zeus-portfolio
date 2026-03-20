import { philosophyData } from '../../data';
import './Philosophy.css';

export default function Philosophy() {
  return (
    <div className="z-section" id="philosophy">
      {/* Header */}
      <div className="z-sec-header z-reveal">
        <div className="z-sec-tag">06 — Engineering Principles</div>
        <div className="z-sec-title">
          How I Make<br />
          <em>Production Decisions.</em>
        </div>
      </div>

      <div className="z-philo__grid z-reveal">
        {/* Principles list */}
        <div className="z-philo__principles">
          {philosophyData.map((p) => (
            <div className="z-philo__principle" key={p.n}>
              <div className="z-philo__num">{p.n}</div>
              <div>
                <div className="z-philo__title">{p.title}</div>
                <div className="z-philo__text">{p.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="z-philo__quote">
          <div className="z-philo__quote-deco">"</div>
          <p className="z-philo__quote-text">
            If the system is not readable under pressure, it is not ready.
          </p>
          <div className="z-philo__quote-attr">— Zeus</div>
        </div>
      </div>
    </div>
  );
}
