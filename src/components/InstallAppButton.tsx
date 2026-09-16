import { useState } from "react";
import { Download, Share, X } from "lucide-react";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

interface InstallAppButtonProps {
  className?: string;
  compact?: boolean;
  /** When true, renders as a fixed floating button (used on mobile where the header is hidden). */
  floating?: boolean;
}

export function InstallAppButton({ className = "", compact = false, floating = false }: InstallAppButtonProps) {
  const { canInstall, isInstalled, isIos, promptInstall } = useInstallPrompt();
  const [showIosGuide, setShowIosGuide] = useState(false);

  if (isInstalled) return null;

  const floatingClasses = floating
    ? "fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-5 z-40"
    : "";

  // Real install prompt available (Android / desktop Chrome, Edge…)
  if (canInstall) {
    return (
      <button
        type="button"
        onClick={promptInstall}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.03] ${floatingClasses} ${className}`}
        style={{ background: "var(--gold)", color: "var(--blue-deep)" }}
      >
        <Download size={14} strokeWidth={2} />
        {compact ? "Installer" : "Installer l'app"}
      </button>
    );
  }

  // iOS Safari has no native prompt — offer a short instruction sheet instead.
  if (isIos) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIosGuide(true)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide ${floatingClasses} ${className}`}
          style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
        >
          <Download size={14} strokeWidth={2} />
          {compact ? "Installer" : "Installer l'app"}
        </button>

        {showIosGuide && (
          <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center"
            role="dialog"
            aria-modal="true"
            onClick={() => setShowIosGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl border p-6 text-sm"
              style={{ background: "var(--bg-raised)", borderColor: "var(--border)", color: "var(--text)" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="font-display text-lg">Installer l'app</p>
                <button
                  type="button"
                  onClick={() => setShowIosGuide(false)}
                  aria-label="Fermer"
                  style={{ color: "var(--text-muted)" }}
                >
                  <X size={18} />
                </button>
              </div>
              <p style={{ color: "var(--text-muted)" }}>
                Sur iPhone et iPad, l'installation se fait depuis Safari :
              </p>
              <ol className="mt-3 space-y-2" style={{ color: "var(--text)" }}>
                <li className="flex items-start gap-2">
                  <Share size={16} className="mt-0.5 shrink-0" />
                  <span>Appuyez sur le bouton <strong>Partager</strong> en bas de l'écran.</span>
                </li>
                <li>Faites défiler puis choisissez <strong>« Sur l'écran d'accueil »</strong>.</li>
                <li>Confirmez avec <strong>« Ajouter »</strong>.</li>
              </ol>
            </div>
          </div>
        )}
      </>
    );
  }

  // No install capability detected yet (e.g. criteria not met) — render nothing.
  return null;
}
