import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Heart, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import './Footer.css';

// Pied de page
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container footer-container">
                    {/* COLONNE 1: À PROPOS */}
                    <div className="footer-col footer-about">
                        <div className="footer-logo">
                            <Heart size={22} className="footer-icon-heart" fill="currentColor" />
                            <span className="footer-logo-text">KONLI DÉMARCHES & HORIZONS</span>
                        </div>
                        <p className="footer-desc">
                            Accompagner les personnes vulnérables, promouvoir la solidarité France-Afrique
                            et faciliter l'intégration des migrants.
                        </p>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook size={18} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* COLONNE 2: LIENS RAPIDES */}
                    <div className="footer-col">
                        <h3 className="footer-title">Navigation</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Accueil</Link></li>
                            <li><Link to="/association">L'Association</Link></li>
                            <li><Link to="/missions">Nos Missions</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/don">Faire un don</Link></li>
                        </ul>
                    </div>

                    {/* COLONNE 3: CONTACT */}
                    <div className="footer-col">
                        <h3 className="footer-title">Nous contacter</h3>
                        <ul className="footer-contact">
                            <li className="contact-item">
                                <MapPin size={18} />
                                <span>8 rue de la Solidarité<br />75019 Paris</span>
                            </li>
                            <li className="contact-item">
                                <Mail size={18} />
                                <a href="mailto:contact@konli.org">contact@konli.org</a>
                            </li>
                            <li className="contact-item">
                                <Phone size={18} />
                                <a href="tel:+33123456789">01 23 45 67 89</a>
                            </li>
                        </ul>
                    </div>

                    {/* COLONNE 4: CTA */}
                    <div className="footer-col footer-cta">
                        <h3 className="footer-title">Agissez avec nous</h3>
                        <p>Rejoignez notre communauté de bénévoles ou soutenez nos actions.</p>
                        <Link to="/contact" className="btn btn-accent">
                            Nous rejoindre
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-content">
                    <p>
                        © {currentYear} KONLI DÉMARCHES & HORIZONS. Association loi 1901.
                    </p>
                    <div className="footer-legal">
                        <Link to="/mentions-legales">Mentions Légales & Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
