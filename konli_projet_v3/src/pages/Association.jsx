import './Association.css';

// Page des statuts de l'association
const Association = () => {
    return (
        <div className="association-page">
            <div className="container page-content">

                {/* EN-TÊTE DE SECTION */}
                <header className="page-header">
                    <h1>Statuts de l'Association</h1>
                    <p className="subtitle">
                        Association régie par la loi du 1er juillet 1901 et le décret du 16 août 1901.
                    </p>
                </header>

                {/* CONTENU DES ARTICLES */}
                <div className="articles-container">

                    <article className="statuts-article">
                        <h2>ARTICLE 1 - Constitution</h2>
                        <p>
                            Il est fondé entre les adhérents aux présents statuts et ceux qui y adhéreront ultérieurement,
                            une association régie par la loi du 1er juillet 1901 et le décret du 16 août 1901.
                        </p>
                    </article>

                    <article className="statuts-article">
                        <h2>ARTICLE 2 - Dénomination</h2>
                        <p>
                            L'association a pour dénomination : <strong>KONLI DÉMARCHES ET HORIZONS</strong>.
                        </p>
                    </article>

                    <article className="statuts-article">
                        <h2>ARTICLE 3 - Objet</h2>
                        <p>L'association a pour objet :</p>
                        <ul>
                            <li>
                                Accompagner et soutenir les personnes en situation de vulnérabilité, en particuliers migrants et réfugiés,
                                dans leurs démarches administratives en ligne, afin de faciliter leur intégration et leur autonomie dans la société ;
                            </li>
                            <li>
                                Créer des espaces d'échanges et de solidarité entre la France et l'Afrique pour promouvoir la coopération,
                                le partage de compétences et la construction de réseaux communautaires et professionnels ;
                            </li>
                            <li>
                                Développer les actions de solidarité internationale en Afrique.
                            </li>
                        </ul>
                    </article>

                    <article className="statuts-article">
                        <h2>ARTICLE 4 - Siège Social</h2>
                        <p>
                            Le siège de l'association est fixé au :<br />
                            <strong>8 rue de la Solidarité<br />
                                75019 Paris</strong>
                        </p>
                        <p className="note">
                            Il pourra être transféré en tout autre lieu par simple décision du Conseil d'Administration.
                        </p>
                    </article>

                    <article className="statuts-article">
                        <h2>ARTICLE 5 - Durée</h2>
                        <p>
                            L'association est constituée pour une durée indéfinie.
                        </p>
                    </article>

                    <article className="statuts-article">
                        <h2>ARTICLE 6 - Moyens d'action</h2>
                        <p>
                            Les moyens d'action de l'association sont :
                        </p>
                        <ul>
                            <li>L'étude et la recherche</li>
                            <li>La formation</li>
                            <li>L'édition</li>
                            <li>Les manifestations et les rencontres</li>
                            <li>Et généralement tout ce qui permettra à l'association de poursuivre ses buts.</li>
                        </ul>
                    </article>

                    <article className="statuts-article">
                        <h2>ARTICLE 7 - Membres</h2>
                        <p>L'association se compose de :</p>
                        <ul>
                            <li>
                                <strong>Membres fondateurs :</strong> sont membres fondateurs de l'association les membres adhérents
                                qui ont participé à la constitution et dont la liste est annexée. Les membres fondateurs sont exemptés de cotisation annuelle.
                            </li>
                        </ul>
                    </article>

                </div>
            </div>
        </div>
    );
};

export default Association;
