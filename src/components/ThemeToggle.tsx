import { Moon, Sun } from "lucide-react";
import type { ThemeName } from "../hooks/useTheme";

interface ThemeToggleProps {
  theme: ThemeName;
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({ theme, onToggle, className = "" }: ThemeToggleProps) {
  const isNight = theme === "night";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isNight ? "Activer le thème clair" : "Activer le thème nuit"}
      className={`group inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium tracking-wide transition-colors duration-300 ${className}`}
      style={{ borderColor: "var(--border)", color: "var(--text)" }}
    >
      {isNight ? <Moon size={15} strokeWidth={1.75} /> : <Sun size={15} strokeWidth={1.75} />}
      <span className="hidden sm:inline">{isNight ? "Night" : "Light"}</span>
    </button>
  );
}
