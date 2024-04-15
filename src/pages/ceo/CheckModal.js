import { useState, useRef } from "react";
import { Modal, Button } from "antd";

export default function CheckModal() {

  const [isOpen, setIsOpen] = useState(false);
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜

  // 이함수는 모달을 껏다 켰다 하는 함수
  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // 이 함수는 만약 부모에게 값을 전달해야할 필요가 있을때 사용하는 함수입니다.
  const handleComplete = (data) => {
    console.table(data);
    const add = {
      zonecode: data.zonecode,
      address: data.address,
    };
    // 부모에게 값 전달
    onToggleModal(); // 주소창은 자동으로 사라지므로 모달만 꺼주면 된다.
  };


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
        </Modal>
      }
    </>
  );
}