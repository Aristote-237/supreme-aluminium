import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Truck } from "lucide-react";
import heroImage from "../assets/realisations/villa-baie-vitree.jpg";
import { company } from "../data/company";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { HeroSlideshow } from "../components/HeroSlideshow";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const infoBadges = [
  { icon: Sparkles, label: `${company.yearsOfExperience} ans d'expérience` },
  { icon: MapPin, label: `${company.city} • ${company.district}` },
  { icon: Truck, label: "Intervention partout au Cameroun" },
];

export function Hero() {
  return (
    <section id="accueil" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32">
      {/* Mobile & tablet only: slow looping photo background behind the hero content. */}
      <HeroSlideshow className="absolute inset-0 -z-10 lg:hidden" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="text-xs font-semibold tracking-[0.35em]"
            style={{ color: "var(--gold)" }}
          >
            MENUISERIE ALUMINIUM · VITRERIE · INOX
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.12}
            variants={fadeUp}
            className="font-display mt-5 text-[1.8rem] leading-[1.08] sm:text-6xl lg:text-[4rem]"
            style={{ color: "var(--text)" }}
          >
            Suprême Aluminium
            <span className="block" style={{ color: "var(--gold)" }}>
              Service Plus
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.24}
            variants={fadeUp}
            className="mt-6 max-w-lg text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Menuiserie aluminium, vitrerie générale et solutions en aluminium &amp; inox sur mesure — conçues pour
            durer et pensées pour vos espaces.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.36}
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#/realisations"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.02]"
              style={{ background: "var(--gold)", color: "var(--blue-deep)" }}
            >
              Explorer nos réalisations
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold tracking-wide"
              style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
            >
              Demander un devis
            </a>
            <WhatsAppButton variant="inline" label="WhatsApp" className="px-6 py-3.5" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.48}
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
          >
            {infoBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <Icon size={16} style={{ color: "var(--gold)" }} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div
            className="absolute -inset-3 rounded-[2rem] opacity-60 blur-2xl"
            style={{ background: "linear-gradient(135deg, var(--gold) 0%, transparent 60%)", opacity: 0.15 }}
            aria-hidden="true"
          />
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border"
            style={{ borderColor: "var(--border-strong)", boxShadow: "var(--shadow)" }}
          >
            <img
              src={heroImage}
              alt="Baie vitrée en aluminium réalisée par Suprême Aluminium Service Plus"
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 p-5"
              style={{ background: "linear-gradient(to top, rgba(6,11,24,0.75), transparent)" }}
            >
              <p className="text-xs font-medium tracking-wide text-white/90">Baie vitrée aluminium — réalisation Suprême Aluminium</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
