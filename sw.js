const CACHE='aircon-master-v320';
const ASSETS=['./','./index.html?v=320','./styles.css?v=320','./app-data.js?v=320','./app.js?v=320','./manifest.json','./hero-aircon.jpg','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html?v=320')))}else{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))}});
