// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "pick-me-3592.firebaseapp.com",
  projectId: "pick-me-3592",
  storageBucket: "pick-me-3592.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebaseConfig에서 생성한 initApp 객체로 메세징 객체-messaging 생성
const messaging = getMessaging(app);

// react 시작시 push알림 권한 요청 함수
async function requestPermission() {
  // console.log("권한 요청 중...");
  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }
  // console.log("알림 권한이 허용됨");

  // 토큰 생성
  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_KEY,
  });

  // 토큰이 정상적으로 생성 되었을때
  if (token) console.log("token:", token);
  else console.log("Can not get Token");

  
  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
  });
}

requestPermission();