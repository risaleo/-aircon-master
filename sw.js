const CACHE='aircon-master-v317';
const ASSETS=['./','./index.html?v=317','./styles.css?v=317','./app-data.js?v=317','./app.js?v=317','./manifest.json','./hero-aircon.jpg','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html?v=317')));
  }else{
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
  }
});