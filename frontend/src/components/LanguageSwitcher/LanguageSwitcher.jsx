import { useI18n } from '../../i18n';
import './LanguageSwitcher.css';

export default function LanguageSwitcher({ compact = false, className = '' }) {
  const { locale, setLocale, content } = useI18n();
  const options = content.nav.languageOptions;

  return (
    <div
      className={`z-lang-switcher${compact ? ' is-compact' : ''}${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={content.nav.languageLabel}
    >
      {options.map((option) => (
        <button
          key={option.code}
          type="button"
          className={`z-lang-switcher__button${locale === option.code ? ' is-active' : ''}`}
          onClick={() => setLocale(option.code)}
          aria-pressed={locale === option.code}
          aria-label={option.label}
          title={option.label}
          lang={option.code}
        >
          {option.shortLabel}
        </button>
      ))}
    </div>
  );
}
