import axios from "axios";
import { useEffect, useState } from "react";
import MyInfoPost from "./MyInfoPost";

export default function MyInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [changeInfo, setChangeInfo] = useState(false);
  const [address, setAddress] = useState({});
  
  // 진입전 토큰 유무 확인 토큰 유효성시간을 대폭 상향
  useEffect(() => {
    getInfo();
  }, []);

  // Axios 호출 [이름, 등급(영문으로변경), 장바구니 수량, 포인트, 쿠폰, 찜 목록, 선물함]
  const getInfo = async () => {
    await axios.get("http://localhost:8080/api/v1/mypage/user/getUserInfo", {
      headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    })
    .then((response)=>{
      console.log(JSON.stringify(response.data));
      setUserInfo(response.data);
    })
    .catch((err)=>{
      alert(err);
    })
  }

  function chageHandler() {
    setChangeInfo(!changeInfo);
  }

  // 자식에게서 값 받아오기
  function onSetAddress(data) {
    setAddress(data);
  }

  return (
    <div className="ml-14">
      <div className="flex flex-row mt-5">
        <div className="w-[30%]">
          <p className="text-3xl font-bold">개인정보</p>
        </div>
        <div className="w-[70%] pl-5">
          <div className="flex">
            <div className="text-xl">아이디: </div>
            <div className="">{userInfo.email}</div>
          </div>
          <div className="flex mt-3">
            <div className="">이름: </div>
            <div className="">{userInfo.name}</div>
          </div>
          <div className="flex mt-3">
            <div className="">주소: </div>
            {changeInfo ? 
            <div>
            <input type='text' placeholder="주소를 입력하세요" className="w-full rounded-lg border-slate-200 border-2 text-base text-slate-600 transition duration-500 bg-transparent hover:border-sub-yellow focus:border-sub-yellow focus:outline-none" />
            <MyInfoPost updateAddress={onSetAddress} />
            </div>
            :
            <div className="">{userInfo.address}</div>
            }
          </div>
          <div className="flex mt-3">
            <div className="">전화번호: </div>
            {changeInfo ? <input type="text" /> : <div className="">{userInfo.phone}</div>}
          </div>
          <div className="flex mt-3">
            <div className="">등급: </div>
            <div className="">{userInfo.grade}</div>
          </div>
          <div className="flex mt-3">
            <div className="">가입일: </div>
            <div className="">{userInfo.rdate}</div>
          </div>
          <div className="mt-3">
            { changeInfo ?
              <div>
                <button type="button" className="border-2 border-orange-500 bg-orange-500 text-white" onClick={chageHandler}>
                변경
                </button>
                <button type="button" className="ml-5 border-2 border-orange-500 bg-orange-500 text-white" onClick={chageHandler}>
                취소
                </button>
              </div>
              :
              <button type="button" className="border-2 border-orange-500 bg-orange-500 text-white" onClick={chageHandler}>
              Update
              </button>
            }
          </div>
        </div>
      </div>

      <div className="flex flex-row border-t-2 mt-5">
        <div className="w-[30%] mt-5">
          <p className="text-xl font-bold">비밀번호 변경</p>
        </div>
        <div className="w-[70%] mt-5 pl-5">
          <div className="">
          Current password: <input type="password" />
          </div>
          <div className="">
            New password: <input type="password" />
          </div>
          <div className="">
            Confirm password: <input type="password" />
          </div>
          <div className="">
            <button type="button" className="">Update</button>
          </div>
        </div>
      </div>

      <div className="flex flex-row border-t-2 mt-5">
        <div className="w-[30%] mt-5">
          <p className="text-xl font-bold">회원탈퇴</p>
        </div>
        <div className="w-[70%] mt-5 pl-5">
          <div className="">
            <button type="button" className="">Update</button>
          </div>
        </div>
      </div>

    </div>
  );
}
