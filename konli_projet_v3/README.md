# 🏥 KONLI - Démarches & Horizons

Je vous souhaite la bienvenue sur le code source officiel du site de l'association **KONLI**.

---

## 🛠️ Configurez votre hébergement (OVH)

Ce projet est conçu pour être hébergé sur un serveur standard type OVH (Apache + PHP).

👉 **[VOIR LE GUIDE DÉTAILLÉ DE DÉPLOIEMENT OVH (GUIDE_OVH.md)](./GUIDE_OVH.md)**

Ce guide vous expliquera comment :
1. Préparer les fichiers avec `npm run build`.
2. Sécuriser votre clé API.
3. Mettre en ligne via FileZilla.

---

## 🏗️ Développement Local

Vous pouvez travailler sur le design du site sur votre ordinateur :

```bash
# 1. Installer les dépendances (la première fois)
npm install

# 2. Lancer le site en mode design
npm run dev
```

⚠️ **Attention pour le ChatBot** : 
Le ChatBot utilise un script PHP (`chat.php`) qui ne fonctionne que sur un vrai serveur (comme OVH). 
Si vous lancez le site avec `npm run dev` sur votre ordinateur, **le ChatBot ne répondra pas**, c'est normal. Il fonctionnera dès qu'il sera en ligne sur OVH.

---

## 🛠️ Personnalisation du contenu

Avant la mise en ligne, pensez à vérifier ces fichiers :

### 1. Clé API
Vous devez avoir une clé API valide. Ne la mettez PAS dans le code. Suivez le guide de sécurité `GUIDE_OVH.md` pour savoir où la placer (`config.php`).

### 2. Informations du site
- **`index.html`** : Mettre à jour les balises Meta pour le SEO (titre, description).
- **`src/components/Footer.jsx`** : Remplacer l'adresse email, le numéro de téléphone et les liens réseaux sociaux.
- **`src/pages/Donation.jsx`** : Mettre à jour le lien HelloAsso.
- **`src/data/siteContext.js`** : Modifier les informations de l'association pour que le ChatBot les connaisse (adresse, horaires, etc.).

### 3. Mentions Légales
- Mettre à jour le fichier `src/pages/MentionsLegales.jsx` avec les vraies informations juridiques.

---

## 📁 Structure du Projet sur le Serveur

Une fois déployé sur OVH, votre dossier `www` ressemblera à ça :

- `assets/` : Les images et styles du site.
- `api/` : Le dossier contenant `chat.php` (le backend du ChatBot).
- `index.html` : La page d'accueil.
- `.htaccess` : Le fichier de configuration technique (ne pas toucher).

Et à la racine de votre hébergement (hors du dossier www) :
- `config.php` : Le fichier contenant votre clé API secrète.