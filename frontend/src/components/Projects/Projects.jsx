import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import BrandLogo from '../BrandLogo/BrandLogo';
import './Projects.css';

export default function Projects() {
  const { content } = useI18n();
  const { projects } = content;
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const featuredProject = projects.featured;

  return (
    <section className="z-full z-proj" id="projects">
      <div className="z-section">
        <div className="z-sec-header z-reveal">
          <div className="z-sec-tag">{projects.sectionTag}</div>
          <h2 className="z-sec-title">
            {projects.titlePrefix}
            <br />
            <em>{projects.titleEmphasis}</em>
          </h2>
          <p className="z-proj__intro">{projects.intro}</p>
        </div>

        <div className="z-proj__grid z-reveal">
          <div
            key={featuredProject.title}
            className={`z-proj__card${featuredProject.muted ? ' z-proj__card--muted' : ''}`}
          >
            {featuredProject.comingSoon && (
              <div className="z-proj__coming-soon">
                <span className="z-proj__cs-label">{projects.comingSoon}</span>
              </div>
            )}

            <div className="z-proj__brand-row">
              <BrandLogo variant="mark" size="sm" className="z-proj__brand-logo" />
              <div className="z-proj__brand-copy">
                <span className="z-proj__brand-label">{projects.brandLabel}</span>
                <span className="z-proj__brand-note">{projects.brandNote}</span>
              </div>
            </div>

            <div className="z-proj__badge">
              {isMaintenance && featuredProject.link === '/qelox' ? (
                <span style={{ color: '#ffcc00' }}>{projects.maintenanceActive}</span>
              ) : (
                featuredProject.badge
              )}
            </div>
            <h3 className="z-proj__title">{featuredProject.title}</h3>
            <div className="z-proj__desc">{featuredProject.desc}</div>

            {featuredProject.skills && featuredProject.skills.length > 0 && (
              <div className="z-proj__skill-matrix-container">
                <div className="z-proj__skill-matrix-content">
                  {featuredProject.skills.map((skill) => (
                    <div key={skill.name} className="z-proj__skill-row">
                      <div className="z-proj__skill-head">
                        <div>
                          <div className="z-proj__skill-name">{skill.name}</div>
                          <div className="z-proj__skill-area">{skill.area}</div>
                        </div>
                        <span className="z-proj__skill-pct">{skill.pct}%</span>
                      </div>
                      <div
                        className="z-proj__skill-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow={skill.pct}
                        aria-label={`${skill.name} proficiency`}
                      >
                        <span className="z-proj__skill-bar-fill" style={{ width: `${skill.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
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
                  <span>{projects.openCase}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <Link to={featuredProject.link} className="z-proj__btn">
                  <span>{projects.openCase}</span>
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
