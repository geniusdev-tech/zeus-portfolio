import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useI18n } from '../../i18n';
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
                  <a
                    href={isHome ? `#${item.id}` : `/#${item.id}`}
                    className={`z-nav__link${active === item.id ? ' active' : ''}`}
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
                      className={`z-nav__link${currentPath === item.href ? ' active' : ''}`}
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

        {/* Right side */}
        <div className="z-nav__right desktop-only">
          <span className="z-nav__status">
            <span className="z-nav__status-dot" />
            {content.nav.online}
          </span>
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
              <span className="z-nav__status">
                <span className="z-nav__status-dot" />
                {content.nav.online}
              </span>
            </div>
          </div>

          <div className="z-nav__backdrop" onClick={close} />
        </>,
        document.body
      )}
    </>
  );
}
