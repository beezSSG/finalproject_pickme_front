import { useState, useRef } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import Polist from "./Polist";


export default function Pocheckmodal({getPolist, po}) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState([]);
  

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


  // 생각할점: 재고현황을 한번에 보는것과 먼저 상품으로 묶은뒤 상품을 클릭했을때 각기 주문한 수량 소비기한을 묶어서 보여주는것
  // #0. 승인완료 누를 때 실행되는 함수
  function con() {
      // 받아야하는거 id, quantity, date(소비기한) 이렇게하면 완벽하게 끝! 이해가 안가는 부분 있을까요?
      const params = {"id": po.id, "quantity": po.quantity, }; // 소비기한 , 스토어아이디
      // #1. purchase_order 테이블에 값을 주입
      // #2. store_product(재고) 테이블에 승인된 물건의 값을 주입
      // 백에서 하나의 axios문으로 두개의 행동을 할것이기 때문에
      axios.post("ceo/deleteProduct", null, {params:params})
        .then(resp => {
            getPolist('', '', 0);
                    
         })
          .catch(err => {
            // 오류가 발생했을 때의 처리
            console.error(err);
          });
      

      // #3. 모달창 끄기
      onToggleModal();
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
          <Button key="submit" onClick={con}>
            소비기한 입력하기
          </Button>
          </div>
          </div>
        </Modal>
      }
    </>
  );
}