/* ══════════════════════════════════════════════════════════════════════════════
   LA GRANDE DAME SABETHA POOTHAPILLAI      
   ══════════════════════════════════════════════════════════════════════════════
   
   Hey ! nous nous retrouvons ! voici donc les commentaires pour t'aider à comprendre ce code
   
   Ce fichier contient TOUTE la logique interactive du site :
   - La barre de navigation qui change au scroll
   - Le menu hamburger pour mobile
   - Les animations d'apparition au scroll (reveal)
   - L'effet machine à écrire sur la page d'accueil
   - Le carrousel de veille technologique
   - L'effet 3D sur les cartes projets
   - Les particules flottantes dans le hero
   - Le curseur lumineux qui suit la souris
   - L'effet magnétique sur les boutons
   - La barre de progression en haut de page
   - L'accordéon pour la section Stages
   - Le formulaire de contact
   
   En gros, tout ce qui bouge et réagit sur le site, c'est ici ! 💫 (le fameux emoji... familier n'est-ce pas ?)
   ══════════════════════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────────────────────
   🎯 ACCORDÉON DES STAGES
   ─────────────────────────────────────────────────────────────────────────────
   Cette fonction est écrite ICI (tout en haut, en dehors du reste du code)
   parce qu'elle est appelée directement depuis le HTML quand on clique
   sur un en-tête de stage.
   
   En gros quand tu cliques sur un stage :
   1. Le code regarde si le panneau est ouvert ou fermé
   2. Si c'était ouvert → il le ferme
   3. Si c'était fermé → il l'ouvre
   4. L'animation d'ouverture/fermeture est gérée par le CSS (pas ici)
   
   "button" c'est juste le bouton sur lequel on a cliqué
   ───────────────────────────────────────────────────────────────────────────── */
function toggleStage(button) {
  // On vérifie si le panneau est actuellement ouvert
  // (le navigateur stocke cette info dans un truc qui s'appelle "aria-expanded", true = ouvert, false = fermé)
  var expanded = button.getAttribute('aria-expanded') === 'true';

  // On inverse : si c'était true → on met false, et inversement
  button.setAttribute('aria-expanded', !expanded);

  // Le contenu qui se déplie est juste en dessous du bouton dans le HTML
  // nextElementSibling veut dire "l'élément qui vient juste après le bouton"
  var body = button.nextElementSibling;

  // Si c'était ouvert → on enlève la classe "open" pour le fermer
  // Si c'était fermé → on ajoute la classe "open" pour l'ouvrir
  // (c'est le CSS qui se charge de faire l'animation jolie, pas le JavaScript)
  if (expanded) {
    body.classList.remove('open');
  } else {
    body.classList.add('open');
  }
}


