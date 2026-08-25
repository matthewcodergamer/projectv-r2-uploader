const CACHE='project-v-uploader-final-1';
const SHELL=['./','./index.html','./manifest.webmanifest?v=final-1','./favicon-32.png?v=final-1','./apple-touch-icon.png?v=final-1','./icon-192.png?v=final-1','./icon-512.png?v=final-1'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c)).catch(()=>{});return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
