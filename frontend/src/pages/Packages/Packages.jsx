import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, useI18n } from '../../i18n';
import { useReveal, useAutoScroll } from '../../hooks';
import FAQ from '../../components/FAQ/FAQ';
import './Packages.css';

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '');

// Localized technical configuration
const CURRENCIES = [
  { code: 'BRL', label: 'BR', symbol: 'R$', decimals: 0 },
  { code: 'USD', label: 'USD', symbol: 'US$', decimals: 2 },
  { code: 'EUR', label: 'EURO', symbol: '€', decimals: 2 },
  { code: 'BTC', label: 'Bitcoin', symbol: '₿', decimals: 8 },
  { code: 'ETC', label: 'Classic', symbol: 'ETC', decimals: 6 },
  { code: 'BCH', label: 'BCH', symbol: 'BCH', decimals: 4 },
  { code: 'DOGE', label: 'Doge', symbol: 'Ð', decimals: 2 },
];

const FX_REFERENCE = {
  source: 'CoinGecko / Frankfurter',
  ratesToBRL: {
    BRL: 1,
    USD: 5.25,
    EUR: 6.05,
    BTC: 360000,
    ETC: 130,
    BCH: 2200,
    DOGE: 0.85,
  },
};


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

function formatMoney(amountBrl, currencyCode) {
  const currency = CURRENCIES.find((item) => item.code === currencyCode) || CURRENCIES[0];
  const rate = FX_REFERENCE.ratesToBRL[currency.code] || 1;
  const converted = amountBrl / rate;
  const isCrypto = ['BTC', 'ETC', 'BCH', 'DOGE'].includes(currency.code);

  if (isCrypto) {
    // Smart decimals for crypto to avoid technical clutter
    let decimals = currency.decimals;
    if (converted > 1) decimals = 2; // e.g. 5.23 ETC
    else if (converted > 0.1) decimals = 4; // e.g. 0.1234 BCH
    else if (converted > 0.0001) decimals = 6; // e.g. 0.000123 BTC

    return `${currency.symbol} ${new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: Math.min(2, decimals),
      maximumFractionDigits: decimals,
    }).format(converted)}`;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  }).format(converted);
}

function formatMoneyTriplet(amountBrl) {
  return CURRENCIES.map((currency) => ({
    code: currency.code,
    label: currency.label,
    value: formatMoney(amountBrl, currency.code),
  }));
}

// buildContactHref and other helpers remain for card functionality

function TradingViewWidget({ symbol }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // Map common codes to TradingView symbols
    const symbolMap = {
      BTC: 'BINANCE:BTCUSDT',
      ETC: 'BINANCE:ETCUSDT',
      BCH: 'BINANCE:BCHUSDT',
      DOGE: 'BINANCE:DOGEUSDT',
    };
    
    const tvSymbol = symbolMap[symbol] || 'BINANCE:BTCUSDT';

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: tvSymbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'br',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      container_id: 'tradingview_widget',
    });
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="z-packages__chart-container">
      <div id="tradingview_widget" ref={container} style={{ height: '500px', width: '100%' }} />
    </div>
  );
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

