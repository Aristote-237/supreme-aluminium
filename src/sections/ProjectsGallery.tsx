import { useMemo, useState } from "react";
import { projectCategories, projects, type Project, type ProjectCategory } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectLightbox } from "../components/ProjectLightbox";
import { useScrollReveal } from "../hooks/useScrollReveal";

type FilterValue = "Tous" | ProjectCategory;

export function ProjectsGallery() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
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
            Découvrez notre savoir-faire à travers quelques-unes de nos réalisations
          </h2>
        </div>

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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[220px]">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={openProject} />
          ))}
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
