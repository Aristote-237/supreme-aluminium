import { MapPin } from "lucide-react";
import type { Project } from "../data/projects";

interface ProjectPreviewCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

/** Home-page card that always shows the title and description of a project. */
export function ProjectPreviewCard({ project, onOpen }: ProjectPreviewCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-transform duration-300 hover:-translate-y-1"
      style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span
          className="w-fit rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide"
          style={{ background: "var(--surface)", color: "var(--gold)" }}
        >
          {project.category}
        </span>
        <h3 className="font-display mt-3 text-lg" style={{ color: "var(--text)" }}>
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {project.description}
        </p>
        {project.location && (
          <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs" style={{ color: "var(--text-faint)" }}>
            <MapPin size={13} />
            {project.location}
          </p>
        )}
      </div>
    </button>
  );
}