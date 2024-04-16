import axios from "axios";
import React, { useEffect, useState } from "react";
import Receipt from "./Receipt";

export default function MyPayinfo() {
  const [payInfo, setPayInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayInfo, setSelectedPayInfo] = useState(null);

  // Function to open the modal
  const openModal = (info) => {
    setSelectedPayInfo(info);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getMypayinfo();
  }, []);

  const getMypayinfo = async () => {
    try {
      const response = await axios.get("mypage/MyOrdersList");
      const groupedPayInfo = groupByDateTime(response.data);
      setPayInfo(groupedPayInfo);
    } catch (err) {
      alert(err);
    }
  };

  const groupByDateTime = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const dateTime = item.date;
      if (!grouped[dateTime]) {
        grouped[dateTime] = [];
      }
      grouped[dateTime].push(item);
    });
    return Object.values(grouped);
  };

  return (
    <div className="mx-auto w-[60%]">
      <p className="text-lg font-semibold mb-4">결제정보</p>

      <table className="w-full table-fixed border-collapse sm:hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-1/3 py-2">구매 내역</th>
            <th className="w-1/4 py-2">구매 날짜</th>
            <th className="w-1/4 py-2">총 구매 수량</th>
            <th className="w-1/4 py-2">전자 영수증 보기</th>
            <th className="w-1/4 py-2">결제취소 요청</th>
          </tr>
        </thead>
        <tbody>
          {payInfo.map((group, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="text-center py-3">
                {group[0].pname}{" "}
                {group.length > 1 ? `외 ${group.length - 1}개` : ""}
              </td>
              <td className="text-center py-3">{group[0].date}</td>
              <td className="text-center py-3">
                {group.reduce((total, item) => total + item.quantity, 0)}개
              </td>
              <td className="text-center py-3">
                <button
                  className="p-3 bg-sub-yellow rounded-xl text-md font-bold hover:bg-sub-orange"
                  onClick={() => openModal(group)}
                >
                  전자 영수증 보기
                </button>
              </td>
              <td className="text-center py-3">
                <button className="text-red-600 hover:underline">
                  결제취소 요청
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full border-collapse xl:hidden lg:hidden">
        {payInfo.map((group, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg mb-4 overflow-hidden shadow-md"
          >
            <div className="px-2 py-4">
              <p className="font-bold text-lg mb-2 text-center">
                {group[0].pname}{" "}
              </p>
              <p className="font-bold text-lg text-center">
                {group.length > 1 ? `외 ${group.length - 1}개` : ""}
              </p>
              <p className="text-gray-700 text-center">{group[0].date}</p>
              <p className="text-gray-700 text-center">
                {" "}
                {group.reduce((total, item) => total + item.quantity, 0)}개
              </p>
            </div>
            <div className="px-6 py-4">
              <button
                className="block w-full bg-sub-yellow text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:bg-sub-orange"
                onClick={() => openModal(group)}
              >
                전자 영수증 보기
              </button>
              <button className="block w-full mt-2 text-red-600 hover:underline focus:outline-none focus:shadow-outline">
                결제취소 요청
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && <Receipt onClose={closeModal} payInfo={selectedPayInfo} />}
    </div>
  );
}
