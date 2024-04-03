// push알람 받을 수있도록 하기
self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

// push알림 수신시 행동
self.addEventListener("push", function (e) {
  console.log("push: ", e.data);
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;

  const notificationOptions = {
    body: resultData.body,
    // icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };

  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// push알림 클릭시 나오는 행동 => 메인페이지 클릭
self.addEventListener("notificationclick", function (event) {
  console.log("notification click"); 
  console.log(event);
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});