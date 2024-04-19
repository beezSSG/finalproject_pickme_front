import axios from "axios";
import React, { useEffect, useState } from "react";

import Pagination from "react-js-pagination";
import PostCheckModal from "./PostCheckModal";

export default function PostCheck() {
  const [postcheck, setPostCheck] = useState([]);

  // 페이징
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  useEffect(() => {
    getPostCheck(0);
  }, []);

  const getPostCheck = async (pn) => {
    await axios
      .get("/ceo/postcheck", { params: { pageNumber: pn } })
      .then((response) => {
        console.log(response.data);

        console.log(JSON.stringify(response.data.postlist));
        setPostCheck(response.data.postlist);
        setTotalCnt(response.data.cnt);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // 페이지 변경함수
  function handlePageChange(pageNumber) {
    // 서버 측에서는 0부터 페이지를 계산하므로 pageNumber - 1을 전달합니다.
    setPage(pageNumber);
    getPostCheck(pageNumber - 1);
  }

  // 모달들
  const [showstoreModal, setShowstoreModal] = useState(false);
  function searchStore() {
    setShowstoreModal(true);
  }
  function closestoreModal() {
    setShowstoreModal(false);
  }

  // 매장 찾기
  const [storeName, setStoreName] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div className="mx-auto w-[80%]">
      <p className="text-3xl font-semibold mb-4">택배예약 확인</p>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className='bg-yellow-400 p-15'>
            <th className="w-1/4 py-2">발송자</th>
            <th className="w-1/4 py-2">제품분류</th>
            <th className="w-1/4 py-2">무게</th>
            <th className="w-1/4 py-2">금액</th>
            <th className="w-1/4 py-2">날짜</th>
            <th className="w-1/4 py-2">승인여부</th>
            <th className="w-1/4 py-2">확인</th>
          </tr>
        </thead>
        <tbody>
          {postcheck.map((group, index) => {
            if (group.checkYn === 0) {
              return (
                <tr key={index} className="border-b border-gray-300">
                  <td className="text-center py-3">{group.customerName}</td>
                  <td className="text-center py-3">{group.itemCategory}</td>
                  <td className="text-center py-3">{group.itemWeight}</td>
                  <td className="text-center py-3">{group.totalPrice.toLocaleString()}원</td>
                  <td className="text-center py-3">{group.date}</td>
                  <td className="text-center py-3">
                    {group.postYn > 0 ? (
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                        <span style={{ color: "red", fontWeight: "bold" }}>승인완료</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-gray-300 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">
                        <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                        승인대기중
                      </span>
                    )}
                  </td>
                  <td className="text-center py-3">
                    {group.postYn === 1 ? (
                      <PostCheckModal group={group} getPostCheck={getPostCheck} />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <br />
      <Pagination
        itemClass="page-item"
        linkClass="page-link"
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={10}
        prevPageText={"prev"}
        nextPageText={"next"}
        onChange={handlePageChange}
      />
    </div>
  );
  
}
