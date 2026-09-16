import { useCallback, useEffect, useState } from "react";

export type ThemeName = "night" | "light";

const STORAGE_KEY = "sap-theme";
const DEFAULT_THEME: ThemeName = "night";

function getStoredTheme(): ThemeName | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "night" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
}

function applyThemeToDocument(theme: ThemeName) {
  const root = document.documentElement;
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.setAttribute("data-theme", "night");
  }
}

/**
 * Manages the Night/Light theme.
 * - "Night Design" is always the default for a first-time visitor, regardless
 *   of the device's OS-level light/dark preference.
 * - Once the person manually picks a theme, that choice is saved to
 *   localStorage and takes over on every later visit.
 * - Applies the theme as a `data-theme` attribute on <html>, matched by index.css,
 *   which still also defines a `prefers-color-scheme` fallback for any context
 *   that renders before this hook runs (e.g. no-JS edge cases).
 */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => getStoredTheme() ?? DEFAULT_THEME);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeName) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — theme still applies for this session.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "night" ? "light" : "night");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
