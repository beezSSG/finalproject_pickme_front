import axios from "axios";
import { useEffect, useState } from "react";
import MyInfoPost from "./MyInfoPost";
import { Button, Modal } from "antd";

export default function MyInfo() {
  const [userInfo, setUserInfo] = useState({});
  
  // 개인정보 수정
  const [changeInfo, setChangeInfo] = useState(false);
  const [address, setAddress] = useState({}); // 주소
  const [phoneNumber, setPhoneNumber] = useState('') // 전화번호

  // 비밀번호 수정
  const [changePw, setChangePw] = useState(false);
  const [myPw, setMyPw] = useState(0);  // 원래 비밀번호
  const [newPw, setNewPw] = useState(0); // 변경 비밀번호
  const [confirmPw, setConfirmPw] = useState(0); // 비밀번호 확인

  // 회원탈퇴
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getInfo();
  }, []);

  // Axios 호출 [이름, 등급(영문으로변경), 장바구니 수량, 포인트, 쿠폰, 찜 목록, 선물함]
  const getInfo = async () => {
    await axios.get("mypage/user/getUserInfo")
    .then((response)=>{
      // console.log(JSON.stringify(response.data));
      setUserInfo(response.data);
    })
    .catch((err)=>{
      alert(err);
    })
  }

  // 값 체인지 핸들러
  function chageHandler(i) {
    // console.log(i);
    if (i === 0) { // 개인정보 변경
      setChangeInfo(!changeInfo);
    } else if (i === 1) { // 비밀번호 변경
      setChangePw(!changePw);
    }
  }

  // 자식에게서 값 받아오기
  function onSetAddress(data) {
    setAddress(data);
  }

  // 전화번호만 가능하게 만들기
  const parsingPhoneNumber = (num) => {
    return (
        num
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/(-{1,2})$/g, '')
    )
  }

  // 개인정보 변경
  function changeMyInformation() {
    
  }

  // 비밀번호 변경

  const onToggleModal = () => {
    setOpen((prev) => !prev);
  };

  function existUser() {
    // try {
    //   await axios.delete(`customer/cart/delCart/${sProductId}`);
    //   getMyCart();
    // } catch (err) {
    //   alert(err);
    // }
  }




  return (
    <div className="ml-14 w-[70%]">
      <div className="flex flex-row mt-5">
        <div className="w-[15%]">
          <p className="text-4xl font-bold ">개인정보</p>
        </div>
        <div className="w-[85%] pl-5">
          <div className="flex text-2xl sm:text-sm">
            <span className="w-24">아이디 </span>
            <div className="ml-2">{userInfo.email}</div>
          </div>
          <div className="flex mt-3 text-2xl">
            <span className="w-24">이름 </span>
            <div className="ml-2">{userInfo.name}</div>
          </div>
          <div className="mt-3 text-2xl">
            {changeInfo && <span className="w-24">주소 </span>}
            {changeInfo ? 
              <div className="flex mt-3">
                <input type='text' placeholder="주소" readOnly="true" className="w-96 rounded-lg border-slate-200 border-2 text-slate-600 transition duration-500 bg-transparent hover:border-sub-yellow focus:border-sub-yellow focus:outline-none" value={address.address}/>
                <MyInfoPost updateAddress={onSetAddress} />
              </div>
              :
              <div className="flex">
                <span className="w-24">주소 </span>
                <div className="ml-2">{userInfo.address}</div>
              </div>
            }
          </div>
          <div className="flex mt-3 text-2xl">
            <span className="w-24">전화번호 </span>
            {changeInfo ? 
              <input type='tel' placeholder="휴대폰 번호를 입력해주세요" maxLength={13} value={phoneNumber} onChange={(e) => setPhoneNumber(parsingPhoneNumber(e.target.value))} 
                className="ml-2 w-96  rounded-lg border-slate-200 border-2 text-slate-600 transition duration-500 bg-transparent hover:border-sub-yellow focus:border-sub-yellow focus:outline-none" />
              :
              <div className="ml-2">{userInfo.phone}</div>
            }
          </div>
          <div className="flex mt-3 text-2xl">
            <span className="w-24">등급 </span>
            <div className="ml-2">{userInfo.grade}</div>
          </div>
          <div className="flex mt-3 text-2xl">
            <span className="w-24">가입일 </span>
            <div className="ml-2">{userInfo.rdate}</div>
          </div>
          <div className="mt-3">
            { changeInfo ?
              <div>
                <button type="button" className="border-2 border-orange-500 bg-orange-500 text-white" onClick={chageHandler}>
                확인
                </button>
                <button type="button" className="ml-5 border-2 border-orange-500 bg-orange-500 text-white" onClick={() => {chageHandler(0)}}>
                취소
                </button>
              </div>
              :
              <button type="button" className="border-2 border-orange-500 bg-orange-500 text-white" onClick={() => {chageHandler(0)}}>
              변경
              </button>
            }
          </div>
        </div>
      </div>

      <div className="flex flex-row border-t-2 mt-5">
        <div className="w-[15%] mt-5">
          <p className="text-4xl font-bold">비밀번호 변경</p>
        </div>
        <div className="w-[85%] mt-5 pl-5">
          <div className="flex text-2xl">
            <div className="w-48">현재 비밀번호 </div>
            { changePw ? <input type="password" className="w-56 rounded-lg border-slate-200 border-2 text-base text-slate-600 transition duration-500 bg-transparent hover:border-sub-yellow focus:border-sub-yellow focus:outline-none" /> : "" }
          </div>
          <div className="flex text-2xl mt-3">
            <div className="w-48">새로운 비밀번호 </div>
            { changePw ? <input type="password" className="w-56 rounded-lg border-slate-200 border-2 text-base text-slate-600 transition duration-500 bg-transparent hover:border-sub-yellow focus:border-sub-yellow focus:outline-none" /> : "" }
          </div>
          <div className="flex text-2xl mt-3">
            <div className="w-48">비밀번호 확인 </div>
            { changePw ? <input type="password" className="w-56 rounded-lg border-slate-200 border-2 text-base text-slate-600 transition duration-500 bg-transparent hover:border-sub-yellow focus:border-sub-yellow focus:outline-none" /> : "" }
          </div>
          <div className="">
            { changePw ?
              <div className="mt-3">
                <button type="button" className="border-2 border-orange-500 bg-orange-500 text-white" onClick={chageHandler}>
                확인
                </button>
                <button type="button" className="ml-5 border-2 border-orange-500 bg-orange-500 text-white" onClick={() => {chageHandler(1)}}>
                취소
                </button>
              </div>
              :
              <button type="button" className="border-2 border-orange-500 bg-orange-500 text-white" onClick={() => {chageHandler(1)}}>
              변경
              </button>
            }
          </div>
        </div>
      </div>

      <div className="flex flex-row border-t-2 mt-5">
        <div className="w-[15%] mt-5">
          <p className="text-4xl font-bold">Pick ME 탈퇴</p>
        </div>
        <div className="w-[85%] mt-5 pl-5">
          <div className="">
            <button type="button" className="border-2 border-orange-500 bg-orange-500 text-white" onClick={() => {onToggleModal()}}>
              회원탈퇴
            </button>
            {open && (
            <Modal
              open={true}
              okText="회원탈퇴"
              cancelText="취소"
              onOk={onToggleModal}
              onCancel={onToggleModal}
              footer={null}
            >
              <div className="text-center">
                <br />
                <br />
                <h1 className="text-red-500 font-bold text-2xl">경고문</h1>
                <br />
                <h1 className="text-lg">회원을 탈퇴하시면 지금까지의 모든 기록이 사라지고 </h1>
                <h1 className="text-lg font-bold text-red-600">복구가 불가능합니다.</h1>
                <br/>
                
                <h1 className="text-lg">정말로 회원탈퇴를 진행하시겠습니까?</h1>
                <br />
                <div className="grid grid-cols-2 gap-5"> 
                  {/* 버튼을 중앙으로 정렬하기 위한 컨테이너 */}
                  <Button key="back" onClick={onToggleModal}>
                    떠날래요
                  </Button>
                  <Button key="submit" type="primary" onClick={onToggleModal}>
                    더 써볼래요
                  </Button>
                </div>
              </div>
            </Modal>
          )}
          </div>
        </div>
      </div>

    </div>
  );
}
