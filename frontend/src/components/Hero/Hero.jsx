import BrandLogo from '../BrandLogo/BrandLogo';
import './Hero.css';

const pillars = [
  {
    label: '01 / Lead Intake',
    title: 'Capture requests with less friction.',
    text: 'Forms, routing and qualification that make the next step obvious.',
  },
  {
    label: '02 / Automation',
    title: 'Turn repetitive work into flows.',
    text: 'Follow-ups, internal routines and process automation that keep teams moving.',
  },
  {
    label: '03 / Infrastructure',
    title: 'Keep delivery observable and stable.',
    text: 'Servers, deploys, monitoring and recovery routines under control.',
  },
];

const metrics = [
  { label: 'Primary focus', value: 'Lead flow + delivery' },
  { label: 'Operational model', value: 'Terminal-first / Cloud' },
  { label: 'Tooling', value: 'Go · Shell · Python' },
];

const signals = [
  {
    label: 'Intake',
    text: 'Lead qualification and routing built into the first interaction.',
  },
  {
    label: 'Automation',
    text: 'Follow-up, handoff and operational tasks without manual churn.',
  },
  {
    label: 'Delivery',
    text: 'Cloud systems with monitoring, deploys and recovery under control.',
  },
];

export default function Hero() {
  return (
    <section className="z-hero-section">
      <div className="z-hero">
        <div className="z-hero__layout">
          <div className="z-hero__copy z-reveal">
            <div className="z-hero__copy-card">
              <div className="z-hero__brand-strip">
                <BrandLogo variant="mark" size="sm" className="z-hero__brand-mark" />
                <div className="z-hero__brand-text">
                  <span className="z-hero__brand-kicker">LIVE BRAND NODE</span>
                  <span className="z-hero__brand-note">
                    Zeus Protocol / systems, automation and cloud delivery
                  </span>
                </div>
              </div>

              <div className="z-hero__tag">ZEUS PROTOCOL // SYSTEMS, AUTOMATION & CRM</div>

              <div className="z-hero__lead-grid">
                <div className="z-hero__lead-copy">
                  <h1 className="z-hero__h1">
                    Systems built to
                    <span className="z-hero__h1-accent">qualify leads, automate work</span>
                    and stay stable in production.
                  </h1>

                  <p className="z-hero__sub">
                    I design software, automations and infrastructure with one flow: reduce manual
                    work, keep delivery predictable and move the right request to the next step fast.
                  </p>
                </div>

                <div className="z-hero__lead-side">
                  <div className="z-hero__lead-side-head">Operational snapshot</div>
                  <p className="z-hero__lead-side-copy">
                    Built to qualify, route and deliver with less friction, with the infrastructure
                    side kept clean and observable.
                  </p>

                  <div className="z-hero__metrics">
                    {metrics.map((item) => (
                      <div className="z-hero__metric" key={item.label}>
                        <span className="z-hero__metric-label">{item.label}</span>
                        <span className="z-hero__metric-value">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="z-hero__signals">
                    {signals.map((signal) => (
                      <div className="z-hero__signal" key={signal.label}>
                        <span className="z-hero__signal-label">{signal.label}</span>
                        <span className="z-hero__signal-text">{signal.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="z-hero__pillars">
          {pillars.map((pillar) => (
            <article className="z-hero__pillar" key={pillar.label}>
              <div className="z-hero__pillar-label">{pillar.label}</div>
              <h2 className="z-hero__pillar-title">{pillar.title}</h2>
              <p className="z-hero__pillar-text">{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
