import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Clock, Users } from 'lucide-react';
import './Contact.css';

// Page de contact
const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: 'Besoin d\'aide administrative',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulation d'envoi
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className="contact-page">
            <div className="page-header contact-header">
                <div className="container">
                    <h1>Contactez-nous</h1>
                    <p>Nous sommes à votre écoute pour répondre à vos questions et vous accompagner.</p>
                </div>
            </div>

            <div className="container contact-container">
                {/* INFO COLONNE GAUCHE */}
                <div className="contact-info">
                    <div className="info-intro">
                        <h2>Discutons de votre projet</h2>
                        <p>
                            Vous avez besoin d'aide ? Vous souhaitez rejoindre l'association en tant que bénévole ?
                            N'hésitez pas à nous écrire ou à venir nous voir.
                        </p>
                    </div>

                    <div className="info-cards">
                        <div className="info-item">
                            <div className="info-icon">
                                <MapPin size={24} />
                            </div>
                            <div className="info-content">
                                <h3>Notre Siège</h3>
                                <p>8 rue de la Solidarité<br />75019 Paris</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Mail size={24} />
                            </div>
                            <div className="info-content">
                                <h3>Email</h3>
                                <a href="mailto:contact@konli.org">contact@konli.org</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Phone size={24} />
                            </div>
                            <div className="info-content">
                                <h3>Téléphone</h3>
                                <a href="tel:+33123456789">01 23 45 67 89</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Clock size={24} />
                            </div>
                            <div className="info-content">
                                <h3>Horaires</h3>
                                <p>Lun - Ven : 9h - 18h<br />Sam : 10h - 14h</p>
                            </div>
                        </div>
                    </div>

                    {/* CARTE GOOGLE MAP */}
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.475470002166!2d2.389718476722285!3d48.88725897133604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66dca06d9d06d%3A0xe5a206b12204d80d!2s8%20Rue%20de%20la%20Solidarit%C3%A9%2C%2075019%20Paris!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                            width="100%"
                            height="250"
                            style={{ border: 0, borderRadius: '12px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localisation du siège"
                        ></iframe>
                    </div>
                </div>

                {/* FORMULAIRE COLONNE DROITE */}
                <div className="contact-form-wrapper">
                    {isSubmitted ? (
                        <div className="success-message">
                            <div className="success-icon">
                                <CheckCircle size={60} />
                            </div>
                            <h2>Message envoyé !</h2>
                            <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais, généralement sous 48h.</p>
                            <button
                                className="btn btn-outline"
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setFormState({ name: '', email: '', subject: 'Besoin d\'aide administrative', message: '' });
                                }}
                            >
                                Envoyer un autre message
                            </button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <h2>Envoyez-nous un message</h2>

                            <div className="form-group">
                                <label htmlFor="name">Nom complet</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    placeholder="Votre nom"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder="votre@email.com"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Sujet</label>
                                <select
                                    id="subject"
                                    value={formState.subject}
                                    onChange={handleChange}
                                >
                                    <option>Besoin d'aide administrative</option>
                                    <option>Devenir bénévole</option>
                                    <option>Information sur les dons</option>
                                    <option>Partenariat</option>
                                    <option>Autre</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    required
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    value={formState.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary btn-submit ${isSubmitting ? 'loading' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        Envoyer
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
