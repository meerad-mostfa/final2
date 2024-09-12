// src/client/sw.js

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

// Precache and route assets
precacheAndRoute(self.__WB_MANIFEST);

// Example runtime caching route
registerRoute(
  ({ request }) => request.destination === 'image',
  new NetworkFirst()
);

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  // يمكن تنفيذ عمليات التخزين المؤقت هنا إذا لزم الأمر
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  // يمكن تنظيف الكاش هنا إذا لزم الأمر
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
