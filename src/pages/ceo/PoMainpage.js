import { useAuth } from "../../utils/AuthProvider";
import CeoMainNav from "./CeoMainNav";

import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";
import CeoMainContent from "./CeoMainContent";
import Polist from './Polist';
import Powrite from './Powrite';
import SalesChart from './SalesChart';
import Inventory from "./Inventory";
// import Pickup from './Pickup';
// import Postcheck from './PostCheck';
// import GroupBuying from './GroupBuying';

// import SalesChart from "./SalesChart";

function PoMainpage() {
  const [open, setOpen] = useState(true);
  // useState 선언
  const navigater = useNavigate();
  const {token} = useAuth();
  const [info, setInfo] = useState([]); 
  const [topInfo, setTopInfo] = useState([]);

  const topBar = [
    { title: "Home", path: "/ceo/pomain" },
    { title: "발주", path: "/ceo/po" },
    { title: "승인", path: "/ceo/coupon" },
    { title: "공동구매", path: "/ceo/" },
  ];

    // 진입전 토큰 유무 확인 토큰 유효성시간을 대폭 상향

    useEffect(() => {
      if (token === null || token === undefined) {
        alert('로그인이 필요한 서비스 입니다.');
        navigater('/login');
      }
      getCeoInfo();
    }, []);


    // Axios 호출 [이름, 등급(영문으로변경), 장바구니 수량, 포인트, 쿠폰, 찜 목록, 선물함]
  
    const getCeoInfo = async () => {
    await axios.get("ceo/getCeoInfo")
    .then((response)=>{
      console.log(JSON.stringify(response.data));
      console.log(Object.values(response.data));
      setInfo(response.data);
      setTopInfo(Object.values(response.data));
    })
    .catch((err)=>{
       alert(err);
    })
  }


  if (info === undefined || info === null) {
    return <div>loding...</div>
  }



    return (
      <>
        <div className="grid grid-cols-6 w-full mb-10 sm:flex-wrap md:grid-cols-2">
        <div className="pl-4 pt-5">
          <div>
            <span className="text-4xl font-bold text-black-500">{topInfo[0]}</span>
            <br/><br/>
            <span className="pl-2 text-3xl font-bold text-yellow-500">{topInfo[1]}</span>
          </div>
          <div className="mt-2 text-sm font-bold text-neutral-500">
            <Link to="/mypage/userinfo">회원정보수정</Link>
          </div>
        </div>
        
        { 
          topBar.map((topbar, i) => (
          <div className="pl-[30px] pr-[10px] pt-5 pb-5 font-bold rounded-3xl shadow-xl bg-stone-100 mx-5" key={i}>
            <button className="w-full" onClick={ () => {window.location.href = `${topbar.path}`} }>
              <div className="text-left text-2xl text-neutral-500">{topbar.title}</div>
            </button>
          </div>
          ))
        }
      </div>
      <div className="flex w-full">
        <CeoMainNav />
        <Routes>
          <Route path='' element={<CeoMainContent />} />
            <Route path='po' element={<Polist/>} />    
            <Route path='pow' element={<Powrite />} />
            <Route path='sales' element={<SalesChart />} />
            <Route path='inventory' element={<Inventory />} />
             {/* <Route path='pickup' element={<Pickup />} />
            <Route path='postcheck' element={<Postcheck />} />
            <Route path='groupbuying' element={<GroupBuying />} /> */}
        </Routes>
      </div>

      </>
    );
}

export default PoMainpage;