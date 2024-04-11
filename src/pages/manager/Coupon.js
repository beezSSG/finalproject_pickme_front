import ManagerMain from "./ManagerMain";
import { useState } from "react";
import axios from "axios";
import { RiCoupon3Line } from "react-icons/ri";

function Coupon() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [couponNumber, setCouponNumber] = useState("");

  function couponcreate() {
    axios
      .get("/manager/couponcreate", {
        params: {
          content: content,
          startDate: startDate,
          endDate: endDate,
          couponNumber: couponNumber,
        },
      })
      .then(function (resp) {
        console.log(resp.data);
      })
      .catch(function () {
        console.log("Error");
      });
  }

  return (
    <>
      <div className="flex gap-3">
        <ManagerMain height={"h-[1000px]"} />
        <div className="w-[1000px] mx-auto px-3 mt-32">
          <div className="flex justify-center gap-3">
            <RiCoupon3Line className="text-4xl font-bold" />
            <div className="text-3xl font-bold mb-9">쿠폰생성</div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-bold">쿠폰제목:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-bold">쿠폰내용:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-bold">시작일자:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-bold">종료일자:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-xl font-bold">쿠폰번호:</label>
            <input
              value={couponNumber}
              onChange={(e) => setCouponNumber(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="text-center">
            <button
              onClick={() => couponcreate()}
              className="p-3 bg-main-yellow rounded-xl w-[500px] font-bold hover:bg-main-orange"
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Coupon;
