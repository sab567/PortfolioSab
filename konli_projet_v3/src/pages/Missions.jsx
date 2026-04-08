import { useEffect, useRef, useState } from 'react';
import { Monitor, Users, Globe, CheckCircle2 } from 'lucide-react';
import './Missions.css';

// Hook pour révéler les éléments au scroll
const useReveal = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
};

const MissionBlock = ({ icon: Icon, title, description, items, image, imageAlt, reverse }) => {
    const [ref, isVisible] = useReveal();

    return (
        <div ref={ref} className={`mission-block ${reverse ? 'reverse' : ''} ${isVisible ? 'visible' : ''}`}>
            <div className="mission-image">
                <img src={image} alt={imageAlt} loading="lazy" />
                <div className="image-overlay"></div>
            </div>
            <div className="mission-details">
                <div className="mission-icon">
                    <Icon size={32} />
                </div>
                <h2>{title}</h2>
                <p>{description}</p>
                {items && (
                    <ul className="mission-list">
                        {items.map((item, index) => (
                            <li key={index}>
                                <CheckCircle2 size={18} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const Missions = () => {
    return (
        <div className="missions-page">
            <div className="page-header missions-header">
                <div className="container">
                    <h1>Nos Missions</h1>
                    <p>Des actions concrètes pour l'intégration et la solidarité internationale.</p>
                </div>
            </div>

            <div className="container missions-content">
                <MissionBlock
                    icon={Monitor}
                    title="Accompagnement Administratif Numérique"
                    description="La dématérialisation des services publics peut être une barrière infranchissable. KONLI DÉMARCHES & HORIZONS propose des permanences pour aider à la constitution de dossiers en ligne : titres de séjour, demandes d'asile, accès aux soins (AME/PUMA), et allocations."
                    items={[
                        "Aide à la navigation sur les portails officiels",
                        "Numérisation et stockage sécurisé des documents",
                        "Rédaction de courriers administratifs"
                    ]}
                    image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000"
                    imageAlt="Aide administrative"
                />

                <MissionBlock
                    icon={Users}
                    title="Réseaux de Solidarité France-Afrique"
                    description="L'intégration ne se fait pas seule. Nous tissons des liens entre les communautés pour favoriser l'entraide et le partage de compétences."
                    items={[
                        "Le mentorat professionnel pour les nouveaux arrivants",
                        "Des ateliers d'échanges culturels",
                        "La mise en réseau avec des employeurs solidaires"
                    ]}
                    image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000"
                    imageAlt="Communauté solidaire"
                    reverse
                />

                <MissionBlock
                    icon={Globe}
                    title="Actions Internationales"
                    description="Notre engagement dépasse les frontières. Nous soutenons des projets locaux en Afrique dans les domaines de l'éducation et de la santé, créant un pont durable entre nos deux continents."
                    items={[
                        "Soutien aux écoles et centres de formation",
                        "Projets de santé communautaire",
                        "Transfert de compétences Nord-Sud"
                    ]}
                    image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000"
                    imageAlt="Solidarité internationale"
                />
            </div>

            {/* Section supplémentaire - Rejoindre */}
            <section className="join-section">
                <div className="container">
                    <div className="join-content">
                        <h2>Rejoignez notre équipe de bénévoles</h2>
                        <p>Votre temps et vos compétences peuvent changer des vies. Que vous soyez juriste, traducteur, informaticien ou simplement bienveillant, il y a une place pour vous.</p>
                        <a href="/contact" className="btn btn-primary">Devenir bénévole</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Missions;
