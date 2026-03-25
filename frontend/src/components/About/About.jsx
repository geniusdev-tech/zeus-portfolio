import { useI18n } from '../../i18n';
import './About.css';

export default function About() {
  const { content } = useI18n();
  const { about } = content;
  const featuredStats = about.stats.slice(0, 4);
  const signalTags = about.tags.slice(0, 6);

  return (
    <div className="z-section" id="about">
      <div className="z-sec-header z-reveal">
        <div className="z-sec-tag">{about.sectionTag}</div>
        <h2 className="z-sec-title">
          {about.titlePrefix}
          <br />
          <em>{about.titleEmphasis}</em>
        </h2>
      </div>

      <div className="z-about__grid z-reveal">
        <div className="z-about__intro">
          <p className="z-about__lede">{about.lede}</p>

          <div className="z-about__points">
            <div className="z-about__point">
              <span className="z-about__point-label">{about.scopeLabel}</span>
              <p>{about.scopeText}</p>
            </div>
            <div className="z-about__point">
              <span className="z-about__point-label">{about.deliveryLabel}</span>
              <p>{about.deliveryText}</p>
            </div>
          </div>

          <div className="z-about__tags">
            {signalTags.map(({ label, cyan }) => (
              <span key={label} className={`z-about__tag${cyan ? ' cyan' : ''}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="z-about__panel">
          <div className="z-about__panel-kicker">{about.panelKicker}</div>
          <h3 className="z-about__panel-title">{about.panelTitle}</h3>
          <p className="z-about__panel-copy">{about.panelCopy}</p>

          <div className="z-about__stats-container">
            <div className="z-about__stats-content">
              {featuredStats.map(({ label, value, cyan }) => (
                <div key={label} className={`z-about__stat${cyan ? ' cyan' : ''}`}>
                  <span className="z-about__stat-label">{label}</span>
                  <span className="z-about__stat-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
