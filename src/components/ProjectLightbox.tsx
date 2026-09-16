import { useEffect } from "react";
import { X, MapPin } from "lucide-react";
import type { Project } from "../data/projects";

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div
        className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border md:grid-cols-[1.4fr_1fr]"
        style={{ background: "var(--bg-raised)", borderColor: "var(--border-strong)" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="max-h-[60vh] overflow-hidden md:max-h-[80vh]">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        </div>

        <div className="relative flex flex-col p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            <X size={18} />
          </button>

          <span
            className="w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
            style={{ background: "var(--surface)", color: "var(--gold)" }}
          >
            {project.category}
          </span>

          <h3 className="font-display mt-4 text-2xl" style={{ color: "var(--text)" }}>
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {project.description}
          </p>

          {project.location && (
            <p className="mt-6 flex items-center gap-2 text-sm" style={{ color: "var(--text-faint)" }}>
              <MapPin size={15} />
              {project.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
