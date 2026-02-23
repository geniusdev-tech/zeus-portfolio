export const expertiseData = [
  {
    num: '01 / INFRASTRUCTURE',
    title: 'Infrastructure & Servers',
    items: [
      'Linux administration',
      'Service orchestration',
      'Process supervision',
      'Production environments',
      'Performance tuning',
    ],
  },
  {
    num: '02 / NETWORKING',
    title: 'Networking',
    items: [
      'TCP/IP fundamentals',
      'Routing concepts',
      'Server connectivity',
      'Monitoring & diagnostics',
      'Network troubleshooting',
    ],
  },
  {
    num: '03 / ANALYSIS',
    title: 'Systems Analysis',
    items: [
      'Requirements analysis',
      'Process modeling',
      'Architecture planning',
      'Technical documentation',
    ],
  },
  {
    num: '04 / DEVELOPMENT',
    title: 'Software Development',
    items: [
      'Backend development',
      'CLI tools',
      'Daemon services',
      'Automation scripts',
      'API integration',
    ],
  },
  {
    num: '05 / DEVOPS',
    title: 'Automation & DevOps',
    items: [
      'systemd configuration',
      'Monitoring solutions',
      'Logging pipelines',
      'Infrastructure hardening',
    ],
  },
];

export const stackData = [
  { name: 'Linux',             type: 'Operating System',       pct: 95 },
  { name: 'Go',                type: 'Systems Language',       pct: 80 },
  { name: 'systemd',           type: 'Init / Service Manager', pct: 90 },
  { name: 'Shell Scripting',   type: 'Automation',             pct: 88 },
  { name: 'Networking',        type: 'TCP/IP · Routing · DNS', pct: 82 },
  { name: 'Infra Architecture',type: 'Design & Planning',      pct: 85 },
  { name: 'Monitoring',        type: 'Observability Concepts', pct: 78 },
  { name: 'Python',            type: 'Scripting / Tools',      pct: 72 },
];

export const projectsData = [
  {
    badge: 'Infrastructure Tool — Active',
    title: 'QELO-X',
    desc: 'Lightweight orchestration layer for critical infrastructure services. Provides daemon-based process control, secure UNIX socket IPC, real-time metrics monitoring, graceful shutdown handling, and automatic restart with configurable policies. Built for production bare-metal and containerized environments.',
    link: '#',
    muted: false,
  },
  {
    badge: 'Upcoming',
    title: 'Tool-02',
    desc: 'Next infrastructure tool currently in development. Details to be announced.',
    link: '#',
    muted: true,
  },
  {
    badge: 'Upcoming',
    title: 'Automation Suite',
    desc: 'Collection of automation scripts and network tools for infrastructure operations.',
    link: '#',
    muted: true,
  },
];

export const aboutStats = [
  { label: 'Primary OS',     value: 'Linux',               cyan: false },
  { label: 'Infrastructure', value: 'Bare-metal + Cloud',  cyan: false },
  { label: 'Languages',      value: 'Go · Shell · Python', cyan: true  },
  { label: 'Init System',    value: 'systemd',             cyan: true  },
  { label: 'Focus',          value: 'Stability & Reliability', cyan: false },
  { label: 'Deployments',    value: 'Production-Grade',    cyan: false },
  { label: 'Status',         value: 'Available',           cyan: true  },
];

export const aboutTags = [
  { label: 'Linux',          cyan: false },
  { label: 'Networking',     cyan: false },
  { label: 'Infrastructure', cyan: false },
  { label: 'Backend Dev',    cyan: true  },
  { label: 'Automation',     cyan: true  },
  { label: 'Systems Analysis',cyan: false },
  { label: 'DevOps',         cyan: false },
  { label: 'Production',     cyan: true  },
];

export const philosophyData = [
  {
    n: '01',
    title: 'Stability First',
    text: 'Production systems must not fail silently. Every service I build or manage is designed with failure modes in mind — observable, recoverable, and predictable.',
  },
  {
    n: '02',
    title: 'Efficiency Without Waste',
    text: 'Lightweight tools outperform bloated frameworks in constrained environments. I favor minimal, well-understood components over convenience abstractions.',
  },
  {
    n: '03',
    title: 'Clean Architecture',
    text: 'Separation of responsibilities. No cross-cutting concerns. Systems should be readable, auditable, and replaceable at any layer without cascading failure.',
  },
  {
    n: '04',
    title: 'Practical Solutions',
    text: 'The best solution is the one that works reliably in the real environment — not the most elegant in theory. Engineering is about outcomes.',
  },
  {
    n: '05',
    title: 'Infrastructure Reliability',
    text: 'Infrastructure is not a background concern. It is the foundation that determines whether everything else can function. I treat it accordingly.',
  },
];

export const contactLinks = [
  { icon: '[@]', label: 'Email',    value: 'zeus@example.com',       href: 'mailto:zeus@example.com', cyan: false },
  { icon: '[gh]', label: 'GitHub',  value: 'github.com/zeus',        href: '#',                       cyan: false },
  { icon: '[in]', label: 'LinkedIn',value: 'linkedin.com/in/zeus-it', href: '#',                       cyan: true  },
];

export const navLinks = ['about', 'expertise', 'projects', 'stack', 'status', 'contact'];
