import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  isNumeric?: boolean;
  displayValue?: string;
}

/**
 * Displays a large stat with a short count-up animation once it scrolls into view.
 * When `isNumeric` is false, `displayValue` is shown as-is (e.g. "CAMEROUN").
 */
export function StatCounter({ value, suffix = "", label, isNumeric = true, displayValue }: StatCounterProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.4);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible || !isNumeric) return;
    const durationMs = 900;
    const startTime = performance.now();

    let frameId: number;
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      setCount(Math.round(progress * value));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, isNumeric, value]);

  return (
    <div ref={ref} className="min-w-0 text-center sm:text-left">
      <p
        className={`font-display leading-tight ${
          isNumeric ? "text-4xl sm:text-5xl" : "text-lg sm:text-3xl"
        }`}
        style={{ color: "var(--gold)" }}
      >
        {isNumeric ? String(count).padStart(String(value).length, "0") : displayValue}
        {isNumeric && suffix}
      </p>
      <p className="mt-2 text-xs font-semibold tracking-[0.2em]" style={{ color: "var(--text-faint)" }}>
        {label}
      </p>
    </div>
  );
}
