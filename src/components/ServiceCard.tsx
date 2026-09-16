import {
  DoorOpen,
  RectangleHorizontal,
  PanelsTopLeft,
  Fence,
  LayoutPanelTop,
  Building2,
  SquareStack,
  Sparkle,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "../data/services";

const ICONS: Record<Service["icon"], LucideIcon> = {
  door: DoorOpen,
  window: RectangleHorizontal,
  glassWall: PanelsTopLeft,
  balcony: Fence,
  ceiling: LayoutPanelTop,
  curtainWall: Building2,
  glazing: SquareStack,
  steel: Sparkle,
  custom: Ruler,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICONS[service.icon];

  return (
    <a
      href="#contact"
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-3xl" style={{ color: "var(--border-strong)" }}>
          {service.number}
        </span>
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300"
          style={{ background: "var(--surface)", color: "var(--gold)" }}
        >
          <Icon size={20} strokeWidth={1.75} />
        </span>
      </div>

      <div className="mt-8">
        <h3 className="font-display text-xl" style={{ color: "var(--text)" }}>
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {service.description}
        </p>
      </div>

      <span
        className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors duration-300"
        style={{ color: "var(--gold)" }}
      >
        Demander un devis
      </span>
    </a>
  );
}
