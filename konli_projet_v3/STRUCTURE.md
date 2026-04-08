# 📂 STRUCTURE DU PROJET KONLI

Ce document explique **chaque fichier et dossier** du projet.

---

## 🏠 Fichiers à la Racine

### `index.html`
La page HTML principale du site. C'est le "squelette" dans lequel React injecte tout le contenu.
On y trouve :
- Le titre du site (balise `<title>`)
- Les balises Meta pour le référencement Google (SEO)
- Les balises Open Graph pour l'aperçu quand on partage le lien sur Facebook/WhatsApp
- Le lien vers les polices Google Fonts
- La div `<div id="root">` où React affiche le site

### `package.json`
La "liste de courses" du projet. Il contient :
- Le **nom** du projet
- Les **dépendances** (les outils dont le projet a besoin pour fonctionner) :
  - `react` et `react-dom` : Le framework pour construire l'interface
  - `react-router-dom` : Gère la navigation entre les pages (sans recharger)
  - `lucide-react` : Les icônes utilisées sur le site (flèches, enveloppes, etc.)
  - `fuse.js` : Moteur de recherche (utilisé dans le chatbot pour chercher des infos)
- Les **commandes** disponibles :
  - `npm run dev` : Lancer le site en mode développement
  - `npm run build` : Construire la version finale dans le dossier `dist`

### `package-lock.json`
Le "ticket de caisse" détaillé. Il enregistre les versions exactes de chaque dépendance.
**Ne jamais modifier ce fichier à la main.** Il se met à jour tout seul quand on fait `npm install`.

### `vite.config.js`
Configuration de **Vite**, l'outil qui :
- Lance le serveur de développement (`npm run dev`)
- Compile tout le code en fichiers optimisés (`npm run build`)

Actuellement très simple : il active juste le plugin React.

### `eslint.config.js`
Configuration d'**ESLint**, un outil qui vérifie la qualité du code (erreurs, bonnes pratiques).
Ce fichier est optionnel et ne change rien au site final. C'est un outil pour le futur développeur de votre entreprise.

### `.gitignore`
Liste les fichiers que **Git** doit ignorer.
Par exemple : `node_modules/`, `dist/`, `config.php` (pour ne pas publier la clé API par accident).

### `README.md`
Le **mode d'emploi** du projet. Contient :
- Comment personnaliser le site (clé API, informations de contact, etc.)
- Comment lancer le site en local
- Comment le déployer sur OVH

### `GUIDE_OVH.md`
Le **guide étape par étape** pour déployer le site sur un hébergement OVH :
1. Construire le site (`npm run build`)
2. Se connecter avec FileZilla
3. Placer le fichier `config.php` (clé API) en sécurité
4. Envoyer les fichiers dans le dossier `www`

### `config_sample.php`
Un **modèle** du fichier `config.php` qu'il faudra créer sur le serveur OVH.
Ce fichier ne contient **aucune vraie clé API**. C'est juste un exemple pour se rappeler du format :

<?php
define('GEMINI_API_KEY', 'VOTRE_CLE_API');
?>

### `STRUCTURE.md`
Ce fichier que vous lisez actuellement !

---

## 📁 `public/` — Fichiers envoyés tels quels sur le serveur

Tout ce qui est dans `public/` est copié **sans modification** dans le dossier `dist/` quand on fait `npm run build`.

### `public/.htaccess`
Fichier de configuration pour le serveur **Apache** (utilisé par OVH).
Son rôle : quand un visiteur tape une URL comme `monsite.fr/contact`, le serveur ne trouve pas de vrai fichier "contact".
Ce fichier dit au serveur : "Pas de panique, redirige tout vers `index.html` et laisse React gérer la navigation."
**Sans ce fichier, le site afficherait des erreurs 404 à chaque refresh de page.**

### `public/api/chat.php`
Le **backend du ChatBot**. C'est le seul fichier "serveur" du projet.
Quand un visiteur envoie un message dans le chat :
1. Ce script PHP reçoit le message
2. Il va chercher la clé API dans `../../config.php` (fichier sécurisé hors du dossier public)
3. Il envoie le message au service de génération de réponses
4. Il renvoie la réponse au site
Il essaie plusieurs modèles en cas d'erreur.

### `public/favicon.svg`
L'**icône du site** qui apparaît dans l'onglet du navigateur (le petit logo à côté du titre).

### `public/vite.svg`
Logo Vite par défaut. Peut être supprimé ou remplacé par un logo de l'association.

---

## 📁 `src/` — Le code source React

C'est ici que vit le code que l'on modifie pour changer le site.

### `src/main.jsx`
Le **point d'entrée** de l'application React.
Il fait 3 choses :
1. Importe React
2. Importe le composant `App` (le site entier)
3. L'injecte dans la div `<div id="root">` de `index.html`
C'est ainsi le premier fichier exécuté quand le site se charge.

