import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../../data';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`z-nav ${scrolled ? 'z-nav--scrolled' : ''}`}>
      <Link to="/" className="z-nav__id">
        <div className="z-nav__dot" />
        <div className="z-nav__name">
          <span>Zeus</span> / IT Professional
        </div>
      </Link>

      <ul className="z-nav__links">
        {navLinks.map((section) => (
          <li key={section}>
            <a href={`/#${section}`}>{section}</a>
          </li>
        ))}
      </ul>

      <div className="z-nav__status">Available for engagements</div>
    </nav>
  );
}
