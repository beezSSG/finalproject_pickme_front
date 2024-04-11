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
      <button className="p-3  bg-yellow-500 rounded-lg font-bold cursor-pointer hover:bg-yellow-600"
       style={{ marginTop: height }}
       onClick={onToggleModal}>
        주소찾기
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