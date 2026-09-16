import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company } from "../data/company";
import { QuoteForm } from "../components/QuoteForm";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useScrollReveal } from "../hooks/useScrollReveal";

const contactItems = [
  { icon: Phone, label: "Téléphone", value: company.phoneDisplay, href: company.phoneHref },
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, label: "Localisation", value: `${company.city} — ${company.district}` },
];

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="relative py-24 sm:py-32" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`grid grid-cols-1 gap-14 transition-all duration-700 lg:grid-cols-[0.85fr_1.15fr] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.35em]" style={{ color: "var(--gold)" }}>
              CONTACT
            </p>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl" style={{ color: "var(--text)" }}>
              Parlons de votre projet
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Vous avez un projet en aluminium, inox ou vitrerie ? Parlons-en.
            </p>

            <div className="mt-10 space-y-5">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--bg-raised)", color: "var(--gold)" }}
                  >
                    <Icon size={17} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)" }}>
                      {label.toUpperCase()}
                    </p>
                    {href ? (
                      <a href={href} className="text-sm" style={{ color: "var(--text)" }}>{value}</a>
                    ) : (
                      <p className="text-sm" style={{ color: "var(--text)" }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--bg-raised)", color: "var(--gold)" }}
                >
                  <Clock size={17} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)" }}>
                    HORAIRES
                  </p>
                  <p className="text-sm" style={{ color: "var(--text)" }}>{company.hours.weekdays}</p>
                  <p className="text-sm" style={{ color: "var(--text)" }}>{company.hours.sunday}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <WhatsAppButton variant="inline" label="Discuter directement sur WhatsApp" />
            </div>
          </div>

          <div className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}>
            <h3 className="font-display text-xl" style={{ color: "var(--text)" }}>
              Demander un devis
            </h3>
            <p className="mt-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
              Votre demande sera préparée pour être envoyée par WhatsApp et par email.
            </p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
