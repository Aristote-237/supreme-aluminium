# Suprême Aluminium Service Plus — Site vitrine PWA

Site vitrine premium pour **Suprême Aluminium Service Plus** (Douala, PK20), spécialiste en menuiserie
aluminium, vitrerie générale et travaux en inox. Construit avec React, Vite, TypeScript, Tailwind CSS v4
et Framer Motion, avec support PWA (installable, hors-ligne pour les ressources statiques).

## Démarrage

```bash
npm install
npm run dev       # serveur de développement
npm run build     # build de production dans /dist
npm run preview   # prévisualiser le build de production
```

## Structure du projet

```
src/
  assets/
    logo/              -> logo officiel (couronne SAP)
    realisations/      -> photos réelles utilisées dans la galerie
  components/           -> composants réutilisables (Navbar, Footer, cartes, formulaire...)
  sections/             -> sections de la page d'accueil (Hero, Services, Réalisations...)
  data/                 -> contenu séparé du markup (services, réalisations, étapes, coordonnées)
  hooks/                -> useTheme, useInstallPrompt, useScrollReveal
  utils/                -> génération des messages WhatsApp / email pour le formulaire
public/
  manifest.webmanifest  -> manifeste PWA
  sw.js                 -> service worker (cache de l'app shell, mode hors-ligne)
  icons/                -> icônes PWA générées à partir du logo
```

## Points à personnaliser avant mise en ligne

- **Réseaux sociaux** — les URLs Facebook (« Suprême Aluminium ») et TikTok (« Service Plus237 ») ne sont
  pas encore connues : voir `src/data/company.ts` (`social.facebook.url`, `social.tiktok.url`). Une fois
  connues, ajoutez les liens dans `Footer.tsx`.
- **Témoignages** — la section clients affiche volontairement un appel à avis plutôt que de faux
  témoignages (`src/sections/TestimonialsSection.tsx`). À remplacer par de vrais avis quand ils seront
  disponibles.
- **Photos** — les photos de réalisations utilisées sont celles fournies. Pour en ajouter/remplacer,
  déposez l'image dans `src/assets/realisations/` puis ajoutez une entrée dans `src/data/projects.ts`.
- **Formulaire de devis** — aucune base de données : la demande est préparée et transmise via WhatsApp
  (nouvel onglet) et par email (`mailto:`), conformément au cahier des charges. Pour un envoi email
  entièrement automatique (sans ouvrir le client mail), il faudra brancher un service d'envoi côté
  serveur (ex. Resend, EmailJS avec clé restreinte, ou une fonction serverless) — ne jamais exposer de
  clé API côté frontend.
- **Domaine** — mettez à jour l'URL `canonical` et `og:url` dans `index.html` une fois le nom de domaine
  définitif connu.

## PWA

- Le bouton **« Installer l'app »** n'apparaît que lorsque le navigateur déclenche réellement
  l'évènement `beforeinstallprompt` (Android / Chrome / Edge desktop). Sur iOS/Safari, il ouvre une
  courte notice expliquant l'ajout à l'écran d'accueil, car Safari ne propose pas de prompt natif.
- Le thème **Night** (par défaut) et **Light** est mémorisé dans `localStorage` et respecte
  `prefers-color-scheme` tant qu'aucun choix manuel n'a été fait.
- Le service worker met en cache l'app shell pour un fonctionnement hors-ligne raisonnable sur les
  pages déjà visitées.

## Déploiement

Le dossier `dist/` généré par `npm run build` est un site statique déployable sur Vercel, Netlify,
Firebase Hosting ou tout hébergement statique classique. Le site doit être servi en **HTTPS** pour que
le service worker et l'installation PWA fonctionnent.
