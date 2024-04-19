import moment from "moment";

function dDay(expDay) {
  // 현재 날짜와 종료 날짜 간의 차이 계산
  // console.log(expDay);
  const today = moment();
  const end = moment(expDay);
  const duration = moment.duration(end.diff(today));
  const days = duration.asDays();

  // 남은 일수를 상태에 설정
  return days.toFixed(0); // 소수점 아래는 버림
}

export function homeAlertHandle(data) {
  // 세션스토리지를 통하여 홈페이지를 나가고 다시 들어오면 다시 알림이 뜨게 하기
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  let daylist = [];

  // 이미 알림을 보여준 경우, 함수를 종료
  if (isLoggedIn === 'true') {
    return;
  }
  
  for (let i = 0; i < data.length; i++) {
    let dDays = dDay(data[i].expDate);
    console.log(dDays);
    if (dDays <= 7) {
      daylist.push(dDays);
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js').then(function(registration) {
      // 서비스 워커 등록 성공
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
      // 알림 표시 7일 이하의 물건이 하나도 없는경우 나타나지 않게하기
      if (daylist.length === 0) {
        let title = 'Pickbox 소비기한 알림';
        let options = {
          body: `소비기한이 7일이하로 남아있는 물품이 ${daylist.length}개 있습니다.`,
          vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500],
          sound: '/demos/notification-examples/audio/notification-sound.mp3',
          icon: '../assets/imgs/logo/logo.svg'
        };
        registration.showNotification(title, options);
      }
    }).catch(function(err) {
      // 등록 실패
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}