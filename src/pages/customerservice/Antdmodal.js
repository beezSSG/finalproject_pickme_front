import { useState } from "react";
import { Modal, Button } from "antd";
import DaumPostcode from "react-daum-postcode";

export default function Antdmodal({updateAddress}) {
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
      <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-4 me-2 mb-2 dark:focus:ring-yellow-900"
       onClick={onToggleModal}>
        주소찾기
      </button>
      {isOpen && (
        <Modal
          open={true}
          onOk={onToggleModal}
          onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
        >
          <DaumPostcode onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}