//This is the "Offline page" service worker

//Install stage sets up the offline page in the cache and opens a new cache

var filesToCache = [
  '/static/offline.html',
  '/static/images/800px-Tramway_Lyon_1-plan.png',
  '/static/images/horaires.png'
];

//This is the "Offline page" service worker

//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('pwabuilder-offline').then(function(cache) {
      return cache.addAll(filesToCache)
    })
  );
});

//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
self.addEventListener('fetch', function(event) {
  console.log(event.request.url)
  if(event.request.url.includes('800px-Tramway_Lyon_1-plan.png')){
    event.respondWith(
      fetch(event.request).catch(function(error) {
        return caches.open('pwabuilder-offline').then(function(cache) {
          console.log('fetched image')
          return cache.match('/static/images/800px-Tramway_Lyon_1-plan.png')
        });
      }
    ));
  }
  else if(event.request.url.includes('horaires.png')){
    event.respondWith(
      fetch(event.request).catch(function(error) {
        return caches.open('pwabuilder-offline').then(function(cache) {
          console.log('fetched image')
          return cache.match('/static/images/horaires.png')
        });
      }
    ));
  }
  else {
    event.respondWith(
      fetch(event.request).catch(function(error) {
        console.error( '[PWA Builder] Network request Failed. Serving offline page ' + event.request.url)
        return caches.open('pwabuilder-offline').then(function(cache) {
          console.log('fetched offline page')
          return cache.match('/static/offline.html')
        });
      }
    ));
  }
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener('refreshOffline', function(response) {
  return caches.open('pwabuilder-offline').then(function(cache) {
    console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url)
    return cache.put('/static/offline.html', response)
  });
});
