const CACHE='project-v-uploader-v10';
const SHELL=[
  './','./index.html','./manifest.webmanifest',
  './favicon-32.png','./apple-touch-icon.png','./icon-192.png','./icon-512.png'
];

function polishIcon(html){
  return html.replace(
    '.logo{width:48px;height:48px;border-radius:15px;object-fit:cover;',
    '.logo{width:48px;height:48px;border-radius:0;object-fit:contain;overflow:visible;background:transparent;'
  );
}

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;

  if(event.request.mode==='navigate'){
    event.respondWith(
      fetch(event.request,{cache:'no-store'})
        .then(async response=>{
          if(!response.ok)return response;
          const html=polishIcon(await response.text());
          return new Response(html,{status:response.status,statusText:response.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
        })
        .catch(()=>caches.match('./index.html').then(async response=>{
          if(!response)return Response.error();
          return new Response(polishIcon(await response.text()),{headers:{'Content-Type':'text/html; charset=utf-8'}});
        }))
    );
    return;
  }

  event.respondWith(
    fetch(event.request,{cache:'no-store'}).then(response=>{
      if(response.ok){
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      }
      return response;
    }).catch(()=>caches.match(event.request))
  );
});
