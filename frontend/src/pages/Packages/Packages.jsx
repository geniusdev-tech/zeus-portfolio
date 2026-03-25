import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, useI18n } from '../../i18n';
import { useReveal } from '../../hooks';
import FAQ from '../../components/FAQ/FAQ';
import './Packages.css';

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '');

function buildContactHref(message, subject) {
  if (whatsappNumber) {
    return {
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return {
    href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
  };
}

function PackagesWorkflow({ data }) {
  if (!data) return null;
  return (
    <section className="z-packages__workflow z-reveal">
      <h2 className="z-packages__section-title">{data.title}</h2>
      <div className="z-pkg-steps">
        {data.steps.map((step, idx) => (
          <div key={idx} className="z-pkg-step">
            <div className="z-pkg-step__num">
              <span className="z-pkg-step__num-text">{String(idx + 1).padStart(2, '0')}</span>
              <span className="z-pkg-step__line"></span>
            </div>
            <div className="z-pkg-step__content">
              <h3 className="z-pkg-step__title">{step.title.replace(/^\d+\.\s*/, '')}</h3>
              <p className="z-pkg-step__desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PackagesWhy({ data }) {
  if (!data) return null;
  return (
    <section className="z-packages__why z-reveal">
      <h2 className="z-packages__section-title">{data.title}</h2>
      <div className="z-packages__why-box">
        <p>{data.text}</p>
      </div>
    </section>
  );
}

function PackageCard({ pkg, pkgData, contactText, contactMessagePrefix }) {
  const message = `${contactMessagePrefix}${pkg.name}`;
  const contactLink = buildContactHref(message, `${pkgData.title} - ${pkg.name}`);

  return (
    <article className={`z-pkg-card ${pkg.highlight ? 'z-pkg-card--highlight' : ''}`}>
      <div className="z-pkg-card__header">
        <h2 className="z-pkg-card__title">{pkg.name}</h2>
        <p className="z-pkg-card__desc">{pkg.description}</p>
        <div className="z-pkg-card__price">{pkg.price}</div>
      </div>
      
      <div className="z-pkg-card__features">
        <ul className="z-pkg-card__list">
          {pkg.features.map((feat, idx) => (
            <li key={idx}>
              <span className="z-pkg-card__check">✓</span>
              {feat}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="z-pkg-card__bottom">
        {pkgData.slotsAvailable && (
          <div className="z-pkg-card__slots">
            <span className="z-pkg-card__slots-dot"></span>
            {pkgData.slotsAvailable}
          </div>
        )}
        <div className="z-pkg-card__action">
          <a
            href={contactLink.href}
            target={contactLink.target}
            rel={contactLink.rel}
            className="z-pkg-card__btn"
          >
            {contactText}
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Packages() {
  const { content } = useI18n();
  useReveal();
  const pkgData = content.packages;
  if (!pkgData) return null;

  const contactText = pkgData.contactText || 'Contact Zeus';
  const contactMessagePrefix = pkgData.contactMessagePrefix || 'Hi, I am interested in the package: ';
  const auditContactText = pkgData.auditContactText || 'Book a free audit';
  const auditMessage = pkgData.auditMessage || 'Hi, I would like a free infrastructure audit.';
  const auditContactLink = buildContactHref(auditMessage, `${pkgData.title} - audit`);

  return (
    <div className="z-packages">
      <header className="z-packages__top">
        <div className="z-packages__top-inner">
          <div className="z-docs__breadcrumb">
            <Link to="/" className="z-docs__breadcrumb-link">Zeus Protocol</Link>
            <span className="z-docs__breadcrumb-sep">/</span>
            <span>{pkgData.title}</span>
          </div>
          <h1 className="z-packages__title">{pkgData.title}</h1>
          <p className="z-packages__subtitle">{pkgData.subtitle}</p>
        </div>
      </header>
      
      <section className="z-packages__content">
        <div className="z-packages__grid">
          {pkgData.items.map(pkg => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              pkgData={pkgData}
              contactText={contactText}
              contactMessagePrefix={contactMessagePrefix}
            />
          ))}
        </div>
        
        <div className="z-divider-line" style={{ margin: '4rem 0' }} />
        
        <PackagesWorkflow data={pkgData.workflow} />
        
        <div className="z-divider-line" style={{ margin: '4rem 0' }} />
        
        <PackagesWhy data={pkgData.why} />
        
        {pkgData.faq && (
          <>
            <div className="z-divider-line" style={{ margin: '4rem 0' }} />
            <div className="z-packages__faq-wrapper">
              <FAQ data={pkgData.faq} id="pkg-faq" />
            </div>
          </>
        )}
      </section>
      
      <div className="z-packages__footer">
        <p>{pkgData.cta}</p>
        <a
          href={auditContactLink.href}
          target={auditContactLink.target}
          rel={auditContactLink.rel}
          className="z-pkg-card__btn z-pkg-card__btn--secondary"
        >
          {auditContactText}
        </a>
      </div>
    </div>
  );
}
