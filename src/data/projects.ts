import immeublePk20 from "../assets/realisations/immeuble-pk20.jpg";
import gardeCorpsVerreOr from "../assets/realisations/garde-corps-verre-or.jpg";
import villaBaieVitree from "../assets/realisations/villa-baie-vitree.jpg";
import gardeCorpsInoxOr from "../assets/realisations/garde-corps-inox-or.jpg";
import facadeBleue from "../assets/realisations/facade-bleue.jpg";
import residenceT from "../assets/realisations/residence-t.jpg";
import escalierNoirOr from "../assets/realisations/escalier-noir-or.jpg";
import escalierInox from "../assets/realisations/escalier-inox.jpg";
import villaToitArdoise from "../assets/realisations/villa-toit-ardoise.jpg";
import porteVitreeEncadrementPierre from "../assets/realisations/porte-vitree-encadrement-pierre.jpg";
import porteVitreeAnthraciteBoutique from "../assets/realisations/porte-vitree-anthracite-boutique.jpg";
import porteAluPoseFilmProtection from "../assets/realisations/porte-alu-pose-film-protection.jpg";
import cloisonVitreeDepolie from "../assets/realisations/cloison-vitree-depolie.jpg";
import cloisonVitreeCouloirBureaux from "../assets/realisations/cloison-vitree-couloir-bureaux.jpg";
import fenetreCoulissanteMoustiquaire from "../assets/realisations/fenetre-coulissante-moustiquaire.jpg";
import porteFenetreCageEscalier from "../assets/realisations/porte-fenetre-cage-escalier.jpg";
import poseFenetreChantier from "../assets/realisations/pose-fenetre-chantier.jpg";
import porteFenetreBleutee from "../assets/realisations/porte-fenetre-bleutee.jpg";
import cabineVitreeReception from "../assets/realisations/cabine-vitree-reception.jpg";
import fenetreOscillanteInclinee from "../assets/realisations/fenetre-oscillante-inclinee.jpg";
import facadeBoutiqueVitree from "../assets/realisations/facade-boutique-vitree.jpg";

export type ProjectCategory =
  | "Portes"
  | "Fenêtres"
  | "Baies vitrées"
  | "Garde-corps"
  | "Murs rideaux"
  | "Cloisons vitrées"
  | "Inox";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
  location?: string;
  size: "large" | "wide" | "tall" | "regular";
}

