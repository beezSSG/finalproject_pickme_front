import axios from "axios";
import React, { useEffect, useState } from "react";
import PickCheckModal from "./PickCheckModal"
import Pagination from "react-js-pagination";

export default function Pickup() {
  const [pickup, setPickup] = useState([]);

    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);


  useEffect(() => {
    getPickup("",0);
  }, []);

    const getPickup = async (s,pn) => {
        await axios.get("/ceo/pickup",  { params: { search: s, pageNumber: pn } })
        .then((response)=>{
          // console.log(response.data);
          // console.log(JSON.stringify(response.data.pickup));
          const groupedPickup = groupByDateTime(response.data.pickuplist);
          setPickup(groupedPickup);
          // console.log(groupedPickup);
          setTotalCnt(groupedPickup.length); // 글의 총수
        })

        .catch((err)=>{
           alert(err);
        })
      }
      const groupByDateTime = (data) => {
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

        // 페이지 변경함수
  function handlePageChange(page) {
    setPage(page);
    getPickup( page - 1);
  }

  // 버튼 클릭함수
  function confrimHandle(group) {
    //#0. Axios 호출을 통한 승인 확인 하기
    const params = { id: group.id };
    axios
      .post("ceo/deletepickup", null, { params: params })
      .then((response) => {
        // 응답을 받았을 때의 처리
        
        if (group.checkYn === 0) {
          // 화면에서 승인이 완료된 물품을 사라지게 하는 작업을 수행
          <CheckModal />
        }
        
      })
      .catch((error) => {
        // 오류가 발생했을 때의 처리
        console.error("error");
      });

    //#1. check 0은 미확인 / 1은 확인 토대로 사라지게하기
    //#2. getpickup다시 호출해서 리렌더링 시키기 -> 화면에서 확인을 눌렀을때 사라지게하는것

  }

  return (
    <div className="mx-auto w-[80%]">

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className='bg-yellow-400 p-15'>
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
      console.log(group);
      let price = 0;
      for (let i = 0; i < group.length; i++) {
        price = group[i].price + price;
      }
      return (
        <tr key={index} className="border-b border-gray-300">
          <td className="text-center py-3">{group[0].productName}{" "}
            {group.length > 1 ? `외 ${group.length - 1}개` : ""}
          </td>
          <td className="text-center py-3">{price.toLocaleString()}원</td>
          <td className="text-center py-3">{group[0].customerName}</td>
          <td className="text-center py-3">{group[0].date}</td>
          <td className="text-center py-3">{group[0].pickDel === 0 ? "픽업" : "배달"}</td>
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

{/* 세번째의 경우 */}
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
