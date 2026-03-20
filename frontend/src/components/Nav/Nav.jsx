import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { navLinks } from '../../data';
import BrandLogo from '../BrandLogo/BrandLogo';
import './Nav.css';

export default function Nav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

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
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('z-menu-open', menuOpen);
    return () => document.body.classList.remove('z-menu-open');
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const isHome = location.pathname === '/';

  return (
    <>
      <nav className={`z-nav${scrolled ? ' z-nav--scrolled' : ''}${menuOpen ? ' z-nav--open' : ''}`}>

        {/* Brand */}
        <Link to="/" className="z-nav__brand" onClick={close}>
          <BrandLogo variant="inline" size="sm" />
        </Link>

        {/* Desktop links — centered */}
        <ul className="z-nav__links desktop-only">
          {navLinks.map((sec, i) => (
            <li key={sec}>
              <a
                href={isHome ? `#${sec}` : `/#${sec}`}
                className={`z-nav__link${active === sec ? ' active' : ''}`}
                onClick={close}
                aria-current={active === sec ? 'page' : undefined}
              >
                <span className="z-nav__link-num">{String(i + 1).padStart(2, '0')}.</span>
                {sec}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="z-nav__right desktop-only">
          <span className="z-nav__status">
            <span className="z-nav__status-dot" />
            online
          </span>
        </div>

        {/* Hamburger */}
        <button
          className={`z-nav__hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
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
            aria-hidden={!menuOpen}
          >
            <div className="z-nav__drawer-header">
              <BrandLogo variant="inline" size="sm" />
            </div>
            <ul className="z-nav__drawer-links">
              {navLinks.map((sec, i) => (
                <li key={sec}>
                  <a
                    href={isHome ? `#${sec}` : `/#${sec}`}
                    className={`z-nav__drawer-link${active === sec ? ' active' : ''}`}
                    onClick={close}
                    aria-current={active === sec ? 'page' : undefined}
                  >
                    <span className="z-nav__link-num">{String(i + 1).padStart(2, '0')}.</span>
                    {sec}
                  </a>
                </li>
              ))}
            </ul>
            <div className="z-nav__drawer-footer">
              <span className="z-nav__status">
                <span className="z-nav__status-dot" />
                online
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
