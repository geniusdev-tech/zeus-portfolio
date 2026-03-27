const CONTACT_EMAIL = 'walletzeus@proton.me';
const GITHUB_URL = 'https://github.com/zeus-cli';
const LINKEDIN_URL = 'https://linkedin.com/in/seu-perfil';

const sharedContactLinks = [
  {
    icon: '[@]',
    href: `mailto:${CONTACT_EMAIL}`,
    value: CONTACT_EMAIL,
    cyan: false,
  },
  {
    icon: '[gh]',
    href: GITHUB_URL,
    value: 'github.com/zeus-cli',
    cyan: false,
  },
  {
    icon: '[in]',
    href: LINKEDIN_URL,
    value: 'linkedin.com/in/seu-perfil',
    cyan: true,
  },
];

const enUS = {
  seo: {
    title: 'ZeusProtocol.cloud | Systems, Automation & CRM',
    description: 'Systems, automation, cloud and CRM-style intake for production-ready projects.',
    ogTitle: 'ZeusProtocol.cloud | Systems, Automation & CRM',
    ogDescription: 'Systems, automation, cloud and CRM-style intake built for production-ready projects.',
    twitterTitle: 'ZeusProtocol.cloud | Systems, Automation & CRM',
    twitterDescription: 'Systems, automation, cloud and lead intake for production-ready projects.',
  },
  nav: {
    items: ['about', 'projects', 'services', 'stack', 'contact'],
    itemsLabel: {
      about: 'about',
      projects: 'projects',
      services: 'services',
      stack: 'stack',
      contact: 'contact',
    },
    docsItem: { id: 'docs', label: 'docs', href: '/docs' },
    packagesItem: { id: 'packages', label: 'packages', href: '/packages' },
    casesItem: { id: 'cases', label: 'cases', href: '/cases' },
    online: 'online',
    toggleMenu: 'Toggle menu',
    menuLabel: 'Navigation menu',
    languageLabel: 'Language',
    languageOptions: [
      { code: 'en-US', shortLabel: 'EN', label: 'English' },
      { code: 'pt-BR', shortLabel: 'PT', label: 'Português' },
      { code: 'es-ES', shortLabel: 'ES', label: 'Español' },
    ],
  },
  hero: {
    brandKicker: 'AVAILABLE FOR PROJECTS',
    brandNote: 'Zeus Protocol / software, automation and cloud delivery',
    tag: 'ZEUS PROTOCOL // SOFTWARE, AUTOMATION & CLIENT MANAGEMENT',
    headlinePrefix: 'Turn chaotic operations',
    headlineAccent: 'into predictable, scalable processes,',
    headlineSuffix: 'without server downtime.',
    sub:
      'Stuck in technical bottlenecks? I build CRM integrations and stabilize your backend so your business scales automatically, without endless manual work.',
    snapshotHead: 'What I do, at a glance',
    snapshotCopy:
      'Built to attract, qualify and serve clients with less back-and-forth, while the technical side runs clean and always visible.',
    metrics: [
      { label: 'Main focus', value: 'Client intake + delivery' },
      { label: 'Work style', value: 'Remote / Cloud' },
      { label: 'Tools', value: 'Go · Shell · Python' },
    ],
    signals: [
      {
        label: 'New requests',
        text: 'Client intake and routing built into the first interaction.',
      },
      {
        label: 'Automation',
        text: 'Follow-up, handoff and routine tasks handled automatically.',
      },
      {
        label: 'Delivery',
        text: 'Cloud systems with monitoring, publishing and automatic recovery.',
      },
    ],
    pillars: [
      {
        label: '01 / Client Intake',
        title: 'Capture requests with less friction.',
        text: 'Forms, routing and qualification that make the next step obvious.',
      },
      {
        label: '02 / Automation',
        title: 'Turn repetitive work into flows.',
        text: 'Automated follow-ups, internal routines and process flows that keep teams moving.',
      },
      {
        label: '03 / Infrastructure',
        title: 'Keep systems visible and reliable.',
        text: 'Servers, publishing, monitoring and automatic recovery under control.',
      },
    ],
    actions: [
      { label: 'Send brief', href: '#contact', variant: 'primary' },
      { label: 'View QELO-X', href: '/qelox', variant: 'secondary' },
    ],
  },
  about: {
    sectionTag: '01 — About',
    titlePrefix: 'Systems,',
    titleEmphasis: 'Built to Run in the Real World.',
    lede:
      'I work where infrastructure, automation and software delivery meet. The focus is keeping systems stable, visible and easy to operate — which means fewer surprises, less time spent firefighting, and a team that can focus on delivering instead of reacting.',
    scopeLabel: 'What I work on',
    scopeText:
      'Server administration, networking, security practices, cloud delivery and server-side tools for systems that run in production.',
    deliveryLabel: 'How I work',
    deliveryText:
      'I design with failure in mind, prioritize visibility and automate the routine parts — so teams spend less time reacting and more time building.',
    tags: [
      'Linux',
      'Networking',
      'Infrastructure',
      'Security',
      'Backend Dev',
      'Automation',
      'Blockchain',
      'Systems Analysis',
      'Production',
    ],
    panelKicker: 'What you get',
    panelTitle: 'Less noise. More clarity. More control.',
    panelCopy:
      'The work combines platform stability with lightweight automation, so technical decisions stay practical and easy to maintain over time.',
    stats: [
      { label: 'Primary OS', value: 'Linux', cyan: false },
      { label: 'Infrastructure', value: 'Dedicated + Cloud servers', cyan: false },
      { label: 'Languages', value: 'Go · Shell · Python', cyan: true },
      { label: 'Security', value: 'Hardening + Monitoring', cyan: true },
      { label: 'Blockchain Ops', value: 'Nodes + Monitoring', cyan: false },
      { label: 'Focus', value: 'Stability & Reliability', cyan: false },
      { label: 'Delivery', value: 'Production-Ready', cyan: false },
      { label: 'Status', value: 'Available', cyan: true },
    ],
  },
  expertise: {
    sectionTag: '02 — What I Do',
    titlePrefix: 'Areas',
    titleEmphasis: 'I Work In.',
    cards: [
      {
        num: '01 / INFRASTRUCTURE',
        title: 'Server & Infrastructure',
        items: [
          'Linux server administration',
          'Service management',
          'Process supervision',
          'Production environments',
          'Performance optimization',
        ],
      },
      {
        num: '02 / NETWORKING',
        title: 'Network & Connectivity',
        items: [
          'Network protocols',
          'Routing & DNS',
          'Server connectivity',
          'Monitoring & diagnostics',
          'Network troubleshooting',
        ],
      },
      {
        num: '03 / ANALYSIS',
        title: 'Systems Analysis',
        items: [
          'Requirements gathering',
          'Process mapping',
          'Architecture planning',
          'Technical documentation',
        ],
      },
      {
        num: '04 / DEVELOPMENT',
        title: 'Software Development',
        items: [
          'Server-side development',
          'Command-line tools',
          'Background services',
          'Automation scripts',
          'API integration',
        ],
      },
      {
        num: '05 / DEVOPS',
        title: 'Automation & Deployment',
        items: [
          'Service configuration',
          'Monitoring solutions',
          'Log management',
          'Security hardening',
        ],
      },
    ],
    placeholder: 'Additional capabilities on request',
  },
  projects: {
    sectionTag: '02 — Active Build',
    titlePrefix: 'Current Build',
    titleEmphasis: 'in Active Development.',
    intro:
      'A focused view of the live build, with the stack and delivery weight behind each layer of the product.',
    badge: 'NODE OPS / ACTIVE',
    brandLabel: 'Zeus Protocol',
    brandNote: 'Live case and delivery surface',
    comingSoon: 'COMING SOON',
    openCase: 'Open Case',
    maintenanceActive: 'MAINTENANCE ACTIVE',
    featured: {
      badge: 'NODE OPS / ACTIVE',
      title: 'QELO-X',
      link: '/qelox',
      muted: false,
      comingSoon: false,
      external: false,
      desc:
        'Node operations layer for blockchain infrastructure. Supervises services, keeps control local, surfaces runtime telemetry and automates recovery on Linux production hosts.',
      skills: [
        { name: 'Go', pct: 88, area: 'Core Runtime' },
        { name: 'Linux', pct: 94, area: 'Host Environment' },
        { name: 'systemd', pct: 91, area: 'Service Orchestration' },
        { name: 'UNIX Sockets', pct: 86, area: 'IPC Layer' },
        { name: 'Tauri', pct: 72, area: 'Desktop Shell' },
        { name: 'React', pct: 78, area: 'UI Surface' },
      ],
    },
  },
  stack: {
    sectionTag: '03 — Operating Surface',
    titlePrefix: 'Core Stack',
    titleEmphasis: 'for production systems.',
    intro:
      'Compact tooling for systems, automation and delivery. The mix stays practical: the languages, runtimes and platforms I actually use to ship and keep services observable.',
    carouselLabel: 'Browse the stack modules',
    prev: 'Previous stack page',
    next: 'Next stack page',
    goTo: (page) => `Go to stack page ${page}`,
    meta: 'Live systems + GitHub',
    yearsSuffix: 'yrs',
    proficiencyLabel: (name) => `${name} proficiency`,
    items: [
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
    ],
  },
  services: {
    sectionTag: '04 — Services',
    titlePrefix: 'Software & Automation',
    titleEmphasis: 'Services',
    subtitle: 'Practical delivery across software, automation, cloud and blockchain infrastructure.',
    items: [
      {
        title: 'Technical Support',
        description: 'Troubleshooting, maintenance, backups and recovery for your systems — so your team is never stuck waiting when something breaks.',
        accent: 'green',
      },
      {
        title: 'Server Management',
        description: 'Linux and Windows server setup, automation and monitoring for steady delivery — less downtime, fewer manual interventions.',
        accent: 'cyan',
      },
      {
        title: 'Network & Connectivity',
        description: 'Office network, firewall, VPN and connectivity diagnostics — your connection stays reliable and your data stays where it should.',
        accent: 'green',
      },
      {
        title: 'Cloud & Deployment',
        description: 'Cloud setup, automated build and deploy pipelines, containerized delivery — publish faster without risking stability.',
        accent: 'cyan',
      },
      {
        title: 'Blockchain Infrastructure',
        description: 'Blockchain node setup, live status monitoring and automatic recovery — nodes stay online and incidents get handled before they become outages.',
        accent: 'green',
      },
      {
        title: 'Custom Software',
        description: 'Server-side systems, APIs, desktop tools and automation built around your workflow — so your team stops working around the tool and the tool starts working for them.',
        accent: 'cyan',
      },
    ],
    nodeLabel: (index) => `service node ${index + 1}`,
  },
  contact: {
    sectionTag: '05 — Lead Intake',
    titlePrefix: 'Open a Lead.',
    titleEmphasis: 'Send the brief.',
    signalbarStatus: 'Lead capture active',
    ctaLabel: 'Lead Intake Form',
    ctaEmail:
      'Send scope, blockers or the environment you want mapped.',
    ctaDesc:
      'Tell me what is broken, slow or stuck. I will map the environment, estimate the effort and propose the next step — no lengthy back-and-forth.',
    highlights: ['Scope', 'Blockers', 'Timeline', 'Contact'],
    ariaHighlights: 'What to include in your brief',
    form: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      subject: 'Subject',
      message: 'Message',
    },
    placeholders: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    },
    send: 'Send Brief',
    sending: 'Sending...',
    statusDefault: 'Briefs are routed through the ZEUS intake channel.',
    statusSuccess: 'Brief sent successfully. We will continue by email.',
    statusError: 'Failed to send. Please try again later.',
  },
  packages: {
    title: 'Productized Services',
    subtitle: 'Clear scopes, fixed prices, and guaranteed outcomes. No more open-ended consulting hours.',
    items: [
      {
        id: 'infra-setup',
        name: 'Infrastructure Setup & Hardening',
        description: 'Complete configuration of a secure, production-ready server environment tailored to your needs.',
        price: 'Starts at $800',
        features: ['Linux Server Hardening', 'Firewall & Network Security', 'Docker / Containerization Setup', 'Basic Monitoring Dashboard'],
      },
      {
        id: 'security-audit',
        name: 'Performance & Security Audit',
        description: 'A deep dive into your current systems to find bottlenecks, security risks, and single points of failure.',
        price: 'Starts at $500',
        features: ['Codebase Architecture Review', 'Database Query Analysis', 'Security Vulnerability Scan', 'Actionable Fix Report'],
        highlight: true,
      },
      {
        id: 'retainer',
        name: 'Monthly Care',
        description: 'Proactive maintenance, updates, and emergency recovery to keep your operation online 24/7.',
        price: 'Custom Monthly',
        features: ['24/7 Uptime Monitoring', 'Automated Daily Backups', 'Security Patch Management', 'Priority Support SLA'],
      }
    ],
    slotsAvailable: '2 slots available this month',
    cta: 'Not sure what you need? Book a free audit.',
    contactText: 'Contact Zeus',
    contactMessagePrefix: 'Hi, I am interested in the package: ',
    auditContactText: 'Book a free audit',
    auditMessage: 'Hi, I would like a free infrastructure audit.',
    workflow: {
      title: 'How It Works',
      steps: [
        { title: '1. Discovery & Audit', desc: 'We map your exact bottlenecks and define the scope.' },
        { title: '2. Architecture Design', desc: 'I design a robust, scalable system tailored to your scale.' },
        { title: '3. Tactical Implementation', desc: 'Flawless execution of the agreed scope without disturbing operations.' },
        { title: '4. Handoff & Stability', desc: 'You receive a fully operational, documented, and resilient system.' }
      ]
    },
    why: {
      title: 'Why Fixed-Price Packages?',
      text: 'Hourly billing punishes efficiency and creates unpredictable costs. I price based on the value delivered and the outcomes you achieve. You know exactly what you get, when you get it, and how much it costs upfront. No surprises.'
    },
    faq: {
      title: 'Package Questions',
      items: [
        { q: 'How does payment work?', a: 'For fixed-price projects, 50% is required upfront to secure your slot, and the remaining 50% upon successful completion and handoff.' },
        { q: 'What if my project does not fit these packages?', a: 'These are baseline structures. Every project starts with a Discovery call to tailor the exact deliverables to your business needs.' },
        { q: 'Do you work in my timezone?', a: 'I am based in UTC-3, but I overlap significantly with US and EU timezones and design async-first systems that do not require 24/7 micromanagement.' }
      ]
    }
  },
  cases: {
    title: 'Case Studies',
    subtitle: 'Real business problems solved with precision engineering.',
    items: [
      {
        id: 'qelox',
        clientType: 'Blockchain Operation',
        problem: 'Client was losing money and sleep due to blockchain nodes crashing randomly overnight, requiring manual restarts and causing significant downtime.',
        solution: 'Built QELO-X, a background daemon that monitors node health in real-time and automatically executes bash scripts to recover the node without human intervention.',
        result: 'Reduced downtime from hours to less than 3 seconds per crash. Eliminated the need for 24/7 manual monitoring.',
        linkText: 'Read the technical documentation',
        linkUrl: '/docs'
      }
    ]
  },
  faq: {
    sectionTag: 'FAQ',
    title: 'Common Questions',
    items: [
      {
        q: "I already have a frontend/backend developer. Why do I need an infrastructure specialist?",
        a: "Developers build features; infrastructure specialists ensure those features stay online. Your devs shouldn't spend 20% of their time battling server configuration, deployment pipelines, or diagnosing database crashes. I take over the operations so your team can focus on building the product."
      },
      {
        q: "Do you offer support after the project is done?",
        a: "Yes. For setup and audit projects, there is a 14-day grace period for adjustments. For long-term stability, I offer the Monthly Care retainer to manage systems proactively."
      },
      {
        q: "Is my business too small for dedicated infrastructure?",
        a: "If downtime costs you money, leads, or reputation, you need reliable infrastructure. I build systems that fit your current scale but are designed to handle growth without needing to be rewritten from scratch next year."
      }
    ]
  },
  philosophy: {
    sectionTag: '06 — Engineering Principles',
    titlePrefix: 'How I Make',
    titleEmphasis: 'Production Decisions.',
    quote: 'If the system is not readable under pressure, it is not ready.',
    quoteAttr: 'Zeus',
    items: [
      {
        n: '01',
        title: 'Stability First',
        text: 'Production systems must fail in visible ways, recover quickly and stay bounded when they do.',
      },
      {
        n: '02',
        title: 'Efficiency Without Waste',
        text: 'Use the smallest reliable set of components that can do the job without adding noise.',
      },
      {
        n: '03',
        title: 'Engineering for Outcomes',
        text: 'If it does not improve reliability, speed or clarity, it does not ship.',
      },
    ],
  },
  status: {
    sectionTag: '07 — System Status',
    titlePrefix: 'Live Metrics',
    titleEmphasis: 'and Service Health.',
    topbarUnavailable: 'Control plane unavailable',
    topbarLive: 'Live telemetry · refresh every 15s',
    topbarSimulated: 'Simulated telemetry · refresh every 15s',
    updated: 'Updated',
    refresh: 'Refresh',
    errorTitle: 'Cannot reach backend',
    errorHintBeforeCode: 'Deploy the Supabase backend — see',
    errorHintAfterCode: '.',
    hostMetrics: 'Host Metrics',
    systemServices: 'System Services',
    siteServices: 'Site Services',
    metricLabels: {
      cpu: 'CPU Usage',
      memory: 'Memory',
      disk: 'Disk',
      load: 'Load Avg',
      region: 'Region',
      uptime: 'Uptime',
    },
    badgeLabels: {
      running: 'online',
      stopped: 'offline',
      maintenance: 'maintenance',
      unknown: 'unknown',
    },
    simPill: 'sim',
  },
  aiChat: {
    storageKey: 'zeus-protocol-chat-history',
    legacyWelcome:
      /assistente da Zeus Protocol|assistente da Zeus|Posso te ajudar com site, automacao|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, DevOps e infraestrutura\.|ZEUS AI online\. Send scope, stack, deadline and contact to start intake\./i,
    initialHistory: [
      {
        role: 'bot',
        text: 'ZEUS AI online. Send scope, stack, deadline and contact to start intake.',
        meta: 'LIVE | CRM',
      },
    ],
    fallbackMessage:
      'ZEUS AI offline. Send scope, stack, deadline and contact and I will route it when the link returns.',
    terminalLabel: 'zeus-shell:~/ops',
    frameLabel: 'DEVOPS / HACKER CHANNEL',
    statusLabels: {
      idle: 'STANDBY',
      loading: 'SCANNING',
      online: 'LIVE',
      fallback: 'FALLBACK',
      error: 'ERROR',
    },
    titleLabel: 'ZEUS AI',
    inputPlaceholder: 'enter scope, stack, deadline and contact',
    send: 'RUN',
    sending: 'RUN...',
    typing: 'scanning payload',
    authorUser: 'operator@client',
    authorBot: 'root@zeus',
    messageMeta: {
      userSent: 'Message sent',
      intent: 'Intent',
      email: 'Email',
      phone: 'Phone',
      leadSaved: 'Lead saved',
      fallbackActive: 'Fallback active',
      replyDelivered: 'Reply delivered',
      error: 'Chat error',
    },
    toggleOpen: 'Open Zeus AI chat',
    toggleClose: 'Close Zeus AI chat',
  },
  terminal: {
    storageKey: 'zeus-protocol-terminal-history',
    legacyWelcome:
      /assistente da Zeus Protocol|assistente da Zeus|Posso te ajudar com site, automacao|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, DevOps e infraestrutura\.|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, orcamentos e suporte comercial\.|ZEUS AI online\. Send scope, stack, deadline and contact to start intake\./i,
    initialHistory: [
      {
        role: 'bot',
        text: 'ZEUS AI online. Send scope, stack, deadline and contact to start intake.',
        meta: 'LIVE | CRM',
      },
    ],
    fallbackMessage:
      'ZEUS AI offline. Send scope, stack, deadline and contact and I will route it when the link returns.',
    statusLabels: {
      idle: 'STANDBY',
      loading: 'SCANNING',
      online: 'LIVE',
      fallback: 'FALLBACK',
      error: 'ERROR',
    },
    kicker: '[ DEVOPS / HACKER MODE ]',
    title: 'ZEUS AI Terminal',
    lead:
      'Drop your scope, stack, deadline and contact. The shell qualifies the lead and routes the next step.',
    chips: ['ROOT INTAKE', 'PIPELINE LOGS', 'WHATSAPP ROUTE'],
    pipelineLabel: 'PIPELINE STATE',
    projectLabel: 'Project',
    deadlineLabel: 'Deadline',
    contactLabel: 'Contact',
    summaryLabel: 'LEAD SNAPSHOT',
    quickCommandsLabel: 'QUICK COMMANDS',
    routingLabel: 'ROUTING',
    routingNote:
      'If you already have scope, budget and contact, I can route the lead to WhatsApp or email. If you prefer WhatsApp, drop the number here and I will continue there.',
    openContact: 'OPEN CONTACT',
    returnToSite: 'RETURN TO SITE',
    inputPlaceholder: 'enter scope, stack, deadline and contact',
    send: 'RUN',
    sending: 'RUN...',
    typing: 'indexing request',
    authorUser: 'operator@client',
    authorBot: 'root@zeus',
    messageMeta: {
      userSent: 'Message sent',
      intent: 'Intent',
      email: 'Email',
      phone: 'Phone',
      leadSaved: 'Lead saved',
      fallbackActive: 'Fallback active',
      replyDelivered: 'Reply delivered',
      error: 'Chat error',
    },
    stages: {
      discovery: 'DISCOVERY',
      qualifying: 'QUALIFYING',
      ready: 'READY TO ROUTE',
    },
    quickPrompts: [
      { label: 'NEW SITE', text: 'I need a website project.' },
      { label: 'SYSTEM', text: 'I need a custom system.' },
      { label: 'AUTOMATION', text: 'I want to automate an internal process.' },
      { label: 'QUOTE', text: 'I want a quote for this project.' },
      { label: 'WHATSAPP', text: 'If it makes sense, we can continue on WhatsApp.' },
    ],
  },
  maintenance: {
    status: '[ STATUS: MAINTENANCE ]',
    kicker: 'ZEUS // QELO-X ACCESS PAUSED',
    title: 'System Maintenance',
    message:
      'Scheduled upgrades are running. QELO-X access is paused while the environment is stabilized, hardened and prepared for the next release cycle.',
    highlights: ['Hardening', 'Runtime tuning', 'Release prep'],
    footer: ['CORE_ENGINE: GO_1.22', 'UI_LAYER: REACT_VITE', 'STATUS: STABILIZING'],
  },
  checkout: {
    closeAria: 'Close checkout',
    brandRowLabel: 'Checkout intake channel',
    tag: 'Operator Checkout',
    subtitle: 'Guided payment flow for operator access with PIX and USDT support.',
    chips: ['Access delivery by email', 'PIX and crypto support', 'Operator intake checkout'],
    highlightsLabel: 'Checkout highlights',
    currentAccess: 'Current access',
    releaseAccess: 'Single release access',
    stepLabels: ['Identification', 'Method', 'Payment'],
    step01: 'Enter the delivery contact so access and payment follow-up land in the correct inbox.',
    step02: 'Select the payment rail you want to use for this order.',
    step03:
      'Use the QR code or copy field below to complete payment and keep the order active within the time window.',
    usedForAccess: 'Used for access delivery',
    usedForFollowUp: 'Used for payment follow-up',
    buyer: 'Buyer',
    delivery: 'Delivery',
    selectMethod: 'Select the payment method',
    pix: {
      name: 'Pix',
      desc: 'Instant payment with automatic confirmation.',
      banner: 'Pix instant transfer',
      label: 'PIX Copy and Paste',
      method: 'PIX',
      status: 'Awaiting PIX payment',
      scan: 'Scan to pay',
      copyFeedback: 'PIX code copied',
      help: 'If scanning fails, use the copy-and-paste field.',
      hint: 'PIX confirmation is handled automatically after transfer.',
    },
    crypto: {
      name: 'USDT (Polygon)',
      desc: 'Crypto payment for operators who prefer on-chain transfer.',
      banner: 'USDT on Polygon',
      label: 'USDT Polygon Address',
      method: 'CRYPTO',
      status: 'Awaiting wallet transfer',
      scan: 'Scan to open wallet',
      copyFeedback: 'Wallet address copied',
      help: 'If your wallet does not scan QR codes, copy the address directly.',
      hint: (supportEmail) => `After sending USDT, forward the transaction hash to ${supportEmail}.`,
    },
    paymentWindow: 'Payment window',
    selectedRail: 'Selected rail',
    accessSummary: 'Access summary',
    product: 'Product',
    copy: 'Copy',
    instructions: 'Instructions',
    finalizeEmail: 'Finalize delivery email',
    confirmationCopy:
      (email) => `After completing the transfer, confirm below to send the delivery email with the QELO-X access link to ${email}.`,
    confirmButton: 'I completed payment',
    sendingEmail: 'Sending delivery email...',
    deliverySuccess: 'Delivery email sent with the QELO-X access link.',
    deliveryError: 'Failed to send the delivery email.',
    configurationPending: 'Configuration pending',
    sectionFooter: 'Secure checkout surface for operator access workflow',
    changeMethod: 'Change Method',
    continue: 'Continue to Payment Method',
    fullName: 'Full Name',
    deliveryEmail: 'Delivery Email',
    placeholders: {
      name: 'Ex: Joao Silva',
      email: 'example@email.com',
    },
    stepNumbers: ['Step 01', 'Step 02', 'Step 03'],
  },
  quelox: {
    kicker: 'Infrastructure Product — Blockchain Node Operations',
    title: 'QELO-X',
    subtitle: 'Orchestration, monitoring and recovery for blockchain infrastructure.',
    lead:
      'QELO-X is a node operations layer for blockchain infrastructure. It is built to supervise services, monitor runtime health, recover from common failures and keep control local to the host.',
    highlights: [
      'Local-first control plane',
      'Continuous node telemetry',
      'Recovery routines for production incidents',
    ],
    highlightsLabel: 'QELO-X highlights',
    stats: [
      { label: 'Target', value: 'Critical node infrastructure' },
      { label: 'Model', value: 'Daemon + IPC + monitoring' },
      { label: 'Environment', value: 'Linux / systemd / production hosts' },
    ],
    requestAccess: 'Request Access',
    viewArchitecture: 'View Architecture',
    currentAccess: 'Current access',
    accessCopy: 'Single release access for the current cycle.',
    productRole: {
      tag: '01 — Product Role',
      title: 'Built for nodes that need stable operation and clear telemetry.',
      intro:
        'QELO-X sits between the host, the node process and the operator workflow so runtime visibility and recovery are part of the system, not an afterthought.',
      pillars: [
        {
          label: 'Orchestration Core',
          text: 'Controls node lifecycle with restart policy, supervised execution and consistent process handling.',
        },
        {
          label: 'Node Telemetry',
          text: 'Exposes CPU, memory, peer state, sync progress and runtime health in one operational view.',
        },
        {
          label: 'Secure IPC',
          text: 'Uses UNIX sockets to keep control local to the host and reduce exposed management surfaces.',
        },
      ],
    },
    architecture: {
      tag: '02 — Architecture',
      title: 'A runtime model designed for Linux-based node operations.',
      intro:
        'The architecture favors supervised services, low-friction host integration and monitoring that speaks the language of real node operations.',
      cards: [
        {
          title: 'Go runtime built for operators',
          text: 'Keeps runtime overhead low and makes daemon behavior easier to operate on production Linux hosts.',
        },
        {
          title: 'systemd-native process model',
          text: 'Runs as a managed service with supervised startup, restart control, logging and host integration.',
        },
        {
          title: 'Node-aware automation',
          text: 'Designed for blockchain nodes where peer count, sync drift and runtime instability affect availability.',
        },
        {
          title: 'Infrastructure-first monitoring',
          text: 'Surfaces operational issues early so they can be handled before they become downtime or desynchronization.',
        },
      ],
    },
    workflow: {
      tag: '03 — Workflow',
      title: 'How QELO-X fits into the node lifecycle.',
      intro:
        'The product is meant to slot into an operator routine quickly, with a short path from deployment to visibility and recovery automation.',
      steps: [
        'Deploy the daemon on a hardened Linux host.',
        'Attach QELO-X to the target node and its IPC boundary.',
        'Track health, sync state and runtime metrics continuously.',
        'Trigger recovery actions before operational degradation becomes downtime.',
      ],
      diagramLabel: 'Operational path',
      diagramRows: [
        '[systemd] -> [QELO-X daemon]',
        '[metrics loop] -> [CPU | RAM | sync | peers]',
        '[local IPC] -> [node process control]',
        '[recovery policy] -> [restart | stabilize | alert]',
      ],
    },
    comparison: {
      tag: '04 — Comparison',
      title: 'What changes compared with manual node management.',
      intro:
        'The difference is less about adding another dashboard and more about turning node operations into a repeatable operational surface.',
      headers: ['Area', 'Manual approach', 'QELO-X'],
      rows: [
        ['Lifecycle control', 'Manual scripts and ad-hoc commands', 'Centralized daemon supervision'],
        ['Monitoring', 'Reactive and fragmented', 'Continuous operational telemetry'],
        ['Recovery', 'Human intervention required', 'Automated restart and recovery logic'],
        ['Security surface', 'More exposed control paths', 'Local IPC and controlled boundaries'],
        ['Node operations', 'Hard to standardize', 'Repeatable operator workflow'],
      ],
    },
    access: {
      tag: '05 — Access',
      title: 'A focused product for operators who need reliable node control.',
      intro:
        'QELO-X is intended for operators who want a repeatable way to supervise blockchain nodes without relying on ad-hoc scripts and manual recovery.',
      priceLabel: 'Current release access',
      priceText: 'R$ 199,90',
      priceAnchor: 'R$ 297,00',
    },
    tui: {
      title: 'QELO-X TERMINAL v1.0.0',
      statusLabel: 'NODE STATUS:',
      syncLabel: 'SYNC PROGRESS:',
      peerLabel: 'PEER COUNT:',
      heightLabel: 'BLOCK HEIGHT:',
      uptimeLabel: 'UPTIME:',
      cpuLabel: 'CPU',
      ramLabel: 'RAM',
      footer: 'systemd: active (running)',
      running: 'RUNNING',
    },
  },
  notFound: {
    title: 'Page not found',
    lead: 'The requested route does not exist or has moved.',
    homeCta: 'Back to home',
    packagesCta: 'View packages',
  },
  footer: {
    text: 'Systems / Automation / CRM',
  },
};

