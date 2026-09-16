import { services } from "../data/services";
import { ServiceCard } from "../components/ServiceCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function ServicesSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="services" className="relative py-24 sm:py-32" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`max-w-2xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <p className="text-xs font-semibold tracking-[0.35em]" style={{ color: "var(--gold)" }}>
            CE QUE NOUS RÉALISONS
          </p>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
            Nos solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Neuf domaines d'intervention, une seule exigence : la précision, du premier mètre pris jusqu'à la
            dernière finition posée.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="transition-all duration-700"
              style={{
                transitionDelay: isVisible ? `${index * 60}ms` : "0ms",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
