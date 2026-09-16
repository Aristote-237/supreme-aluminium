/**
 * Fixed, decorative circular shapes that drift slowly behind the page content.
 * Colors are driven entirely by CSS variables so they adapt to the active theme.
 * All motion is disabled automatically when the user has requested reduced motion.
 */
export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="orb orb-a absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full" />
      <div className="orb orb-b absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full" />
      <div className="orb orb-c absolute -bottom-40 left-1/4 h-[22rem] w-[22rem] rounded-full" />
      <div className="ring-shape absolute right-[8%] top-[12%] h-64 w-64 rounded-full" />
      <div className="ring-shape ring-shape-slow absolute left-[6%] bottom-[18%] h-40 w-40 rounded-full" />

      <style>{`
        .orb {
          background: radial-gradient(circle at 30% 30%, var(--gold) 0%, transparent 60%);
          opacity: 0.08;
          filter: blur(10px);
          animation: orb-drift 40s ease-in-out infinite;
        }
        .orb-a { background: radial-gradient(circle at 30% 30%, var(--blue) 0%, transparent 65%); opacity: 0.5; animation-duration: 46s; }
        .orb-b { background: radial-gradient(circle at 40% 40%, var(--gold) 0%, transparent 70%); opacity: 0.07; animation-duration: 54s; animation-direction: reverse; }
        .orb-c { background: radial-gradient(circle at 50% 50%, var(--blue) 0%, transparent 65%); opacity: 0.45; animation-duration: 60s; }

        .ring-shape {
          border: 1px solid var(--gold-line);
          opacity: 0.35;
          animation: orb-pulse 12s ease-in-out infinite;
        }
        .ring-shape-slow { animation-duration: 18s; animation-delay: 2s; }

        @keyframes orb-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(2%, -3%, 0) scale(1.06); }
        }
        @keyframes orb-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.08); opacity: 0.5; }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb, .ring-shape { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
