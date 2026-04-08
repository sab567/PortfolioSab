import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import './Navbar.css';

// Barre de navigation
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Effet de scroll pour le glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu quand on change de page
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* LOGO */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <Heart size={24} fill="currentColor" />
          </div>
          <div className="logo-text">
            <span className="logo-main">KONLI</span>
            <span className="logo-sub">DÉMARCHES & HORIZONS</span>
          </div>
        </Link>

        {/* BOUTON MENU MOBILE */}
        <button
          className={`mobile-menu-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* LIENS DE NAVIGATION */}
        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>
            Accueil
          </Link>
          <Link to="/association" className={`nav-link ${isActive('/association')}`} onClick={closeMenu}>
            L'Association
          </Link>
          <Link to="/missions" className={`nav-link ${isActive('/missions')}`} onClick={closeMenu}>
            Nos Missions
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMenu}>
            Contact
          </Link>

          {/* Bouton d'action proéminent */}
          <Link to="/don" className="btn btn-primary nav-btn" onClick={closeMenu}>
            <Heart size={16} fill="currentColor" />
            Faire un don
          </Link>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {isOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;
