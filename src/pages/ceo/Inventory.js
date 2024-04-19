import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");

  // 페이징
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  useEffect(() => {
    getInventory("", 0);
  }, []);

  const getInventory = async (s, pn) => {
    await axios
      .get("/ceo/inventory", { params: { search: s, pageNumber: pn } })
      .then((response) => {
        console.log(response.data);
        setInventory(response.data.invenlist);
        setTotalCnt(response.data.cnt); // 글의 총수
      })
      .catch((err) => {
        alert(err);
      });
  };
  function handlePageChange(page) {
    setPage(page);
    getInventory(search, page - 1);
  }
  function searchBtn() {
    getInventory(search, 0);
  }

  return (
    <div className="mx-auto w-[80%]">
      <div className="text-center mb-5">
        <input
          type="search"
          placeholder="상품 이름을 검색하세요"
          value={search}
          className="rounded-2xl p-5 w-[500px] shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="focus:outline-none  bg-yellow-400 hover:bg-yellow-500 
          focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-[40px] py-5 ml-3"
          onClick={() => searchBtn()}
        >
          검색
        </button>
      </div>

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-yellow-400 p-20">
            <th className="w-1/6 py-2">번호</th>
            <th className="w-1/6 py-1">카테고리</th>
            <th className="w-1/2 py-1">상품 이름</th>
            <th className="w-1/5 py-2">가격</th>
            <th className="w-1/4 py-2">수량</th>
            <th className="w-1/4 py-2">소비기한</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((group, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 hover:bg-gray-200"
            >
              <td className="text-center py-3">{[index + 1]}</td>
              <td className="text-center py-3">{group.productCategory}</td>
              <td className="text-center py-3">{group.productName}</td>
              <td className="text-center py-3">
                {group.price.toLocaleString()}원
              </td>
              <td className="text-center py-3">{group.quantity}개</td>
              <td className="text-center py-3">{group.expDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="pagination" className="max-w-[1200px] bottom-0 my-5">
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={page} // 현재 활성화 된 페이지 번호
          itemsCountPerPage={10} // 페이지 당 보여줄 항목의 수
          totalItemsCount={totalCnt} // 전체 항목 수
          pageRangeDisplayed={10} // 한 번에 보여줄 페이지 번호의 범위
          prevPageText={"prev"}
          nextPageText={"next"}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
