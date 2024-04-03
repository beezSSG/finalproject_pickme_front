// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtOscg81u0eLadJUqMK72dKxtughyr9ys",
  authDomain: "pick-me-3592.firebaseapp.com",
  projectId: "pick-me-3592",
  storageBucket: "pick-me-3592.appspot.com",
  messagingSenderId: "495679252602",
  appId: "1:495679252602:web:155aad5dbfcbb4fb9a33c3",
  measurementId: "G-VZ8FJR77K6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

// react 시작시 push알림 권한 요청 함수
async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: "BEiUoMxUcfvCS7MKE-fpE_O3JCc3qTOj1cuXvcsHTbd6A18n4xy-ZAq82K9xfrDEbzf-neL5jlzjp7rTUy-T5ns",
  });

  if (token) console.log("token:", token);
  else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
  });
}

requestPermission();