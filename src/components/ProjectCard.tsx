import type { Project } from "../data/projects";

const SIZE_CLASSES: Record<Project["size"], string> = {
  large: "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto",
  wide: "sm:col-span-2 aspect-[16/10]",
  tall: "row-span-2 aspect-[3/4] sm:aspect-auto",
  regular: "aspect-[4/3]",
};

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className={`group relative overflow-hidden rounded-2xl border text-left ${SIZE_CLASSES[project.size]}`}
      style={{ borderColor: "var(--border)" }}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(to top, rgba(6,11,24,0.88), rgba(6,11,24,0.15) 60%, transparent)" }}
      >
        <span className="w-fit rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-white/90" style={{ background: "rgba(212,175,55,0.25)" }}>
          {project.category}
        </span>
        <p className="mt-2 font-display text-lg text-white">{project.title}</p>
      </div>
    </button>
  );
}
