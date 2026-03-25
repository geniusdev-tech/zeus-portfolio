import { Fragment, useState } from 'react';
import TuiSimulator from '../../components/TuiSimulator/TuiSimulator';
import CheckoutModal from '../../components/CheckoutModal/CheckoutModal';
import Footer from '../../components/Footer';
import { useI18n } from '../../i18n';
import './Quelox.css';

export default function Quelox() {
  const { content } = useI18n();
  const { quelox } = content;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="qx-page">
      <section className="qx-hero">
        <div className="qx-container qx-hero__grid">
          <div className="qx-hero__content">
            <div className="qx-kicker">{quelox.kicker}</div>
            <h1 className="qx-title">{quelox.title}</h1>
            <h2 className="qx-subtitle">
              {quelox.subtitle}
            </h2>

            <p className="qx-lead">
              {quelox.lead}
            </p>

            <div className="qx-highlights" aria-label={quelox.highlightsLabel}>
              {quelox.highlights.map((item) => (
                <span className="qx-highlight" key={item}>{item}</span>
              ))}
            </div>

            <div className="qx-actions">
              <button className="qx-btn qx-btn--primary" onClick={() => setIsModalOpen(true)}>
                {quelox.requestAccess}
              </button>
              <a className="qx-btn qx-btn--ghost" href="#architecture">
                {quelox.viewArchitecture}
              </a>
            </div>

            <div className="qx-stats">
              {quelox.stats.map((stat) => (
                <div className="qx-stat" key={stat.label}>
                  <span className="qx-stat__label">{stat.label}</span>
                  <span className="qx-stat__value">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="qx-hero__visual">
            <div className="qx-pricebox">
              <span className="qx-pricebox__label">{quelox.currentAccess}</span>
              <div className="qx-pricebox__main">
                <span className="qx-pricebox__current">{quelox.access.priceText}</span>
                <span className="qx-pricebox__anchor">{quelox.access.priceAnchor}</span>
              </div>
              <p className="qx-pricebox__copy">
                {quelox.accessCopy}
              </p>
            </div>

            <TuiSimulator />
          </div>
        </div>
      </section>

      <section className="qx-section">
        <div className="qx-container">
          <div className="qx-section__header">
            <div className="qx-section__tag">{quelox.productRole.tag}</div>
            <h2 className="qx-section__title">{quelox.productRole.title}</h2>
            <p className="qx-section__intro">
              {quelox.productRole.intro}
            </p>
          </div>

          <div className="qx-pillars">
            {quelox.productRole.pillars.map((pillar) => (
              <article className="qx-panel" key={pillar.label}>
                <div className="qx-panel__tag">{pillar.label}</div>
                <p className="qx-panel__text">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="qx-section qx-section--alt" id="architecture">
        <div className="qx-container">
          <div className="qx-section__header">
            <div className="qx-section__tag">{quelox.architecture.tag}</div>
            <h2 className="qx-section__title">{quelox.architecture.title}</h2>
            <p className="qx-section__intro">
              {quelox.architecture.intro}
            </p>
          </div>

          <div className="qx-architecture">
            {quelox.architecture.cards.map((item) => (
              <article className="qx-architecture__card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="qx-section qx-section--workflow">
        <div className="qx-container qx-workflow">
          <div>
            <div className="qx-section__tag">{quelox.workflow.tag}</div>
            <h2 className="qx-section__title">{quelox.workflow.title}</h2>
            <p className="qx-section__intro qx-section__intro--narrow">
              {quelox.workflow.intro}
            </p>

            <div className="qx-steps">
              {quelox.workflow.steps.map((step, index) => (
                <div className="qx-step" key={step}>
                  <span className="qx-step__num">0{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

            <div className="qx-diagram">
              <div className="qx-diagram__label">{quelox.workflow.diagramLabel}</div>
              {quelox.workflow.diagramRows.map((row) => (
                <div className="qx-diagram__row" key={row}>{row}</div>
              ))}
            </div>
        </div>
      </section>

      <section className="qx-section qx-section--alt">
        <div className="qx-container">
          <div className="qx-section__header">
            <div className="qx-section__tag">{quelox.comparison.tag}</div>
            <h2 className="qx-section__title">{quelox.comparison.title}</h2>
            <p className="qx-section__intro">
              {quelox.comparison.intro}
            </p>
          </div>

          <div className="qx-compare">
            <div className="qx-compare__head">{quelox.comparison.headers[0]}</div>
            <div className="qx-compare__head">{quelox.comparison.headers[1]}</div>
            <div className="qx-compare__head qx-compare__head--highlight">{quelox.comparison.headers[2]}</div>

            {quelox.comparison.rows.map(([label, manual, product]) => (
              <Fragment key={label}>
                <div className="qx-compare__cell qx-compare__cell--label" key={`${label}-label`}>{label}</div>
                <div className="qx-compare__cell" key={`${label}-manual`}>{manual}</div>
                <div className="qx-compare__cell qx-compare__cell--highlight" key={`${label}-product`}>{product}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="qx-section">
        <div className="qx-container">
          <div className="qx-cta">
            <div>
              <div className="qx-section__tag">{quelox.access.tag}</div>
              <h2 className="qx-section__title">{quelox.access.title}</h2>
              <p className="qx-cta__text">
                {quelox.access.intro}
              </p>
            </div>

            <div className="qx-cta__actions">
              <div className="qx-cta__price">
                <span className="qx-cta__price-label">{quelox.access.priceLabel}</span>
                <strong>{quelox.access.priceText}</strong>
              </div>
              <button className="qx-btn qx-btn--primary" onClick={() => setIsModalOpen(true)}>
                {quelox.requestAccess}
              </button>
            </div>
          </div>
        </div>
      </section>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName="QELO-X ACCESS"
        price="199.90"
      />

      <Footer />
    </div>
  );
}
