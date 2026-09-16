import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isRunningStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const isDisplayModeStandalone = window.matchMedia("(display-mode: standalone)").matches;
  // iOS Safari exposes this non-standard flag when launched from the home screen.
  const isIosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return isDisplayModeStandalone || isIosStandalone;
}

function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * Drives the "Installer l'app" button.
 * - `canInstall` is true only once the browser has actually fired `beforeinstallprompt`.
 * - `isInstalled` becomes true after installation, hiding the button.
 * - `isIos` flags Safari/iOS, where no native prompt exists: the UI should show
 *   instructions instead of a fake install button.
 */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(isRunningStandalone());
  const isIos = isIosDevice() && !isRunningStandalone();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  return {
    canInstall: Boolean(deferredPrompt) && !isInstalled,
    isInstalled,
    isIos,
    promptInstall,
  };
}
