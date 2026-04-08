import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, FileText, Users, HandHeart, Quote, ChevronLeft, ChevronRight, Heart, Shield, Award } from 'lucide-react';
import './Home.css';

// Page d'accueil

// Hook personnalisé pour détecter quand un élément est visible
const useIntersectionObserver = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1, ...options });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
};

// Composant compteur animé
const AnimatedCounter = ({ end, duration = 2000, suffix = '', label }) => {
    const [count, setCount] = useState(0);
    const [ref, isVisible] = useIntersectionObserver();

    useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
        <div ref={ref} className={`counter-item ${isVisible ? 'visible' : ''}`}>
            <span className="counter-number">{count}{suffix}</span>
            <span className="counter-label">{label}</span>
        </div>
    );
};

// Données des témoignages
const testimonials = [
    {
        id: 1,
        text: "Grâce à KONLI, j'ai pu obtenir mon titre de séjour. Les bénévoles m'ont accompagné à chaque étape avec patience et professionnalisme.",
        author: "Amadou D.",
        role: "Bénéficiaire",
        rating: 5
    },
    {
        id: 2,
        text: "Une association formidable qui fait un travail remarquable pour l'intégration des migrants. Je suis fier d'être bénévole.",
        author: "Marie L.",
        role: "Bénévole depuis 2 ans",
        rating: 5
    },
    {
        id: 3,
        text: "L'aide administrative en ligne m'a permis de comprendre les démarches françaises. Un grand merci à toute l'équipe !",
        author: "Fatou K.",
        role: "Bénéficiaire",
        rating: 5
    }
];

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [heroRef, heroVisible] = useIntersectionObserver();

    // Auto-rotation des témoignages
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="home-page">

            {/* Hero */}
            <section className="hero-section" ref={heroRef}>
                <div className="hero-background">
                    <div className="hero-gradient"></div>
                    <div className="hero-particles"></div>
                </div>

                <div className={`hero-content container ${heroVisible ? 'visible' : ''}`}>
                    <div className="hero-badge">
                        <Heart size={14} fill="currentColor" />
                        <span>Association Loi 1901</span>
                    </div>

                    <h1 className="hero-title">
                        <span className="title-line">KONLI DÉMARCHES &</span>
                        <span className="text-highlight">HORIZONS</span>
                    </h1>

                    <p className="hero-subtitle">
                        Accueil, Encadrement et Orientation des Migrants.
                        <br />
                        <strong>Faciliter votre intégration, construire des ponts entre les cultures.</strong>
                    </p>

                    <div className="hero-actions">
                        <Link to="/don" className="btn btn-primary btn-hero">
                            <HandHeart size={20} />
                            Nous soutenir
                        </Link>
                        <Link to="/missions" className="btn btn-outline btn-hero-secondary">
                            Découvrir nos missions
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="hero-trust-badges">
                        <div className="trust-badge">
                            <Shield size={16} />
                            <span>Association reconnue</span>
                        </div>
                        <div className="trust-badge">
                            <Award size={16} />
                            <span>Depuis 2026</span>
                        </div>
                    </div>
                </div>

                <div className="hero-scroll-indicator">
                    <span>Découvrir</span>
                    <div className="scroll-arrow"></div>
                </div>
            </section>

            {/* SECTION NOS OBJECTIFS */}
            <section className="section-stats">
                <div className="container">
                    <div className="stats-grid">
                        <AnimatedCounter end={3} label="Axes d'action" />
                        <AnimatedCounter end={2} label="Continents concernés" />
                        <AnimatedCounter end={1} label="Mission : l'entraide" />
                        <AnimatedCounter end={100} suffix="%" label="Engagement bénévole" />
                    </div>
                </div>
            </section>

            {/* SECTION PRÉSENTATION RAPIDE */}
            <section className="section-intro">
                <div className="container">
                    <div className="intro-wrapper">
                        <div className="intro-image">
                            <img
                                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
                                alt="Équipe solidaire"
                            />
                            <div className="image-decoration"></div>
                        </div>
                        <div className="intro-text">
                            <h2 className="section-title">Qui sommes-nous ?</h2>
                            <p>
                                Fondée selon la loi 1901, <strong>KONLI DÉMARCHES ET HORIZONS</strong> est née d'une volonté simple :
                                ne laisser personne seul face à la complexité administrative.
                            </p>
                            <p>
                                Nous accompagnons les personnes en situation de vulnérabilité, en particulier les migrants et réfugiés,
                                dans leurs démarches en ligne pour faciliter leur autonomie. Mais notre vision va plus loin :
                                créer une véritable solidarité internationale entre la France et l'Afrique.
                            </p>
                            <Link to="/association" className="learn-more-link">
                                <span>Lire nos statuts</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION NOS AXES D'INTERVENTION */}
            <section className="section-missions">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title text-center">Nos Domaines d'Action</h2>
                        <p className="section-subtitle">
                            Trois axes complémentaires pour un accompagnement global et humain.
                        </p>
                    </div>

                    <div className="cards-grid">
                        {/* CARTE 1 */}
                        <div className="card">
                            <div className="card-icon-wrapper">
                                <div className="card-icon">
                                    <FileText size={32} />
                                </div>
                            </div>
                            <h3>Aide Administrative</h3>
                            <p>
                                Accompagnement personnalisé pour les démarches en ligne (Titres de séjour, CAF, Santé).
                                L'inclusion numérique pour tous.
                            </p>
                            <Link to="/missions" className="card-link">
                                En savoir plus <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* CARTE 2 */}
                        <div className="card">
                            <div className="card-icon-wrapper">
                                <div className="card-icon">
                                    <Users size={32} />
                                </div>
                            </div>
                            <h3>Entraide & Communauté</h3>
                            <p>
                                Création d'espaces d'échanges et de partage de compétences.
                                Construction de réseaux communautaires et professionnels solides.
                            </p>
                            <Link to="/missions" className="card-link">
                                En savoir plus <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* CARTE 3 */}
                        <div className="card">
                            <div className="card-icon-wrapper">
                                <div className="card-icon">
                                    <Globe size={32} />
                                </div>
                            </div>
                            <h3>Solidarité Internationale</h3>
                            <p>
                                Développement d'actions concrètes en Afrique.
                                Une coopération bilatérale pour un impact durable.
                            </p>
                            <Link to="/missions" className="card-link">
                                En savoir plus <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION TÉMOIGNAGES */}
            <section className="section-testimonials">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title text-center">Ce qu'ils en disent</h2>
                    </div>

                    <div className="testimonials-wrapper">
                        <button className="testimonial-nav prev" onClick={prevTestimonial} aria-label="Précédent">
                            <ChevronLeft size={24} />
                        </button>

                        <div className="testimonial-card">
                            <div className="quote-icon">
                                <Quote size={40} />
                            </div>
                            <p className="testimonial-text">
                                {testimonials[activeTestimonial].text}
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    {testimonials[activeTestimonial].author.charAt(0)}
                                </div>
                                <div className="author-info">
                                    <strong>{testimonials[activeTestimonial].author}</strong>
                                    <span>{testimonials[activeTestimonial].role}</span>
                                </div>
                            </div>
                            <div className="testimonial-rating">
                                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                    <span key={i} className="star">★</span>
                                ))}
                            </div>
                        </div>

                        <button className="testimonial-nav next" onClick={nextTestimonial} aria-label="Suivant">
                            <ChevronRight size={24} />
                        </button>

                        <div className="testimonial-dots">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                                    onClick={() => setActiveTestimonial(index)}
                                    aria-label={`Témoignage ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION APPEL À L'ACTION */}
            <section className="section-cta">
                <div className="container">
                    <div className="cta-box">
                        <div className="cta-glow"></div>
                        <div className="cta-content">
                            <h2>Besoin d'aide ou envie d'aider ?</h2>
                            <p>
                                Que vous ayez besoin d'accompagnement ou que vous souhaitiez devenir bénévole/donateur,
                                nous sommes à votre écoute.
                            </p>
                            <div className="cta-buttons">
                                <Link to="/contact" className="btn btn-primary btn-cta">
                                    Nous contacter
                                </Link>
                                <Link to="/don" className="btn btn-outline btn-cta-secondary">
                                    Faire un don
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
