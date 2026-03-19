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
  { name: 'Linux', type: 'Operating System', pct: 95, years: '5+', accent: 'green' },
  { name: 'Go', type: 'Systems Language', pct: 82, years: '3+', accent: 'cyan' },
  { name: 'systemd', type: 'Init / Service Manager', pct: 93, years: '5+', accent: 'green' },
  { name: 'Shell Scripting', type: 'Automation', pct: 91, years: '5+', accent: 'green' },
  { name: 'Networking', type: 'TCP/IP · Routing · DNS', pct: 84, years: '4+', accent: 'cyan' },
  { name: 'Infra Architecture', type: 'Design & Planning', pct: 86, years: '4+', accent: 'cyan' },
  { name: 'Monitoring', type: 'Observability', pct: 79, years: '3+', accent: 'cyan' },
  { name: 'Python', type: 'Scripting / Tools', pct: 76, years: '3+', accent: 'green' },
  { name: 'JavaScript', type: 'Frontend / Backend', pct: 81, years: '3+', accent: 'green' },
  { name: 'TypeScript', type: 'Typed Web Development', pct: 74, years: '2+', accent: 'cyan' },
  { name: 'React', type: 'UI Framework', pct: 83, years: '3+', accent: 'cyan' },
  { name: 'Next.js', type: 'Web Framework', pct: 72, years: '2+', accent: 'green' },
  { name: 'Node.js', type: 'Runtime / APIs', pct: 80, years: '3+', accent: 'green' },
  { name: 'Express', type: 'HTTP Services', pct: 77, years: '2+', accent: 'cyan' },
  { name: 'MongoDB', type: 'Document Database', pct: 71, years: '2+', accent: 'green' },
  { name: 'MySQL', type: 'Relational Database', pct: 69, years: '2+', accent: 'cyan' },
  { name: 'Docker', type: 'Containers', pct: 78, years: '3+', accent: 'green' },
  { name: 'AWS', type: 'Cloud Platform', pct: 70, years: '2+', accent: 'cyan' },
  { name: 'Azure', type: 'Cloud Services', pct: 64, years: '1+', accent: 'cyan' },
  { name: 'Java', type: 'General Purpose', pct: 61, years: '2+', accent: 'green' },
  { name: 'C++', type: 'Systems Foundations', pct: 55, years: '1+', accent: 'green' },
  { name: 'Tailwind CSS', type: 'UI Styling', pct: 74, years: '2+', accent: 'cyan' },
  { name: 'Git', type: 'Version Control', pct: 88, years: '5+', accent: 'green' },
];

export const projectsData = [
  {
    badge: 'Node Operations Product — Active',
    title: 'QELO-X',
    desc: 'Node operations layer for blockchain infrastructure. Provides service supervision, secure UNIX socket IPC, runtime telemetry and automated recovery routines for Linux-based production hosts.',
    link: '/Quelox',
    muted: false,
    comingSoon: false,
    skills: [
      { name: 'Go', pct: 88, area: 'Core Runtime' },
      { name: 'Linux', pct: 94, area: 'Host Environment' },
      { name: 'systemd', pct: 91, area: 'Service Orchestration' },
      { name: 'UNIX Sockets', pct: 86, area: 'IPC Layer' },
      { name: 'Tauri', pct: 72, area: 'Desktop Shell' },
      { name: 'React', pct: 78, area: 'UI Surface' },
    ],
  },
];

export const githubSkillsCards = [
  {
    badge: 'GitHub Profile',
    title: 'Skills',
    items: [
      { name: 'AWS', pct: 70 },
      { name: 'Azure', pct: 64 },
      { name: 'Docker', pct: 78 },
      { name: 'Git', pct: 88 },
      { name: 'Linux', pct: 95 },
    ],
  },
  {
    badge: 'Programming',
    title: 'Languages',
    items: [
      { name: 'Python', pct: 76 },
      { name: 'JavaScript', pct: 81 },
      { name: 'TypeScript', pct: 74 },
      { name: 'Java', pct: 61 },
      { name: 'C++', pct: 55 },
    ],
  },
  {
    badge: 'Data Layer',
    title: 'Databases',
    items: [
      { name: 'MongoDB', pct: 71 },
      { name: 'MySQL', pct: 69 },
    ],
  },
  {
    badge: 'Web Stack',
    title: 'Frameworks',
    items: [
      { name: 'React', pct: 83 },
      { name: 'Next.js', pct: 72 },
      { name: 'Node.js', pct: 80 },
      { name: 'Express', pct: 77 },
      { name: 'Tailwind CSS', pct: 74 },
    ],
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
  { icon: '[@]', label: 'Email', value: 'walletzeus@proton.me', href: 'mailto:walletzeus@proton.me', cyan: false },
  { icon: '[gh]', label: 'GitHub', value: 'github.com/zeus-cli', href: 'https://github.com/zeus-cli', cyan: false },
  { icon: '[in]', label: 'LinkedIn', value: 'linkedin.com/in/seu-perfil', href: 'https://linkedin.com/in/seu-perfil', cyan: true },
];

export const navLinks = ['about', 'projects', 'stack', 'services', 'contact'];
