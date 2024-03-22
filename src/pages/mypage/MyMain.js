import { Link, Route, Routes, Outlet } from "react-router-dom";
import MyMainNav from "./MyMainNav";
import { useState } from "react";
import MyCart from "./MyCart";
import MyPayinfo from "./MyPayinfo";



export default function MyMain() {
  // useState 선언
  const[grade, setGrade] = useState("");  // 등급
  const[name, setName ] = useState("");   // 이름

  // 진입전 토큰 유무 확인 토큰 유효성시간을 대폭 상향
  
  // Axios 호출
  

  const topBar = [
    { title: "장바구니", path: "/cart" },
    { title: "포인트", path: "/mypage/point" },
    { title: "사용가능 쿠폰", path: "/mypage/coupon" },
    { title: "찜 목록", path: "/save" },
    { title: "선물함", path: "/mypage/gift" },
  ];

  return (
    <>
      <div className="grid grid-cols-6 w-full mb-10">
        <div className="pl-4 pt-5">
          <div>
            <span className="text-4xl font-bold  text-black-500">김*저</span>
            <span className="pl-2 text-3xl font-bold text-yellow-500">Friend</span>
          </div>
          <div className="mt-2 text-sm font-bold text-neutral-500">
            <Link to="/mypage/userinfo" >회원정보수정</Link>
          </div>
        </div>
        
        { 
          topBar.map((topbar, i) => (
          <div className="pl-[10px] pr-[10px] pt-5 pb-5 font-bold rounded-3xl shadow-xl bg-stone-100 mx-5" key={i}>
            <button className="w-full" onClick={ () => {window.location.href = `${topbar.path}`} }>
              <div className="text-left text-2xl text-neutral-500">{topbar.title}</div>
              <div className="text-right mt-4 text-4xl text-yellow-600 ">1</div>
            </button>
          </div>
          ))
        }
      </div>
      
      <div className="flex w-full">
        <MyMainNav />
        <Routes>
          <Route path='cart' element={<MyCart />} />
          <Route path='payinfo' element={<MyPayinfo />} />
        </Routes>
      </div>
    </>
  );
}

