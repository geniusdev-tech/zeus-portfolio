import { aboutStats, aboutTags } from '../../data';
import './About.css';

export default function About() {
  return (
    <div className="z-section" id="about">
      {/* Header */}
      <div className="z-sec-header z-reveal">
        <div className="z-sec-tag">01 — About</div>
        <div className="z-sec-title">
          Precision-Driven<br />
          <em>IT Engineering.</em>
        </div>
      </div>

      {/* Grid */}
      <div className="z-about__grid z-reveal">
        {/* Text */}
        <div className="z-about__text">
          <p>
            I'm an IT professional working across the full stack of infrastructure — from{' '}
            <strong>bare-metal server administration</strong> to{' '}
            <strong>backend software development</strong>. I build systems that are
            stable, observable, and maintainable in production environments.
          </p>
          <p>
            My work spans <strong>Linux environments</strong>, network management,
            systems analysis and <strong>process automation</strong>. I approach every
            engagement with an engineering mindset: understand the problem deeply,
            design a clean solution, build it right.
          </p>
          <p>
            I've worked on production deployments, infrastructure tooling, and
            purpose-built software for clients that need reliability — not workarounds.
          </p>

          <div className="z-about__tags">
            {aboutTags.map(({ label, cyan }) => (
              <span key={label} className={`z-about__tag${cyan ? ' cyan' : ''}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="z-about__stats">
          {aboutStats.map(({ label, value, cyan }) => (
            <div key={label} className={`z-about__stat${cyan ? ' cyan' : ''}`}>
              <span className="z-about__stat-label">{label}</span>
              <span className="z-about__stat-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
