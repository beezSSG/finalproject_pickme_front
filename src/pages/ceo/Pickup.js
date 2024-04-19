import axios from "axios";
import React, { useEffect, useState } from "react";
import PickCheckModal from "./PickCheckModal";
import Pagination from "react-js-pagination";

export default function Pickup() {
  const [pickup, setPickup] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [type, setType] = useState(0);

  useEffect(() => {
    getPickup("", 0);
  }, []);

  const getPickup = async (s, pn) => {
    try {
      const response = await axios.get("/ceo/pickup", {
        params: { search: s, pageNumber: pn },
      });
      const groupedPickup = groupByDateTime(response.data.pickuplist);
      setPickup(groupedPickup);
      setTotalCnt(groupedPickup.length);
    } catch (error) {
      alert(error);
    }
  };

  const groupByDateTime = (data) => {
    if (!data) {
      return [];
    }
    const grouped = {};
    data.forEach((item) => {
      const groupName = item.date;
      if (!grouped[groupName]) {
        grouped[groupName] = [];
      }
      grouped[groupName].push(item);
    });
    return Object.values(grouped);
  };

  function handlePageChange(pageNumber) {
    setPage(pageNumber);
    getPickup("", pageNumber - 1);
  }

  // 픽업
  const selPickup = () => {
    setType(0);
  };

  // 배달
  const selDelivery = () => {
    setType(1);
  };

  function confirmHandle(group) {
    const params = { id: group.id };
    axios
      .post("ceo/deletepickup", null, { params: params })
      .then((response) => {
        if (group.checkYn === 0) {
          // 화면에서 승인이 완료된 물품을 사라지게 하는 작업을 수행
          <PickCheckModal />
            
          // 처리
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="mx-auto w-[80%]">
      <div className="grid grid-cols-2 gap-10 sm:gap-2">
        <button
          onClick={() => {
            selPickup();
          }}
          className="focus:outline-none text-gray-800 bg-main-yellow hover:bg-sub-orange font-bold
                  focus:ring-4 focus:ring-yellow-300 rounded-lg  py-3 
              "
        >
          픽업
        </button>
        <button
          onClick={() => {
            selDelivery();
          }}
          className="focus:outline-none text-gray-800 bg-main-yellow hover:bg-sub-orange font-bold
                  focus:ring-4 focus:ring-yellow-300 rounded-lg  py-3 
              "
        >
          배달
        </button>
      </div>
      <br />
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-yellow-400 p-15">
            <th className="w-1/3 py-2">상품 이름</th>
            <th className="w-1/6 py-2">가격</th>
            <th className="w-1/12 py-2">구매자</th>
            <th className="w-1/4 py-2">승인날짜</th>
            <th className="w-1/6 py-2">픽업&배달</th>
            <th className="w-1/5 py-2">확인</th>
          </tr>
        </thead>
        <tbody>
          {pickup.map((group, index) => {
            if (group[0].checkYn === 0) {
              let price = 0;
              for (let i = 0; i < group.length; i++) {
                price = group[i].price + price;
              }
              return (
                <tr key={index} className="border-b border-gray-300">
                  <td className="text-center py-3">
                    {group[0].productName}{" "}
                    {group.length > 1 ? `외 ${group.length - 1}개` : ""}
                  </td>
                  <td className="text-center py-3">
                    {price.toLocaleString()}원
                  </td>
                  <td className="text-center py-3">
                    {group[0].customerName}
                  </td>
                  <td className="text-center py-3">{group[0].date}</td>
                  <td className="text-center py-3">
                    {group[0].pickDel === 0 ? "픽업" : "배달"}
                  </td>
                  <td className="text-center py-3">
                    {group[0].checkYn === 0 ? (
                      <PickCheckModal group={group} getPickup={getPickup} />
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
      <br />
    </div>
  );
  
}
