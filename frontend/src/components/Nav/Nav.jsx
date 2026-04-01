import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useI18n } from '../../i18n';
import useMagnetic from '../../hooks/useMagnetic';
import BrandLogo from '../BrandLogo/BrandLogo';
import LanguageSwitcher from '../LanguageSwitcher';
import './Nav.css';

export default function Nav() {
  const location = useLocation();
  const { content } = useI18n();
  const currentPath = location.pathname.replace(/\/+$/, '') || '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);
  
  // The master structural order of the menu. Maps to DOM IDs or Routes.
  const baseMenu = [
    { type: 'anchor', id: 'about' },
    { type: 'anchor', id: 'projects' },
    { type: 'anchor', id: 'services' },
    { type: 'anchor', id: 'stack' },
    { type: 'anchor', id: 'contact' },
    { type: 'page', id: 'packages', href: '/packages' },
    { type: 'page', id: 'cases', href: '/cases' },
    { type: 'page', id: 'docs', href: '/docs' },
  ];

  const getLabel = (id) => {
    // Check if there is an explicit translations object (PT/ES)
    if (content.nav.itemsLabel && content.nav.itemsLabel[id]) return content.nav.itemsLabel[id];
    // Specific page link labels
    if (id === 'docs' && content.nav.docsItem) return content.nav.docsItem.label;
    if (id === 'packages' && content.nav.packagesItem) return content.nav.packagesItem.label;
    if (id === 'cases' && content.nav.casesItem) return content.nav.casesItem.label;
    // Fallback (mostly for EN anchor links directly using the ID)
    return id;
  };

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    if (currentPath !== '/') {
      setActive('');
      return undefined;
    }

    const anchorIds = baseMenu.filter(m => m.type === 'anchor').map(m => m.id);
    const sections = anchorIds.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) {
      setActive('');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [currentPath]);

  useEffect(() => {
    document.body.classList.toggle('z-menu-open', menuOpen);
    return () => document.body.classList.remove('z-menu-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusFirst = () => {
      const focusables = drawerRef.current?.querySelectorAll(focusableSelector);
      focusables?.[0]?.focus();
    };

    focusFirst();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        requestAnimationFrame(() => hamburgerRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusables = Array.from(drawerRef.current?.querySelectorAll(focusableSelector) || []);
      if (!focusables.length) {
        event.preventDefault();
        drawerRef.current?.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const close = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => hamburgerRef.current?.focus());
  };
  const isHome = currentPath === '/';

  function MagneticAnchor({ href, className, onClick, active, label }) {
    const { ref, style } = useMagnetic(0.2, 50);
    const [num, ...textParts] = label.split(' ');
    const text = textParts.join(' ');

    return (
      <a
        ref={ref}
        href={href}
        className={className}
        onClick={onClick}
        style={style}
        aria-current={active ? 'page' : undefined}
      >
        <span className="z-nav__link-num">{num}</span>
        {text}
      </a>
    );
  }

  function MagneticLink({ to, className, onClick, isActive, label }) {
    const { ref, style } = useMagnetic(0.2, 50);
    const [num, ...textParts] = label.split(' ');
    const text = textParts.join(' ');

    return (
      <Link
        ref={ref}
        to={to}
        className={className}
        onClick={onClick}
        style={style}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className="z-nav__link-num">{num}</span>
        {text}
      </Link>
    );
  }

  return (
    <>
      <nav className={`z-nav${scrolled ? ' z-nav--scrolled' : ''}${menuOpen ? ' z-nav--open' : ''}`}>

        {/* Brand */}
        <Link to="/" className="z-nav__brand" onClick={close}>
          <BrandLogo variant="inline" size="sm" />
        </Link>

        {/* Desktop links */}
        <ul className="z-nav__links desktop-only">
          {baseMenu.map((item, i) => {
            if (item.type === 'anchor') {
              return (
                <li key={item.id}>
                  <MagneticAnchor
                    href={isHome ? `#${item.id}` : `/#${item.id}`}
                    className={`z-nav__link${active === item.id ? ' active' : ''}`}
                    onClick={close}
                    active={active === item.id}
                    label={`${String(i + 1).padStart(2, '0')}. ${getLabel(item.id)}`}
                  />
                </li>
              );
            } else {
              return (
                <li key={item.id}>
                  <MagneticLink
                    to={item.href}
                    className={`z-nav__link${currentPath === item.href ? ' active' : ''}`}
                    onClick={close}
                    isActive={currentPath === item.href}
                    label={`${String(i + 1).padStart(2, '0')}. ${getLabel(item.id)}`}
                  />
                </li>
              );
            }
          })}
        </ul>

        {/* Right side */}
        <div className="z-nav__right desktop-only">
          <LanguageSwitcher />
        </div>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          className={`z-nav__hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={content.nav.toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* App-like Bottom Tab Bar for Mobile */}
      <nav className="z-bottom-nav">
        <Link to="/" className={`z-bottom-nav__item${currentPath === '/' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
          <div className="z-bottom-nav__icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            <div className="z-bottom-nav__active-dot" />
          </div>
          <span className="z-bottom-nav__label">{getLabel('Home') || 'Home'}</span>
        </Link>
        
        <Link to="/pricing" className={`z-bottom-nav__item${currentPath === '/pricing' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
          <div className="z-bottom-nav__icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            <div className="z-bottom-nav__active-dot" />
          </div>
          <span className="z-bottom-nav__label">{getLabel('pricing') || 'Pricing'}</span>
        </Link>
        
        <Link to="/contact" className={`z-bottom-nav__item${currentPath === '/contact' ? ' active' : ''}`} onClick={() => setMenuOpen(false)}>
          <div className="z-bottom-nav__icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <div className="z-bottom-nav__active-dot" />
          </div>
          <span className="z-bottom-nav__label">{getLabel('contact') || 'Contact'}</span>
        </Link>
        
        <button className={`z-bottom-nav__item${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(v => !v)}>
          <div className="z-bottom-nav__icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <div className="z-bottom-nav__active-dot" />
          </div>
          <span className="z-bottom-nav__label">{content.nav.menuLabel || 'Menu'}</span>
        </button>
      </nav>

      {/* Mobile drawer — Moved to Portal to ensure 100% isolation and opacity */}
      {menuOpen && createPortal(
        <>
          <div
            id="mobile-navigation"
            className={`z-nav__drawer active`}
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={content.nav.menuLabel}
            tabIndex={-1}
          >
            <div className="z-nav__drawer-header">
              <BrandLogo variant="inline" size="sm" />
            </div>
            <ul className="z-nav__drawer-links">
              {baseMenu.map((item, i) => {
                if (item.type === 'anchor') {
                  return (
                    <li key={item.id}>
                      <a
                        href={isHome ? `#${item.id}` : `/#${item.id}`}
                        className={`z-nav__drawer-link${active === item.id ? ' active' : ''}`}
                        onClick={close}
                        aria-current={active === item.id ? 'page' : undefined}
                      >
                        <span className="z-nav__link-num">{String(i + 1).padStart(2, '0')}.</span>
                        {getLabel(item.id)}
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li key={item.id}>
                      <Link
                        to={item.href}
                        className={`z-nav__drawer-link${currentPath === item.href ? ' active' : ''}`}
                        onClick={close}
                      >
                        <span className="z-nav__link-num">{String(i + 1).padStart(2, '0')}.</span>
                        {getLabel(item.id)}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
            <div className="z-nav__drawer-footer">
              <LanguageSwitcher compact className="z-nav__drawer-switcher" />
            </div>
          </div>

          <div className="z-nav__backdrop" onClick={close} />
        </>,
        document.body
      )}
    </>
  );
}
