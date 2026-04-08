import { useState } from 'react';
import { Heart, CreditCard, Banknote, FileText, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Donation.css';

// Page de dons
const Donation = () => {
    const [selectedAmount, setSelectedAmount] = useState(50);
    const suggestedAmounts = [20, 50, 100, 200];

    return (
        <div className="donation-page">
            <div className="donation-header">
                <div className="container">
                    <div className="header-content">
                        <span className="header-badge">
                            <Sparkles size={16} />
                            Défiscalisation 66%
                        </span>
                        <h1>Votre soutien change des vies</h1>
                        <p>Aidez-nous à financer les démarches administratives et les projets de solidarité internationale.</p>
                    </div>
                </div>
            </div>

            <div className="container donation-content">
                {/* Section montants suggérés */}
                <div className="amount-selector">
                    <h2>Choisissez votre don</h2>
                    <p className="amount-subtitle">Sélectionnez un montant ou entrez une valeur personnalisée</p>

                    <div className="amount-grid">
                        {suggestedAmounts.map((amount) => (
                            <button
                                key={amount}
                                className={`amount-btn ${selectedAmount === amount ? 'selected' : ''}`}
                                onClick={() => setSelectedAmount(amount)}
                            >
                                <span className="amount-value">{amount}€</span>
                                <span className="amount-real">Soit {Math.round(amount * 0.34)}€ après déduction</span>
                                {amount === 50 && <span className="popular-badge">Populaire</span>}
                            </button>
                        ))}
                    </div>

                    <a
                        href="https://www.helloasso.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-donate"
                    >
                        <Heart size={20} fill="white" />
                        Faire un don de {selectedAmount}€
                    </a>

                    <div className="secure-info">
                        <CheckCircle size={16} />
                        <span>Paiement 100% sécurisé via HelloAsso</span>
                    </div>
                </div>

                {/* Options alternatives */}
                <div className="donation-options">
                    <h3>Autres moyens de nous soutenir</h3>

                    <div className="options-grid">
                        {/* Virement */}
                        <div className="donation-card">
                            <div className="icon-wrapper">
                                <Banknote size={32} />
                            </div>
                            <h4>Virement Bancaire</h4>
                            <p>Pour les dons réguliers ou importants.</p>
                            <div className="bank-details">
                                <div className="detail-row">
                                    <span className="label">IBAN</span>
                                    <span className="value">FR76 0000 0000 0000 0000 0000 000</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">BIC</span>
                                    <span className="value">XXXXXXXXXXX</span>
                                </div>
                            </div>
                            <p className="note">Indiquez "DON + Votre Nom" en libellé</p>
                        </div>

                        {/* Chèque */}
                        <div className="donation-card">
                            <div className="icon-wrapper">
                                <FileText size={32} />
                            </div>
                            <h4>Par Chèque</h4>
                            <p>À l'ordre de <strong>KONLI DÉMARCHES ET HORIZONS</strong></p>
                            <address className="address">
                                8 rue de la Solidarité<br />
                                75019 Paris
                            </address>
                        </div>
                    </div>
                </div>

                {/* Info fiscale */}
                <div className="tax-info">
                    <div className="tax-icon">📢</div>
                    <div className="tax-content">
                        <h3>Information Fiscale</h3>
                        <p>
                            KONLI DÉMARCHES ET HORIZONS étant une association d'intérêt général,
                            vos dons vous donnent droit à une réduction d'impôt de <strong>66%</strong> du montant versé.
                        </p>
                        <div className="tax-example">
                            <span>Exemple : Un don de 100€ ne vous coûte réellement que <strong>34€</strong></span>
                        </div>
                    </div>
                </div>

                {/* Redirection contact */}
                <div className="contact-redirect">
                    <p>Une question sur les dons ?</p>
                    <Link to="/contact" className="contact-link">Contactez notre trésorier →</Link>
                </div>
            </div>
        </div>
    );
};

export default Donation;