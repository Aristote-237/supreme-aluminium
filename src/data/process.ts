export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Échange",
    description: "Nous écoutons votre besoin et cernons les contraintes de votre projet.",
  },
  {
    number: "02",
    title: "Étude & mesure",
    description: "Analyse de l'espace et prise des dimensions exactes sur site.",
  },
  {
    number: "03",
    title: "Conception",
    description: "Définition de la solution technique et esthétique adaptée.",
  },
  {
    number: "04",
    title: "Fabrication",
    description: "Réalisation de l'ouvrage en atelier, avec précision et soin.",
  },
  {
    number: "05",
    title: "Pose & finitions",
    description: "Installation sur site et vérification de chaque détail de finition.",
  },
];
