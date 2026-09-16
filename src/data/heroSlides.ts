import villaBaieVitree from "../assets/realisations/villa-baie-vitree.jpg";
import gardeCorpsVerreOr from "../assets/realisations/garde-corps-verre-or.jpg";
import immeublePk20 from "../assets/realisations/immeuble-pk20.jpg";
import residenceT from "../assets/realisations/residence-t.jpg";
import porteVitreeEncadrementPierre from "../assets/realisations/porte-vitree-encadrement-pierre.jpg";
import cloisonVitreeDepolie from "../assets/realisations/cloison-vitree-depolie.jpg";
import facadeBoutiqueVitree from "../assets/realisations/facade-boutique-vitree.jpg";
import escalierNoirOr from "../assets/realisations/escalier-noir-or.jpg";

export interface HeroSlide {
  src: string;
  alt: string;
}

/**
 * A curated subset of real gallery photos, cycled behind the mobile hero
 * as a slow, looping background slideshow.
 */
export const heroSlides: HeroSlide[] = [
  { src: villaBaieVitree, alt: "Baie vitrée en aluminium — réalisation Suprême Aluminium" },
  { src: immeublePk20, alt: "Menuiserie aluminium posée sur un immeuble à Douala" },
  { src: gardeCorpsVerreOr, alt: "Garde-corps en verre et laiton doré" },
  { src: facadeBoutiqueVitree, alt: "Façade vitrée de commerce en aluminium" },
  { src: residenceT, alt: "Fenêtres et garde-corps dorés — Résidence T" },
  { src: porteVitreeEncadrementPierre, alt: "Porte vitrée à encadrement pierre" },
  { src: escalierNoirOr, alt: "Rampe d'escalier en aluminium noir et or" },
  { src: cloisonVitreeDepolie, alt: "Cloison vitrée dépolie en aluminium" },
];