/* ═════════════════════════════════════════════════════════════════════════════
   🚀 TOUT CE QUI SE PASSE QUAND LA PAGE EST PRÊTE
   ═════════════════════════════════════════════════════════════════════════════
   
   "DOMContentLoaded" c'est un signal que le navigateur envoie pour dire :
   "C'est bon, la page est chargée, tu peux commencer à tout modifier !"
   
   On met TOUT le reste du code dans ce bloc pour être sûre que tous les
   éléments de la page existent déjà quand on essaie de les modifier.
   Sinon JavaScript essaierait de toucher quelque chose qui n'est pas encore là
   ce qui provoquerait un crash 
   ═════════════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {


  /* ─────────────────────────────────────────────────────────────────────────
     📌 BARRE DE NAVIGATION — Effet au scroll
     ─────────────────────────────────────────────────────────────────────────
     Quand tu scrolles la page, deux choses se passent :
     
     1. La navbar change de style (fond blanc, ombre) → classe "scrolled"
        Ça donne un effet "la navbar se fige en haut" très propre
     
     2. Le lien de la section visible devient actif (souligné / coloré)
        Comme ça tu sais toujours où tu es sur la page 
     
     Comment on détecte la section active :
     - On parcourt toutes les sections de la page
     - Pour chaque section, on regarde si on a scrollé au-delà de son début
     - La dernière section qui "passe" devient la section active
     ───────────────────────────────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');
  const sections = document.querySelectorAll('.section');

  function handleScroll() {
    // Si on a scrollé de plus de 50px → on ajoute le style "navbar fixée"
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Détection de la section actuellement visible à l'écran
    let current = '';
    sections.forEach(function (section) {
      // On prend le haut de la section moins 120px (pour anticiper un peu)
      var sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    // On met à jour le lien actif dans la navbar
    navLinks.forEach(function (link) {
      link.classList.remove('active');  // On enlève "active" de tous les liens
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');   // On l'ajoute seulement au bon lien
      }
    });
  }

  // On demande au navigateur de surveiller quand l'utilisateur scrolle
  // { passive: true } c'est juste un réglage pour que ça rame pas
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();  // On vérifie une première fois au chargement


  /* ─────────────────────────────────────────────────────────────────────────
     📱 MENU MOBILE (Hamburger)
     ─────────────────────────────────────────────────────────────────────────
     Sur mobile, la navbar se transforme en menu hamburger (les 3 petites barres).
     
     Quand on clique dessus :
     - Le menu s'ouvre/se ferme (toggle de la classe "open")
     - Le body est bloqué (overflow: hidden) pour pas scroller en arrière-plan
     
     Quand on clique sur un lien du menu :
     - Le menu se ferme automatiquement (sinon il resterait ouvert, pas cool)
     ───────────────────────────────────────────────────────────────────────── */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');  // Animation du hamburger → croix
    navMenu.classList.toggle('open');    // Affiche/cache le menu
    // Si le menu est ouvert, on bloque le scroll de la page (pour pas scroller derrière le menu)
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Fermer le menu quand on clique sur un lien (sinon on reste bloquée)
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // encore une fois, pour le cas de l'oral, ce n'est pas très utile, mais je met sa au cas ou tu souhaite plus tard reutilisé portfolio, et au moment ou sa deviens professionnel, sa pourrais t'etre utile

  /* ─────────────────────────────────────────────────────────────────────────
     🔗 SMOOTH SCROLL (Défilement fluide)
     ─────────────────────────────────────────────────────────────────────────
     Quand on clique sur un lien qui pointe vers une ancre (#quelquechose),
     au lieu de téléporter brutalement, la page défile doucement jusqu'à
     la section visée. C'est beaucoup plus agréable visuellement 
     
     Le offset de 80px sert à ne pas coller la section contre le haut de
     l'écran (sinon la navbar la cacherait).
     ───────────────────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();  // On empêche le saut brutal vers la section
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var offset = 80;  // On laisse 80px de marge en haut (sinon la navbar cacherait le début)
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;  // On calcule où est la section
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'  // ✨ La magie du défilement fluide
        });
      }
    });
  });


  /* ─────────────────────────────────────────────────────────────────────────
     ✨ ANIMATIONS D'APPARITION AU SCROLL (Reveal)
     ─────────────────────────────────────────────────────────────────────────
     C'est ce qui fait que les éléments apparaissent progressivement quand
     tu scrolles vers le bas ! Super stylé ✨ (encore une fois, un autre fameux emoji...)
     
     Comment ça marche (en très simple) :
     1. Au départ, les éléments sont invisibles et décalés vers le bas
     2. Le navigateur a un outil qui détecte quand un élément arrive sur l'écran
     3. Dès qu'il le voit → il lui ajoute la classe "visible"
     4. Le CSS fait le reste : l'élément apparaît doucement et remonte à sa place
     
     Si le navigateur est trop vieux et ne sait pas détecter ça,
     on affiche tout directement (pas d'animation mais au moins ça marche).
     ───────────────────────────────────────────────────────────────────────── */
  var revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  var revealElements = document.querySelectorAll(revealSelectors);

  // On utilise un outil du navigateur qui détecte quand un élément apparaît à l'écran
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {                // Si l'élément est visible à l'écran...
          entry.target.classList.add('visible');   // ...on le rend visible !
          revealObserver.unobserve(entry.target);  // Et on arrête de le surveiller (c'est fait, pas besoin de le refaire)
        }
      });
    }, {
      threshold: 0.1,                    // Il suffit que 10% de l'élément soit visible pour déclencher
      rootMargin: '0px 0px -60px 0px'    // On attend un peu avant le bord de l'écran
    });

    // On dit au navigateur de surveiller chaque élément qui a la classe "reveal"
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Si le navigateur est trop vieux : on affiche tout directement
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🎭 ANIMATION EN CASCADE ("stagger" en anglais)
     ─────────────────────────────────────────────────────────────────────────
     Au lieu que tous les éléments d'une grille apparaissent en même temps,
     on ajoute un petit délai croissant à chaque élément :
     - Le 1er élément apparaît à 0s
     - Le 2e à 0.1s
     - Le 3e à 0.2s
     - etc.
     
     Ça donne un effet "cascade" ou "domino" très joli !
     On applique ça aux cartes formation, projets et compétences.
     ───────────────────────────────────────────────────────────────────────── */
  var staggerContainers = [
    '.education-grid',   // Les cartes de formation
    '.projects-grid',    // Les cartes de projets
    '.skills-tags'       // Les tags de compétences
  ];

  staggerContainers.forEach(function (selector) {
    var container = document.querySelector(selector);
    if (container) {
      var children = container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .edu-card, .project-card, .skill-tag');
      children.forEach(function (child, index) {
        // Chaque élément attend un peu plus longtemps que le précédent (0.1 seconde de plus)
        child.style.transitionDelay = (index * 0.1) + 's';
      });
    }
  });


  /* ─────────────────────────────────────────────────────────────────────────
     📊 BARRES DE COMPÉTENCES ANIMÉES
     ─────────────────────────────────────────────────────────────────────────
     Les barres de compétences (genre HTML/CSS, JS, etc.) se remplissent 
     avec une animation quand elles arrivent à l'écran.
     
     Pareil que plus haut, on utilise le même outil du navigateur pour détecter
     quand la barre apparaît, et là on la remplit jusqu'au bon pourcentage.
     ───────────────────────────────────────────────────────────────────────── */
  var skillBars = document.querySelectorAll('.skill-bar-fill');

  if ('IntersectionObserver' in window) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var targetWidth = bar.getAttribute('data-width');  // On récupère le pourcentage écrit dans le HTML
          // On attend un tout petit peu (200 millisecondes) pour que l'animation soit plus jolie
          setTimeout(function () {
            bar.style.width = targetWidth + '%';  // Et hop, on remplit la barre !
          }, 200);
          skillObserver.unobserve(bar);  // C'est fait, on arrête de surveiller cette barre
        }
      });
    }, { threshold: 0.5 });  // La barre doit être à moitié visible sur l'écran pour que ça se déclenche

    skillBars.forEach(function (bar) {
      skillObserver.observe(bar);
    });
  } else {
    // Si le navigateur est trop vieux : les barres s'affichent directement remplies
    skillBars.forEach(function (bar) {
      bar.style.width = bar.getAttribute('data-width') + '%';
    });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     📬 FORMULAIRE DE CONTACT (avec Formspree)
     ─────────────────────────────────────────────────────────────────────────
     Formspree c'est un service gratuit qui permet d'envoyer des emails
     depuis un formulaire HTML sans avoir besoin de créer un serveur.
     
     ⚠️ IMPORTANT : il faut remplacer {VOTRE_ID} dans le HTML par ton vrai
     ID Formspree.
     
     Ce code ici gère juste le petit effet visuel après l'envoi :
     - Le bouton change de texte → "Message envoyé ✓"
     - Il devient vert
     - Après 3 secondes, tout revient à la normale
     ───────────────────────────────────────────────────────────────────────── */
  var contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function () {

    var btn = contactForm.querySelector('button[type="submit"]');
    var originalText = btn.innerHTML;

    // ⏳ Pendant l’envoi
    btn.innerHTML = '<span>Envoi en cours...</span>';
    btn.disabled = true;

    // ✅ Feedback visuel après un petit délai (optionnel mais plus réaliste)
    setTimeout(function () {
      btn.innerHTML = '<span>Message envoyé ✓</span>';
      btn.style.background = 'linear-gradient(135deg, #34d399 0%, #059669 100%)';
      btn.style.boxShadow = '0 4px 15px rgba(52, 211, 153, 0.35)';
    }, 800);

    // 🔄 Reset après 3 secondes
    setTimeout(function () {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.boxShadow = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);

  });
}

  /* ─────────────────────────────────────────────────────────────────────────
     🌀 MOUVEMENT DES FORMES DANS LE HERO
     ─────────────────────────────────────────────────────────────────────────
     Les gros cercles flous dans la section d'accueil bougent doucement
     quand tu déplaces ta souris. Ça donne un effet de profondeur, comme si
     les formes étaient à des distances différentes.
     
     En gros :
     1. On suit la position de la souris
     2. On fait bouger chaque forme en fonction de cette position
     3. Chaque forme bouge plus ou moins vite (pour l'effet de profondeur)
     4. Le mouvement est doux et pas brusque grâce à un calcul spécial
     
     ⚡ Seulement sur ordinateur (> 768px), sinon c'est trop lourd sur mobile.
     ───────────────────────────────────────────────────────────────────────── */
  var heroSection = document.querySelector('.hero');
  var shapes = document.querySelectorAll('.shape');

  if (window.innerWidth > 768) {
    var mouseX = 0, mouseY = 0;       // Position souhaitée (la souris)
    var currentX = 0, currentY = 0;   // Position actuelle (suit avec du retard)

    heroSection.addEventListener('mousemove', function (e) {
      // Convertir la position de la souris en valeur entre -1 et 1
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Boucle d'animation — le navigateur appelle cette fonction environ 60 fois par seconde
    function animateShapes() {
      // On avance doucement vers la position de la souris (6% du chemin restant à chaque fois)
      // C'est ça qui donne le mouvement doux et pas brusque
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      shapes.forEach(function (shape, index) {
        // Plus l'index est grand, plus la forme bouge → effet de profondeur
        var speed = (index + 1) * 15;
        shape.style.transform = 'translate(' + (currentX * speed) + 'px, ' + (currentY * speed) + 'px)';
      });
      requestAnimationFrame(animateShapes);  // On redit au navigateur de rappeler cette fonction
    }
    animateShapes();
  }


  /* ─────────────────────────────────────────────────────────────────────────
     ⌨️ EFFET MACHINE À ÉCRIRE (Typed effect)
     ─────────────────────────────────────────────────────────────────────────
     Le texte "Bonjour, je suis" dans le hero s'affiche lettre par lettre,
     comme si quelqu'un le tapait en temps réel. Trop stylé  🔥 (encore un emoji très familier...)
     
     Comment ça marche :
     1. On prend le texte initial et on le sauvegarde
     2. On vide le contenu de l'élément
     3. On ajoute une lettre toutes les 60ms
     4. Quand c'est fini, on arrête
     
     Le setTimeout de 600ms au début = petit délai avant que ça commence,
     pour laisser le temps à la page de se charger visuellement.
     ───────────────────────────────────────────────────────────────────────── */
  var greeting = document.querySelector('.hero-greeting');
  if (greeting) {
    var text = greeting.textContent;
    greeting.textContent = '';
    greeting.style.opacity = '1';
    var i = 0;

    // Créer le curseur clignotant
    var cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = 'animation: cursorBlink 0.8s ease-in-out infinite; color: var(--rose-500); font-weight: 300; margin-left: 2px;';
    greeting.appendChild(cursor);

    // Ajouter l'animation du curseur
    var cursorStyle = document.createElement('style');
    cursorStyle.textContent = '@keyframes cursorBlink{0%,100%{opacity:1;}50%{opacity:0;}}';
    document.head.appendChild(cursorStyle);

    function typeWriter() {
      if (i < text.length) {
        // Insérer le caractère AVANT le curseur
        greeting.insertBefore(document.createTextNode(text.charAt(i)), cursor);
        i++;
        setTimeout(typeWriter, 60);
      } else {
        // Après 3 secondes, le curseur disparaît lentement
        setTimeout(function () {
          cursor.style.transition = 'opacity 1s ease';
          cursor.style.opacity = '0';
          setTimeout(function () { cursor.remove(); }, 1000);
        }, 3000);
      }
    }

    setTimeout(typeWriter, 600);
  }


  /* ─────────────────────────────────────────────────────────────────────────
     📰 CARROUSEL DE VEILLE TECHNOLOGIQUE
     ─────────────────────────────────────────────────────────────────────────
     La section Veille contient plusieurs pages d'articles.
     Au lieu de tout afficher d'un coup (trop long), on les pagine (on les sépare en plusieurs pages).
     
     Le système :
     - Chaque "page" est un div .Veille-page avec plusieurs cartes
     - Seule la page "active" est affichée
     - Les boutons Prev/Next permettent de naviguer
     - Les petits points (dots) en bas aussi
     - Un compteur "Page 1 / 3" indique où on en est
     
     goToPage(page) gère tout :
     1. Cache la page actuelle
     2. Affiche la nouvelle page
     3. Met à jour les points et le compteur
     4. Active/désactive les boutons prev/next
     5. Re-déclenche les animations d'apparition sur les nouvelles cartes
     6. Fait un smooth scroll vers le haut de la section Veille
     ───────────────────────────────────────────────────────────────────────── */
  var veillePages = document.querySelectorAll('.veille-page');
  var veilleDots = document.querySelectorAll('.veille-dot');
  var veillePrev = document.getElementById('veillePrev');
  var veilleNext = document.getElementById('veilleNext');
  var veilleCounter = document.getElementById('veilleCounter');
  var currentPage = 0;
  var totalPages = veillePages.length;

  function goToPage(page) {
    // Sécurité : on ne peut pas aller en-dessous de 0 ou au-delà du max
    if (page < 0 || page >= totalPages) return;

    // On cache la page actuelle
    veillePages[currentPage].classList.remove('active');
    veilleDots[currentPage].classList.remove('active');

    // On affiche la nouvelle page
    currentPage = page;
    veillePages[currentPage].classList.add('active');
    veilleDots[currentPage].classList.add('active');

    // On grise les boutons prev/next quand on est au début/fin
    veillePrev.disabled = currentPage === 0;
    veilleNext.disabled = currentPage === totalPages - 1;

    // On met à jour le compteur "Page X / Y"
    if (veilleCounter) {
      veilleCounter.textContent = 'Page ' + (currentPage + 1) + ' / ' + totalPages;
    }

    // On re-déclenche les animations d'apparition sur les nouvelles cartes
    // (sinon elles apparaîtraient d'un coup sans animation)
    var newCards = veillePages[currentPage].querySelectorAll('.veille-item');
    newCards.forEach(function (card, i) {
      card.classList.remove('visible');
      card.style.transitionDelay = (i * 0.1) + 's';  // Effet cascade
      setTimeout(function () {
        card.classList.add('visible');
      }, 50);
    });

    // On scroll doucement vers le haut de la section Veille
    var veilleSection = document.getElementById('veille');
    if (veilleSection) {
      var offset = 100;
      var targetPos = veilleSection.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  }

  // Boutons précédent / suivant
  if (veillePrev && veilleNext) {
    veillePrev.addEventListener('click', function () {
      goToPage(currentPage - 1);
    });

    veilleNext.addEventListener('click', function () {
      goToPage(currentPage + 1);
    });
  }

  // Navigation par les petits points (dots)
  veilleDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var page = parseInt(this.getAttribute('data-page'));
      goToPage(page);
    });
  });

  // Animation d'entrée pour les cartes de la première page au chargement
  var firstPageCards = veillePages[0] ? veillePages[0].querySelectorAll('.veille-item') : [];
  firstPageCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.1) + 's';
  });


  /* ─────────────────────────────────────────────────────────────────────────
     🃏 EFFET 3D SUR LES CARTES PROJETS
     ─────────────────────────────────────────────────────────────────────────
     Quand tu mets ta souris sur une carte projet, elle s'incline légèrement
     en 3D dans la direction de ta souris. Ça donne un effet hyper cool !
     
     En gros :
     1. On regarde où est ta souris par rapport au centre de la carte
     2. Plus ta souris est loin du centre, plus la carte s'incline (max 5°)
     3. Quand ta souris quitte la carte, elle revient doucement à plat
     
     ⚡ Seulement sur ordinateur, pas de survol sur mobile.
     ───────────────────────────────────────────────────────────────────────── */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;       // Position X de la souris dans la carte
        var y = e.clientY - rect.top;        // Position Y de la souris dans la carte
        var centerX = rect.width / 2;        // Centre horizontal de la carte
        var centerY = rect.height / 2;       // Centre vertical de la carte

        // Calcul des angles : plus tu es loin du centre, plus ça tourne
        var rotateX = ((y - centerY) / centerY) * -5;  // Max ±5 degrés
        var rotateY = ((x - centerX) / centerX) * 5;

        // On applique l'inclinaison 3D ("perspective" c'est ce qui donne l'effet de profondeur)
        card.style.transform = 'translateY(-8px) perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        card.style.transition = 'transform 0.1s ease';  // Suivi rapide de la souris
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';  // Retour à la position normale
        // On met une transition plus lente avec un petit effet de rebond pour que ce soit joli
        card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     📊 BARRE DE PROGRESSION (en haut de la page)
     ─────────────────────────────────────────────────────────────────────────
     C'est la fine ligne colorée tout en haut de la page qui se remplit
     au fur et à mesure que tu scrolles. Elle indique où tu en es dans 
     la page (assez similaire à une barre de chargement).
     
     Couleurs : rose → violet → rose (gradient dynamique)
     
     On crée la barre en JavaScript (pas dans le HTML) parce que c'est
     plus propre, elle est purement décorative.
     ───────────────────────────────────────────────────────────────────────── */
  var progressBar = document.createElement('div');
  progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#ff6b9d,#7c6bb5,#ff8ab5);z-index:9999;transition:width 0.15s ease;width:0;pointer-events:none;box-shadow:0 0 10px rgba(255,107,157,0.4);';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Règle de 3 : (scroll actuel / scroll total) × 100 = pourcentage
    var progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });


  /* ─────────────────────────────────────────────────────────────────────────
     ✨ PARTICULES FLOTTANTES (Section Hero) (LE FAMEUX EMOJI DE RETOUR)
     ─────────────────────────────────────────────────────────────────────────
     Les petits points colorés qui flottent dans la section hero.
     Ça donne un côté vivant et dynamique à la page d'accueil !
     
     On en crée 30 particules avec :
     - Des tailles aléatoires (2-7px)
     - Des couleurs aléatoires (rose, violet, etc.)
     - Des positions aléatoires
     - Des durées d'animation différentes
     - Des délais différents (pour pas qu'elles bougent toutes en même temps)
     
     L'animation de flottement est gérée par le CSS (pas ici).
     Ici on crée juste les petits points et on leur donne des propriétés aléatoires.
     ───────────────────────────────────────────────────────────────────────── */
  var particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    var colors = ['#ff6b9d', '#7c6bb5', '#ffb3d0', '#b8a9ea', '#ff8ab5', '#a5a0d2'];
    for (var p = 0; p < 30; p++) {
      var particle = document.createElement('div');
      particle.className = 'hero-particle';

      // Propriétés aléatoires pour chaque particule
      var size = Math.random() * 5 + 2;          // Taille entre 2 et 7px
      var duration = Math.random() * 12 + 6;     // Durée d'animation entre 6 et 18s
      var delay = Math.random() * 10;             // Délai avant de commencer (0-10s)
      var left = Math.random() * 100;             // Position horizontale (0-100%)
      var color = colors[Math.floor(Math.random() * colors.length)];  // Couleur au hasard

      particle.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + left + '%;background:' + color + ';--duration:' + duration + 's;--delay:' + delay + 's;';
      particlesContainer.appendChild(particle);
    }
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🌟 TRAINÉE LUMINEUSE DU CURSEUR (Cursor glow trail)
     ─────────────────────────────────────────────────────────────────────────
     Un effet subtil où des petits points lumineux suivent ta souris avec
     un léger retard, créant une traînée qui s'efface progressivement.
     
     Comment ça marche :
     1. On crée 6 petits cercles semi-transparents
     2. Le premier suit la souris de près (15% de la distance à chaque frame)
     3. Le deuxième suit le premier (12% à chaque frame)
     4. Le troisième suit le deuxième... etc.
     5. Ça crée un effet de "queue" qui suit la souris !
     
     Chaque point est de plus en plus petit et transparent → effet de traînée.
     
     ⚡ pc seulement, pas besoin sur mobile (pas de curseur)!
     ───────────────────────────────────────────────────────────────────────── */
  if (window.innerWidth > 768) {
    var trailCount = 12;          // Plus long pour un plus bel effet
    var trailDots = [];
    var trailPositions = [];

    for (var t = 0; t < trailCount; t++) {
      var dot = document.createElement('div');
      var dotSize = Math.max(12 - (t * 0.8), 2);            // Plus gros au début, finissent petits
      var dotOpacity = Math.max(0.4 - (t * 0.03), 0);       // Dégradé d'opacité
      dot.style.cssText = 'position:fixed;width:' + dotSize + 'px;height:' + dotSize + 'px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,157,' + dotOpacity + '),transparent);box-shadow:0 0 ' + (15 - t) + 'px rgba(255,107,157,' + (dotOpacity / 2) + ');pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:opacity 0.3s;';
      document.body.appendChild(dot);
      trailDots.push(dot);
      trailPositions.push({ x: 0, y: 0 });
    }

    // On enregistre la position de la souris à chaque mouvement
    var trailMouseX = 0, trailMouseY = 0;
    document.addEventListener('mousemove', function (e) {
      trailMouseX = e.clientX;
      trailMouseY = e.clientY;
    }, { passive: true });

    // Boucle d'animation : chaque point suit le précédent avec du retard
    function animateTrail() {
      // Le premier point suit la souris (15% de la distance restante)
      trailPositions[0].x += (trailMouseX - trailPositions[0].x) * 0.15;
      trailPositions[0].y += (trailMouseY - trailPositions[0].y) * 0.15;

      // Les autres points suivent le précédent (12% de la distance restante)
      for (var i = 1; i < trailCount; i++) {
        trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.12;
        trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.12;
      }

      // On applique les positions à chaque point DOM
      for (var j = 0; j < trailCount; j++) {
        trailDots[j].style.left = trailPositions[j].x + 'px';
        trailDots[j].style.top = trailPositions[j].y + 'px';
      }
      requestAnimationFrame(animateTrail);  // On recommence (boucle infinie)
    }
    animateTrail();
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🧲 EFFET MAGNÉTIQUE SUR LES BOUTONS
     ─────────────────────────────────────────────────────────────────────────
     Quand ta souris approche d'un bouton, il se déplace légèrement vers
     ta souris, comme s'il était attiré par un aimant.
     
     Le calcul :
     - On mesure la distance entre la souris et le centre du bouton
     - On déplace le bouton de 15% de cette distance
     - Quand la souris quitte le bouton → il revient à sa place
     
     ⚡ pc seulement
     ───────────────────────────────────────────────────────────────────────── */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.btn--primary, .btn--outline').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;   // Distance X au centre
        var y = e.clientY - rect.top - rect.height / 2;    // Distance Y au centre
        btn.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px) scale(1.05)';
        btn.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';  // Retour à la position initiale
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🏔️ PARALLAX AU SCROLL (Profondeur)
     ─────────────────────────────────────────────────────────────────────────
     Certains éléments bougent légèrement quand tu scrolles, donnant
     une impression de profondeur (les en-têtes de section, la photo, etc.).
     
     Le décalage est très subtil (3% de la distance au centre de l'écran),
     juste assez pour être ressenti mais pas trop pour être gênant.
     
     ⚡ pc seulement, trop lourd sur mobile et moins utile
     ───────────────────────────────────────────────────────────────────────── */
  if (window.innerWidth > 768) {
    var parallaxElements = document.querySelectorAll('.section-header, .about-image-frame, .image-decoration');

    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      parallaxElements.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        // On vérifie que l'élément est visible sur l'écran
        var inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          // Léger décalage basé sur la position par rapport au milieu de l'écran
          var offset = (rect.top - window.innerHeight / 2) * 0.03;
          el.style.transform = 'translateY(' + offset + 'px)';
        }
      });
    }, { passive: true });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🔢 ANIMATION DES DÉTAILS "À PROPOS"
     ─────────────────────────────────────────────────────────────────────────
     Les valeurs dans la section "À propos" (Paris, BTS SIO SLAM, etc.) 
     apparaissent avec une petite animation quand elles deviennent visibles.
     ───────────────────────────────────────────────────────────────────────── */
  var detailValues = document.querySelectorAll('.detail-value');
  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    detailValues.forEach(function (val) {
      counterObserver.observe(val);
    });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     💧 EFFET ONDULATION AU CLIC (Ripple)
     ─────────────────────────────────────────────────────────────────────────
     Quand tu cliques sur une carte (formation ou expérience), un cercle
     rose apparaît là où tu as cliqué et s'agrandit comme une ondulation
     dans l'eau 💧
     
     C'est inspiré de l'effet qu'on voit dans les applis Google.
     
     En gros :
     1. On crée un cercle transparent où tu as cliqué
     2. Il grandit et disparaît progressivement
     3. Après 0.7 seconde on le supprime (pour pas encombrer la page)
     ───────────────────────────────────────────────────────────────────────── */
  document.querySelectorAll('.edu-card, .timeline-content').forEach(function (card) {
    card.addEventListener('click', function (e) {
      var ripple = document.createElement('div');
      var rect = card.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);  // Le cercle doit couvrir toute la carte
      var x = e.clientX - rect.left - size / 2;      // Position X centrée sur le clic
      var y = e.clientY - rect.top - size / 2;        // Position Y centrée sur le clic

      ripple.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,157,0.15),transparent);transform:scale(0);animation:rippleOut 0.6s ease forwards;pointer-events:none;z-index:10;';
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);

      // Nettoyage : on supprime le ripple après l'animation
      setTimeout(function () { ripple.remove(); }, 700);
    });
  });

  // On ajoute les animations nécessaires pour l'effet ondulation
  // (c'est plus simple de les créer ici que de les mettre dans le CSS)
  var rippleStyle = document.createElement('style');
  rippleStyle.textContent = '@keyframes rippleOut{to{transform:scale(2);opacity:0;}} @keyframes fadeInUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}';
  document.head.appendChild(rippleStyle);


  /* ─── Les petits effets au survol des numéros de section sont gérés en CSS, pas besoin de JS ici ─── */


  /* ─────────────────────────────────────────────────────────────────────────
     ✨ ÉTINCELLES AU SURVOL DES CARTES (Sparkle effect)
     ─────────────────────────────────────────────────────────────────────────
     Quand tu passes ta souris sur une carte (formation, expérience, projet),
     de petites étincelles colorées jaillissent depuis ta souris ! ✨
     ───────────────────────────────────────────────────────────────────────── */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.edu-card, .timeline-content, .project-card, .veille-item-content').forEach(function (card) {
      card.addEventListener('mouseenter', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var sparkleColors = ['#ff6b9d', '#7c6bb5', '#ffb3d0', '#b8a9ea', '#ff8ab5', '#e84580', '#ddd6fe'];

        for (var s = 0; s < 10; s++) {
          var spark = document.createElement('div');
          var size = Math.random() * 6 + 3;
          var angle = Math.random() * Math.PI * 2;
          var distance = Math.random() * 50 + 20;
          var color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
          var tx = Math.cos(angle) * distance;
          var ty = Math.sin(angle) * distance;

          spark.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;left:' + x + 'px;top:' + y + 'px;background:' + color + ';border-radius:50%;pointer-events:none;z-index:20;transition:all 0.6s cubic-bezier(0.34,1.56,0.64,1);opacity:1;transform:translate(-50%,-50%) scale(1);';
          card.style.position = 'relative';
          card.style.overflow = 'hidden';
          card.appendChild(spark);

          requestAnimationFrame(function () {
            spark.style.transform = 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + ty + 'px)) scale(0)';
            spark.style.opacity = '0';
          });

          setTimeout(function () { spark.remove(); }, 700);
        }
      });
    });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🌟 EFFET TEXTE SCRAMBLE SUR LE NOM DU HERO
     ─────────────────────────────────────────────────────────────────────────
     Le nom dans le Hero se "mélange" rapidement puis se recompose
     lettre par lettre quand la page charge. Très stylé ! 🔥
     ───────────────────────────────────────────────────────────────────────── */
  var heroNameAccent = document.querySelector('.hero-name--accent');
  if (heroNameAccent) {
    var finalText = heroNameAccent.textContent;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var scrambleIterations = 0;

    function scrambleText() {
      heroNameAccent.textContent = finalText.split('').map(function (char, index) {
        if (index < scrambleIterations) return finalText[index];
        if (char === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      if (scrambleIterations < finalText.length) {
        scrambleIterations += 1;
        setTimeout(scrambleText, 40);
      }
    }

    setTimeout(scrambleText, 800);
  }


  /* ─────────────────────────────────────────────────────────────────────────
     💫 ÉTOILES SCINTILLANTES DANS LE FOND
     ─────────────────────────────────────────────────────────────────────────
     De toutes petites étoiles qui scintillent dans le fond de la page,
     visibles surtout sur les sections à fond clair.
     ───────────────────────────────────────────────────────────────────────── */
  var starContainer = document.createElement('div');
  starContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';
  document.body.appendChild(starContainer);

  for (var star = 0; star < 40; star++) {
    var twinkle = document.createElement('div');
    var starSize = Math.random() * 3.5 + 1;
    var starX = Math.random() * 100;
    var starY = Math.random() * 100;
    var starDuration = Math.random() * 5 + 2;
    var starDelay = Math.random() * 6;
    var starColor = star % 3 === 0 ? 'rgba(124,107,181,0.3)' : (star % 2 === 0 ? 'rgba(255,179,208,0.35)' : 'rgba(255,107,157,0.3)');
    twinkle.style.cssText = 'position:absolute;width:' + starSize + 'px;height:' + starSize + 'px;left:' + starX + '%;top:' + starY + '%;background:' + starColor + ';border-radius:50%;box-shadow:0 0 ' + (starSize * 2) + 'px ' + starColor + ';animation:twinkle ' + starDuration + 's ease-in-out ' + starDelay + 's infinite;';
    starContainer.appendChild(twinkle);
  }

  // On ajoute l'animation de scintillement
  var twinkleStyle = document.createElement('style');
  twinkleStyle.textContent = '@keyframes twinkle{0%,100%{opacity:0;transform:scale(0.5);}50%{opacity:1;transform:scale(1.2);}}';
  document.head.appendChild(twinkleStyle);


  /* ─────────────────────────────────────────────────────────────────────────
     🎯 MISE EN LUMIÈRE DE LA SECTION VISIBLE
     ─────────────────────────────────────────────────────────────────────────
     La section actuellement visible à l'écran a une légère brillance,
     les autres sont un tout petit peu plus ternes.
     ───────────────────────────────────────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    var sectionGlowObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.filter = 'brightness(1) saturate(1.05)';
          entry.target.style.transition = 'filter 1s ease, box-shadow 1s ease';
          entry.target.style.boxShadow = 'inset 0 0 100px rgba(255, 107, 157, 0.02)';
        } else {
          entry.target.style.filter = 'brightness(0.97) saturate(0.98)';
          entry.target.style.transition = 'filter 1s ease, box-shadow 1s ease';
          entry.target.style.boxShadow = 'none';
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section').forEach(function (sec) {
      sectionGlowObserver.observe(sec);
    });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🖼️ EFFET 3D TILT SUR LA PHOTO "À PROPOS"
     ─────────────────────────────────────────────────────────────────────────
     La photo dans la section À propos s'incline en 3D quand tu bouges
     ta souris dessus, comme un effet holographique premium.
     ───────────────────────────────────────────────────────────────────────── */
  if (window.innerWidth > 768) {
    var aboutPhoto = document.querySelector('.about-image-placeholder');
    if (aboutPhoto) {
      aboutPhoto.style.transformStyle = 'preserve-3d';
      aboutPhoto.parentElement.style.perspective = '800px';

      aboutPhoto.addEventListener('mousemove', function (e) {
        var rect = aboutPhoto.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        aboutPhoto.style.transform = 'rotateY(' + (x * 15) + 'deg) rotateX(' + (-y * 15) + 'deg) scale(1.03)';
        aboutPhoto.style.transition = 'transform 0.1s ease';

        // Reflet de lumière qui suit la souris
        aboutPhoto.style.background = 'linear-gradient(135deg, rgba(255, 240, 245, 0.9) ' + ((0.5 + x) * 30 + 20) + '%, rgba(237, 233, 254, 0.9) ' + ((0.5 + y) * 30 + 50) + '%, rgba(252, 231, 243, 0.9) 100%)';
      });

      aboutPhoto.addEventListener('mouseleave', function () {
        aboutPhoto.style.transform = '';
        aboutPhoto.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        aboutPhoto.style.background = '';
      });
    }
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🔮 SURVOL MAGNÉTIQUE SUR LES ICÔNES SOCIALES
     ─────────────────────────────────────────────────────────────────────────
     Les icônes de réseaux sociaux dans le hero tournent et grossissent
     quand on passe la souris dessus.
     ───────────────────────────────────────────────────────────────────────── */
  document.querySelectorAll('.hero-socials a, .footer-social a, .contact-social-link').forEach(function (icon) {
    icon.addEventListener('mouseenter', function () {
      icon.style.transform = 'scale(1.15) rotate(5deg)';
      icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    icon.addEventListener('mouseleave', function () {
      icon.style.transform = '';
      icon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });


  /* ─────────────────────────────────────────────────────────────────────────
     🔦 HALO LUMINEUX QUI SUIT LA SOURIS (Mouse Spotlight)
     ─────────────────────────────────────────────────────────────────────────
     Un gros cercle lumineux rose/violet semi-transparent suit ta souris 
     partout sur la page. Ça donne un effet « lumière d'ambiance » premium !
     ───────────────────────────────────────────────────────────────────────── */
  if (window.innerWidth > 768) {
    var spotlight = document.createElement('div');
    spotlight.style.cssText = 'position:fixed;width:500px;height:500px;border-radius:50%;pointer-events:none;z-index:9999;mix-blend-mode:soft-light;opacity:0;transition:opacity 0.5s ease;background:radial-gradient(circle,rgba(255,107,157,0.15) 0%,rgba(124,107,181,0.08) 30%,transparent 70%);transform:translate(-50%,-50%);';
    document.body.appendChild(spotlight);

    var spotX = 0, spotY = 0, currentSpotX = 0, currentSpotY = 0;

    document.addEventListener('mousemove', function (e) {
      spotX = e.clientX;
      spotY = e.clientY;
      spotlight.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function () {
      spotlight.style.opacity = '0';
    });

    function animateSpotlight() {
      currentSpotX += (spotX - currentSpotX) * 0.08;
      currentSpotY += (spotY - currentSpotY) * 0.08;
      spotlight.style.left = currentSpotX + 'px';
      spotlight.style.top = currentSpotY + 'px';
      requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();
  }


  /* ─────────────────────────────────────────────────────────────────────────
     💎 HALO QUI SUIT LA SOURIS DANS LES CARTES (Card Glow)
     ─────────────────────────────────────────────────────────────────────────
     Quand ta souris bouge dans une carte (formation, expérience, projet),
     un halo lumineux la suit pour éclairer la zone survolée.
     ───────────────────────────────────────────────────────────────────────── */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.edu-card, .timeline-content, .project-card, .stage-panel').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.background = 'radial-gradient(circle 200px at ' + x + 'px ' + y + 'px, rgba(255, 107, 157, 0.06), rgba(255, 255, 255, 0.7))';
      });

      card.addEventListener('mouseleave', function () {
        card.style.background = 'rgba(255, 255, 255, 0.7)';
      });
    });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🌊 PARALLAXE DOUX AU DÉFILEMENT
     ─────────────────────────────────────────────────────────────────────────
     Les sections se décalent très légèrement en profondeur quand tu scrolles,
     ce qui donne une impression de 3D et de fluidité.
     ───────────────────────────────────────────────────────────────────────── */
  if (window.innerWidth > 768) {
    var parallaxSections = document.querySelectorAll('.section');
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset;
      parallaxSections.forEach(function (section, index) {
        var rect = section.getBoundingClientRect();
        var sectionMiddle = rect.top + rect.height / 2;
        var offset = (sectionMiddle - window.innerHeight / 2) * 0.02;
        var decorBefore = section.querySelector('.section-title');
        if (decorBefore) {
          decorBefore.style.transform = 'translateY(' + offset + 'px)';
        }
      });
    }, { passive: true });
  }


  /* ─────────────────────────────────────────────────────────────────────────
     ⚡ LIGNES DE CONNEXION ENTRE LES PARTICULES DU HERO
     ─────────────────────────────────────────────────────────────────────────
     Un canvas transparent est placé sur le hero. Des particules flottent
     et des lignes se tracent entre les particules proches, comme un réseau.
     ───────────────────────────────────────────────────────────────────────── */
  var heroSection = document.querySelector('.hero');
  if (heroSection && window.innerWidth > 768) {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
    heroSection.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var netMouseX = canvas.width / 2, netMouseY = canvas.height / 2;

    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      netMouseX = e.clientX - rect.left;
      netMouseY = e.clientY - rect.top;
    });

    function resizeCanvas() {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    var dots = [];
    for (var d = 0; d < 45; d++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1
      });
    }

    function drawNetwork() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(function (dot) {
        // Attirer doucement les particules vers la souris
        var dxMouse = netMouseX - dot.x;
        var dyMouse = netMouseY - dot.y;
        var distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 250) {
          var force = (250 - distMouse) / 250 * 0.008;
          dot.vx += dxMouse * force;
          dot.vy += dyMouse * force;
        }

        // Friction pour éviter l'accélération infinie
        dot.vx *= 0.98;
        dot.vy *= 0.98;

        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Point glow quand proche de la souris
        var glowSize = distMouse < 200 ? dot.radius * 1.5 : dot.radius;
        var glowOpacity = distMouse < 200 ? 0.5 : 0.2;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 107, 157, ' + glowOpacity + ')';
        ctx.fill();
      });

      for (var i = 0; i < dots.length; i++) {
        for (var j = i + 1; j < dots.length; j++) {
          var dx = dots[i].x - dots[j].x;
          var dy = dots[i].y - dots[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = 'rgba(255, 107, 157, ' + (0.1 * (1 - dist / 160)) + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Lignes vers la souris si elle est proche
      dots.forEach(function (dot) {
        var dxM = netMouseX - dot.x;
        var dyM = netMouseY - dot.y;
        var distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 180) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(netMouseX, netMouseY);
          ctx.strokeStyle = 'rgba(124, 107, 181, ' + (0.12 * (1 - distM / 180)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      requestAnimationFrame(drawNetwork);
    }
    drawNetwork();
  }


  /* ─────────────────────────────────────────────────────────────────────────
     🎆 CONFETTIS AU CLIC SUR LES BOUTONS CTA
     ─────────────────────────────────────────────────────────────────────────
     Quand tu cliques sur "Découvrir mon profil" ou "Me contacter", 
     des mini-confettis colorés éclatent depuis le bouton ! 🎊
     ───────────────────────────────────────────────────────────────────────── */
  document.querySelectorAll('.btn--primary, .btn--outline').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var colors = ['#ff6b9d', '#7c6bb5', '#ffb3d0', '#b8a9ea', '#ff8ab5', '#e84580', '#9b8dd0', '#ddd6fe'];

      for (var c = 0; c < 30; c++) {
        var confetti = document.createElement('div');
        var size = Math.random() * 10 + 4;
        var angle = Math.random() * Math.PI * 2;
        var velocity = Math.random() * 160 + 80;
        var color = colors[Math.floor(Math.random() * colors.length)];
        var shape = Math.random() > 0.5 ? '50%' : (Math.random() > 0.5 ? '2px' : '0');
        var rotation = Math.random() * 360;

        confetti.style.cssText = 'position:fixed;width:' + size + 'px;height:' + size + 'px;left:' + centerX + 'px;top:' + centerY + 'px;background:' + color + ';border-radius:' + shape + ';pointer-events:none;z-index:99999;transform:translate(-50%,-50%) rotate(' + rotation + 'deg);transition:all 0.8s cubic-bezier(0.25,0.46,0.45,0.94);opacity:1;';
        document.body.appendChild(confetti);

        var tx = Math.cos(angle) * velocity;
        var ty = Math.sin(angle) * velocity - 40;

        requestAnimationFrame(function () {
          confetti.style.transform = 'translate(calc(-50% + ' + tx + 'px), calc(-50% + ' + ty + 'px)) rotate(' + (rotation + 360) + 'deg)';
          confetti.style.opacity = '0';
        });

        setTimeout(function () { confetti.remove(); }, 900);
      }
    });
  });

});

/* ═════════════════════════════════════════════════════════════════════════════
   🎉 FIN DU FICHIER !
   ═════════════════════════════════════════════════════════════════════════════
   
   Bravo ma très chere amie si tu as lu jusqu'ici ! 🥳
   
   En résumé ce fichier gère :
   ✅ Navigation (scroll, menu mobile, smooth scroll)
   ✅ Animations (reveal, stagger, skill bars, typed effect)
   ✅ Interactivité (accordéon stages, carrousel veille, formulaire contact)
   ✅ Effets visuels (parallax, 3D tilt, particules, cursor trail, ripple)
   ✅ Petits bonus (barre de progression, effet magnétique)
   ✅ Nouvelles animations (étincelles, texte scramble, étoiles, section glow)
   ✅ Effets premium (spotlight, card glow, confettis, réseau particules)
   
   N'hésite pas à me demander si tu veux que je t'aide à le modifier
   ═════════════════════════════════════════════════════════════════════════════ */