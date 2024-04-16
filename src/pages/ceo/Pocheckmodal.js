import { useState, useRef } from "react";
import { Modal, Button } from "antd";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';


export default function Pocheckmodal() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜

  // 이함수는 모달을 껏다 켰다 하는 함수
  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // 이함수는 만약 부모에게 값을 전달해야할 필요가 있을때 사용하는 함수입니다.
  const handleComplete = (data) => {
    console.table(data);
    const add = {
      zonecode: data.zonecode,
      address: data.address,
    };
    // 부모에게 값 전달
    onToggleModal(); // 주소창은 자동으로 사라지므로 모달만 꺼주면 된다.
  };

  function InputSample() {
    const [inputs, setInputs] = useState({
      name: '',
      nickname: ''
    });
  }



  //   const datepicker = $('.input__item');

  //   datepicker.datepicker({
  //       dateFormat: 'yy-mm-dd',
  //       showOtherMonths: true,
  //       showMonthAfterYear: true,
  //       changeYear: true,
  //       changeMonth: true,
  //       showOn: 'both',
  //       buttonImage: ('https://cdn-icons-png.flaticon.com/512/2838/2838779.png'),
  //       buttonImageOnly: true,
  //       showAnim: '',
  //       onSelect: function () {
  //           dimDisplay('none'); // hide back layer when date selected
  //       }
  //   });

  //   $('#datepicker').datepicker('setDate', 'today'); // set date as today

  
  //   // custom datepicker 
  //   const dateInput = document.querySelector('.input__item'),
  //         dateIcon = document.querySelector('.ui-datepicker-trigger'),
  //         calendar = document.querySelector('#ui-datepicker-div');

  //   // add back layer
  //   const dim = document.createElement('div');
  //   dim.classList.add('datepicker-layer');

  //   calendar.before(dim);


  //   // back layer show
  //   dateInput.addEventListener('focus', function () {
  //       if (calendar.style.display === 'block') {
  //           dimDisplay('block');
  //       }
  //   })
  
  //  dateIcon.addEventListener('click', function () {
  //       if (calendar.style.display == 'block') {
  //           dimDisplay('block');
  //       }
  //   })

  //   //back layer hide
  //   const layer = document.querySelector('.datepicker-layer');
  
  //   window.addEventListener('click', function (e) {
  //       if (e.target === layer) {
  //           dimDisplay('none');
  //       }
  //   });

  //   // back layer display control
  //   function dimDisplay(display) {
  //       layer.style.display = display;
  //   }

  return (
    <>
      <button
        type="button"
        onClick={onToggleModal}
        className="bg-sub-yellow rounded-xl p-1 font-bold hover:bg-sub-orange"
      >
        확인하기
      </button>
              
      {isOpen && 
        // 모달 속성이 onok / cancel 두개가 예 아니요 누를때 실행되는 함수이구요
        // centered는 항상 화면에 정중앙에 모달을 띄우겠냐는 의미예요
        // width같은게 모달창 크기 조절 할 수 있어요 여기는 테일윈드 쓰는 className 이걸로 모달크기 조절이 불가능하고
        // 내부에 있는 표현할 부분은 테일윈드 가능해요
        // footer라는 기능이 있는데 원래 ok라는 부분이 정해져있는 위치라 조정이 안되는데 저걸로 버튼을 새로만들고
        // 사용가능해요 참고할곳은 mypage에 회원탈퇴 부분인데 잠시만요
        // 어떤 디자인 원하세요? 디자인이라고 함은 ok 이부분인가요??
        // 우선 승인 확인되었습니다라는 창이 뜨고 그 다음에 pickbox로 넘어갔으면 좋겠어요
        // 민기씌 혹시 보셨나요? 이제 제가 해볼게여 감사합니당
        // 모르는게 생기면 물어봐주세요 모달창 디자인이랑 함수 적는거까지 하시고 만약에 axios할때
        // 에러생기면 말해주시면 될거같아요 감사합니다 민기씨 안힘드세요?  많이 피곤하실거같은데
        // 얼마안남았으니 열심히 해야죠 27일 실기 시험있는데 아직 책한글자도헉
        <Modal
          open={true}
          centered={true}
          footer={null}
          onCancel={onToggleModal}
        >
          {/* 여기에 모달내부에 보여줄 디자인을 작성 */}
          <h1 className="text-lg font-bold">
          승인 확인되었습니다
                  </h1>
          {/* 이부분은 유통기한이 입력되는 부분 */}
          <div className="text-center items-center">
            <br/>
            <div className="text-right">
          <input type="date" />&nbsp;&nbsp;
            {/* <div id="wrap">
              <div class="container">
                <div class="container__wrap">
                  <h1 class="container__tit">Modal style datepicker</h1>
                  <div class="input__wrap">
                    <input type="text" className="input__item" placeholder="click me :)"/>
                  </div>
                </div>
              </div>
            </div> */}
          <Button key="submit" onClick={onToggleModal}>
            소비기한 입력하기
          </Button>
          </div>
          </div>
        </Modal>
      }
    </>
  );
}