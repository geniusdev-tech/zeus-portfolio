import { Link } from 'react-router-dom';
import './Docs.css';

const PROJECTS = [
  {
    id: 'qelox',
    name: 'QELO-X',
    version: 'v1.0.0',
    status: 'active',
    statusLabel: 'Active Release',
    category: 'Blockchain Infrastructure Tool',
    tagline: 'Orchestration, monitoring and automatic recovery for blockchain nodes.',
    description:
      'QELO-X is a background service that runs on your Linux server and keeps your blockchain node alive. It watches the node, collects live status data (CPU, memory, sync progress, peer connections) and automatically restarts or stabilizes the node when something goes wrong — so you don\'t have to be online 24/7 to keep it running.',
    highlights: [
      'Keeps your node running automatically without manual restarts',
      'Shows live health data: CPU, memory, sync and connection status',
      'Recovers from common failures before they become downtime',
      'Runs entirely on your own server — no external control needed',
    ],
    stack: [
      { name: 'Go', role: 'Core service language' },
      { name: 'Linux / systemd', role: 'Host environment & service manager' },
      { name: 'UNIX Sockets', role: 'Local communication channel' },
      { name: 'React + Tauri', role: 'Desktop interface' },
    ],
    access: {
      price: 'R$ 199,90',
      note: 'Single release access for the current cycle.',
      ctaLabel: 'Request Access',
      ctaLink: '/qelox',
      docsLabel: 'View full product page',
      docsLink: '/qelox',
    },
  },
];

const UPCOMING = [
  {
    id: 'project-2',
    name: 'Project coming soon',
    description: 'The next build is in progress. Details will be published here when available.',
  },
];

function StatusBadge({ status, label }) {
  return (
    <span className={`z-docs__badge z-docs__badge--${status}`}>{label}</span>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="z-docs__project" id={project.id}>
      <div className="z-docs__project-header">
        <div className="z-docs__project-meta">
          <StatusBadge status={project.status} label={project.statusLabel} />
          <span className="z-docs__project-ver">{project.version}</span>
          <span className="z-docs__project-cat">{project.category}</span>
        </div>
        <h2 className="z-docs__project-name">{project.name}</h2>
        <p className="z-docs__project-tagline">{project.tagline}</p>
      </div>

      <div className="z-docs__project-body">
        <div className="z-docs__project-desc">
          <h3 className="z-docs__section-label">What it does</h3>
          <p>{project.description}</p>
        </div>

        <div className="z-docs__project-highlights">
          <h3 className="z-docs__section-label">Key features</h3>
          <ul className="z-docs__list">
            {project.highlights.map((item) => (
              <li key={item} className="z-docs__list-item">
                <span className="z-docs__check">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="z-docs__project-stack">
          <h3 className="z-docs__section-label">Built with</h3>
          <div className="z-docs__stack-grid">
            {project.stack.map((s) => (
              <div key={s.name} className="z-docs__stack-item">
                <span className="z-docs__stack-name">{s.name}</span>
                <span className="z-docs__stack-role">{s.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="z-docs__project-access">
          <h3 className="z-docs__section-label">Access</h3>
          <div className="z-docs__access-box">
            <div className="z-docs__access-price">
              <span className="z-docs__price">{project.access.price}</span>
              <span className="z-docs__price-note">{project.access.note}</span>
            </div>
            <div className="z-docs__access-actions">
              <Link to={project.access.ctaLink} className="z-docs__cta-btn">
                {project.access.ctaLabel}
              </Link>
              <Link to={project.access.docsLink} className="z-docs__secondary-btn">
                {project.access.docsLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function UpcomingCard({ project }) {
  return (
    <article className="z-docs__upcoming" id={project.id}>
      <div className="z-docs__upcoming-name">{project.name}</div>
      <p className="z-docs__upcoming-desc">{project.description}</p>
    </article>
  );
}

export default function Docs() {
  return (
    <div className="z-docs">
      <div className="z-docs__top">
        <div className="z-docs__top-inner">
          <div className="z-docs__breadcrumb">
            <Link to="/" className="z-docs__breadcrumb-link">Zeus Protocol</Link>
            <span className="z-docs__breadcrumb-sep">/</span>
            <span>Project Documentation</span>
          </div>
          <h1 className="z-docs__title">Project Documentation</h1>
          <p className="z-docs__subtitle">
            A reference for all released and upcoming projects — what they do, how to access them, and what they are built with.
          </p>
          <div className="z-docs__topbar-meta">
            <span className="z-docs__dot" />
            <span>{PROJECTS.length} active release · {UPCOMING.length} upcoming</span>
          </div>
        </div>
      </div>

      <div className="z-docs__content">
        <section className="z-docs__section">
          <div className="z-docs__section-head">
            <span className="z-docs__section-tag">Released</span>
          </div>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </section>

        <section className="z-docs__section">
          <div className="z-docs__section-head">
            <span className="z-docs__section-tag">Upcoming</span>
          </div>
          {UPCOMING.map((p) => (
            <UpcomingCard key={p.id} project={p} />
          ))}
        </section>
      </div>

      <div className="z-docs__footer">
        <Link to="/" className="z-docs__back-link">← Back to site</Link>
        <span className="z-docs__footer-note">Zeus Protocol · zeusprotocol.cloud</span>
      </div>
    </div>
  );
}