export const projects: Project[] = [
  {
    id: "immeuble-pk20",
    title: "Menuiserie aluminium — immeuble commercial",
    category: "Fenêtres",
    image: immeublePk20,
    description: "Fenêtres et devantures en aluminium posées sur un immeuble à usage mixte.",
    location: "Douala, PK20",
    size: "large",
  },
  {
    id: "villa-baie-vitree",
    title: "Baie vitrée panoramique",
    category: "Baies vitrées",
    image: villaBaieVitree,
    description: "Grande baie vitrée aluminium ouvrant sur balcon, pour une villa résidentielle.",
    size: "wide",
  },
  {
    id: "garde-corps-verre-or",
    title: "Garde-corps verre et laiton doré",
    category: "Garde-corps",
    image: gardeCorpsVerreOr,
    description: "Rampe d'escalier en verre habillé de laiton doré, finition haut de gamme.",
    size: "tall",
  },
  {
    id: "garde-corps-inox-or",
    title: "Garde-corps extérieur doré",
    category: "Garde-corps",
    image: gardeCorpsInoxOr,
    description: "Main courante et barreaudage doré pour un escalier d'entrée extérieur.",
    size: "regular",
  },
  {
    id: "facade-bleue",
    title: "Façade vitrée bleutée",
    category: "Murs rideaux",
    image: facadeBleue,
    description: "Habillage de façade en aluminium et vitrage teinté sur bâtiment à étages.",
    size: "regular",
  },
  {
    id: "residence-t",
    title: "Menuiseries dorées — Résidence T",
    category: "Fenêtres",
    image: residenceT,
    description: "Fenêtres, garde-corps et portail en aluminium avec ornements dorés.",
    size: "wide",
  },
  {
    id: "escalier-noir-or",
    title: "Rampe d'escalier noir et or",
    category: "Inox",
    image: escalierNoirOr,
    description: "Structure d'escalier associant profilés noirs et main courante dorée.",
    size: "tall",
  },
  {
    id: "escalier-inox",
    title: "Rampe d'escalier en inox poli",
    category: "Inox",
    image: escalierInox,
    description: "Garde-corps intérieur en inox brossé, sobre et durable.",
    size: "regular",
  },
  {
    id: "villa-toit-ardoise",
    title: "Menuiseries et verrière — villa",
    category: "Baies vitrées",
    image: villaToitArdoise,
    description: "Fenêtres et vitrage d'entrée en aluminium doré pour une villa en finition.",
    size: "regular",
  },
  {
    id: "porte-vitree-encadrement-pierre",
    title: "Porte vitrée à encadrement pierre",
    category: "Portes",
    image: porteVitreeEncadrementPierre,
    description: "Double porte aluminium blanc avec imposte vitrée, posée sur un encadrement en pierre reconstituée.",
    size: "tall",
  },
  {
    id: "porte-vitree-anthracite-boutique",
    title: "Devanture de boutique en aluminium anthracite",
    category: "Portes",
    image: porteVitreeAnthraciteBoutique,
    description: "Double porte vitrée et vitrine en aluminium anthracite pour un local commercial.",
    size: "regular",
  },
  {
    id: "porte-alu-pose-film-protection",
    title: "Pose d'une double porte aluminium",
    category: "Portes",
    image: porteAluPoseFilmProtection,
    description: "Double porte aluminium et verre fumé, encore sous film de protection après la pose.",
    size: "regular",
  },
  {
    id: "cloison-vitree-depolie",
    title: "Cloison vitrée dépolie",
    category: "Cloisons vitrées",
    image: cloisonVitreeDepolie,
    description: "Cabine vitrée à verre dépoli avec ossature aluminium noir, pour délimiter un espace intérieur.",
    size: "wide",
  },
  {
    id: "cloison-vitree-couloir-bureaux",
    title: "Cloisons vitrées de bureaux",
    category: "Cloisons vitrées",
    image: cloisonVitreeCouloirBureaux,
    description: "Cloisonnement vitré en aluminium pour open-space, avec bandes dépolies et portes intégrées.",
    size: "regular",
  },
  {
    id: "cabine-vitree-reception",
    title: "Cabine vitrée d'accueil",
    category: "Cloisons vitrées",
    image: cabineVitreeReception,
    description: "Cabine vitrée aluminium et verre pour un poste d'accueil ou de réception.",
    size: "regular",
  },
  {
    id: "fenetre-coulissante-moustiquaire",
    title: "Fenêtre coulissante avec moustiquaire",
    category: "Fenêtres",
    image: fenetreCoulissanteMoustiquaire,
    description: "Fenêtre coulissante en aluminium noir équipée d'une moustiquaire intégrée.",
    size: "regular",
  },
  {
    id: "porte-fenetre-cage-escalier",
    title: "Porte-fenêtre en cage d'escalier",
    category: "Fenêtres",
    image: porteFenetreCageEscalier,
    description: "Ensemble porte et fenêtres en aluminium vert foncé, ouvrant sur une cage d'escalier intérieure.",
    size: "wide",
  },
  {
    id: "porte-fenetre-bleutee",
    title: "Porte et fenêtre à vitrage bleuté",
    category: "Fenêtres",
    image: porteFenetreBleutee,
    description: "Porte battante et fenêtre coulissante en aluminium blanc, à vitrage teinté bleu.",
    size: "regular",
  },
  {
    id: "fenetre-oscillante-inclinee",
    title: "Fenêtre oscillo-battante",
    category: "Fenêtres",
    image: fenetreOscillanteInclinee,
    description: "Fenêtre à ouverture oscillante en aluminium noir, pour une aération contrôlée.",
    size: "regular",
  },
  {
    id: "pose-fenetre-chantier",
    title: "Pose de menuiserie sur chantier",
    category: "Portes",
    image: poseFenetreChantier,
    description: "Notre équipe lors de la pose d'une menuiserie aluminium, directement sur site.",
    size: "tall",
  },
  {
    id: "facade-boutique-vitree",
    title: "Façade vitrée de commerce",
    category: "Murs rideaux",
    image: facadeBoutiqueVitree,
    description: "Habillage de façade en aluminium et grande vitrine, avec double porte d'entrée assortie.",
    size: "large",
  },
];

export const projectCategories: ProjectCategory[] = [
  "Portes",
  "Fenêtres",
  "Baies vitrées",
  "Garde-corps",
  "Murs rideaux",
  "Cloisons vitrées",
  "Inox",
];
