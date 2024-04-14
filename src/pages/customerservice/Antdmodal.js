import { useState } from "react";
import { Modal, Button } from "antd";
import DaumPostcode from "react-daum-postcode";

export default function Antdmodal({updateAddress, height}) {
  const [isOpen, setIsOpen] = useState(false);
 

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // function updateAddress(props) {
  //   props.updateAddress(address);
  // }

  const handleComplete = (data) => {
    console.table(data);
    // json 형식으로 값 저장
    const add = {
      'zonecode' : data.zonecode,
      'address' : data.address,
    };
    // 부모에게 값 전달
    updateAddress(add);
    // updateAddress();
    onToggleModal(); // 주소창은 자동으로 사라지므로 모달만 꺼주면 된다.
  };
  
  return (
    <>
      {/* 데스크톱 / 탭 화면 버튼 */}
      <button className="px-1.5 py-3 sm:hidden ml-8 lg:w-1/12 md:w-1/6 rounded-lg font-bold cursor-pointer bg-main-yellow hover:bg-sub-orange transition duration-300"
       onClick={onToggleModal}>
        주소찾기
      </button>
      {/* 반응형 버튼 */}
      <button className="lg:hidden md:hidden sm:text-sm p-1 w-1/4 ml-3 bg-main-yellow rounded-lg font-bold cursor-pointer hover:bg-sub-orange transition duration-300"
       onClick={onToggleModal}>
        주소
        <br />
        찾기
      </button>
      {isOpen && (
        <Modal
          open={true}
          onOk={onToggleModal}
          onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
          okButtonProps={{style:{backgroundColor: "rgb(250,204,21)"}}}
        >
          <DaumPostcode onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}