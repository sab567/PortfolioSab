const MentionsLegales = () => {
    return (
        <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '40px', color: 'var(--color-primary)' }}>Mentions Légales</h1>

            <section style={{ marginBottom: '30px' }}>
                <h2>1. Éditeur du site</h2>
                <p>
                    Le présent site est la propriété de l'association <strong>KONLI DÉMARCHES ET HORIZONS</strong>.<br />
                    Association régie par la loi du 1er juillet 1901.<br />
                    <strong>Siège social :</strong> 8 rue de la Solidarité, 75019 Paris.<br />
                    <strong>Email :</strong> alalalala@sss.com<br />
                    <strong>Téléphone :</strong> 01 23 45 67 89
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2>2. Directeur de la publication</h2>
                <p>Le Président de l'association.</p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2>3. Hébergement</h2>
                <p>
                    Ce site est hébergé par [Nom de l'hébergeur], [Adresse de l'hébergeur].
                </p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h2>4. Propriété intellectuelle</h2>
                <p>
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                    Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
            </section>

            <section>
                <h2>5. Données personnelles</h2>
                <p>
                    Les informations recueillies via le formulaire de contact ou le chatbot sont destinées exclusivement à l'association
                    pour répondre à vos demandes. Elles ne sont jamais transmises à des tiers sans votre accord.
                    Conformément à la loi « Informatique et Libertés », vous disposez d'un droit d'accès, de modification et de suppression de vos données.
                </p>
            </section>
        </div>
    );
};

export default MentionsLegales;
