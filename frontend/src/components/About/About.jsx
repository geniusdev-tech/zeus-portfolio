import { aboutStats, aboutTags } from '../../data';
import './About.css';

export default function About() {
  const featuredStats = aboutStats.slice(0, 4);
  const signalTags = aboutTags.slice(0, 6);

  return (
    <div className="z-section" id="about">
      <div className="z-sec-header z-reveal">
        <div className="z-sec-tag">01 — Operational Profile</div>
        <div className="z-sec-title">
          Infrastructure,
          <br />
          <em>Engineered for Production.</em>
        </div>
      </div>

      <div className="z-about__grid z-reveal">
        <div className="z-about__intro">
          <p className="z-about__lede">
            I work where infrastructure, security and software delivery meet. The focus is
            keeping production environments stable, observable and easier to operate.
          </p>

          <div className="z-about__points">
            <div className="z-about__point">
              <span className="z-about__point-label">Operational scope</span>
              <p>
                Linux administration, networking, DevSecOps routines, cloud deployment and
                backend tooling for real systems.
              </p>
            </div>
            <div className="z-about__point">
              <span className="z-about__point-label">Delivery model</span>
              <p>
                I design around failure modes, visibility and automation so teams spend less
                time reacting and more time shipping.
              </p>
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
          <div className="z-about__panel-kicker">What you get</div>
          <h3 className="z-about__panel-title">Less manual work. Fewer blind spots. More control.</h3>
          <p className="z-about__panel-copy">
            The work combines platform stability with lightweight internal tooling, so
            infrastructure decisions remain practical and maintainable over time.
          </p>

          <div className="z-about__stats">
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
  );
}
