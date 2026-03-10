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
  { name: 'Linux', type: 'Operating System', level: 'Expert', years: '5+' },
  { name: 'Go', type: 'Systems Language', level: 'Proficient', years: '3+' },
  { name: 'systemd', type: 'Init / Service Manager', level: 'Expert', years: '5+' },
  { name: 'Shell Scripting', type: 'Automation', level: 'Expert', years: '5+' },
  { name: 'Networking', type: 'TCP/IP · Routing · DNS', level: 'Proficient', years: '4+' },
  { name: 'Infra Architecture', type: 'Design & Planning', level: 'Proficient', years: '4+' },
  { name: 'Monitoring', type: 'Observability', level: 'Proficient', years: '3+' },
  { name: 'Python', type: 'Scripting / Tools', level: 'Familiar', years: '3+' },
];

export const projectsData = [
  {
    badge: 'Node Operations Product — Active',
    title: 'QELO-X',
    desc: 'Node operations layer for blockchain infrastructure. Provides service supervision, secure UNIX socket IPC, runtime telemetry and automated recovery routines for Linux-based production hosts.',
    link: '/Quelox',
    muted: false,
    comingSoon: false,
  },
  {
    badge: 'Python · Multi-chain',
    title: 'Crypto Wallet Tracker',
    desc: 'Multi-chain wallet monitoring tool built in Python. Tracks balances and transactions across multiple blockchains with chain detection, API integration, SQLite persistence and desktop UI support.',
    link: 'https://github.com/zeus-cli',
    muted: true,
    comingSoon: true,
    external: true,
  },
  {
    badge: 'Shell · systemd',
    title: 'Automation Suite',
    desc: 'Set of shell scripts and systemd units for infrastructure automation, including health checks, restart routines, log handling and network diagnostics.',
    link: 'https://github.com/zeus-cli',
    muted: true,
    comingSoon: true,
    external: true,
  },
];

export const aboutStats = [
  { label: 'Primary OS', value: 'Linux', cyan: false },
  { label: 'Infrastructure', value: 'Bare-metal + Cloud', cyan: false },
  { label: 'Languages', value: 'Go · Shell · Python', cyan: true },
  { label: 'Security Lens', value: 'Hardening + Observability', cyan: true },
  { label: 'Blockchain Ops', value: 'Nodes + Monitoring', cyan: false },
  { label: 'Focus', value: 'Stability & Reliability', cyan: false },
  { label: 'Delivery', value: 'Production-Grade', cyan: false },
  { label: 'Status', value: 'Available', cyan: true },
];

export const aboutTags = [
  { label: 'Linux', cyan: false },
  { label: 'Networking', cyan: false },
  { label: 'Infrastructure', cyan: false },
  { label: 'DevSecOps', cyan: true },
  { label: 'Backend Dev', cyan: true },
  { label: 'Automation', cyan: true },
  { label: 'Blockchain', cyan: false },
  { label: 'Systems Analysis', cyan: false },
  { label: 'Production', cyan: true },
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
    text: 'Lightweight tools outperform bloated frameworks. I favor minimal, well-understood components over convenience abstractions — especially in constrained environments.',
  },
  {
    n: '03',
    title: 'Engineering for Outcomes',
    text: 'The best solution is the one that works reliably in production — not the most elegant in theory. Clean architecture, practical results, zero workarounds.',
  },
];

// TODO: Replace with your real contact info
export const contactLinks = [
  { icon: '[@]', label: 'Email', value: 'seu@email.com', href: 'mailto:seu@email.com', cyan: false },
  { icon: '[gh]', label: 'GitHub', value: 'github.com/seu-usuario', href: 'https://github.com/seu-usuario', cyan: false },
  { icon: '[in]', label: 'LinkedIn', value: 'linkedin.com/in/seu-perfil', href: 'https://linkedin.com/in/seu-perfil', cyan: true },
];

export const navLinks = ['about', 'expertise', 'services', 'projects', 'stack', 'status', 'quote'];
