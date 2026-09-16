import { processSteps } from "../data/process";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function ProcessTimeline() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="methode" className="relative py-24 sm:py-32" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`max-w-2xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <p className="text-xs font-semibold tracking-[0.35em]" style={{ color: "var(--gold)" }}>
            COMMENT NOUS TRAVAILLONS
          </p>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
            Notre méthode
          </h2>
        </div>

        <div className="relative mt-16">
          <div
            className="absolute left-6 top-0 hidden h-full w-px sm:block lg:left-1/2"
            style={{ background: "var(--border-strong)" }}
            aria-hidden="true"
          />

          <ol className="space-y-10 sm:space-y-14">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <li
                  key={step.number}
                  className={`relative flex flex-col gap-4 transition-all duration-700 sm:flex-row sm:items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <div className="flex items-center gap-4 sm:w-1/2 sm:justify-end lg:pr-10">
                    <div
                      className="hidden h-3 w-3 shrink-0 rounded-full sm:block lg:absolute lg:left-1/2 lg:-translate-x-1/2"
                      style={{ background: "var(--gold)" }}
                      aria-hidden="true"
                    />
                    <div
                      className={`rounded-2xl border p-6 ${isEven ? "sm:text-right" : "sm:text-left"}`}
                      style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
                    >
                      <span className="font-display text-2xl" style={{ color: "var(--gold)" }}>
                        {step.number}
                      </span>
                      <h3 className="font-display mt-2 text-xl" style={{ color: "var(--text)" }}>
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block sm:w-1/2" aria-hidden="true" />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
