self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open('pickme').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/'
      ]);
    })
  );
});

self.addEventListener("activate", function (e) {
  console.log('[Service Worker] activate');
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
          // console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
                return caches.open('pickme').then(function(cache) {
          // console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

// push알림 수신시 행동
self.addEventListener("push", function (e) {
  console.log("[Service Worker] push: ", e.data);
  console.log("[Service Worker] push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;

  const notificationOptions = {
    body: resultData.body,
    // icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };

  console.log("[Service Worker] push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// push알림 클릭시 나오는 행동 => 메인페이지 클릭
self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] notification click"); 
  console.log(event);
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});