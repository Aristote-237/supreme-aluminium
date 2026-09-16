/**
 * PWA service worker registration + automatic update flow.
 *
 * Auto-update behaviour (equivalent to vite-plugin-pwa `registerType: 'autoUpdate'`):
 *  - the browser (server-served with `Cache-Control: no-cache` via vercel.json)
 *    detects that ./sw.js changed, installs the new worker and activates it
 *    immediately (skipWaiting + clients.claim),
 *  - old caches are purged during the worker's `activate` event,
 *  - the app reloads itself once, so the user automatically sees the new version.
 *
 * A timestamp guard (max one reload per 2 minutes) prevents reload loops, and the
 * very first installation never triggers a reload.
 */

const RELOAD_GUARD_KEY = "supreme-aluminium-sw-reload-guard";
const RELOAD_GUARD_MS = 2 * 60 * 1000;
const SW_CHECK_INTERVAL_MS = 30 * 60 * 1000;

function canScheduleReload(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const last = Number(window.sessionStorage.getItem(RELOAD_GUARD_KEY) ?? 0);
    return !Number.isFinite(last) || Date.now() - last > RELOAD_GUARD_MS;
  } catch {
    return true;
  }
}

function markReloadGuard(): void {
  try {
    window.sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
  } catch {
    // storage unavailable — ignore, the guard simply won't apply.
  }
}

function scheduleReload(): void {
  // Give the freshly activated worker a moment to fully take over the page.
  window.setTimeout(() => {
    window.location.reload();
  }, 400);
}

function trackVersionUpdates(registration: ServiceWorkerRegistration): void {
  // The service worker asks the page to reload once it has activated.
  navigator.serviceWorker.addEventListener("message", (event: Event) => {
    const data = (event as MessageEvent).data;
    if (data && typeof data === "object" && data.type === "SAP_VERSION_UPDATE") {
      if (canScheduleReload()) {
        markReloadGuard();
        scheduleReload();
      }
    }
  });

  // Fallback: the browser found a new worker during its own update check
  // (does not fire on the very first install of the app).
  registration.addEventListener("updatefound", () => {
    const installing = registration.installing;
    if (!installing) return;
    installing.addEventListener("statechange", () => {
      if (installing.state === "activated" && navigator.serviceWorker.controller) {
        if (canScheduleReload()) {
          markReloadGuard();
          scheduleReload();
        }
      }
    });
  });

  // Light periodic check so a freshly deployed version is picked up even if
  // the tab stays open (one revalidation every 30 minutes, browser-managed).
  window.setInterval(() => {
    registration.update().catch(() => {});
  }, SW_CHECK_INTERVAL_MS);
}

export function registerServiceWorker(): void {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => trackVersionUpdates(registration))
      .catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
  });
}
