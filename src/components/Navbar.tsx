import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo/logo.jpg";
import { ThemeToggle } from "./ThemeToggle";
import { InstallAppButton } from "./InstallAppButton";
import { WhatsAppButton } from "./WhatsAppButton";
import type { ThemeName } from "../hooks/useTheme";

const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#methode", label: "Notre méthode" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  theme: ThemeName;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 hidden transition-all duration-300 lg:block"
      style={{
        background: isScrolled ? "color-mix(in srgb, var(--bg) 88%, transparent)" : "transparent",
        backdropFilter: isScrolled ? "blur(14px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          isScrolled ? "py-2.5" : "py-4"
        }`}
      >
        <a href="#accueil" className="flex items-center gap-3" onClick={closeMenu}>
          <img
            src={logo}
            alt="Suprême Aluminium Service Plus"
            className={`w-auto object-contain transition-all duration-300 ${isScrolled ? "h-9" : "h-11"}`}
          />
          <span className="font-display hidden text-sm leading-tight tracking-wide sm:block" style={{ color: "var(--text)" }}>
            SUPRÊME ALUMINIUM
            <span className="block text-[0.65rem] font-medium tracking-[0.2em]" style={{ color: "var(--gold)" }}>
              SERVICE PLUS
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <WhatsAppButton variant="inline" label="WhatsApp" className="px-4 py-2 text-xs" />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <InstallAppButton compact />
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 top-[var(--nav-h,64px)] z-40 flex flex-col gap-1 overflow-y-auto px-6 pb-10 pt-6 lg:hidden"
          style={{ background: "var(--bg)", top: isScrolled ? "60px" : "72px" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="border-b py-4 text-lg font-display"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              {link.label}
            </a>
          ))}

          <div className="mt-6 flex flex-col gap-3">
            <WhatsAppButton variant="inline" label="Discuter sur WhatsApp" />
            <div className="flex items-center gap-3">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} className="flex-1 justify-center" />
              <InstallAppButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
