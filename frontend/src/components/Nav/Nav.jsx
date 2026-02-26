import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../data';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className={`z-nav ${scrolled ? 'z-nav--scrolled' : ''} ${menuOpen ? 'z-nav--open' : ''}`}>
      <Link to="/" className="z-nav__id" onClick={handleLinkClick}>
        <div className="z-nav__dot" />
        <div className="z-nav__name">
          <span>Zeus</span> / IT Professional
        </div>
      </Link>

      <button
        className={`z-nav__hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`z-nav__menu ${menuOpen ? 'active' : ''}`}>
        <ul className="z-nav__links">
          {navLinks.map((section) => (
            <li key={section}>
              <a href={`/#${section}`} onClick={handleLinkClick}>{section}</a>
            </li>
          ))}
        </ul>

        <div className="z-nav__status mobile-only">STATUS: ONLINE</div>
      </div>

      <div className="z-nav__status desktop-only">STATUS: ONLINE</div>
    </nav>
  );
}