function PackageCard({
  pkg,
  pkgData,
  contactText,
  contactMessagePrefix,
  currencyCode,
  onSelectCurrency,
  isOpen,
  onToggle,
}) {
  const message = `${contactMessagePrefix}${pkg.name}`;
  const contactLink = buildContactHref(message, `${pkgData.title} - ${pkg.name}`);
  const currency = CURRENCIES.find((item) => item.code === currencyCode) || CURRENCIES[0];
  const displayPrice = formatMoney(pkg.priceBrl, currency.code);
  const basePrice = formatMoney(pkg.priceBrl, 'BRL');
  const priceTriplet = formatMoneyTriplet(pkg.priceBrl);

  return (
    <article className={`z-pkg-card ${pkg.highlight ? 'z-pkg-card--highlight' : ''} ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="z-pkg-card__summary"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`pkg-panel-${pkg.id}`}
      >
        <div className="z-pkg-card__summary-left">
          <div className="z-pkg-card__meta">
            <span className="z-pkg-card__badge">{pkg.badge}</span>
            {pkg.featuredLabel && <span className="z-pkg-card__feature">{pkg.featuredLabel}</span>}
            <span className="z-pkg-card__timeframe">{pkg.timeframe}</span>
          </div>
          <h2 className="z-pkg-card__title">{pkg.name}</h2>
          <p className="z-pkg-card__desc">{pkg.description}</p>
          <p className="z-pkg-card__lead">{pkg.marketing}</p>
        </div>

        <div className="z-pkg-card__summary-right">
          <div className="z-pkg-card__price">
            <span className="z-pkg-card__price-value">{displayPrice}</span>
            <span className="z-pkg-card__price-note">
              Base {basePrice}
              {pkg.priceSuffix ? ` ${pkg.priceSuffix}` : ''}
            </span>
          </div>
          <div className="z-pkg-card__toggle">
            <span className="z-pkg-card__toggle-label">{isOpen ? 'Fechar' : 'Abrir'}</span>
            <span className="z-pkg-card__toggle-icon" aria-hidden="true" />
          </div>
        </div>
      </button>

      <div className="z-pkg-card__price-triplet">
        {priceTriplet.map((item) => (
          <button
            key={item.code}
            type="button"
            className={`z-pkg-card__price-pill${item.code === currency.code ? ' is-active' : ''}`}
            onClick={() => onSelectCurrency(item.code)}
          >
            <strong>{item.code}</strong>
            <span>{item.value}</span>
          </button>
        ))}
      </div>

      <div id={`pkg-panel-${pkg.id}`} className="z-pkg-card__panel" hidden={!isOpen}>
        <div className="z-pkg-card__panel-grid">
          <div className="z-pkg-card__features">
            <span className="z-pkg-card__marketing-label">O que está incluso</span>
            <ul className="z-pkg-card__list">
              {pkg.features.map((feat, idx) => (
                <li key={idx}>
                  <span className="z-pkg-card__check">✓</span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="z-pkg-card__bottom">
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
      </div>
    </article>
  );
}

export default function Packages() {
  const { content } = useI18n();
  const pkgData = content.packages || {};
  useReveal();
  const [currencyCode, setCurrencyCode] = useState('BRL');
  const [openPackageId, setOpenPackageId] = useState(null);
  const [fxRates, setFxRates] = useState(FX_REFERENCE.ratesToBRL);
  const [fxCountdown, setFxCountdown] = useState(17);
  const [showChart, setShowChart] = useState(false);
  const fxTimerRef = useRef(null);

  const selectedCurrency = useMemo(
    () => CURRENCIES.find((item) => item.code === currencyCode) || CURRENCIES[0],
    [currencyCode],
  );

  const filteredServices = pkgData.items || [];
  useEffect(() => {
    if (pkgData.items?.length > 0 && !openPackageId) {
      setOpenPackageId(pkgData.items[0].id);
    }
  }, [pkgData.items]);
  const scrollRef = useRef(null);
  const { onWheel, onTouchStart, onMouseEnter, onFocusCapture, onScroll, pauseAutoScroll } = useAutoScroll({
    scrollRef,
    speed: 0.55,
    enabled: true, // works on all screens now
  });

  const [isMobileLayout, setIsMobileLayout] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const updateLayout = () => setIsMobileLayout(mediaQuery.matches);

    updateLayout();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateLayout);
      return () => mediaQuery.removeEventListener('change', updateLayout);
    }

    mediaQuery.addListener(updateLayout);
    return () => mediaQuery.removeListener(updateLayout);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const loadRates = async () => {
      try {
        const response = await fetch('https://api.frankfurter.app/latest?from=BRL&to=USD,EUR');
        if (!response.ok) throw new Error('fx fetch failed');
        const data = await response.json();

        if (data?.rates?.USD && data?.rates?.EUR) {
          const newRates = {
            BRL: 1,
            USD: 1 / data.rates.USD,
            EUR: 1 / data.rates.EUR,
            BTC: FX_REFERENCE.ratesToBRL.BTC,
            ETC: FX_REFERENCE.ratesToBRL.ETC,
            BCH: FX_REFERENCE.ratesToBRL.BCH,
            DOGE: FX_REFERENCE.ratesToBRL.DOGE,
          };

          // Try to fetch crypto prices from CoinGecko
          try {
            const cryptoResp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum-classic,bitcoin-cash,dogecoin&vs_currencies=brl');
            if (cryptoResp.ok) {
              const cryptoData = await cryptoResp.json();
              if (cryptoData.bitcoin?.brl) newRates.BTC = cryptoData.bitcoin.brl;
              if (cryptoData['ethereum-classic']?.brl) newRates.ETC = cryptoData['ethereum-classic'].brl;
              if (cryptoData['bitcoin-cash']?.brl) newRates.BCH = cryptoData['bitcoin-cash'].brl;
              if (cryptoData.dogecoin?.brl) newRates.DOGE = cryptoData.dogecoin.brl;
            }
          } catch (e) {
            console.warn('Crypto fetch failed, using fallback prices');
          }

          setFxRates(newRates);
          return;
        }
      } catch (error) {
        setFxRates(FX_REFERENCE.ratesToBRL);
      }
    };

    loadRates();
    window.clearInterval(fxTimerRef.current);
    fxTimerRef.current = window.setInterval(() => {
      setFxCountdown((current) => {
        if (current <= 1) {
          void loadRates();
          return 17;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(fxTimerRef.current);
    };
  }, []);

  if (!pkgData) return null;


  const contactText = pkgData.contactText || 'Contact Zeus';
  const contactMessagePrefix = pkgData.contactMessagePrefix || 'Hi, I am interested in the package: ';
  const auditContactText = pkgData.auditContactText || 'Book a free audit';
  const auditMessage = pkgData.auditMessage || 'Hi, I would like a free infrastructure audit.';
  const auditContactLink = buildContactHref(auditMessage, `${pkgData.title} - audit`);
  const fxFormattedValue = ['BRL', 'USD', 'EUR'].includes(selectedCurrency.code)
    ? new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: selectedCurrency.code === 'BRL' ? 0 : 2,
      maximumFractionDigits: selectedCurrency.code === 'BRL' ? 0 : 4,
    }).format(fxRates[selectedCurrency.code])
    : fxRates[selectedCurrency.code].toFixed(selectedCurrency.decimals);

  const fxText = `1 ${selectedCurrency.code} ≈ ${fxFormattedValue} BRL`;
  const fxProgress = ((17 - fxCountdown) / 17) * 100;

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

      <section className="z-packages__toolbar z-reveal">

        <div className="z-packages__currency-panel">
          <div className="z-packages__toolbar-label">{pkgData.currencyLabel}</div>
          
          <div className="z-packages__currency-group">
            <span className="z-packages__currency-group-label">FIAT</span>
            <div className="z-packages__currency-switch" role="tablist">
              {CURRENCIES.filter(c => ['BRL', 'USD', 'EUR'].includes(c.code)).map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`z-packages__currency-btn${selectedCurrency.code === item.code ? ' is-active' : ''}`}
                  onClick={() => setCurrencyCode(item.code)}
                >
                  <span>{item.symbol}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="z-packages__currency-group">
            <span className="z-packages__currency-group-label">CRIPTO</span>
            <div className="z-packages__currency-switch" role="tablist">
              {CURRENCIES.filter(c => ['BTC', 'ETC', 'BCH', 'DOGE'].includes(c.code)).map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`z-packages__currency-btn${selectedCurrency.code === item.code ? ' is-active' : ''}`}
                  onClick={() => setCurrencyCode(item.code)}
                >
                  <span>{item.symbol}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <p className="z-packages__currency-hint" style={{ marginTop: '1.5rem' }}>{pkgData.currencyHint}</p>
        </div>

        <div className="z-packages__fx-panel">
          <div className="z-packages__toolbar-label">
            <span className="z-pulse-dot" />
            {pkgData.fxLabel || 'Câmbio de referência'}
          </div>
          <p className="z-packages__fx-value">{fxText}</p>
          <div className="z-packages__fx-bar" aria-hidden="true">
            <span style={{ width: `${fxProgress}%` }} />
          </div>
          <small>
            {pkgData.fxRefreshNote || 'A cada 17s'} · {FX_REFERENCE.source}
          </small>
        </div>
      </section>

      <section className="z-packages__intro z-reveal">
        <p>{pkgData.subtitle}</p>
      </section>

      {['BTC', 'ETC', 'BCH', 'DOGE'].includes(selectedCurrency.code) && (
        <div className="z-packages__chart-section">
          <button 
            type="button" 
            className={`z-packages__chart-toggle ${showChart ? 'is-active' : ''}`}
            onClick={() => setShowChart(!showChart)}
          >
            <span className="z-packages__chart-toggle-icon" />
            {showChart ? 'Recolher Dados de Mercado' : `Ver Gráfico de ${selectedCurrency.label}`}
          </button>
          
          <div className={`z-packages__chart-collapse ${showChart ? 'is-open' : ''}`}>
            <TradingViewWidget symbol={selectedCurrency.code} />
          </div>
        </div>
      )}

      
      <section className="z-packages__content">
          <div
            ref={scrollRef}
            className={`z-packages__grid z-packages__grid--scroll${isMobileLayout ? ' z-packages__grid--mobile' : ''}`}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onMouseEnter={onMouseEnter}
            onFocusCapture={onFocusCapture}
            onScroll={onScroll}
          >
            {filteredServices.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                pkgData={pkgData}
                contactText={contactText}
                contactMessagePrefix={contactMessagePrefix}
                currencyCode={currencyCode}
                onSelectCurrency={setCurrencyCode}
                isOpen={openPackageId === pkg.id}
                onToggle={() => {
                  pauseAutoScroll(2200);
                  setOpenPackageId((prev) => (prev === pkg.id ? null : pkg.id));
                }}
              />
            ))}
          </div>
        {(filteredServices || []).length === 0 && (
          <div className="z-packages__empty">
            {pkgData?.emptyMessage || (content?.nav?.docsItem?.label === 'documentação' ? 'Nenhum serviço encontrado.' : 'No services found.')}
          </div>
        )}
        <div className="z-divider-line" style={{ margin: '4rem 0' }} />
        
        <PackagesWorkflow data={pkgData.workflow} />
        
        <div className="z-divider-line" style={{ margin: '4rem 0' }} />
        
        <PackagesWhy data={pkgData.why} />
        
        <div className="z-divider-line" style={{ margin: '4rem 0' }} />
        <div className="z-packages__faq-wrapper">
          <FAQ data={pkgData.faq} id="pkg-faq" />
        </div>
      </section>
      
      <div className="z-packages__footer">
        <p>{pkgData.cta}</p>
        <a
          href={auditContactLink.href}
          target={auditContactLink.target}
          rel={auditContactLink.rel}
          className="z-pkg-card__btn z-pkg-card__btn--secondary"
        >
          {pkgData.auditContactText}
        </a>
      </div>
    </div>
  );
}
