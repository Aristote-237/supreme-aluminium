import { useEffect, useState } from "react";
import { heroSlides } from "../data/heroSlides";

const SLIDE_DURATION_MS = 5000;

interface HeroSlideshowProps {
  className?: string;
}

/**
 * Full-bleed background slideshow that slowly crossfades through the gallery
 * photos on a loop. A theme-aware scrim sits on top so the hero text and
 * buttons stay readable over any photo.
 */
export function HeroSlideshow({ className = "" }: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || heroSlides.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      {heroSlides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          loading={index === 0 ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
          style={{
            opacity: index === activeIndex ? 1 : 0,
            transitionDuration: "1800ms",
          }}
        />
      ))}

      {/* Theme-aware scrim: keeps hero text legible over any photo, in both themes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--bg) 55%, transparent) 0%, color-mix(in srgb, var(--bg) 80%, transparent) 55%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}
