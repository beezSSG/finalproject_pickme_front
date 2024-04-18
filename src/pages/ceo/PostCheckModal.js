import { useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";

export default function PostCheckModal({ getPostCheck, group }){
    const [isOpen, setIsOpen] = useState(false);

    const onToggleModal = () => {
        setIsOpen((prev) => !prev);
      };

    function confrimHandle() {
        // const params = { "id": group[0].customerId, "date":group[0].date };
        const params = { "id":group.id };
        console.log(params);
        axios
        .post("ceo/deletepost", null, { params: params })
        .then((resp) => {
          getPostCheck("",0);
    
          console.log(resp);    
        })
        .catch((error) => {
          // 오류가 발생했을 때의 처리
          console.error("error");
        }); 
        onToggleModal();
      }
      return(
        <>
        <button
        type="button"
        onClick={onToggleModal}
        className="bg-sub-yellow rounded-xl p-2 font-bold hover:bg-sub-orange"
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
          <Button key="submit" onClick={confrimHandle}>
             <h1 className="text-lg font-bold">승인 확인되었습니다</h1>
          </Button>
        </Modal>
      }
        </>
      )

}