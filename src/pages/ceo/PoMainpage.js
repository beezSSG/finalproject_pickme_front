import { useAuth } from "../../utils/AuthProvider";
import {
  RiDashboardFill,
  RiCoupon3Fill,
  RiCustomerService2Fill,
} from "react-icons/ri";
import { BsArrowLeftShort, BsAppIndicator, BsSearch } from "react-icons/bs";
import { FaDiceD6, FaClipboardList } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import CeoMainNav from "./CeoMainNav";

import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";
import CeoMainContent from "./CeoMainContent";
import Polist from './Polist';
import Powrite from './Powrite';
import SalesChart from './SalesChart';
// import Inventory from './Inventory';
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
    await axios.get("http://localhost:8080/api/v1/ceo/getCeoInfo")
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
    const Menus = [
      { title: "점주 홈", path: "/ceo/pomain" },
      { title: "발주 관리", path: "/ceo/po" },
      { title: "택배 관리", path: "/ceo/post" },
    ];

    const iconComponents = [
      <RiDashboardFill />,
      <IoReceiptSharp />,
      <MdProductionQuantityLimits />,
    ];

    return (
      <>
        <div className="grid grid-cols-6 w-full mb-10 sm:flex-wrap md:grid-cols-2">
        <div className="pl-4 pt-5">
          <div>
            <span className="text-4xl font-bold text-black-500">{info.name}</span>
            <span className="pl-2 text-3xl font-bold text-yellow-500">{info.grade}</span>
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
              <div className="text-right mt-4 text-4xl text-yellow-600 ">{topInfo[i]}</div>
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
            {/* <Route path='inventory' element={<Inventory />} />
            <Route path='pickup' element={<Pickup />} />
            <Route path='postcheck' element={<Postcheck />} />
            <Route path='groupbuying' element={<GroupBuying />} /> */}
        </Routes>
      </div>
        <div>
          <div className="flex">
            <div
              className={`bg-gray-800 p-5 pt-8 ${
                open ? "w-72" : "w-20"
              } duration-300 relative`}
            >
              <BsArrowLeftShort
                className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-black cursor-pointer ${
                  !open && "rotate-180"
                }`}
                onClick={() => setOpen(!open)}
              />
              <div className="inline-flex">
                <FaDiceD6
                  className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
                    open && "rotate-[360deg]"
                  }`}
                />
                <h1
                  className={`text-white origin-left font-medium text-2xl duration-300 ${
                    !open && "scale-0"
                  }`}
                >
                  점주
                </h1>
              </div>
  
              <div
                className={`flex items-center rounded-md bg-gray-500 mt-6 ${
                  !open ? "px-2.5" : "px-4"
                } py-2`}
              >
                <BsSearch
                  className={`text-white text-lg block float-left cursor-pointer ${
                    open && "mr-2"
                  }`}
                />
                <input
                  type={"search"}
                  placeholder="Search"
                  className={`text-base bg-transparent w-full text-white focus:outline-none ${
                    !open && "hidden"
                  }`}
                />
              </div>
  
              <ul className="pt-2">
                {Menus.map((menu, index) => (
                  <li
                    key={index}
                    className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-4 hover:bg-gray-500 rounded-md ${menu} mt-2`}
                  >
                    <Link to={menu.path}>
                      <span className="text-2xl block float-left mr-3">
                        {iconComponents[index]}
                      </span>
                      <span
                        className={`text-base font-medium flex-1 ${
                          !open && "hidden"
                        }`}
                      >
                        {menu.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
}

export default PoMainpage;