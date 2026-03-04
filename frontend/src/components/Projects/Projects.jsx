import { Link } from 'react-router-dom';
import { projectsData } from '../../data';
import './Projects.css';

export default function Projects() {
  const isMaintenance = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

  return (
    <div className="z-section" id="projects">
      {/* Header */}
      <div className="z-sec-header z-reveal">
        <div className="z-sec-tag">03 — Featured Projects</div>
        <div className="z-sec-title">
          Built for the<br />
          <em>Real World.</em>
        </div>
      </div>

      {/* Cards */}
      <div className="z-proj__grid z-reveal">
        {projectsData.map((project) => (
          <div
            key={project.title}
            className={`z-proj__card${project.muted ? ' z-proj__card--muted' : ''}`}
          >
            {/* Em Breve overlay */}
            {project.comingSoon && (
              <div className="z-proj__coming-soon">
                <span className="z-proj__cs-label">EM BREVE</span>
              </div>
            )}

            <div className="z-proj__badge">
              {isMaintenance && project.link === '/Quelox' ? (
                <span style={{ color: '#ffcc00' }}>⚠️ Under Maintenance</span>
              ) : (
                project.badge
              )}
            </div>
            <div className="z-proj__title">{project.title}</div>
            <div className="z-proj__desc">{project.desc}</div>

            {/* Active project: real CTA button */}
            {!project.comingSoon && (
              project.external ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-proj__btn"
                >
                  <span>Ver Projeto</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <Link to={project.link} className="z-proj__btn">
                  <span>Ver Projeto</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 7H11.5M7.5 3L11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
