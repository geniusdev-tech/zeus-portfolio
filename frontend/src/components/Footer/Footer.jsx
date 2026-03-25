import './Footer.css';
import BrandLogo from '../BrandLogo/BrandLogo';
import { useI18n } from '../../i18n';

export default function Footer() {
  const { content } = useI18n();

  return (
    <footer className="z-footer">
      <div className="z-footer__left">
        <BrandLogo variant="inline" size="sm" />
      </div>
      <div className="z-footer__right">
        <div className="z-footer__dot" />
        <span>{content.footer.text}</span>
        <span className="z-footer__sep">/</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
