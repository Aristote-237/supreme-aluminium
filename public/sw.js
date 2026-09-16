/*
 * SUPRÊME ALUMINIUM SERVICE PLUS — Service Worker (auto-update)
 *
 * Update flow (equivalent to vite-plugin-pwa registerType: 'autoUpdate'):
 *   1. The browser detects that ./sw.js changed (sw.js is served with
 *      `Cache-Control: no-cache` via vercel.json, and the app re-checks it
 *      periodically with registration.update()).
 *   2. The new worker installs and calls skipWaiting() -> it activates
 *      immediately, without waiting for tabs to close.
 *   3. activate() purges every cache from older versions, claims all clients
 *      and posts a message so the app reloads once to the new version.
 *   4. fetch keeps the app shell (index.html) network-first so a freshly
 *      deployed build is always served, while hashed assets (immutable) and
 *      images are cache-first for performance and offline support.
 */

const CACHE_VERSION = "supreme-aluminium-v2";
const CACHE_NAMESPACE_PREFIXES = ["supreme-aluminium-", "sap-cache-"];

// Minimal shell precached at install (kept best-effort).
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./favicon-32.png",
];

function isOurCache(key) {
  return CACHE_NAMESPACE_PREFIXES.some((prefix) => key.startsWith(prefix));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {})
  );
  // Activate as soon as install finishes — no "waiting" phase.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // 1. Remove caches belonging to older versions.
      const keys = await caches.keys();
      const oldCacheKeys = keys.filter((key) => key !== CACHE_VERSION && isOurCache(key));
      await Promise.all(oldCacheKeys.map((key) => caches.delete(key)));

      // 2. Take control of open clients.
      await self.clients.claim();

      // 3. Only notify on a real update (an older cache existed before this
      //    activation). On a very first install there is nothing to refresh.
      if (oldCacheKeys.length > 0) {
        const clients = await self.clients.matchAll({ type: "window" });
        for (const client of clients) {
          client.postMessage({ type: "SAP_VERSION_UPDATE" });
        }
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  // Navigations (index.html / app shell): network-first so a newly deployed
  // version is served; cache fallback keeps the app usable offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            event.waitUntil(
              caches
                .open(CACHE_VERSION)
                .then((cache) => cache.put("./index.html", clone))
                .catch(() => {})
            );
          }
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Hashed JS/CSS, fonts and images: cache-first, then network (and store).
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches
              .open(CACHE_VERSION)
              .then((cache) => cache.put(request, clone))
              .catch(() => {});
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
