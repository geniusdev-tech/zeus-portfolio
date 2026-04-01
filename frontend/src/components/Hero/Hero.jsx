import { Link } from 'react-router-dom';
import BrandLogo from '../BrandLogo/BrandLogo';
import { useI18n } from '../../i18n';
import useMagnetic from '../../hooks/useMagnetic';
import './Hero.css';

export default function Hero() {
  const { content } = useI18n();
  const { hero } = content;
  const actions = hero.actions || [
    { label: 'Send brief', href: '#contact', variant: 'primary' },
    { label: 'View QELO-X', href: '/qelox', variant: 'secondary' },
  ];

  function MagneticButton({ action }) {
    const { ref, style } = useMagnetic(0.15, 100);
    const className = `z-btn z-hero__action${action.variant === 'primary' ? ' z-btn-g' : ' z-btn-o'}`;

    if (action.href.startsWith('/')) {
      return (
        <Link ref={ref} to={action.href} className={className} style={style}>
          {action.label}
        </Link>
      );
    }

    return (
      <a ref={ref} href={action.href} className={className} style={style}>
        {action.label}
      </a>
    );
  }

  return (
    <section className="z-hero-section">
      <div className="z-hero">
        <div className="z-hero__layout">
          <div className="z-hero__copy z-reveal">
            <div className="z-hero__copy-card">
              <div className="z-hero__brand-strip">
                <BrandLogo variant="mark" size="sm" className="z-hero__brand-mark" />
                <div className="z-hero__brand-text">
                  <span className="z-hero__brand-kicker">{hero.brandKicker}</span>
                  <span className="z-hero__brand-note">{hero.brandNote}</span>
                </div>
              </div>

              <div className="z-hero__tag">{hero.tag}</div>

              <div className="z-hero__lead-grid">
                <div className="z-hero__lead-copy">
                  <h1 className="z-hero__h1">
                    {hero.headlinePrefix}
                    <br />
                    <span className="z-hero__h1-accent">{hero.headlineAccent}</span>{' '}
                    {hero.headlineSuffix}
                  </h1>

                  <p className="z-hero__sub">{hero.sub}</p>

                  <div className="z-hero__actions">
                    {actions.map((action) => (
                      <MagneticButton 
                        key={action.label} 
                        action={action} 
                      />
                    ))}
                  </div>
                </div>

                <div className="z-hero__lead-side">
                  <div className="z-hero__lead-side-head">{hero.snapshotHead}</div>
                  <p className="z-hero__lead-side-copy">{hero.snapshotCopy}</p>

                  <div className="z-hero__metrics">
                    {hero.metrics.map((item) => (
                      <div className="z-hero__metric" key={item.label}>
                        <span className="z-hero__metric-label">{item.label}</span>
                        <span className="z-hero__metric-value">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="z-hero__signals">
                    {hero.signals.map((signal) => (
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
          {hero.pillars.map((pillar) => (
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
