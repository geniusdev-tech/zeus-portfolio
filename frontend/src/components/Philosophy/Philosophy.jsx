import { useI18n } from '../../i18n';
import './Philosophy.css';

export default function Philosophy() {
  const { content } = useI18n();
  const { philosophy } = content;

  return (
    <div className="z-section" id="philosophy">
      {/* Header */}
      <div className="z-sec-header z-reveal">
        <div className="z-sec-tag">{philosophy.sectionTag}</div>
        <div className="z-sec-title">
          {philosophy.titlePrefix}<br />
          <em>{philosophy.titleEmphasis}</em>
        </div>
      </div>

      <div className="z-philo__grid z-reveal">
        {/* Principles list */}
        <div className="z-philo__principles">
          {philosophy.items.map((p) => (
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
          <p className="z-philo__quote-text">{philosophy.quote}</p>
          <div className="z-philo__quote-attr">— {philosophy.quoteAttr}</div>
        </div>
      </div>
    </div>
  );
}
