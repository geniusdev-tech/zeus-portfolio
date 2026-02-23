import { philosophyData } from '../../data';
import './Philosophy.css';

export default function Philosophy() {
  return (
    <div className="z-section" id="philosophy">
      {/* Header */}
      <div className="z-sec-header z-reveal">
        <div className="z-sec-tag">05 — Philosophy</div>
        <div className="z-sec-title">
          How I Think<br />
          About <em>Engineering.</em>
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
            Infrastructure is not an afterthought. It is the contract between
            your software and the real world. Honor it with precision.
          </p>
          <div className="z-philo__quote-attr">— Zeus, IT Professional</div>
        </div>
      </div>
    </div>
  );
}
