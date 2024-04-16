import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MyMainNav from "./MyMainNav";
import { useEffect, useState } from "react";
import MyCart from "./MyCart";
import MyPayinfo from "./MyPayinfo";
import { useAuth } from "../../utils/AuthProvider";
import axios from "axios";
import MySave from "./MySave";
import MyInfo from "./MyInfo";
import MyReview from "./MyReview";
import MyMainContent from "./MyMainContent";
import MyCoupon from "./MyCoupon";
import MyGift from "./MyGift";
import MyGiftdetail from "./MyGiftdetail";
import MyPickBox from "./MyPickBox";

export default function MyMain() {
  // useState 선언
  const navigater = useNavigate();
  const { token } = useAuth();
  const [info, setInfo] = useState();
  const [topInfo, setTopInfo] = useState([]); // 배열크기는 8개지만 필요한 정보를 앞에 배치하여 5개만 나오게하여 활용중

  // 진입전 토큰 유무 확인 토큰 유효성시간을 대폭 상향
  useEffect(() => {
    if (token === null || token === undefined) {
      alert("로그인이 필요한 서비스 입니다.");
      navigater("/login");
    }
    getMyInfo();
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
    { title: "포인트", path: "/mypage" },
    { title: "쿠폰", path: "/mypage/coupon" },
    { title: "찜 목록", path: "/mypage/save" },
    { title: "선물함", path: "/mypage/gift" },
  ];

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
            </span>
            <span className="pl-2 text-3xl font-bold text-yellow-500">
              {info.grade}
            </span>
          </div>
          <div className="flex mt-2 text-sm font-bold text-neutral-500">
            <Link to="/mypage/userinfo">회원정보수정</Link>
            <button>메뉴창 보기</button>
          </div>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-3 sm:gap-5 sm:font-thin text-[0.5rem] sm:h-5">
          {topBar.map((topbar, i) => (
            <div
              className="w-[90%] lg:p-5 lg:mx-5 sm:p-1 sm:mx-1 font-bold rounded-3xl shadow-xl bg-stone-100 "
              key={i}
            >
              <button
                className="w-full"
                onClick={() => {
                  window.location.href = `${topbar.path}`;
                }}
              >
                <div className="text-left lg:text-2xl text-neutral-500">
                  {topbar.title}
                </div>
                {i === 1 ? (
                  <div className="text-right lg:mt-4 lg:text-4xl text-yellow-600 ">
                    {topInfo[i].toLocaleString()}P
                  </div>
                ) : (
                  <div className="text-right lg:mt-4 lg:text-4xl text-yellow-600 ">
                    {topInfo[i]}개
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full">
        <MyMainNav />
        <Routes>
          <Route path="" element={<MyMainContent />} />
          <Route path="pickbox" element={<MyPickBox />} />
          <Route path="cart" element={<MyCart point={topInfo[1]} />} />
          <Route path="payinfo" element={<MyPayinfo />} />
          <Route path="save" element={<MySave />} />
          <Route path="userinfo" element={<MyInfo />} />
          <Route path="review" element={<MyReview />} />
          <Route path="coupon" element={<MyCoupon point={topInfo[1]} />} />
          <Route path="gift" element={<MyGift />} />
          <Route path="giftdetail/:id" element={<MyGiftdetail />} />
        </Routes>
      </div>
    </>
  );
}
