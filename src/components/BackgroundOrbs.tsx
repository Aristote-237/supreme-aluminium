/**
 * Fixed, decorative background circles inspired by the reference site's filled
 * motifs: exactly three filled circles, each slowly oscillating in place so the
 * backdrop feels alive without ever covering the content.
 * Colors are driven entirely by CSS variables so they adapt to the active theme.
 * All motion is disabled automatically when the user has requested reduced motion.
 */
export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="orb orb-a absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full" />
      <div className="orb orb-b absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full" />
      <div className="orb orb-c absolute -bottom-40 left-1/4 h-[22rem] w-[22rem] rounded-full" />

      <style>{`
        /* Three filled circles with a soft gradient, slowly oscillating. */
        .orb {
          border-radius: 999px;
          background:
            radial-gradient(circle at 32% 30%, var(--blue) 0%, transparent 62%),
            radial-gradient(circle at 70% 76%, var(--gold) 0%, transparent 55%);
          opacity: 0.3;
          filter: blur(3px);
          animation: orb-oscillate 16s ease-in-out infinite;
        }
        .orb-a { animation-duration: 15s; }
        .orb-b { animation-duration: 21s; animation-delay: -6s; }
        .orb-c { animation-duration: 18s; animation-delay: -11s; }

        @keyframes orb-oscillate {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(1%, 1.5%, 0) scale(1.05); }
        }

        @media (max-width: 767px) {
          .orb { opacity: 0.22; }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
