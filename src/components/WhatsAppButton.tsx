import { MessageCircle } from "lucide-react";
import { company } from "../data/company";
import { buildWhatsappGenericUrl } from "../utils/whatsapp";

const DEFAULT_MESSAGE = `Bonjour ${company.name}, je souhaite avoir plus d'informations sur vos services.`;

interface WhatsAppButtonProps {
  variant?: "floating" | "inline";
  label?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({ variant = "floating", label, message, className = "" }: WhatsAppButtonProps) {
  const href = buildWhatsappGenericUrl(message ?? DEFAULT_MESSAGE);

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.02] ${className}`}
        style={{ background: "#25D366", color: "#08331B" }}
      >
        <MessageCircle size={17} strokeWidth={2} />
        {label ?? "Discuter sur WhatsApp"}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter Suprême Aluminium sur WhatsApp"
      className={`whatsapp-fab fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg sm:bottom-8 sm:right-8 ${className}`}
      style={{ background: "#25D366", color: "#08331B" }}
    >
      <span className="whatsapp-pulse absolute inset-0 rounded-full" />
      <MessageCircle size={26} strokeWidth={2} className="relative" />

      <style>{`
        .whatsapp-pulse {
          background: #25D366;
          opacity: 0.55;
          animation: whatsapp-pulse 2.4s ease-out infinite;
        }
        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.45; }
          70% { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-pulse { animation: none; display: none; }
        }
      `}</style>
    </a>
  );
}
