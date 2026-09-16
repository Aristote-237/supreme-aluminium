import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { projectCategories, projects, type Project, type ProjectCategory } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectLightbox } from "../components/ProjectLightbox";

type FilterValue = "Tous" | ProjectCategory;

export function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Tous");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Tous") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const selectedProject =
    selectedIndex !== null && filteredProjects.length > 0 ? filteredProjects[selectedIndex] : null;

  const openProject = (project: Project) => {
    const index = filteredProjects.findIndex((p) => p.id === project.id);
    setSelectedIndex(index >= 0 ? index : 0);
  };

  const stepProject = (delta: number) => {
    if (filteredProjects.length <= 1) return;
    setSelectedIndex((current) => {
      if (current === null) return current;
      return (current + delta + filteredProjects.length) % filteredProjects.length;
    });
  };

  const filters: FilterValue[] = ["Tous", ...projectCategories];

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.35em]" style={{ color: "var(--gold)" }}>
          GALERIE
        </p>
        <h1 className="font-display mt-4 text-3xl sm:text-5xl" style={{ color: "var(--text)" }}>
          Nos réalisations
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
          L'ensemble de nos travaux en menuiserie aluminium, vitrerie générale et inox, réalisés à Douala,
          PK20 et partout au Cameroun.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className="rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300"
                style={{
                  borderColor: isActive ? "var(--gold)" : "var(--border)",
                  background: isActive ? "var(--gold)" : "transparent",
                  color: isActive ? "var(--blue-deep)" : "var(--text-muted)",
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Uniform grid: every image keeps the exact same dimensions */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={openProject} uniform />
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300"
            style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
          >
            Un projet en tête ? Demander un devis
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <ProjectLightbox
        project={selectedProject}
        index={selectedIndex ?? 0}
        total={filteredProjects.length}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => stepProject(-1)}
        onNext={() => stepProject(1)}
      />
    </section>
  );
}