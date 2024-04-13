import { useState } from "react";
import { Modal, Button } from "antd";
import DaumPostcode from "react-daum-postcode";

export default function MyInfoPost({ updateAddress }) {
  const [isOpen, setIsOpen] = useState(false);
  // const [address, setAddress] = useState({});

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // function updateAddress(props) {
  //   props.updateAddress(address);
  // }

  const handleComplete = (data) => {
    console.table(data);
    const add = {
      zonecode: data.zonecode,
      address: data.address,
    };
    // 부모에게 값 전달
    updateAddress(add);
    onToggleModal(); // 주소창은 자동으로 사라지므로 모달만 꺼주면 된다.
  };

  return (
    <>
      <button
        onClick={onToggleModal}
        className="bg-sub-yellow rounded-xl p-1 font-bold hover:bg-sub-orange"
      >
        주소 검색
      </button>
      {isOpen && (
        <Modal
          open={true}
          onOk={onToggleModal}
          onCancel={onToggleModal}
          centered={true}
        >
          <DaumPostcode onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