### `src/App.jsx`
Nous pouvons très facilement l'appelé, le **chef d'orchestre** du site. Il définit :
- Le **Layout** (cadre commun à toutes les pages : Navbar + Footer)
- Les **routes** : quelle URL affiche quelle page
  - `/` → Page d'accueil (Home)
  - `/association` → Page Association
  - `/missions` → Page Missions
  - `/contact` → Page Contact
  - `/don` → Page Don
  - `/mentions-legales` → Page Mentions Légales

### `src/index.css`
Les styles CSS **globaux** du site. Contient :
- Les **variables CSS** (couleurs principales, tailles, etc.)
- Le **reset CSS** (uniformise l'apparence entre navigateurs)
- Les styles de base (police par défaut, couleur de fond, etc.)
- Les animations globales (fade-in, etc.)

---

## 📁 `src/components/` — Les briques réutilisables

Ces composants apparaissent sur **toutes les pages**.

### `Navbar.jsx` + `Navbar.css`
La **barre de navigation** en haut du site :
- Logo KONLI
- Liens vers chaque page
- Menu hamburger sur mobile (3 barres)
- Effet de transparence/flou quand on scrolle

### `Footer.jsx` + `Footer.css`
Le **pied de page** en bas du site :
- Adresse de l'association
- Email et téléphone
- Liens vers les réseaux sociaux
- Lien vers les mentions légales
- Copyright

### `ChatBot.jsx` + `ChatBot.css`
Le **ChatBot IA** complet :
- La bulle flottante en bas à droite pour ouvrir le chat
- La fenêtre de conversation
- L'envoi des messages vers `chat.php`
- L'affichage des réponses avec mise en forme (titres, listes)
- Le bouton de réinitialisation
- L'indicateur "en train d'écrire..."
- La gestion des erreurs (connexion, API, etc.)

### `Layout.jsx`
Le **cadre commun** à toutes les pages. Il assemble :
- La Navbar (en haut)
- Le contenu de la page (au milieu, change selon l'URL)
- Le Footer (en bas)
- Le ChatBot (flottant par dessus)

Toutes les pages passent par ce Layout automatiquement.

---

## 📁 `src/pages/` — Les pages du site

Chaque page a un fichier `.jsx` (le contenu) et un fichier `.css` (le style).

### `Home.jsx` + `Home.css`
**Page d'Accueil** — La première page que les visiteurs voient :
- Le Hero (grande bannière avec le slogan et bouton d'action)
- Les cartes de présentation des services
- Les chiffres clés de l'association
- Les témoignages

### `Association.jsx` + `Association.css`
**Page L'Association** — Présentation de KONLI :
- Histoire et origine
- Valeurs et philosophie
- L'équipe

### `Missions.jsx` + `Missions.css`
**Page Nos Missions** — Ce que fait l'association :
- Accueil des migrants
- Accompagnement administratif
- Cours de français
- Insertion professionnelle

### `Contact.jsx` + `Contact.css`
**Page Contact** — Comment joindre l'association :
- Formulaire de contact
- Adresse postale
- Plan / localisation
- Horaires d'ouverture

### `Donation.jsx` + `Donation.css`
**Page Faire un Don** — Encourager les dons :
- Explication de l'utilisation des fonds
- Bouton vers HelloAsso (plateforme de paiement)
- Informations sur la déduction fiscale

### `MentionsLegales.jsx`
**Page Mentions Légales** — Obligations juridiques :
- Nom et siège social de l'association
- Responsable de publication
- Hébergeur du site
- Politique de confidentialité
(Pas de fichier CSS séparé, utilise les styles globaux)

---

## 📁 `src/data/` — Les données

### `siteContext.js`
Le **fichier de données** du ChatBot. Ce fichier contient TOUTES les informations que l'assistant connaît sur KONLI :
- Identité de l'association
- Adresse et contact
- Missions et services
- Horaires
- Comment faire un don
- Comment devenir bénévole

**Si une information change** (nouvelle adresse, nouveaux horaires), c'est ICI qu'il faut la modifier pour que le ChatBot donne la bonne réponse.

---

## 📁 `src/assets/` — Les ressources statiques

### `react.svg`
Logo React par défaut (non utilisé dans le site). Peut être supprimé.

### `images/`
Dossier prévu pour stocker les images du site (photos de l'équipe, logos partenaires, etc.).

---

## 📁 Dossiers générés automatiquement

### `node_modules/`
Contient toutes les librairies installées par `npm install` (~200 Mo, des milliers de fichiers).
**Ne JAMAIS envoyer ce dossier sur OVH.** Il sert uniquement pendant le développement.

### `dist/`
Le site **compilé et optimisé**, prêt à être mis en ligne. Créé par `npm run build`.
C'est le contenu de **ce dossier** (pas le dossier lui-même) qu'on envoie sur OVH dans `www/`.
Il contient :
- `index.html` : La page HTML
- `assets/` : Le CSS et JavaScript compressés
- `api/chat.php` : Copie du backend ChatBot
- `.htaccess` : Copie de la config Apache