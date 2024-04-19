import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

export default function ProductResv() {
  const [reservationproductlist, setReservationproductlist] = useState([]);

  // 페이징
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  function getrplist(pn) {
    axios
      .get("/ceo/getrplist", { params: { pageNumber: pn } })
      .then(function (resp) {
        console.log(resp.data);
        setReservationproductlist(resp.data.rplist);
        setTotalCnt(resp.data.cnt); // 글의 총수
      })
      .catch(function () {
        console.log("error");
      });
  }

  useEffect(function () {
    getrplist(0);
  }, []);

  function handlePageChange(page) {
    setPage(page);
    getrplist(page - 1);
  }

  function checkrp(id) {
    axios
      .get("/ceo/checkrp", { params: { id: id } })
      .then(function (resp) {
        console.log(resp.data);
        setReservationproductlist(resp.data);
      })
      .catch(function () {
        console.log("error");
      });
  }

  return (
    <div className="mx-auto w-[80%]">
      <p className="text-3xl font-semibold mb-4">상품예약 확인</p>
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-yellow-400 p-15">
            <tr>
              <th className="w-1/6 py-2">번호</th>
              <th className="w-1/2 py-2">상품명</th>
              <th className="w-1/4 py-2">수량</th>
              <th className="w-1/4 py-2">픽업 날짜</th>
              <th className="w-1/4 py-2">예약명</th>
              <th className="w-1/4 py-2">확인</th>
            </tr>
          </thead>

          <tbody>
            {reservationproductlist.map(function (rp, i) {
              return (
                // <TableRow po={po} rownum={i+1} key={i} />
                <tr
                  className="text-center border-b cursor-pointer hover:bg-gray-300"
                  key={i}
                >
                  <td>{[i + 1]}</td>
                  <td className="text-center py-4">{rp.productName}</td>
                  <td className="text-center py-4">{rp.quantity}</td>
                  <td className="text-center py-4">{rp.wdate}</td>
                  <td className="text-center py-4">{rp.customerName}</td>
                  <td className="text-center py-4">
                    <button
                      className="bg-sub-yellow hover:bg-sub-orange py-2 px-4 font-bold rounded-xl"
                      onClick={() => checkrp(rp.id)}
                    >
                      승인하기
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div id="pagination" className="max-w-[1200px] bottom-0 mt-5">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={page} // 현재 활성화 된 페이지 번호
            itemsCountPerPage={5} // 페이지 당 보여줄 항목의 수
            totalItemsCount={totalCnt} // 전체 항목 수
            pageRangeDisplayed={5} // 한 번에 보여줄 페이지 번호의 범위
            prevPageText={"prev"}
            nextPageText={"next"}
            onChange={handlePageChange}
          />
        </div>
      
    </div>
  );
}
