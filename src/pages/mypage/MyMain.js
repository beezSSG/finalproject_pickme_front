import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import axios from "axios";

import MyMainNav from "./MyMainNav";
import MyCart from "./MyCart";
import MyPayinfo from "./MyPayinfo";
import MySave from "./MySave";
import MyInfo from "./MyInfo";
import MyReview from "./MyReview";
import MyMainContent from "./MyMainContent";
import MyCoupon from "./MyCoupon";
import MyGift from "./MyGift";
import MyGiftdetail from "./MyGiftdetail";
import MyPickBox from "./MyPickBox";
import MyMenuButton from "./MyMenuButton";
import Toast from "../public/Toast";

// icons
// import { GiSilverBullet } from "react-icons/gi";
import { GiGoldNuggets } from "react-icons/gi";
import { GiGoldBar } from "react-icons/gi";
import { GiCheckeredDiamond } from "react-icons/gi";
import { FaUserAstronaut } from "react-icons/fa6";

// simple
import { TbDiamondFilled } from "react-icons/tb";

export default function MyMain() {
  // useState 선언
  const navigater = useNavigate();
  const { token } = useAuth();
  const [info, setInfo] = useState();
  const [topInfo, setTopInfo] = useState([]); // 배열크기는 8개지만 필요한 정보를 앞에 배치하여 5개만 나오게하여 활용중
  const [where, setWhere] = useState();

  // 진입전 토큰 유무 확인 토큰 유효성시간을 대폭 상향
  useEffect(() => {
    if (token === null || token === undefined) {
      Toast.fire({
        icon: 'error',
        title: "로그인이 필요한 서비스예요",
      });
      navigater("/login");
    }
    getMyInfo();
    window.localStorage.removeItem('product');
  }, []);

  // Axios 호출 [이름, 등급(영문으로변경), 장바구니 수량, 포인트, 쿠폰, 찜 목록, 선물함]
  const getMyInfo = async () => {
    await axios
      .get("mypage/getMyInfo")
      .then((response) => {
        //console.log(JSON.stringify(response.data));
        // console.log(Object.values(response.data));
        setInfo(response.data);
        setTopInfo(Object.values(response.data));
      })
      .catch((err) => {
        // alert(err);
      });
  };

  const topBar = [
    { title: "장바구니", path: "/mypage/cart" },
    { title: "포인트"},
    { title: "쿠폰", path: "/mypage/coupon" },
    { title: "찜 목록", path: "/mypage/save" },
    { title: "선물함", path: "/mypage/gift" },
  ];

  function whereHandle(p) {
    // console.log(p);
    setWhere(p);
  }

  // 회원등급에 따라 등급색, 아이콘 꾸며주는 함수
  function decorateUserGrade(grade) {
    if (grade === "SILVER") {
      return (
        <>
          <span className="pl-2 text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#616161] via-[#bdc3c7] to-[#616161] mx-1 lg:text-3xl md:text-3xl sm:text-2xl group">
            {grade}&nbsp;
            <GiGoldNuggets className="inline group-hover:animate-bounce transition duration-100 text-[#616161]" />
          </span>
        </>
      )
    } else if (grade === "GOLD") {
      return (
        <>
          <span className="pl-2 text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#f8b500] via-[#ED8F03] to-[#f8b500] mx-1 lg:text-3xl md:text-3xl sm:text-2xl group">
            {grade}&nbsp;
            <GiGoldBar className="inline group-hover:animate-bounce transition duration-100 text-[#ED8F03]" />
          </span>
        </>
      )
    } else if (grade === "DIA") {
      return (
        <>
          <span className="pl-2 text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#40E0D0] via-[#FF8C00] to-[#FF0080] mx-1 lg:text-3xl md:text-3xl sm:text-2xl group">
            {grade}&nbsp;
          <GiCheckeredDiamond className="inline group-hover:animate-bounce transition duration-100 text-[#FF0080] pb-1" />
          </span>
        </>
      )
    } else {
      return (
        <>
          <span className="pl-2 text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#a044ff] via-[#FF0080] to-main-orange mx-1 lg:text-3xl md:text-3xl sm:text-2xl group">
            {grade}&nbsp;
            <FaUserAstronaut className="inline group-hover:animate-bounce transition duration-100 text-[main-orange]" />
          </span>
        </>
      )
    }
  }

  if (info === undefined || info === null) {
    return <div>loding...</div>;
  }

  return (
    <>
      <div className="lg:flex w-full mb-10 md:grid-cols-2 mt-5">
        <div className="pl-4 mr-24">
          <div>
            <span className="text-4xl font-bold  text-black-500">
              {info.name}
              {decorateUserGrade(info.grade)}
            </span>
          </div>
          <div className="flex mt-2 text-sm font-bold text-neutral-500">
            <Link to="/mypage/userinfo">회원정보수정</Link>
          </div>
          <div className="mb-7 w-full">
            <MyMenuButton/>
          </div>

        </div>
        <div className="grid grid-cols-5 sm:grid-cols-3 sm:gap-5 sm:font-thin text-[0.5rem]">
          {topBar.map((topbar, i) => (
            <div
              className="w-[90%] lg:p-5 lg:mx-5 sm:p-3 sm:mx-1 font-bold rounded-3xl shadow-xl sm:h-20 group bg-stone-100 hover:bg-main-orange transition duration-200"
              key={i}
            >
              { i === 1 ?
                  <div>
                    <div className="text-left lg:text-2xl sm:text-lg text-neutral-500 group-hover:text-white">
                    {topbar.title}
                    </div>
                    <div className="text-right lg:mt-4 sm:mt-1 lg:text-4xl sm:text-xl text-main-orange group-hover:text-white">
                      {topInfo[i].toLocaleString()}P
                    </div>
                  </div>
                :
                  <button
                  className="w-full"
                  onClick={() => { window.location.href = `${topbar.path}`;}}
                  >
                    <div className="text-left lg:text-2xl sm:text-lg text-neutral-500 group-hover:text-white">
                      {topbar.title}
                    </div>
                    <div className="text-right lg:mt-4 sm:mt-1 lg:text-4xl sm:text-xl text-main-orange group-hover:text-white">
                      {topInfo[i]}개
                    </div>
                  </button>
              }
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full">
        <MyMainNav newWhere={where} />
        <Routes>
          <Route path="" element={<MyMainContent whereHandle={whereHandle}/>} />
          <Route path="pickbox" element={<MyPickBox whereHandle={whereHandle} />} />
          <Route path="cart" element={<MyCart point={topInfo[1]} whereHandle={whereHandle} />} />
          <Route path="payinfo" element={<MyPayinfo whereHandle={whereHandle} />} />
          <Route path="save" element={<MySave whereHandle={whereHandle} />} />
          <Route path="userinfo" element={<MyInfo whereHandle={whereHandle} />} />
          <Route path="review" element={<MyReview whereHandle={whereHandle} />} />
          <Route path="coupon" element={<MyCoupon point={topInfo[1]} whereHandle={whereHandle} />} />
          <Route path="gift" element={<MyGift whereHandle={whereHandle} />} />
          <Route path="giftdetail/:id" element={<MyGiftdetail />} />
        </Routes>
      </div>
    </>
  );
}
