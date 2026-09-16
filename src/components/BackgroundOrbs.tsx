/**
 * Decorative background: three small, filled circles that drift slowly across
 * the screen (like the reference site's floating motifs). Colors adapt to the
 * active theme via CSS variables. Motion stops for users who prefer reduced
 * motion.
 */
export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="orb orb-a absolute left-[8%] top-[10%] h-24 w-24 rounded-full" />
      <div className="orb orb-b absolute right-[12%] top-[44%] h-32 w-32 rounded-full" />
      <div className="orb orb-c absolute left-[24%] bottom-[14%] h-20 w-20 rounded-full" />

      <style>{`
        .orb {
          border-radius: 999px;
          background:
            radial-gradient(circle at 32% 30%, var(--gold-soft) 0%, transparent 62%),
            radial-gradient(circle at 70% 76%, var(--blue) 0%, transparent 55%);
          opacity: 0.45;
          filter: blur(1px);
          animation: orb-drift 26s ease-in-out infinite alternate;
        }
        .orb-a { animation-duration: 22s; }
        .orb-b { animation-duration: 34s; }
        .orb-c { animation-duration: 28s; }

        /* Slow, gentle drift back and forth across the background. */
        @keyframes orb-drift {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(4vw, 5vh, 0) scale(1.15); }
        }

        @media (max-width: 767px) {
          .orb { opacity: 0.3; }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
