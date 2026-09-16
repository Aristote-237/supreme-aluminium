import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { ProjectPreviewCard } from "../components/ProjectPreviewCard";
import { ProjectLightbox } from "../components/ProjectLightbox";
import { useScrollReveal } from "../hooks/useScrollReveal";

/** The 5 projects showcased on the home page with a short description. */
const FEATURED_IDS = [
  "immeuble-pk20",
  "villa-baie-vitree",
  "garde-corps-verre-or",
  "facade-boutique-vitree",
  "escalier-noir-or",
];

export function ProjectsGallery() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const featured = FEATURED_IDS.map((id) => projects.find((project) => project.id === id)).filter(
    (project): project is Project => Boolean(project)
  );
  const selectedProject = selectedIndex !== null ? featured[selectedIndex] : null;

  const openProject = (project: Project) => {
    const index = featured.findIndex((p) => p.id === project.id);
    setSelectedIndex(index >= 0 ? index : 0);
  };

  const stepProject = (delta: number) => {
    if (featured.length <= 1) return;
    setSelectedIndex((current) => {
      if (current === null) return current;
      return (current + delta + featured.length) % featured.length;
    });
  };

  return (
    <section id="realisations" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`max-w-2xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <p className="text-xs font-semibold tracking-[0.35em]" style={{ color: "var(--gold)" }}>
            NOS RÉALISATIONS
          </p>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
            Quelques-unes de nos réalisations
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Une sélection de nos travaux en aluminium, vitrerie et inox. Retrouvez la galerie complète sur la
            page dédiée.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectPreviewCard key={project.id} project={project} onOpen={openProject} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#/realisations"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.02]"
            style={{ background: "var(--gold)", color: "var(--blue-deep)" }}
          >
            Explorer toutes nos réalisations
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <ProjectLightbox
        project={selectedProject}
        index={selectedIndex ?? 0}
        total={featured.length}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => stepProject(-1)}
        onNext={() => stepProject(1)}
      />
    </section>
  );
}
