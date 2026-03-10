import { aboutStats, aboutTags } from '../../data';
import './About.css';

export default function About() {
  return (
    <div className="z-section" id="about">
      {/* Header */}
      <div className="z-sec-header z-reveal">
        <div className="z-sec-tag">01 — About</div>
        <div className="z-sec-title">
          Infrastructure Work<br />
          <em>With Operational Focus.</em>
        </div>
      </div>

      {/* Grid */}
      <div className="z-about__grid z-reveal">
        {/* Text */}
        <div className="z-about__text">
          <p>
            I work across the infrastructure lifecycle, from{' '}
            <strong>Linux administration and networking</strong> to{' '}
            <strong>automation, backend tooling and cloud deployment</strong>. My focus is
            production stability, service visibility and maintainable operations.
          </p>
          <p>
            My scope includes <strong>DevSecOps routines</strong>, infrastructure
            diagnostics, service supervision, systems analysis and{' '}
            <strong>blockchain node operations</strong>. The work is oriented to real
            environments, not showcase builds.
          </p>
          <p>
            When the infrastructure needs software support, I build internal tools, APIs,
            node orchestration layers and automation flows that remove repetitive manual
            work and reduce failure points.
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
