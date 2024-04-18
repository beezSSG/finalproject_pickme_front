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

  const getPostCheck = async () => {
    await axios
      .get("/ceo/postcheck")
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
  function handlePageChange(page) {
    setPage(page);
    getPostCheck(page - 1);
  }

  return (
    <div className="mx-auto w-[80%]">
      <p className="text-3xl font-semibold mb-4">택배예약 확인</p>
      <div className="mx-auto w-[80%]">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-yellow-400 p-15">
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
                    <td className="text-center py-3">
                      {group.totalPrice.toLocaleString()}원
                    </td>
                    <td className="text-center py-3">{group.date}</td>
                    <td className="text-center py-3">
                      {group.postYn > 0 ? (
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          승인완료
                        </span>
                      ) : (
                        "승인대기중"
                      )}
                    </td>
                    <td className="text-center py-3">
                      {group.postYn === 1 ? (
                        <PostCheckModal
                          group={group}
                          getPostCheck={getPostCheck}
                        />
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
      </div>
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