const ptBR = {
  seo: {
    title: 'ZeusProtocol.cloud | Sistemas, Automacao e CRM',
    description: 'Sistemas, automacao, cloud e captacao no estilo CRM para projetos prontos para producao.',
    ogTitle: 'ZeusProtocol.cloud | Sistemas, Automacao e CRM',
    ogDescription: 'Sistemas, automacao, cloud e captacao no estilo CRM pensados para projetos prontos para producao.',
    twitterTitle: 'ZeusProtocol.cloud | Sistemas, Automacao e CRM',
    twitterDescription: 'Sistemas, automacao, cloud e captacao de leads para projetos prontos para producao.',
  },
  nav: {
    items: ['about', 'projects', 'services', 'stack', 'contact'],
    itemsLabel: {
      about: 'sobre',
      projects: 'projetos',
      services: 'serviços',
      stack: 'stack',
      contact: 'contato',
    },
    docsItem: { id: 'docs', label: 'documentação', href: '/docs' },
    packagesItem: { id: 'packages', label: 'pacotes', href: '/packages' },
    casesItem: { id: 'cases', label: 'casos', href: '/cases' },
    online: 'online',
    toggleMenu: 'Abrir menu',
    menuLabel: 'Menu de navegacao',
    languageLabel: 'Idioma',
    languageOptions: [
      { code: 'pt-BR', shortLabel: 'PT', label: 'Português' },
      { code: 'en-US', shortLabel: 'EN', label: 'English' },
      { code: 'es-ES', shortLabel: 'ES', label: 'Español' },
    ],
  },
  hero: {
    brandKicker: 'NÓ DE MARCA AO VIVO',
    brandNote: 'Zeus Protocol / sistemas, automacao e entrega em nuvem',
    tag: 'ZEUS PROTOCOL // SISTEMAS, AUTOMACAO & CRM',
    headlinePrefix: 'Transforme operações caóticas',
    headlineAccent: 'em processos previsíveis e escaláveis,',
    headlineSuffix: 'sem quedas no servidor.',
    sub:
      'Travou no gargalo técnico? Desenvolvo integrações de CRM e estabilizo seus servidores para a sua empresa crescer no automático, sem depender de trabalho braçal.',
    snapshotHead: 'Resumo operacional',
    snapshotCopy:
      'Construido para qualificar, roteirizar e entregar com menos friccao, enquanto a infraestrutura permanece limpa e observavel.',
    metrics: [
      { label: 'Foco principal', value: 'Fluxo de leads + entrega' },
      { label: 'Modelo operacional', value: 'Terminal-first / Cloud' },
      { label: 'Ferramentas', value: 'Go · Shell · Python' },
    ],
    signals: [
      {
        label: 'Captacao',
        text: 'Qualificacao e roteamento de leads na primeira interacao.',
      },
      {
        label: 'Automacao',
        text: 'Follow-up, repasse e tarefas operacionais sem trabalho manual.',
      },
      {
        label: 'Entrega',
        text: 'Sistemas em nuvem com monitoramento, deploys e recuperacao sob controle.',
      },
    ],
    pillars: [
      {
        label: '01 / Captacao de Leads',
        title: 'Capturar pedidos com menos friccao.',
        text: 'Formularios, roteamento e qualificacao que deixam o proximo passo obvio.',
      },
      {
        label: '02 / Automacao',
        title: 'Transformar trabalho repetitivo em fluxo.',
        text: 'Follow-ups, rotinas internas e automacoes de processo para manter as equipes andando.',
      },
      {
        label: '03 / Infraestrutura',
        title: 'Manter a entrega observavel e estavel.',
        text: 'Servidores, deploys, monitoramento e rotinas de recuperacao sob controle.',
      },
    ],
    actions: [
      { label: 'Enviar briefing', href: '#contact', variant: 'primary' },
      { label: 'Ver QELO-X', href: '/qelox', variant: 'secondary' },
    ],
  },
  about: {
    sectionTag: '01 — Sobre',
    titlePrefix: 'Sistemas,',
    titleEmphasis: 'Feitos para Funcionar de Verdade.',
    lede:
      'Atuo onde infraestrutura, automacao e entrega de software se encontram. O foco e manter os sistemas estaveis, visiveis e mais faceis de operar — o que significa menos surpresas, menos tempo apagando incendios e uma equipe que entrega em vez de reagir.',
    scopeLabel: 'Com o que trabalho',
    scopeText:
      'Administracao de servidores, redes, praticas de seguranca, entrega em nuvem e ferramentas de servidor para sistemas em producao.',
    deliveryLabel: 'Como trabalho',
    deliveryText:
      'Projeto pensando em falhas, priorizo visibilidade e automatizo as partes de rotina — para que as equipes passem menos tempo reagindo e mais tempo construindo.',
    tags: [
      'Linux',
      'Redes',
      'Infraestrutura',
      'Seguranca',
      'Backend',
      'Automacao',
      'Blockchain',
      'Analise de Sistemas',
      'Producao',
    ],
    panelKicker: 'O que voce recebe',
    panelTitle: 'Menos ruido. Mais clareza. Mais controle.',
    panelCopy:
      'O trabalho combina estabilidade de plataforma com automacao leve, para que decisoes tecnicas continuem praticas e faceis de manter ao longo do tempo.',
    stats: [
      { label: 'SO principal', value: 'Linux', cyan: false },
      { label: 'Infraestrutura', value: 'Servidores dedicados + Nuvem', cyan: false },
      { label: 'Linguagens', value: 'Go · Shell · Python', cyan: true },
      { label: 'Seguranca', value: 'Hardening + Monitoramento', cyan: true },
      { label: 'Operacao blockchain', value: 'Nos + Monitoramento', cyan: false },
      { label: 'Foco', value: 'Estabilidade e Confiabilidade', cyan: false },
      { label: 'Entrega', value: 'Pronto para Producao', cyan: false },
      { label: 'Status', value: 'Disponivel', cyan: true },
    ],
  },
  expertise: {
    sectionTag: '02 — O Que Faco',
    titlePrefix: 'Areas',
    titleEmphasis: 'em que atuo.',
    cards: [
      {
        num: '01 / INFRAESTRUTURA',
        title: 'Servidor e Infraestrutura',
        items: [
          'Administracao de servidores Linux',
          'Gerenciamento de servicos',
          'Supervisao de processos',
          'Ambientes de producao',
          'Otimizacao de desempenho',
        ],
      },
      {
        num: '02 / REDES',
        title: 'Rede e Conectividade',
        items: [
          'Protocolos de rede',
          'Roteamento e DNS',
          'Conectividade de servidores',
          'Monitoramento e diagnostico',
          'Solucao de problemas de rede',
        ],
      },
      {
        num: '03 / ANALISE',
        title: 'Analise de Sistemas',
        items: [
          'Levantamento de requisitos',
          'Mapeamento de processos',
          'Planejamento de arquitetura',
          'Documentacao tecnica',
        ],
      },
      {
        num: '04 / DESENVOLVIMENTO',
        title: 'Desenvolvimento de Software',
        items: [
          'Desenvolvimento no lado do servidor',
          'Ferramentas de linha de comando',
          'Servicos em segundo plano',
          'Scripts de automacao',
          'Integracao de API',
        ],
      },
      {
        num: '05 / DEVOPS',
        title: 'Automacao e Publicacao',
        items: [
          'Configuracao de servicos',
          'Solucoes de monitoramento',
          'Gerenciamento de logs',
          'Protecao e seguranca',
        ],
      },
    ],
    placeholder: 'Capacidades adicionais sob demanda',
  },
  projects: {
    sectionTag: '02 — Build Ativo',
    titlePrefix: 'Construção atual',
    titleEmphasis: 'em desenvolvimento ativo.',
    intro:
      'Uma visão focada do build vivo, com a stack e o peso de entrega por trás de cada camada do produto.',
    badge: 'NODE OPS / ATIVO',
    brandLabel: 'Zeus Protocol',
    brandNote: 'Caso vivo e superfície de entrega',
    comingSoon: 'EM BREVE',
    openCase: 'Abrir caso',
    maintenanceActive: 'MANUTENCAO ATIVA',
    featured: {
      badge: 'NODE OPS / ATIVO',
      title: 'QELO-X',
      link: '/qelox',
      muted: false,
      comingSoon: false,
      external: false,
      desc:
        'Camada de operacao de nos para infraestrutura blockchain. Supervisiona servicos, mantem o controle local, expõe telemetria de runtime e automatiza a recuperacao em hosts Linux de producao.',
      skills: [
        { name: 'Go', pct: 88, area: 'Runtime central' },
        { name: 'Linux', pct: 94, area: 'Ambiente do host' },
        { name: 'systemd', pct: 91, area: 'Orquestracao de servicos' },
        { name: 'UNIX Sockets', pct: 86, area: 'Camada IPC' },
        { name: 'Tauri', pct: 72, area: 'Shell desktop' },
        { name: 'React', pct: 78, area: 'Superficie de UI' },
      ],
    },
  },
  stack: {
    sectionTag: '03 — Superficie Operacional',
    titlePrefix: 'Stack principal',
    titleEmphasis: 'para sistemas em producao.',
    intro:
      'Ferramentas compactas para sistemas, automacao e entrega. O conjunto se mantem pratico: as linguagens, runtimes e plataformas que eu realmente uso para publicar e manter servicos observaveis.',
    carouselLabel: 'Navegue pelos modulos da stack',
    prev: 'Pagina anterior da stack',
    next: 'Proxima pagina da stack',
    goTo: (page) => `Ir para a pagina ${page} da stack`,
    meta: 'Sistemas ao vivo + GitHub',
    yearsSuffix: 'anos',
    proficiencyLabel: (name) => `Proficiencia de ${name}`,
    items: [
      { name: 'Linux', type: 'Sistema operacional', pct: 95, years: '5+', accent: 'green' },
      { name: 'Go', type: 'Linguagem de sistemas', pct: 82, years: '3+', accent: 'cyan' },
      { name: 'systemd', type: 'Init / gerenciador de servicos', pct: 93, years: '5+', accent: 'green' },
      { name: 'Shell Scripting', type: 'Automacao', pct: 91, years: '5+', accent: 'green' },
      { name: 'Networking', type: 'TCP/IP · Roteamento · DNS', pct: 84, years: '4+', accent: 'cyan' },
      { name: 'Infra Architecture', type: 'Projeto e planejamento', pct: 86, years: '4+', accent: 'cyan' },
      { name: 'Monitoring', type: 'Observabilidade', pct: 79, years: '3+', accent: 'cyan' },
      { name: 'Python', type: 'Scripts / ferramentas', pct: 76, years: '3+', accent: 'green' },
      { name: 'JavaScript', type: 'Frontend / backend', pct: 81, years: '3+', accent: 'green' },
      { name: 'TypeScript', type: 'Desenvolvimento web tipado', pct: 74, years: '2+', accent: 'cyan' },
      { name: 'React', type: 'Framework de UI', pct: 83, years: '3+', accent: 'cyan' },
      { name: 'Next.js', type: 'Framework web', pct: 72, years: '2+', accent: 'green' },
      { name: 'Node.js', type: 'Runtime / APIs', pct: 80, years: '3+', accent: 'green' },
      { name: 'Express', type: 'Servicos HTTP', pct: 77, years: '2+', accent: 'cyan' },
      { name: 'MongoDB', type: 'Banco documental', pct: 71, years: '2+', accent: 'green' },
      { name: 'MySQL', type: 'Banco relacional', pct: 69, years: '2+', accent: 'cyan' },
      { name: 'Docker', type: 'Containers', pct: 78, years: '3+', accent: 'green' },
      { name: 'AWS', type: 'Plataforma cloud', pct: 70, years: '2+', accent: 'cyan' },
      { name: 'Azure', type: 'Servicos em nuvem', pct: 64, years: '1+', accent: 'cyan' },
      { name: 'Java', type: 'Uso geral', pct: 61, years: '2+', accent: 'green' },
      { name: 'C++', type: 'Fundamentos de sistemas', pct: 55, years: '1+', accent: 'green' },
      { name: 'Tailwind CSS', type: 'Estilo de UI', pct: 74, years: '2+', accent: 'cyan' },
      { name: 'Git', type: 'Controle de versao', pct: 88, years: '5+', accent: 'green' },
    ],
  },
  services: {
    sectionTag: '04 — Servicos',
    titlePrefix: 'Software e Automacao',
    titleEmphasis: 'Servicos',
    subtitle: 'Entrega pratica em software, automacao, nuvem e infraestrutura blockchain.',
    items: [
      {
        title: 'Suporte Tecnico',
        description: 'Diagnostico, manutencao, backups e recuperacao dos seus sistemas — para sua equipe nao ficar parada esperando quando algo quebra.',
        accent: 'green',
      },
      {
        title: 'Gestao de Servidores',
        description: 'Configuracao de servidores Linux e Windows, automacao e monitoramento para entrega estavel — menos downtime, menos intervencoes manuais.',
        accent: 'cyan',
      },
      {
        title: 'Rede e Conectividade',
        description: 'Rede local, firewall, VPN e diagnostico de conectividade — sua conexao fica confiavel e seus dados ficam no lugar certo.',
        accent: 'green',
      },
      {
        title: 'Nuvem e Publicacao',
        description: 'Configuracao em nuvem, pipelines automaticos de publicacao, entrega em containers — publique mais rapido sem sacrificar estabilidade.',
        accent: 'cyan',
      },
      {
        title: 'Infraestrutura Blockchain',
        description: 'Configuracao de nos blockchain, monitoramento ao vivo e recuperacao automatica — os nos ficam online e os incidentes sao tratados antes de virarem queda.',
        accent: 'green',
      },
      {
        title: 'Software Personalizado',
        description: 'Sistemas no servidor, APIs, ferramentas desktop e automacoes criadas para o seu fluxo — para sua equipe parar de trabalhar em torno da ferramenta e a ferramenta comecar a trabalhar por eles.',
        accent: 'cyan',
      },
    ],
    nodeLabel: (index) => `no de servico ${index + 1}`,
  },
  contact: {
    sectionTag: '05 — Captacao de Leads',
    titlePrefix: 'Abra um lead.',
    titleEmphasis: 'Envie o briefing.',
    signalbarStatus: 'Captacao de leads ativa',
    ctaLabel: 'Formulario de captacao',
    ctaEmail: 'Envie escopo, bloqueios ou o ambiente que voce quer mapear.',
    ctaDesc:
      'Me conta o que esta quebrado, lento ou travado. Eu mapeio o ambiente, estimo o esforco e proponho o proximo passo — sem ir e vir desnecessario.',
    highlights: ['Escopo', 'Bloqueios', 'Prazo', 'Contato'],
    ariaHighlights: 'O que incluir no seu briefing',
    form: {
      name: 'Nome',
      email: 'Email',
      company: 'Empresa',
      subject: 'Assunto',
      message: 'Mensagem',
    },
    placeholders: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
    },
    send: 'Enviar briefing',
    sending: 'Enviando...',
    statusDefault: 'Os briefings sao roteados pelo canal de captacao da ZEUS.',
    statusSuccess: 'Briefing enviado com sucesso. Vamos continuar por email.',
    statusError: 'Falha ao enviar. Tente novamente mais tarde.',
  },
  packages: {
    title: 'Serviços Empacotados',
    subtitle: 'Escopos claros, preços fixos e resultados garantidos. Chega de pagar horas infinitas de consultoria.',
    items: [
      {
        id: 'infra-setup',
        name: 'Setup & Hardening de Infra',
        description: 'Configuração completa de um ambiente de servidor seguro e pronto para produção, sob medida para a sua operação.',
        price: 'A partir de R$ 4.000',
        features: ['Hardening de Servidor Linux', 'Segurança de Rede & Firewall', 'Setup de Docker / Containers', 'Dashboard Básico de Monitoramento'],
      },
      {
        id: 'security-audit',
        name: 'Auditoria de Performance',
        description: 'Um raio-X profundo nos seus sistemas atuais para encontrar gargalos, riscos de segurança e pontos de falha que derrubam o app.',
        price: 'A partir de R$ 2.500',
        features: ['Revisão de Arquitetura de Código', 'Análise de Queries do Banco', 'Scan de Vulnerabilidades', 'Relatório de Correções Acionáveis'],
        highlight: true,
      },
      {
        id: 'retainer',
        name: 'Manutenção Mensal',
        description: 'Manutenção proativa, atualizações e recuperação emergencial para manter sua operação online 24/7.',
        price: 'Mensalidade Sob Consulta',
        features: ['Monitoramento de Uptime 24/7', 'Backups Diários Automatizados', 'Gestão de Patches de Segurança', 'SLA de Suporte Prioritário'],
      }
    ],
    slotsAvailable: '2 vagas disponíveis este mês',
    cta: 'Não tem certeza do que precisa? Agende uma auditoria gratuita.',
    contactText: 'Falar com a Zeus',
    contactMessagePrefix: 'Olá, tenho interesse no pacote: ',
    auditContactText: 'Agendar auditoria gratuita',
    auditMessage: 'Olá, gostaria de uma auditoria gratuita de infraestrutura.',
    workflow: {
      title: 'Como Funciona',
      steps: [
        { title: '1. Auditoria e Diagnóstico', desc: 'Mapeamos os seus gargalos técnicos exatos e definimos o escopo.' },
        { title: '2. Desenho da Arquitetura', desc: 'Eu projeto a infraestrutura blindada, feita sob medida para o seu tamanho hoje e seu crescimento amanhã.' },
        { title: '3. Implementação Tática', desc: 'Execução impecável do escopo aprovado sem derrubar ou paralisar sua operação atual.' },
        { title: '4. Entrega e Estabilidade', desc: 'Você recebe um sistema 100% operante, documentado e resiliente.' }
      ]
    },
    why: {
      title: 'Por que escopos fechados?',
      text: 'Cobrança por hora pune a eficiência e cria custos surpresa. Eu cobro pelo valor gerado e pelo resultado entregue. Você sabe exatamente o que vai receber, quando vai receber e quanto custa antes de começarmos. Sem dor de cabeça com orçamento estourado.'
    },
    faq: {
      title: 'Dúvidas sobre os Pacotes',
      items: [
        { q: 'Como funciona o pagamento?', a: 'Para projetos de escopo fixo, 50% é faturado no início para reservar sua vaga, e os 50% finais apenas na entrega de sucesso.' },
        { q: 'E se minha empresa não se encaixar em nenhum pacote?', a: 'Estes pacotes são bases confiáveis. Todo novo cliente passa por uma chamada de descoberta gratuita onde ajustamos perfeitamente o entregável à realidade da sua empresa.' },
        { q: 'Qual seu horário de trabalho?', a: 'Trabalho no fuso UTC-3. Meu foco é 100% assíncrono e pautado em processos documentados, para que nossos projetos não dependam de reuniões exaustivas.' }
      ]
    }
  },
  cases: {
    title: 'Estudos de Caso',
    subtitle: 'Problemas reais de negócio resolvidos com engenharia de precisão.',
    items: [
      {
        id: 'qelox',
        clientType: 'Operação de Blockchain',
        problem: 'O cliente perdia dinheiro e noites de sono devido a nós de blockchain que travavam de madrugada, exigindo reinícios manuais lentos.',
        solution: 'Construí o QELO-X, um daemon (serviço de base) que monitora a saúde dos nós em tempo real e os reconstrói/reinicia automaticamente sem intervenção.',
        result: 'Downtime reduzido de horas para menos de 3 segundos por travamento. Eliminada a necessidade de equipe monitorando 24 horas por dia.',
        linkText: 'Leia a documentação técnica',
        linkUrl: '/docs'
      }
    ]
  },
  faq: {
    sectionTag: 'FAQ',
    title: 'Perguntas Frequentes',
    items: [
      {
        q: "Eu já tenho um desenvolvedor frontend/backend. Por que preciso de um especialista em infraestrutura?",
        a: "Desenvolvedores criam as funcionalidades do seu app; o especialista em infraestrutura garante que elas continuem no ar sem engasgar no meio de um lançamento. Seu time não deveria gastar 20% do tempo brigando com configurações de servidor da AWS ou pipeline que falhou. Eu assumo a operação pra que sua equipe foque no produto."
      },
      {
        q: "Você oferece suporte depois de entregar o projeto?",
        a: "Sim. Em projetos de Setup Inicial e Auditoria, há uma janela de 14 dias para ajustes. Para estabilidade a longo prazo, ofereço meu plano de Manutenção Mensal pra gerenciar os servidores ativamente."
      },
      {
        q: "Minha empresa não é muito pequena para precisar cuidar de infraestrutura de servidor?",
        a: "Se toda vez que o seu sistema sai do ar você perde dinheiro, credibilidade ou um lead quente, você já precisa de infraestrutura robusta. Eu monto uma base que funciona para o seu tamanho hoje, mas desenhada pra escalar amanhã sem precisar refazer tudo do zero."
      }
    ]
  },
  philosophy: {
    sectionTag: '06 — Principios de Engenharia',
    titlePrefix: 'Como eu tomo',
    titleEmphasis: 'decisoes de producao.',
    quote: 'Se o sistema nao e legivel sob pressao, ele nao esta pronto.',
    quoteAttr: 'Zeus',
    items: [
      {
        n: '01',
        title: 'Estabilidade em primeiro lugar',
        text: 'Sistemas de producao precisam falhar de forma visivel, se recuperar rapido e permanecer contidos quando isso acontecer.',
      },
      {
        n: '02',
        title: 'Eficiência sem desperdicio',
        text: 'Use o menor conjunto confiavel de componentes que resolva o problema sem adicionar ruido.',
      },
      {
        n: '03',
        title: 'Engenharia orientada a resultado',
        text: 'Se nao melhora confiabilidade, velocidade ou clareza, nao entra em producao.',
      },
    ],
  },
  status: {
    sectionTag: '07 — Status do Sistema',
    titlePrefix: 'Metricas ao vivo',
    titleEmphasis: 'e saude dos servicos.',
    topbarUnavailable: 'Plano de controle indisponivel',
    topbarLive: 'Telemetria ao vivo · atualiza a cada 15s',
    topbarSimulated: 'Telemetria simulada · atualiza a cada 15s',
    updated: 'Atualizado',
    refresh: 'Atualizar',
    errorTitle: 'Nao foi possivel acessar o backend',
    errorHintBeforeCode: 'Faça deploy do backend em Go - veja',
    errorHintAfterCode: '.',
    hostMetrics: 'Metricas do host',
    systemServices: 'Servicos do sistema',
    siteServices: 'Servicos do site',
    metricLabels: {
      cpu: 'Uso de CPU',
      memory: 'Memoria',
      disk: 'Disco',
      load: 'Media de carga',
      region: 'Regiao',
      uptime: 'Tempo ativo',
    },
    badgeLabels: {
      running: 'online',
      stopped: 'offline',
      maintenance: 'manutenção',
      unknown: 'desconhecido',
    },
    simPill: 'sim',
  },
  aiChat: {
    storageKey: 'zeus-protocol-chat-history',
    legacyWelcome:
      /assistente da Zeus Protocol|assistente da Zeus|Posso te ajudar com site, automacao|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, DevOps e infraestrutura\.|ZEUS AI online\. Send scope, stack, deadline and contact to start intake\./i,
    initialHistory: [
      {
        role: 'bot',
        text: 'ZEUS AI online. Envie escopo, stack, prazo e contato para iniciar a captacao.',
        meta: 'AO VIVO | CRM',
      },
    ],
    fallbackMessage:
      'ZEUS AI offline. Envie escopo, stack, prazo e contato e eu roteio assim que a conexao voltar.',
    terminalLabel: 'zeus-shell:~/ops',
    frameLabel: 'CANAL DEVOPS / HACKER',
    statusLabels: {
      idle: 'ESPERA',
      loading: 'ANALISANDO',
      online: 'AO VIVO',
      fallback: 'FALLBACK',
      error: 'ERRO',
    },
    titleLabel: 'ZEUS AI',
    inputPlaceholder: 'digite escopo, stack, prazo e contato',
    send: 'EXEC',
    sending: 'EXEC...',
    typing: 'analisando payload',
    authorUser: 'operador@cliente',
    authorBot: 'root@zeus',
    messageMeta: {
      userSent: 'Mensagem enviada',
      intent: 'Intencao',
      email: 'Email',
      phone: 'Telefone',
      leadSaved: 'Lead salvo',
      fallbackActive: 'Fallback ativo',
      replyDelivered: 'Resposta entregue',
      error: 'Erro no chat',
    },
    toggleOpen: 'Abrir chat ZEUS AI',
    toggleClose: 'Fechar chat ZEUS AI',
  },
  terminal: {
    storageKey: 'zeus-protocol-terminal-history',
    legacyWelcome:
      /assistente da Zeus Protocol|assistente da Zeus|Posso te ajudar com site, automacao|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, DevOps e infraestrutura\.|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, orcamentos e suporte comercial\.|ZEUS AI online\. Send scope, stack, deadline and contact to start intake\./i,
    initialHistory: [
      {
        role: 'bot',
        text: 'ZEUS AI online. Envie escopo, stack, prazo e contato para iniciar a captacao.',
        meta: 'AO VIVO | CRM',
      },
    ],
    fallbackMessage:
      'ZEUS AI offline. Envie escopo, stack, prazo e contato e eu roteio assim que a conexao voltar.',
    statusLabels: {
      idle: 'ESPERA',
      loading: 'ANALISANDO',
      online: 'AO VIVO',
      fallback: 'FALLBACK',
      error: 'ERRO',
    },
    kicker: '[ MODO DEVOPS / HACKER ]',
    title: 'Terminal ZEUS AI',
    lead:
      'Envie escopo, stack, prazo e contato. O shell qualifica o lead e encaminha o proximo passo.',
    chips: ['CAPTACAO ROOT', 'LOGS DA PIPELINE', 'ROTA WHATSAPP'],
    pipelineLabel: 'ESTADO DA PIPELINE',
    projectLabel: 'Projeto',
    deadlineLabel: 'Prazo',
    contactLabel: 'Contato',
    summaryLabel: 'RESUMO DO LEAD',
    quickCommandsLabel: 'COMANDOS RAPIDOS',
    routingLabel: 'ROTEAMENTO',
    routingNote:
      'Se voce ja tiver escopo, orcamento e contato, eu posso encaminhar o lead para WhatsApp ou email. Se preferir WhatsApp, envie o numero aqui e continuo por la.',
    openContact: 'ABRIR CONTATO',
    returnToSite: 'VOLTAR AO SITE',
    inputPlaceholder: 'digite escopo, stack, prazo e contato',
    send: 'EXEC',
    sending: 'EXEC...',
    typing: 'indexando requisicao',
    authorUser: 'operador@cliente',
    authorBot: 'root@zeus',
    messageMeta: {
      userSent: 'Mensagem enviada',
      intent: 'Intencao',
      email: 'Email',
      phone: 'Telefone',
      leadSaved: 'Lead salvo',
      fallbackActive: 'Fallback ativo',
      replyDelivered: 'Resposta entregue',
      error: 'Erro no chat',
    },
    stages: {
      discovery: 'DESCOBERTA',
      qualifying: 'QUALIFICANDO',
      ready: 'PRONTO PARA ENCAMINHAR',
    },
    quickPrompts: [
      { label: 'NOVO SITE', text: 'Preciso de um projeto de site.' },
      { label: 'SISTEMA', text: 'Preciso de um sistema sob medida.' },
      { label: 'AUTOMACAO', text: 'Quero automatizar um processo interno.' },
      { label: 'ORCAMENTO', text: 'Quero um orcamento para este projeto.' },
      { label: 'WHATSAPP', text: 'Se fizer sentido, podemos continuar no WhatsApp.' },
    ],
  },
  maintenance: {
    status: '[ STATUS: MANUTENCAO ]',
    kicker: 'ZEUS // ACESSO AO QELO-X PAUSADO',
    title: 'Manutencao do Sistema',
    message:
      'Atualizacoes programadas estao em andamento. O acesso ao QELO-X esta pausado enquanto o ambiente e estabilizado, reforcado e preparado para o proximo ciclo de entrega.',
    highlights: ['Hardening', 'Ajuste de runtime', 'Preparacao de release'],
    footer: ['CORE_ENGINE: GO_1.22', 'UI_LAYER: REACT_VITE', 'STATUS: ESTABILIZANDO'],
  },
  checkout: {
    closeAria: 'Fechar checkout',
    brandRowLabel: 'Canal de captacao do checkout',
    tag: 'Checkout do operador',
    subtitle: 'Fluxo guiado de pagamento para acesso do operador com suporte a PIX e USDT.',
    chips: ['Entrega de acesso por email', 'Suporte a PIX e cripto', 'Checkout de captacao do operador'],
    highlightsLabel: 'Destaques do checkout',
    currentAccess: 'Acesso atual',
    releaseAccess: 'Acesso de unica release',
    stepLabels: ['Identificacao', 'Metodo', 'Pagamento'],
    step01:
      'Informe o contato de entrega para que o acesso e o acompanhamento do pagamento caiam na caixa de entrada correta.',
    step02: 'Selecione a forma de pagamento que deseja usar para este pedido.',
    step03:
      'Use o QR code ou o campo de copia abaixo para concluir o pagamento e manter o pedido ativo dentro da janela de tempo.',
    usedForAccess: 'Usado para entrega do acesso',
    usedForFollowUp: 'Usado para acompanhamento do pagamento',
    buyer: 'Comprador',
    delivery: 'Entrega',
    selectMethod: 'Selecione o metodo de pagamento',
    pix: {
      name: 'Pix',
      desc: 'Pagamento instantaneo com confirmacao automatica.',
      banner: 'Transferencia instantanea Pix',
      label: 'PIX Copiar e Colar',
      method: 'PIX',
      status: 'Aguardando pagamento via PIX',
      scan: 'Escaneie para pagar',
      copyFeedback: 'Codigo PIX copiado',
      help: 'Se a leitura falhar, use o campo de copiar e colar.',
      hint: 'A confirmacao do PIX e tratada automaticamente apos a transferencia.',
    },
    crypto: {
      name: 'USDT (Polygon)',
      desc: 'Pagamento em cripto para operadores que preferem transferencia on-chain.',
      banner: 'USDT na Polygon',
      label: 'Endereco USDT Polygon',
      method: 'CRYPTO',
      status: 'Aguardando transferencia para a carteira',
      scan: 'Escaneie para abrir a carteira',
      copyFeedback: 'Endereco da carteira copiado',
      help: 'Se sua carteira nao ler QR codes, copie o endereco diretamente.',
      hint: (supportEmail) => `Depois de enviar o USDT, encaminhe o hash da transacao para ${supportEmail}.`,
    },
    paymentWindow: 'Janela de pagamento',
    selectedRail: 'Canal selecionado',
    accessSummary: 'Resumo do acesso',
    product: 'Produto',
    copy: 'Copiar',
    instructions: 'Instrucoes',
    finalizeEmail: 'Finalizar email de entrega',
    confirmationCopy:
      (email) => `Depois de concluir a transferencia, confirme abaixo para enviar o email de entrega com o link de acesso do QELO-X para ${email}.`,
    confirmButton: 'Conclui o pagamento',
    sendingEmail: 'Enviando email de entrega...',
    deliverySuccess: 'Email de entrega enviado com o link de acesso do QELO-X.',
    deliveryError: 'Falha ao enviar o email de entrega.',
    configurationPending: 'Configuracao pendente',
    sectionFooter: 'Superficie de checkout segura para o fluxo de acesso do operador',
    changeMethod: 'Trocar metodo',
    continue: 'Continuar para o metodo de pagamento',
    fullName: 'Nome completo',
    deliveryEmail: 'Email de entrega',
    placeholders: {
      name: 'Ex: Joao Silva',
      email: 'exemplo@email.com',
    },
    stepNumbers: ['Etapa 01', 'Etapa 02', 'Etapa 03'],
  },
  quelox: {
    kicker: 'Produto de infraestrutura — Operacao de nos blockchain',
    title: 'QELO-X',
    subtitle: 'Orquestracao, monitoramento e recuperacao para infraestrutura blockchain.',
    lead:
      'QELO-X e uma camada de operacao de nos para infraestrutura blockchain. Foi construido para supervisionar servicos, monitorar a saude do runtime, recuperar falhas comuns e manter o controle local ao host.',
    highlights: [
      'Plano de controle local-first',
      'Telemetria continua dos nos',
      'Rotinas de recuperacao para incidentes em producao',
    ],
    highlightsLabel: 'Destaques do QELO-X',
    stats: [
      { label: 'Alvo', value: 'Infraestrutura critica de nos' },
      { label: 'Modelo', value: 'Daemon + IPC + monitoramento' },
      { label: 'Ambiente', value: 'Linux / systemd / hosts de producao' },
    ],
    requestAccess: 'Solicitar acesso',
    viewArchitecture: 'Ver arquitetura',
    currentAccess: 'Acesso atual',
    accessCopy: 'Acesso de unica release para o ciclo atual.',
    productRole: {
      tag: '01 — Papel do produto',
      title: 'Construido para nos que precisam de operacao estavel e telemetria clara.',
      intro:
        'O QELO-X fica entre o host, o processo do no e o fluxo do operador para que a visibilidade de runtime e a recuperacao facam parte do sistema, nao sejam um pensamento tardio.',
      pillars: [
        {
          label: 'Nucleo de orquestracao',
          text: 'Controla o ciclo de vida do no com politica de restart, execucao supervisionada e tratamento consistente de processos.',
        },
        {
          label: 'Telemetria do no',
          text: 'Expõe CPU, memoria, estado dos peers, progresso de sync e saude do runtime em uma unica visao operacional.',
        },
        {
          label: 'IPC seguro',
          text: 'Usa UNIX sockets para manter o controle local ao host e reduzir superfices de gerenciamento expostas.',
        },
      ],
    },
    architecture: {
      tag: '02 — Arquitetura',
      title: 'Um modelo de runtime projetado para operacoes de nos em Linux.',
      intro:
        'A arquitetura privilegia servicos supervisionados, integracao de host sem atrito e monitoramento que fala a lingua das operacoes reais de nos.',
      cards: [
        {
          title: 'Runtime em Go feito para operadores',
          text: 'Mantem o overhead do runtime baixo e torna o comportamento do daemon mais facil de operar em hosts Linux de producao.',
        },
        {
          title: 'Modelo de processo nativo do systemd',
          text: 'Roda como servico gerenciado com startup supervisionado, controle de restart, logs e integracao ao host.',
        },
        {
          title: 'Automacao consciente do no',
          text: 'Projetado para nos blockchain em que quantidade de peers, drift de sync e instabilidade do runtime afetam a disponibilidade.',
        },
        {
          title: 'Monitoramento orientado a infraestrutura',
          text: 'Expõe problemas operacionais cedo para que sejam tratados antes de virarem downtime ou dessincronizacao.',
        },
      ],
    },
    workflow: {
      tag: '03 — Fluxo',
      title: 'Como o QELO-X se encaixa no ciclo de vida do no.',
      intro:
        'O produto foi pensado para entrar rapidamente na rotina do operador, com um caminho curto entre deploy, visibilidade e automacao de recuperacao.',
      steps: [
        'Implante o daemon em um host Linux endurecido.',
        'Conecte o QELO-X ao no alvo e ao seu limite de IPC.',
        'Acompanhe saude, estado de sync e metricas de runtime continuamente.',
        'Dispare a recuperacao antes que a degradacao operacional vire downtime.',
      ],
      diagramLabel: 'Caminho operacional',
      diagramRows: [
        '[systemd] -> [daemon QELO-X]',
        '[loop de metrica] -> [CPU | RAM | sync | peers]',
        '[IPC local] -> [controle do processo do no]',
        '[politica de recuperacao] -> [restart | estabilizar | alertar]',
      ],
    },
    comparison: {
      tag: '04 — Comparacao',
      title: 'O que muda em relacao ao gerenciamento manual de nos.',
      intro:
        'A diferenca e menos sobre adicionar outro painel e mais sobre transformar operacao de nos em uma superficie operacional repetivel.',
      headers: ['Area', 'Abordagem manual', 'QELO-X'],
      rows: [
        ['Controle de ciclo de vida', 'Scripts manuais e comandos avulsos', 'Supervisao centralizada do daemon'],
        ['Monitoramento', 'Reativo e fragmentado', 'Telemetria operacional continua'],
        ['Recuperacao', 'Exige intervencao humana', 'Restart automatizado e logica de recuperacao'],
        ['Superficie de seguranca', 'Mais caminhos expostos', 'IPC local e limites controlados'],
        ['Operacao do no', 'Dificil de padronizar', 'Fluxo repetivel do operador'],
      ],
    },
    access: {
      tag: '05 — Acesso',
      title: 'Um produto focado para operadores que precisam de controle confiavel de nos.',
      intro:
        'O QELO-X e indicado para operadores que querem uma forma repetivel de supervisionar nos blockchain sem depender de scripts avulsos e recuperacao manual.',
      priceLabel: 'Acesso da release atual',
      priceText: 'R$ 199,90',
      priceAnchor: 'R$ 297,00',
    },
    tui: {
      title: 'QELO-X TERMINAL v1.0.0',
      statusLabel: 'STATUS DO NO:',
      syncLabel: 'PROGRESSO DE SYNC:',
      peerLabel: 'CONTAGEM DE PEERS:',
      heightLabel: 'ALTURA DO BLOCO:',
      uptimeLabel: 'TEMPO ATIVO:',
      cpuLabel: 'CPU',
      ramLabel: 'RAM',
      footer: 'systemd: ativo (executando)',
      running: 'EXECUTANDO',
    },
  },
  notFound: {
    title: 'Página não encontrada',
    lead: 'A rota solicitada não existe ou mudou de endereço.',
    homeCta: 'Voltar para a home',
    packagesCta: 'Ver pacotes',
  },
  footer: {
    text: 'Sistemas / Automação / CRM',
  },
};

