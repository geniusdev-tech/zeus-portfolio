import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../../data';
import './Nav.css';

export default function Nav() {
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
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <nav className={`z-nav${scrolled ? ' z-nav--scrolled' : ''}${menuOpen ? ' z-nav--open' : ''}`}>

      {/* Brand */}
      <Link to="/" className="z-nav__brand" onClick={close}>
        <span className="z-nav__brand-dot" />
        <span className="z-nav__brand-name z-brand">
          <span className="z-brand__text">Zeus</span>
          <span className="z-brand__cursor">_</span>
        </span>
      </Link>

      {/* Desktop links — centered */}
      <ul className="z-nav__links desktop-only">
        {navLinks.map((sec, i) => (
          <li key={sec}>
            <a
              href={`/#${sec}`}
              className={`z-nav__link${active === sec ? ' active' : ''}`}
              onClick={close}
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
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      <div className={`z-nav__drawer${menuOpen ? ' active' : ''}`}>
        <div className="z-nav__drawer-header">
          <span className="z-nav__brand-name z-brand">
            <span className="z-brand__text">Zeus</span>
            <span className="z-brand__cursor">_</span>
          </span>
        </div>
        <ul className="z-nav__drawer-links">
          {navLinks.map((sec, i) => (
            <li key={sec}>
              <a
                href={`/#${sec}`}
                className={`z-nav__drawer-link${active === sec ? ' active' : ''}`}
                onClick={close}
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

      {/* Backdrop */}
      {menuOpen && <div className="z-nav__backdrop" onClick={close} />}
    </nav>
  );
}
