import { MessageSquareHeart } from "lucide-react";
import { buildWhatsappGenericUrl } from "../utils/whatsapp";
import { useScrollReveal } from "../hooks/useScrollReveal";

const REVIEW_MESSAGE = "Bonjour, je souhaite partager mon avis sur les travaux réalisés par Suprême Aluminium Service Plus.";

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative py-20" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <span
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "var(--bg-raised)", color: "var(--gold)" }}
          >
            <MessageSquareHeart size={22} strokeWidth={1.75} />
          </span>
          <h2 className="font-display mt-5 text-2xl sm:text-3xl" style={{ color: "var(--text)" }}>
            Vous êtes déjà client Suprême Aluminium ?
          </h2>
          <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-muted)" }}>
            Les avis de nos clients seront bientôt publiés ici. Si vous avez déjà travaillé avec nous, partagez
            votre expérience — cela aide les prochains clients à nous faire confiance.
          </p>
          <a
            href={buildWhatsappGenericUrl(REVIEW_MESSAGE)}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide"
            style={{ background: "var(--gold)", color: "var(--blue-deep)" }}
          >
            Laisser mon avis sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
