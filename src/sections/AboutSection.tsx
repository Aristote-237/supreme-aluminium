import aboutImage from "../assets/realisations/escalier-noir-or.jpg";
import { company } from "../data/company";
import { StatCounter } from "../components/StatCounter";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="a-propos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`grid grid-cols-1 items-center gap-14 transition-all duration-700 lg:grid-cols-2 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="relative order-2 lg:order-1">
            <div
              className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border"
              style={{ borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
            >
              <img
                src={aboutImage}
                alt="Réalisation d'un escalier en aluminium et laiton doré"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -right-4 rounded-2xl border px-6 py-4 sm:-right-8"
              style={{ background: "var(--bg-raised)", borderColor: "var(--border-strong)", boxShadow: "var(--shadow)" }}
            >
              <p className="font-display text-2xl" style={{ color: "var(--gold)" }}>
                {company.yearsOfExperience} ans
              </p>
              <p className="text-[0.65rem] font-semibold tracking-[0.2em]" style={{ color: "var(--text-faint)" }}>
                D'EXPÉRIENCE
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold tracking-[0.35em]" style={{ color: "var(--gold)" }}>
              LE SAVOIR-FAIRE SUPRÊME
            </p>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
              {company.name}
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Responsable technique : <span style={{ color: "var(--text)" }}>{company.technicalManager}</span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Depuis {company.yearsOfExperience} ans, {company.shortName} conçoit et réalise des ouvrages en
              menuiserie aluminium, vitrerie générale et inox : portes, fenêtres, baies vitrées, garde-corps,
              plafonds et murs rideaux. Des solutions conçues pour s'intégrer parfaitement à vos espaces.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: "var(--border)" }}>
              <StatCounter value={6} label="ANS D'EXPÉRIENCE" />
              <StatCounter value={100} suffix="%" label="SUR MESURE" />
              <StatCounter value={0} isNumeric={false} displayValue="CAMEROUN" label="ZONE D'INTERVENTION" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
