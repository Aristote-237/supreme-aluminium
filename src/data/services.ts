export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "door" | "window" | "glassWall" | "balcony" | "ceiling" | "curtainWall" | "glazing" | "steel" | "custom";
}

export const services: Service[] = [
  {
    id: "portes-aluminium",
    number: "01",
    title: "Portes aluminium",
    description: "Portes robustes et esthétiques, adaptées aux entrées résidentielles et professionnelles.",
    icon: "door",
  },
  {
    id: "fenetres-aluminium",
    number: "02",
    title: "Fenêtres aluminium",
    description: "Ouvrants sur mesure alliant légèreté, finition soignée et tenue dans la durée.",
    icon: "window",
  },
  {
    id: "baies-vitrees",
    number: "03",
    title: "Baies vitrées",
    description: "Grandes ouvertures vitrées pour faire entrer la lumière et ouvrir vos espaces.",
    icon: "glassWall",
  },
  {
    id: "balcons-garde-corps",
    number: "04",
    title: "Balcons & garde-corps",
    description: "Structures en aluminium et inox, sécurisées et élégamment finies.",
    icon: "balcony",
  },
  {
    id: "plafonds",
    number: "05",
    title: "Plafonds",
    description: "Habillages de plafond précis, pensés pour l'intégration de l'éclairage.",
    icon: "ceiling",
  },
  {
    id: "murs-rideaux",
    number: "06",
    title: "Murs rideaux",
    description: "Façades contemporaines en aluminium et verre pour bâtiments résidentiels et commerciaux.",
    icon: "curtainWall",
  },
  {
    id: "vitrerie-generale",
    number: "07",
    title: "Vitrerie générale",
    description: "Pose et remplacement de vitrages pour tous types d'ouvrages.",
    icon: "glazing",
  },
  {
    id: "travaux-inox",
    number: "08",
    title: "Travaux en inox",
    description: "Rampes, garde-corps et finitions en inox, résistants et raffinés.",
    icon: "steel",
  },
  {
    id: "solutions-sur-mesure",
    number: "09",
    title: "Solutions sur mesure",
    description: "Étude et fabrication adaptées à la configuration exacte de votre espace.",
    icon: "custom",
  },
];