const esES = {
  ...enUS,
  seo: {
    title: 'ZeusProtocol.cloud | Sistemas, Automatizacion y CRM',
    description: 'Sistemas, automatizacion, nube e intake estilo CRM para proyectos listos para produccion.',
    ogTitle: 'ZeusProtocol.cloud | Sistemas, Automatizacion y CRM',
    ogDescription: 'Sistemas, automatizacion, nube e intake estilo CRM pensados para proyectos listos para produccion.',
    twitterTitle: 'ZeusProtocol.cloud | Sistemas, Automatizacion y CRM',
    twitterDescription: 'Sistemas, automatizacion, nube y captacion de leads para proyectos listos para produccion.',
  },
  nav: {
    items: ['about', 'projects', 'services', 'stack', 'contact'],
    itemsLabel: {
      about: 'sobre',
      projects: 'proyectos',
      services: 'servicios',
      stack: 'stack',
      contact: 'contacto',
    },
    docsItem: { id: 'docs', label: 'documentación', href: '/docs' },
    packagesItem: { id: 'packages', label: 'paquetes', href: '/packages' },
    casesItem: { id: 'cases', label: 'casos', href: '/cases' },
    online: 'en línea',
    toggleMenu: 'Abrir menu',
    menuLabel: 'Menu de navegacion',
    languageLabel: 'Idioma',
    languageOptions: [
      { code: 'es-ES', shortLabel: 'ES', label: 'Español' },
      { code: 'pt-BR', shortLabel: 'PT', label: 'Português' },
      { code: 'en-US', shortLabel: 'EN', label: 'English' },
    ],
  },
  hero: {
    brandKicker: 'NODO DE MARCA EN VIVO',
    brandNote: 'Zeus Protocol / sistemas, automatizacion y entrega en la nube',
    tag: 'ZEUS PROTOCOL // SISTEMAS, AUTOMATIZACION & CRM',
    headlinePrefix: 'Transforma operaciones caóticas',
    headlineAccent: 'en procesos predecibles y escalables,',
    headlineSuffix: 'sin caídas de servidor.',
    sub:
      '¿Atascado en cuellos de botella técnicos? Desarrollo integraciones de CRM y estabilizo tu backend para que tu empresa escale automáticamente, sin depender del trabajo manual.',
    snapshotHead: 'Resumen operacional',
    snapshotCopy:
      'Construido para calificar, enrutar y entregar con menos friccion, mientras la infraestructura se mantiene limpia y observable.',
    metrics: [
      { label: 'Foco principal', value: 'Flujo de leads + entrega' },
      { label: 'Modelo operacional', value: 'Terminal-first / Cloud' },
      { label: 'Herramientas', value: 'Go · Shell · Python' },
    ],
    signals: [
      {
        label: 'Captacion',
        text: 'Calificacion y enrutamiento de leads en la primera interaccion.',
      },
      {
        label: 'Automatizacion',
        text: 'Follow-up, traspaso y tareas operativas sin trabajo manual.',
      },
      {
        label: 'Entrega',
        text: 'Sistemas en la nube con monitoreo, despliegues y recuperacion bajo control.',
      },
    ],
    pillars: [
      {
        label: '01 / Captacion de Leads',
        title: 'Capturar pedidos con menos friccion.',
        text: 'Formularios, enrutamiento y calificacion que dejan obvio el siguiente paso.',
      },
      {
        label: '02 / Automatizacion',
        title: 'Convertir trabajo repetitivo en flujos.',
        text: 'Follow-ups, rutinas internas y automatizaciones de proceso para mantener a los equipos avanzando.',
      },
      {
        label: '03 / Infraestructura',
        title: 'Mantener la entrega observable y estable.',
        text: 'Servidores, despliegues, monitoreo y rutinas de recuperacion bajo control.',
      },
    ],
    actions: [
      { label: 'Enviar briefing', href: '#contact', variant: 'primary' },
      { label: 'Ver QELO-X', href: '/qelox', variant: 'secondary' },
    ],
  },
  about: {
    ...enUS.about,
    sectionTag: '01 — Sobre mi',
    titlePrefix: 'Sistemas,',
    titleEmphasis: 'Hechos para Funcionar de Verdad.',
    lede:
      'Trabajo donde se cruzan infraestructura, automatizacion y entrega de software. El foco es mantener los sistemas estables, visibles y mas faciles de operar — lo que significa menos sorpresas, menos tiempo apagando incendios y un equipo que puede concentrarse en entregar en vez de reaccionar.',
    scopeLabel: 'Con lo que trabajo',
    scopeText:
      'Administracion de servidores, redes, practicas de seguridad, entrega en la nube y herramientas de servidor para sistemas en produccion.',
    deliveryLabel: 'Como trabajo',
    deliveryText:
      'Diseño pensando en fallos, priorizo la visibilidad y automatizo las partes rutinarias — para que los equipos pasen menos tiempo reaccionando y mas tiempo construyendo.',
    tags: [
      'Linux',
      'Redes',
      'Infraestructura',
      'Seguridad',
      'Backend',
      'Automatizacion',
      'Blockchain',
      'Analisis de sistemas',
      'Produccion',
    ],
    panelKicker: 'Lo que obtienes',
    panelTitle: 'Menos ruido. Mas claridad. Mas control.',
    panelCopy:
      'El trabajo combina estabilidad de plataforma con automatizacion ligera, para que las decisiones tecnicas sigan siendo practicas y faciles de mantener con el tiempo.',
    stats: [
      { label: 'Sistema operativo principal', value: 'Linux', cyan: false },
      { label: 'Infraestructura', value: 'Servidores dedicados + Nube', cyan: false },
      { label: 'Lenguajes', value: 'Go · Shell · Python', cyan: true },
      { label: 'Seguridad', value: 'Hardening + Monitoreo', cyan: true },
      { label: 'Operaciones blockchain', value: 'Nodos + Monitoreo', cyan: false },
      { label: 'Enfoque', value: 'Estabilidad y confiabilidad', cyan: false },
      { label: 'Entrega', value: 'Listo para produccion', cyan: false },
      { label: 'Estado', value: 'Disponible', cyan: true },
    ],
  },
  expertise: {
    ...enUS.expertise,
    sectionTag: '02 — Matriz de capacidades',
    titlePrefix: 'Dominios operativos',
    titleEmphasis: 'en los que trabajo.',
    cards: [
      {
        num: '01 / INFRAESTRUCTURA',
        title: 'Operaciones de infraestructura',
        items: [
          'Administracion de Linux',
          'Orquestacion de servicios',
          'Supervision de procesos',
          'Entornos de produccion',
          'Ajuste de rendimiento',
        ],
      },
      {
        num: '02 / REDES',
        title: 'Operaciones de red',
        items: [
          'Fundamentos TCP/IP',
          'Conceptos de enrutamiento',
          'Conectividad de servidores',
          'Monitoreo y diagnostico',
          'Resolucion de problemas de red',
        ],
      },
      {
        num: '03 / ANALISIS',
        title: 'Analisis de sistemas',
        items: [
          'Levantamiento de requisitos',
          'Modelado de procesos',
          'Planificacion de arquitectura',
          'Documentacion tecnica',
        ],
      },
      {
        num: '04 / DESARROLLO',
        title: 'Desarrollo de sistemas',
        items: [
          'Desarrollo backend',
          'Herramientas CLI',
          'Servicios daemon',
          'Scripts de automatizacion',
          'Integracion de API',
        ],
      },
      {
        num: '05 / DEVOPS',
        title: 'Automatizacion y entrega',
        items: [
          'Configuracion de systemd',
          'Soluciones de monitoreo',
          'Pipelines de logs',
          'Hardening de infraestructura',
        ],
      },
    ],
    placeholder: 'Capacidades adicionales bajo pedido',
  },
  projects: {
    ...enUS.projects,
    sectionTag: '02 — Build activo',
    titlePrefix: 'Construccion actual',
    titleEmphasis: 'en desarrollo activo.',
    intro:
      'Una vista focalizada del build vivo, con la stack y el peso de entrega detras de cada capa del producto.',
    badge: 'NODE OPS / ACTIVO',
    brandNote: 'Caso vivo y superficie de entrega',
    comingSoon: 'PROXIMAMENTE',
    openCase: 'Abrir caso',
    maintenanceActive: 'MANTENIMIENTO ACTIVO',
    featured: {
      ...enUS.projects.featured,
      badge: 'NODE OPS / ACTIVO',
      desc:
        'Capa de operacion de nodos para infraestructura blockchain. Supervisa servicios, mantiene el control local, expone telemetria de runtime y automatiza la recuperacion en hosts Linux de produccion.',
      skills: [
        { name: 'Go', pct: 88, area: 'Runtime central' },
        { name: 'Linux', pct: 94, area: 'Entorno del host' },
        { name: 'systemd', pct: 91, area: 'Orquestacion de servicios' },
        { name: 'UNIX Sockets', pct: 86, area: 'Capa IPC' },
        { name: 'Tauri', pct: 72, area: 'Shell de escritorio' },
        { name: 'React', pct: 78, area: 'Superficie de UI' },
      ],
    },
  },
  stack: {
    ...enUS.stack,
    sectionTag: '03 — Superficie operacional',
    titlePrefix: 'Stack principal',
    titleEmphasis: 'para sistemas en produccion.',
    intro:
      'Herramientas compactas para sistemas, automatizacion y entrega. El conjunto sigue siendo practico: los lenguajes, runtimes y plataformas que realmente uso para publicar y mantener servicios observables.',
    carouselLabel: 'Navega por los modulos de la stack',
    prev: 'Pagina anterior de la stack',
    next: 'Pagina siguiente de la stack',
    goTo: (page) => `Ir a la pagina ${page} de la stack`,
    meta: 'Sistemas en vivo + GitHub',
    yearsSuffix: 'años',
    proficiencyLabel: (name) => `Proficiencia de ${name}`,
  },
  services: {
    ...enUS.services,
    sectionTag: '04 — Servicios',
    titlePrefix: 'Software y automatizacion',
    titleEmphasis: 'Servicios',
    subtitle: 'Entrega practica en software, automatizacion, nube e infraestructura blockchain.',
    items: [
      {
        title: 'Soporte tecnico',
        description: 'Diagnostico, mantenimiento, backups y recuperacion para tus sistemas — para que tu equipo no quede esperando cuando algo falla.',
        accent: 'green',
      },
      {
        title: 'Gestion de servidores',
        description: 'Configuracion de servidores Linux y Windows, automatizacion y monitoreo para una entrega estable — menos caidas, menos intervenciones manuales.',
        accent: 'cyan',
      },
      {
        title: 'Red y conectividad',
        description: 'Red local, firewall, VPN y diagnostico de conectividad — tu conexion se mantiene confiable y tus datos en el lugar correcto.',
        accent: 'green',
      },
      {
        title: 'Nube y publicacion',
        description: 'Configuracion en la nube, pipelines automaticos de publicacion, entrega en contenedores — publica mas rapido sin sacrificar estabilidad.',
        accent: 'cyan',
      },
      {
        title: 'Infraestructura blockchain',
        description: 'Configuracion de nodos blockchain, monitoreo en vivo y recuperacion automatica — los nodos se mantienen en linea y los incidentes se resuelven antes de convertirse en caidas.',
        accent: 'green',
      },
      {
        title: 'Software a medida',
        description: 'Sistemas de servidor, APIs, herramientas de escritorio y automatizaciones construidas para tu flujo — para que tu equipo deje de trabajar alrededor de la herramienta y la herramienta empiece a trabajar para ellos.',
        accent: 'cyan',
      },
    ],
    nodeLabel: (index) => `nodo de servicio ${index + 1}`,
  },
  contact: {
    ...enUS.contact,
    sectionTag: '05 — Captacion de leads',
    titlePrefix: 'Abre un lead.',
    titleEmphasis: 'Envía el briefing.',
    signalbarStatus: 'Captacion de leads activa',
    ctaLabel: 'Formulario de captacion',
    ctaEmail: 'Envía el alcance, bloqueos o el entorno que quieres mapear.',
    ctaDesc:
      'Cuéntame qué está roto, lento o atascado. Mapeo el entorno, estimo el esfuerzo y propongo el siguiente paso — sin idas y vueltas innecesarias.',
    highlights: ['Alcance', 'Bloqueos', 'Plazo', 'Contacto'],
    ariaHighlights: 'Que incluir en tu briefing',
    form: {
      name: 'Nombre',
      email: 'Email',
      company: 'Empresa',
      subject: 'Asunto',
      message: 'Mensaje',
    },
    send: 'Enviar briefing',
    sending: 'Enviando...',
    statusDefault: 'Los briefings se enrutan por el canal de captacion de ZEUS.',
    statusSuccess: 'Briefing enviado con exito. Seguiremos por email.',
    statusError: 'No se pudo enviar. Intenta de nuevo mas tarde.',
  },
  packages: {
    title: 'Servicios Empaquetados',
    subtitle: 'Alcance claro, precios fijos y resultados garantizados. Se acabaron las horas abiertas de consultoría.',
    items: [
      {
        id: 'infra-setup',
        name: 'Configuración de Infraestructura',
        description: 'Configuración completa de un entorno de servidor seguro y listo para producción a su medida.',
        price: 'A partir de $800',
        features: ['Hardening de Servidor Linux', 'Seguridad de Red & Firewall', 'Setup inicial Docker / Contenedores', 'Dashboard Básico de Monitoreo'],
      },
      {
        id: 'security-audit',
        name: 'Auditoría de Rendimiento',
        description: 'Un análisis profundo de sus sistemas actuales para encontrar cuellos de botella y riesgos que tumban el app.',
        price: 'A partir de $500',
        features: ['Revisión de Arquitectura Backend', 'Análisis de Queries SQL', 'Escaneo de Vulnerabilidades', 'Informe de Correcciones Práctico'],
        highlight: true,
      },
      {
        id: 'retainer',
        name: 'Mantenimiento Mensual',
        description: 'Mantenimiento proactivo, actualizaciones y recuperación para mantener la operación online 24/7.',
        price: 'Personalizado',
        features: ['Monitoreo de Uptime 24/7', 'Backups Diarios', 'Gestión de Seguridad', 'SLA de Soporte Prioritario'],
      }
    ],
    slotsAvailable: '2 lugares disponibles este mes',
    cta: '¿No sabes qué necesitas? Agenda una auditoría gratuita.',
    contactText: 'Hablar con Zeus',
    contactMessagePrefix: 'Hola, me interesa el paquete: ',
    auditContactText: 'Agendar auditoría gratuita',
    auditMessage: 'Hola, me gustaría una auditoría gratuita de infraestructura.',
    workflow: {
      title: 'Cómo Funciona',
      steps: [
        { title: '1. Diagnóstico Inicial', desc: 'Mapeamos los cuellos de botella técnicos para definir alcances fiables.' },
        { title: '2. Arquitectura de Sistemas', desc: 'Diseño sistemas resilientes escalables con tu crecimiento.' },
        { title: '3. Implementación', desc: 'Ejecución rigurosa sin disrumpir las operaciones actuales del negocio.' },
        { title: '4. Entrega y Estabilidad', desc: 'El cliente recibe herramientas en total funcionamiento con documentaciones probadas.' }
      ]
    },
    why: {
      title: '¿Por qué paquetes de precio fijo?',
      text: 'El cobro por horas es ineficiente y no predecible. Trabajo con valores y resultados concretos. Así cada inversor conoce previamente el qué, el cuándo y las tarifas. Jamás habrán gastos sorpresivos imprevistos.'
    },
    faq: {
      title: 'Preguntas Frecuentes de Precios',
      items: [
        { q: '¿Cómo son los pagos?', a: 'Para asegurar dedicación al 100%, solicito 50% al empezar el contrato y el respectivo 50% contra entrega de la solución.' },
        { q: '¿Hay un sistema para mi si estos paquetes no me sirven?', a: 'Totalmente. Éstos sirven como plantillas confiables, al evaluar el problema diseñaré un proyecto específico adaptado sin fricciones.' },
        { q: '¿Habrán demoras por los husos horarios?', a: 'Ninguna. Con sede UTC-3 dispongo amplio cruce con USA, ES y LATAM y mi formato primario de trabajo son las operaciones asíncronas libres de micro-gestión continua.' }
      ]
    }
  },
  cases: {
    title: 'Casos de Éxito',
    subtitle: 'Problemas reales de negocio resueltos con ingeniería de precisión.',
    items: [
      {
        id: 'qelox',
        clientType: 'Operación Blockchain',
        problem: 'El cliente perdía dinero debido a que los nodos caían en la madrugada y exigían reinicios manuales.',
        solution: 'Construí QELO-X, un demonio informático que monitorea la salud del nodo y ejecuta bash scripts automáticamente para revitalizar el sistema.',
        result: 'Se redujo el downtime (tiempo de inactividad) de horas a menos de 3 segundos por caída. Cero intervención humana.',
        linkText: 'Leer documentación',
        linkUrl: '/docs'
      }
    ]
  },
  faq: {
    sectionTag: 'FAQ',
    title: 'Preguntas Frecuentes',
    items: [
      {
        q: "Ya tengo desenvolvedores. ¿Por qué necesito un experto en infraestructura?",
        a: "Los desarrolladores arman el producto; infraestructura asegura de que se quede en el aire durante picos de tránsito. Si su equipo gasta 20% del día resolviendo problemas de AWS, yo les libero el camino para programar más."
      },
      {
        q: "¿Dejas soporte tras acabar el setup inicial?",
        a: "Claro. Setup Inicial incluye soporte de 14 días. Para un acompañamiento estable a largo plazo, propongo un contrato de Mantenimiento Mensual."
      },
      {
        q: "¿Es mi negocio muy pequeño para infraestructura dedicada?",
        a: "Si cualquier caída le cuesta ventas o clientes frustrados, entonces necesita estabilidad. No hace falta un sistema Enterprise desde el día 1, armo la arquitectura exacta para resistir su base actual con la habilidad de escalar luego."
      }
    ]
  },
  philosophy: {
    ...enUS.philosophy,
    sectionTag: '06 — Principios de ingenieria',
    titlePrefix: 'Como tomo',
    titleEmphasis: 'decisiones de produccion.',
    quote: 'Si el sistema no es legible bajo presion, no esta listo.',
    items: [
      {
        n: '01',
        title: 'La estabilidad primero',
        text: 'Los sistemas de produccion deben fallar de forma visible, recuperarse rapido y permanecer acotados cuando eso pase.',
      },
      {
        n: '02',
        title: 'Eficiencia sin desperdicio',
        text: 'Usa el conjunto mas pequeno y confiable de componentes que resuelva el problema sin agregar ruido.',
      },
      {
        n: '03',
        title: 'Ingenieria orientada a resultados',
        text: 'Si no mejora confiabilidad, velocidad o claridad, no entra en produccion.',
      },
    ],
  },
  status: {
    ...enUS.status,
    sectionTag: '07 — Estado del sistema',
    titlePrefix: 'Metricas en vivo',
    titleEmphasis: 'y salud del servicio.',
    topbarUnavailable: 'Plano de control no disponible',
    topbarLive: 'Telemetria en vivo · refresca cada 15s',
    topbarSimulated: 'Telemetria simulada · refresca cada 15s',
    updated: 'Actualizado',
    refresh: 'Actualizar',
    errorTitle: 'No se pudo acceder al backend',
    errorHintBeforeCode: 'Despliega el backend en Go - ver',
    errorHintAfterCode: '.',
    hostMetrics: 'Metricas del host',
    systemServices: 'Servicios del sistema',
    siteServices: 'Servicios del sitio',
    metricLabels: {
      cpu: 'Uso de CPU',
      memory: 'Memoria',
      disk: 'Disco',
      load: 'Promedio de carga',
      region: 'Región',
      uptime: 'Tiempo activo',
    },
    badgeLabels: {
      running: 'en línea',
      stopped: 'fuera de línea',
      maintenance: 'mantenimiento',
      unknown: 'desconocido',
    },
    simPill: 'sim',
  },
  aiChat: {
    ...enUS.aiChat,
    legacyWelcome:
      /assistente da Zeus Protocol|assistente da Zeus|Posso te ajudar com site, automacao|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, DevOps e infraestrutura\.|ZEUS AI online\. Send scope, stack, deadline and contact to start intake\.|ZEUS AI en linea\.|ZEUS AI en línea\. Envía alcance, stack, plazo y contacto para iniciar la captación\./i,
    initialHistory: [
      {
        role: 'bot',
        text: 'ZEUS AI en línea. Envía alcance, stack, plazo y contacto para iniciar la captación.',
        meta: 'EN VIVO | CRM',
      },
    ],
    fallbackMessage:
      'ZEUS AI está offline. Envía alcance, stack, plazo y contacto y yo lo enrutaré cuando vuelva la conexión.',
    terminalLabel: 'zeus-shell:~/ops',
    frameLabel: 'CANAL DEVOPS / HACKER',
    statusLabels: {
      idle: 'ESPERA',
      loading: 'ANALIZANDO',
      online: 'EN VIVO',
      fallback: 'FALLBACK',
      error: 'ERROR',
    },
    inputPlaceholder: 'escribe alcance, stack, plazo y contacto',
    send: 'EJEC',
    sending: 'EJEC...',
    typing: 'analizando payload',
    authorUser: 'operador@cliente',
    authorBot: 'root@zeus',
    messageMeta: {
      userSent: 'Mensaje enviado',
      intent: 'Intencion',
      email: 'Email',
      phone: 'Telefono',
      leadSaved: 'Lead guardado',
      fallbackActive: 'Fallback activo',
      replyDelivered: 'Respuesta enviada',
      error: 'Error del chat',
    },
    toggleOpen: 'Abrir chat ZEUS AI',
    toggleClose: 'Cerrar chat ZEUS AI',
  },
  terminal: {
    ...enUS.terminal,
    legacyWelcome:
      /assistente da Zeus Protocol|assistente da Zeus|Posso te ajudar com site, automacao|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, DevOps e infraestrutura\.|Sou o ZEUS AI\. Posso te ajudar com sistemas, automacoes, orcamentos e suporte comercial\.|ZEUS AI online\. Send scope, stack, deadline and contact to start intake\.|ZEUS AI en linea\.|ZEUS AI en línea\. Envía alcance, stack, plazo y contacto para iniciar la captación\./i,
    initialHistory: [
      {
        role: 'bot',
        text: 'ZEUS AI en línea. Envía alcance, stack, plazo y contacto para iniciar la captación.',
        meta: 'EN VIVO | CRM',
      },
    ],
    fallbackMessage:
      'ZEUS AI está offline. Envía alcance, stack, plazo y contacto y yo lo enrutaré cuando vuelva la conexión.',
    statusLabels: {
      idle: 'ESPERA',
      loading: 'ANALIZANDO',
      online: 'EN VIVO',
      fallback: 'FALLBACK',
      error: 'ERROR',
    },
    kicker: '[ MODO DEVOPS / HACKER ]',
    title: 'Terminal ZEUS AI',
    lead:
      'Envía alcance, stack, plazo y contacto. El shell califica el lead y encamina el siguiente paso.',
    chips: ['CAPTACION ROOT', 'LOGS DE PIPELINE', 'RUTA WHATSAPP'],
    pipelineLabel: 'ESTADO DE PIPELINE',
    projectLabel: 'Proyecto',
    deadlineLabel: 'Plazo',
    contactLabel: 'Contacto',
    summaryLabel: 'RESUMEN DEL LEAD',
    quickCommandsLabel: 'COMANDOS RAPIDOS',
    routingLabel: 'RUTEO',
    routingNote:
      'Si ya tienes alcance, presupuesto y contacto, puedo enrutar el lead a WhatsApp o email. Si prefieres WhatsApp, envia el numero aqui y continuo por alla.',
    openContact: 'ABRIR CONTACTO',
    returnToSite: 'VOLVER AL SITIO',
    inputPlaceholder: 'escribe alcance, stack, plazo y contacto',
    send: 'EJEC',
    sending: 'EJEC...',
    typing: 'indexando solicitud',
    authorUser: 'operador@cliente',
    authorBot: 'root@zeus',
    messageMeta: {
      userSent: 'Mensaje enviado',
      intent: 'Intencion',
      email: 'Email',
      phone: 'Telefono',
      leadSaved: 'Lead guardado',
      fallbackActive: 'Fallback activo',
      replyDelivered: 'Respuesta enviada',
      error: 'Error del chat',
    },
    stages: {
      discovery: 'DESCUBRIMIENTO',
      qualifying: 'CALIFICANDO',
      ready: 'LISTO PARA ENRUTAR',
    },
    quickPrompts: [
      { label: 'NUEVO SITIO', text: 'Necesito un proyecto de sitio web.' },
      { label: 'SISTEMA', text: 'Necesito un sistema a medida.' },
      { label: 'AUTOMATIZACION', text: 'Quiero automatizar un proceso interno.' },
      { label: 'PRESUPUESTO', text: 'Quiero un presupuesto para este proyecto.' },
      { label: 'WHATSAPP', text: 'Si tiene sentido, podemos continuar por WhatsApp.' },
    ],
  },
  maintenance: {
    ...enUS.maintenance,
    status: '[ ESTADO: MANTENIMIENTO ]',
    kicker: 'ZEUS // ACCESO A QELO-X PAUSADO',
    title: 'Mantenimiento del sistema',
    message:
      'Las actualizaciones programadas estan en curso. El acceso a QELO-X esta pausado mientras el entorno se estabiliza, se endurece y se prepara para el siguiente ciclo de entrega.',
    highlights: ['Hardening', 'Ajuste de runtime', 'Preparacion de release'],
    footer: ['CORE_ENGINE: GO_1.22', 'UI_LAYER: REACT_VITE', 'STATUS: ESTABILIZANDO'],
  },
  checkout: {
    ...enUS.checkout,
    closeAria: 'Cerrar checkout',
    brandRowLabel: 'Canal de captacion del checkout',
    tag: 'Checkout del operador',
    subtitle: 'Flujo guiado de pago para acceso del operador con soporte para PIX y USDT.',
    chips: ['Entrega de acceso por email', 'Soporte para PIX y cripto', 'Checkout de captacion del operador'],
    highlightsLabel: 'Destacados del checkout',
    currentAccess: 'Acceso actual',
    releaseAccess: 'Acceso de una sola release',
    stepLabels: ['Identificacion', 'Metodo', 'Pago'],
    step01:
      'Ingresa el contacto de entrega para que el acceso y el seguimiento del pago lleguen al buzón correcto.',
    step02: 'Selecciona el medio de pago que quieres usar para este pedido.',
    step03:
      'Usa el QR o el campo de copia abajo para completar el pago y mantener el pedido activo dentro de la ventana de tiempo.',
    usedForAccess: 'Usado para entrega de acceso',
    usedForFollowUp: 'Usado para seguimiento del pago',
    buyer: 'Comprador',
    delivery: 'Entrega',
    selectMethod: 'Selecciona el metodo de pago',
    pix: {
      name: 'Pix',
      desc: 'Pago instantaneo con confirmacion automatica.',
      banner: 'Transferencia instantanea Pix',
      label: 'PIX copiar y pegar',
      method: 'PIX',
      status: 'Esperando pago via PIX',
      scan: 'Escanea para pagar',
      copyFeedback: 'Codigo PIX copiado',
      help: 'Si el escaneo falla, usa el campo de copiar y pegar.',
      hint: 'La confirmacion de PIX se maneja automaticamente tras la transferencia.',
    },
    crypto: {
      name: 'USDT (Polygon)',
      desc: 'Pago cripto para operadores que prefieren transferencia on-chain.',
      banner: 'USDT en Polygon',
      label: 'Direccion USDT Polygon',
      method: 'CRIPTO',
      status: 'Esperando transferencia a la cartera',
      scan: 'Escanea para abrir la cartera',
      copyFeedback: 'Direccion de la cartera copiada',
      help: 'Si tu cartera no lee QR, copia la direccion directamente.',
      hint: (supportEmail) => `Despues de enviar USDT, reenvia el hash de la transaccion a ${supportEmail}.`,
    },
    paymentWindow: 'Ventana de pago',
    selectedRail: 'Canal seleccionado',
    accessSummary: 'Resumen de acceso',
    product: 'Producto',
    copy: 'Copiar',
    instructions: 'Instrucciones',
    finalizeEmail: 'Finalizar email de entrega',
    confirmationCopy:
      (email) => `Despues de completar la transferencia, confirma abajo para enviar el email de entrega con el enlace de acceso de QELO-X a ${email}.`,
    confirmButton: 'Complete el pago',
    sendingEmail: 'Enviando email de entrega...',
    deliverySuccess: 'Email de entrega enviado con el enlace de acceso de QELO-X.',
    deliveryError: 'No se pudo enviar el email de entrega.',
    configurationPending: 'Configuracion pendiente',
    sectionFooter: 'Superficie de checkout segura para el flujo de acceso del operador',
    changeMethod: 'Cambiar metodo',
    continue: 'Continuar al metodo de pago',
    fullName: 'Nombre completo',
    deliveryEmail: 'Email de entrega',
    placeholders: {
      name: 'Ej: Juan Silva',
      email: 'ejemplo@email.com',
    },
    stepNumbers: ['Paso 01', 'Paso 02', 'Paso 03'],
  },
  quelox: {
    ...enUS.quelox,
    kicker: 'Producto de infraestructura — Operacion de nodos blockchain',
    title: 'QELO-X',
    subtitle: 'Orquestacion, monitoreo y recuperacion para infraestructura blockchain.',
    lead:
      'QELO-X es una capa de operacion de nodos para infraestructura blockchain. Fue construida para supervisar servicios, monitorear la salud del runtime, recuperar fallos comunes y mantener el control local al host.',
    highlights: [
      'Plano de control local-first',
      'Telemetria continua de nodos',
      'Rutinas de recuperacion para incidentes en produccion',
    ],
    highlightsLabel: 'Destacados de QELO-X',
    stats: [
      { label: 'Objetivo', value: 'Infraestructura critica de nodos' },
      { label: 'Modelo', value: 'Daemon + IPC + monitoreo' },
      { label: 'Entorno', value: 'Linux / systemd / hosts de produccion' },
    ],
    requestAccess: 'Solicitar acceso',
    viewArchitecture: 'Ver arquitectura',
    currentAccess: 'Acceso actual',
    accessCopy: 'Acceso de una sola release para el ciclo actual.',
    productRole: {
      ...enUS.quelox.productRole,
      tag: '01 — Rol del producto',
      title: 'Construido para nodos que necesitan operacion estable y telemetria clara.',
      intro:
        'QELO-X se ubica entre el host, el proceso del nodo y el flujo del operador para que la visibilidad del runtime y la recuperacion formen parte del sistema, no sean una ocurrencia tardia.',
      pillars: [
        {
          label: 'Nucleo de orquestacion',
          text: 'Controla el ciclo de vida del nodo con politica de restart, ejecucion supervisada y manejo consistente de procesos.',
        },
        {
          label: 'Telemetria del nodo',
          text: 'Expone CPU, memoria, estado de peers, progreso de sync y salud del runtime en una sola vista operacional.',
        },
        {
          label: 'IPC seguro',
          text: 'Usa UNIX sockets para mantener el control local al host y reducir superficies de gestion expuestas.',
        },
      ],
    },
    architecture: {
      ...enUS.quelox.architecture,
      tag: '02 — Arquitectura',
      title: 'Un modelo de runtime diseñado para operaciones de nodos en Linux.',
      intro:
        'La arquitectura favorece servicios supervisados, integracion de host sin friccion y monitoreo que habla el lenguaje de las operaciones reales de nodos.',
      cards: [
        {
          title: 'Runtime en Go hecho para operadores',
          text: 'Mantiene bajo el overhead del runtime y hace que el comportamiento del daemon sea mas facil de operar en hosts Linux de produccion.',
        },
        {
          title: 'Modelo de proceso nativo de systemd',
          text: 'Corre como servicio administrado con arranque supervisado, control de restart, logs e integracion al host.',
        },
        {
          title: 'Automatizacion consciente del nodo',
          text: 'Diseñado para nodos blockchain donde el numero de peers, el drift de sync y la inestabilidad del runtime afectan la disponibilidad.',
        },
        {
          title: 'Monitoreo orientado a infraestructura',
          text: 'Expone problemas operacionales temprano para que se traten antes de convertirse en downtime o desincronizacion.',
        },
      ],
    },
    workflow: {
      ...enUS.quelox.workflow,
      tag: '03 — Flujo',
      title: 'Como QELO-X encaja en el ciclo de vida del nodo.',
      intro:
        'El producto esta pensado para encajar rapido en la rutina del operador, con un camino corto entre despliegue, visibilidad y automatizacion de recuperacion.',
      steps: [
        'Despliega el daemon en un host Linux endurecido.',
        'Conecta QELO-X al nodo objetivo y a su limite de IPC.',
        'Monitorea salud, estado de sync y metricas de runtime continuamente.',
        'Dispara la recuperacion antes de que la degradacion operacional se convierta en downtime.',
      ],
      diagramLabel: 'Camino operacional',
      diagramRows: [
        '[systemd] -> [daemon QELO-X]',
        '[bucle de metricas] -> [CPU | RAM | sync | peers]',
        '[IPC local] -> [control del proceso del nodo]',
        '[politica de recuperacion] -> [restart | estabilizar | alertar]',
      ],
    },
    comparison: {
      ...enUS.quelox.comparison,
      tag: '04 — Comparacion',
      title: 'Que cambia frente a la gestion manual de nodos.',
      intro:
        'La diferencia no es solo sumar otro panel, sino convertir la operacion de nodos en una superficie operacional repetible.',
      headers: ['Area', 'Enfoque manual', 'QELO-X'],
      rows: [
        ['Control de ciclo de vida', 'Scripts manuales y comandos sueltos', 'Supervision centralizada del daemon'],
        ['Monitoreo', 'Reactivo y fragmentado', 'Telemetria operacional continua'],
        ['Recuperacion', 'Requiere intervencion humana', 'Restart automatizado y logica de recuperacion'],
        ['Superficie de seguridad', 'Mas caminos expuestos', 'IPC local y limites controlados'],
        ['Operacion del nodo', 'Dificil de estandarizar', 'Flujo repetible del operador'],
      ],
    },
    access: {
      ...enUS.quelox.access,
      tag: '05 — Acceso',
      title: 'Un producto enfocado en operadores que necesitan control confiable de nodos.',
      intro:
        'QELO-X esta pensado para operadores que quieren una forma repetible de supervisar nodos blockchain sin depender de scripts sueltos y recuperacion manual.',
      priceLabel: 'Acceso de la release actual',
    },
    tui: {
      ...enUS.quelox.tui,
      title: 'QELO-X TERMINAL v1.0.0',
      statusLabel: 'ESTADO DEL NODO:',
      syncLabel: 'PROGRESO DE SYNC:',
      peerLabel: 'CANTIDAD DE PEERS:',
      heightLabel: 'ALTURA DEL BLOQUE:',
      uptimeLabel: 'TIEMPO ACTIVO:',
      footer: 'systemd: activo (ejecutando)',
      running: 'EJECUTANDO',
    },
  },
  notFound: {
    title: 'Página no encontrada',
    lead: 'La ruta solicitada no existe o se movió de dirección.',
    homeCta: 'Volver al inicio',
    packagesCta: 'Ver paquetes',
  },
  footer: {
    text: 'Sistemas / Automatizacion / CRM',
  },
};

const SITE_CONTENT = {
  'en-US': enUS,
  'pt-BR': ptBR,
  'es-ES': esES,
};

const SUPPORTED_LOCALES = Object.freeze(Object.keys(SITE_CONTENT));
const DEFAULT_LOCALE = 'en-US';

function normalizeLocale(locale) {
  if (!locale) {
    return DEFAULT_LOCALE;
  }

  const normalized = locale.toLowerCase();
  if (normalized.startsWith('pt')) {
    return 'pt-BR';
  }

  if (normalized.startsWith('en')) {
    return 'en-US';
  }

  if (normalized.startsWith('es')) {
    return 'es-ES';
  }

  return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

function detectBrowserLocale() {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const stored = window.localStorage.getItem('zeus-protocol-locale');
  if (stored) {
    return normalizeLocale(stored);
  }

  const navigatorLocale = window.navigator.language || window.navigator.languages?.[0];
  return normalizeLocale(navigatorLocale);
}

function getSiteContent(locale) {
  return SITE_CONTENT[normalizeLocale(locale)] || SITE_CONTENT[DEFAULT_LOCALE];
}

export {
  CONTACT_EMAIL,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  detectBrowserLocale,
  getSiteContent,
  normalizeLocale,
  SITE_CONTENT,
};
