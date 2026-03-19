import { Link } from 'react-router-dom';
import { projectsData } from '../../data';
import './Projects.css';

export default function Projects() {
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const featuredProject = projectsData[0];

  return (
    <section className="z-full z-proj" id="projects">
      <div className="z-section">
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag">02 — Projects</div>
          <div className="z-sec-title">
            Main Project
            <br />
            <em>in Active Development.</em>
          </div>
          <p className="z-proj__intro">
            A focused view of the main build, with its core stack and the skill weight
            behind each area of the product.
          </p>
        </div>

        <div className="z-proj__grid z-reveal">
          <div
            key={featuredProject.title}
            className={`z-proj__card${featuredProject.muted ? ' z-proj__card--muted' : ''}`}
          >
            {featuredProject.comingSoon && (
              <div className="z-proj__coming-soon">
                <span className="z-proj__cs-label">EM BREVE</span>
              </div>
            )}

            <div className="z-proj__badge">
              {isMaintenance && featuredProject.link === '/Quelox' ? (
                <span style={{ color: '#ffcc00' }}>Maintenance mode</span>
              ) : (
                featuredProject.badge
              )}
            </div>
            <div className="z-proj__title">{featuredProject.title}</div>
            <div className="z-proj__desc">{featuredProject.desc}</div>

            {featuredProject.skills && featuredProject.skills.length > 0 && (
              <div className="z-proj__skill-matrix">
                {featuredProject.skills.map((skill) => (
                  <div key={skill.name} className="z-proj__skill-row">
                    <div className="z-proj__skill-head">
                      <div>
                        <div className="z-proj__skill-name">{skill.name}</div>
                        <div className="z-proj__skill-area">{skill.area}</div>
                      </div>
                      <span className="z-proj__skill-pct">{skill.pct}%</span>
                    </div>
                    <div className="z-proj__skill-bar">
                      <span className="z-proj__skill-bar-fill" style={{ width: `${skill.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {featuredProject.skills && featuredProject.skills.length > 0 && (
              <div className="z-proj__skills">
                {featuredProject.skills.map((skill) => (
                  <span key={skill.name} className="z-proj__skill-tag">{skill.name}</span>
                ))}
              </div>
            )}

            {!featuredProject.comingSoon && (
              featuredProject.external ? (
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-proj__btn"
                >
                  <span>Open Project</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <Link to={featuredProject.link} className="z-proj__btn">
                  <span>Open Project</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
