import { Link } from 'react-router-dom';
import BrandLogo from '../../components/BrandLogo/BrandLogo';
import { useI18n } from '../../i18n';
import './NotFound.css';

export default function NotFound() {
  const { content } = useI18n();
  const notFound = content.notFound || {
    title: 'Page not found',
    lead: 'The requested route does not exist or has moved.',
    homeCta: 'Back to home',
    packagesCta: 'View packages',
  };

  return (
    <div className="z-notfound">
      <section className="z-section">
        <div className="z-notfound__panel">
          <div className="z-notfound__brand">
            <BrandLogo variant="inline" size="sm" />
            <span className="z-notfound__code">404</span>
          </div>

          <div className="z-notfound__copy">
            <div className="z-sec-tag cyan">404</div>
            <h1 className="z-sec-title cyan">{notFound.title}</h1>
            <p className="z-notfound__lead">{notFound.lead}</p>
          </div>

          <div className="z-notfound__actions">
            <Link to="/" className="z-btn z-btn-g">
              {notFound.homeCta}
            </Link>
            <Link to="/packages" className="z-btn z-btn-o">
              {notFound.packagesCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
