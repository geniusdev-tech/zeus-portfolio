import { projectsData } from '../../data';
import './Projects.css';

export default function Projects() {
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
            <div className="z-proj__badge">{project.badge}</div>
            <div className="z-proj__title">{project.title}</div>
            <div className="z-proj__desc">{project.desc}</div>
            {!project.muted && (
              <a href={project.link} className="z-proj__link">
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
