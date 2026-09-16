import { Mail, Phone, MapPin, Clock } from "lucide-react";
import logo from "../assets/logo/logo.jpg";
import { company } from "../data/company";
import { services } from "../data/services";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--bg-raised)", borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt={company.name} className="h-12 w-auto object-contain" />
            </div>
            <p className="font-display mt-4 text-lg" style={{ color: "var(--text)" }}>
              {company.name}
            </p>
            <p className="mt-2 text-sm italic" style={{ color: "var(--gold)" }}>
              « {company.tagline} »
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em]" style={{ color: "var(--text-faint)" }}>
              NAVIGATION
            </h3>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#a-propos">À propos</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#/realisations">Réalisations</a></li>
              <li><a href="#methode">Notre méthode</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em]" style={{ color: "var(--text-faint)" }}>
              SERVICES
            </h3>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em]" style={{ color: "var(--text-faint)" }}>
              CONTACT
            </h3>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <li className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 shrink-0" />
                <a href={company.phoneHref}>{company.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 shrink-0" />
                <a href={`mailto:${company.email}`} className="break-all">{company.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span>{company.city} — {company.district}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={15} className="mt-0.5 shrink-0" />
                <span>
                  {company.hours.weekdays}
                  <br />
                  {company.hours.sunday}
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-faint)" }}>
                SUIVEZ-NOUS
              </p>
              <SocialLinks className="mt-3" />
            </div>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
        >
          <p>© {currentYear} {company.name}. Tous droits réservés.</p>
          <p>Douala — PK20, Cameroun</p>
        </div>
      </div>
    </footer>
  );
}
