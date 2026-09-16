import { Award, Gem, Ruler, MapPinned, ShieldCheck, Wrench } from "lucide-react";
import { company } from "../data/company";
import { useScrollReveal } from "../hooks/useScrollReveal";

const reasons = [
  {
    icon: Award,
    title: `${company.yearsOfExperience} ans d'expérience`,
    description: "Un savoir-faire construit sur le terrain, chantier après chantier.",
  },
  {
    icon: ShieldCheck,
    title: "Aluminium & inox",
    description: "Deux matériaux maîtrisés, pour des ouvrages durables et résistants.",
  },
  {
    icon: Gem,
    title: "Vitrerie générale",
    description: "Pose et remplacement de vitrages réalisés avec précision.",
  },
  {
    icon: Ruler,
    title: "Solutions sur mesure",
    description: "Chaque projet est étudié selon la configuration réelle de l'espace.",
  },
  {
    icon: MapPinned,
    title: "Intervention nationale",
    description: `Basés à ${company.city}, disponibles dans toutes les villes du Cameroun.`,
  },
  {
    icon: Wrench,
    title: "Suivi de chantier",
    description: "Un accompagnement de l'étude jusqu'à la pose et aux finitions.",
  },
];

export function WhyUsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`max-w-2xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <p className="text-xs font-semibold tracking-[0.35em]" style={{ color: "var(--gold)" }}>
            POURQUOI NOUS FAIRE CONFIANCE
          </p>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
            Pourquoi choisir Suprême Aluminium ?
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="rounded-2xl border p-6 transition-all duration-700"
              style={{
                borderColor: "var(--border)",
                transitionDelay: isVisible ? `${index * 70}ms` : "0ms",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(18px)",
              }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{ background: "var(--surface)", color: "var(--gold)" }}
              >
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="font-display mt-5 text-lg" style={{ color: "var(--text)" }}>
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
