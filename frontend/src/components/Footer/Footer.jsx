import './Footer.css';
import BrandLogo from '../BrandLogo/BrandLogo';

export default function Footer() {
  return (
    <footer className="z-footer">
      <div className="z-footer__left">
        <BrandLogo variant="inline" size="sm" />
      </div>
      <div className="z-footer__right">
        <div className="z-footer__dot" />
        <span>Systems / Automation / CRM</span>
        <span className="z-footer__sep">/</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
