import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import './Cases.css';

function CaseCard({ item }) {
  return (
    <article className="z-cases-card">
      <div className="z-cases-card__meta">
        <span className="z-cases-card__tag">Case Study</span>
        <span className="z-cases-card__client">{item.clientType}</span>
      </div>
      
      <div className="z-cases-card__body">
        <div className="z-cases-card__section z-cases-card__section--problem">
          <h3 className="z-cases-card__label">The Problem</h3>
          <p>{item.problem}</p>
        </div>
        
        <div className="z-cases-card__section z-cases-card__section--solution">
          <h3 className="z-cases-card__label">Engineering Solution</h3>
          <p>{item.solution}</p>
        </div>
        
        <div className="z-cases-card__section z-cases-card__section--result">
          <h3 className="z-cases-card__label">Business Result</h3>
          <p className="z-cases-card__highlight-text">{item.result}</p>
        </div>
      </div>
      
      {item.linkUrl && (
        <div className="z-cases-card__footer">
          <Link to={item.linkUrl} className="z-cases-card__link">
            {item.linkText} <span>→</span>
          </Link>
        </div>
      )}
    </article>
  );
}

export default function Cases() {
  const { content } = useI18n();
  const casesData = content.cases;

  if (!casesData) return null;

  return (
    <div className="z-cases">
      <header className="z-cases__top"> {/* Reusing the same header layout from docs/packages */}
        <div className="z-cases__top-inner">
          <div className="z-cases__breadcrumb">
            <Link to="/" className="z-cases__breadcrumb-link">Zeus Protocol</Link>
            <span className="z-cases__breadcrumb-sep">/</span>
            <span>{casesData.title}</span>
          </div>
          <h1 className="z-cases__title">{casesData.title}</h1>
          <p className="z-cases__subtitle">{casesData.subtitle}</p>
        </div>
      </header>
      
      <section className="z-cases__content">
        <div className="z-cases__list">
          {casesData.items.map(item => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      
      <div className="z-cases__site-footer">
        <Link to="/" className="z-cases__back-link">← Voltar</Link>
      </div>
    </div>
  );
}
