import { useState } from 'react';
import { motion } from 'framer-motion';
import { Blocks, Cloud, Code, Network, Server, Wrench } from 'lucide-react';
import './ITServices.css';

const services = [
  {
    title: 'Technical Support',
    description:
      'Troubleshooting, system setup, malware removal, backups and IT support.',
    icon: Wrench,
    accent: 'green',
  },
  {
    title: 'System Administration',
    description:
      'Linux and Windows server management, automation and system monitoring.',
    icon: Server,
    accent: 'cyan',
  },
  {
    title: 'Networking & Infrastructure',
    description:
      'LAN configuration, firewall management, VPN setup and infrastructure diagnostics.',
    icon: Network,
    accent: 'green',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Cloud deployments, CI/CD pipelines, containerization and scalable systems.',
    icon: Cloud,
    accent: 'cyan',
  },
  {
    title: 'Blockchain Infrastructure',
    description:
      'Blockchain node deployment, monitoring, automation and infrastructure tools.',
    icon: Blocks,
    accent: 'green',
  },
  {
    title: 'Software Development',
    description:
      'Backend systems, APIs, desktop tools and automation platforms.',
    icon: Code,
    accent: 'cyan',
  },
];

function ServiceCard({ service, index }) {
  const [tiltStyle, setTiltStyle] = useState({});
  const Icon = service.icon;

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 16;
    const rotateX = (0.5 - py) * 14;

    setTiltStyle({
      transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`,
    });
  };

  const resetTilt = () => {
    setTiltStyle({
      transform: 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0px)',
    });
  };

  return (
    <motion.div
      className="z-itservices__card-shell z-reveal group"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      whileHover={{ scale: 1.012 }}
      whileTap={{ scale: 0.995 }}
      style={{ animationDelay: `${index * 0.35}s` }}
    >
      <div
        className={`z-itservices__card z-itservices__card--${service.accent}`}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        style={tiltStyle}
      >
        <div className="z-itservices__card-grid" />
        <div className="z-itservices__glow" />

        <motion.div
          className="z-itservices__icon-wrap"
          whileHover={{ rotate: 10, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18 }}
        >
          <Icon className="z-itservices__icon" strokeWidth={1.8} />
        </motion.div>

        <div className="z-itservices__card-copy">
          <h3 className="z-itservices__card-title">{service.title}</h3>
          <p className="z-itservices__card-desc">{service.description}</p>
        </div>

        <div className="z-itservices__meta">
          <span className="z-itservices__meta-line" />
          <span className="z-itservices__meta-label">service node {index + 1}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ITServices() {
  return (
    <section className="z-itservices z-full relative isolate" id="services">
      <div className="z-itservices__mesh" />
      <div className="z-itservices__grid" />

      <div className="z-itservices__particles pointer-events-none" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            className="z-itservices__particle"
            key={index}
            style={{
              left: `${(index * 19) % 100}%`,
              top: `${(index * 13) % 100}%`,
              animationDelay: `${index * 0.55}s`,
              animationDuration: `${7 + (index % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="z-section z-itservices__section relative">
        <motion.div
          className="z-sec-header z-reveal max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="z-sec-tag cyan">04 — Service Scope</div>
          <h2 className="z-sec-title cyan">
            IT Infrastructure &amp;<br />
            <em>Technology Services</em>
          </h2>
          <p className="z-itservices__subtitle">
            Focused support across systems, networks, cloud delivery and tooling, without
            padding the page with generic agency language.
          </p>
        </motion.div>

        <div className="z-itservices__cards relative">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
