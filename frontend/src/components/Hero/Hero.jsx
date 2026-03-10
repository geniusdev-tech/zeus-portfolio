import HeroPanel from './HeroPanel';
import './Hero.css';

const pillars = [
  {
    label: '01 / DevSecOps',
    title: 'Delivery pipelines with security and release control.',
    text: 'CI/CD, container builds, image scanning, deployment automation and operational observability.',
  },
  {
    label: '02 / Infrastructure',
    title: 'Server, network and service operations.',
    text: 'Linux administration, systemd services, VPN, routing, diagnostics and cloud environment support.',
  },
  {
    label: '03 / Blockchain Ops',
    title: 'Node operations and support tooling.',
    text: 'Node deployment, telemetry, orchestration and automation for blockchain infrastructure environments.',
  },
];

const metrics = [
  { label: 'Primary focus', value: 'Infra + Automation' },
  { label: 'Operational model', value: 'Bare-metal / Cloud' },
  { label: 'Tooling', value: 'Go · Shell · Python' },
];

export default function Hero() {
  return (
    <section className="z-hero-section">
      <div className="z-hero">
        <div className="z-hero__left">
          <div className="z-hero__tag">IT Infrastructure Specialist — DevSecOps, Networks and Blockchain Operations</div>

          <div className="z-hero__name">Zeus</div>

          <h1 className="z-hero__h1">
            Systems built for
            <span className="z-hero__h1-accent">stability, visibility</span>
            and secure operation.
          </h1>

          <p className="z-hero__sub">
            I build and operate infrastructure for companies that need stable servers,
            secure service delivery, reliable networking and clear operational control in
            production.
          </p>

          <div className="z-hero__cta">
            <a href="#services" className="z-btn z-btn-g">View Services →</a>
            <a href="#quote" className="z-btn z-btn-o">Request Quote</a>
          </div>

          <div className="z-hero__metrics">
            {metrics.map((item) => (
              <div className="z-hero__metric" key={item.label}>
                <span className="z-hero__metric-label">{item.label}</span>
                <span className="z-hero__metric-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="z-hero__right">
          <HeroPanel />
        </div>
      </div>

      <div className="z-hero__pillars">
        {pillars.map((pillar) => (
          <article className="z-hero__pillar" key={pillar.label}>
            <div className="z-hero__pillar-label">{pillar.label}</div>
            <h3 className="z-hero__pillar-title">{pillar.title}</h3>
            <p className="z-hero__pillar-text">{pillar.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
