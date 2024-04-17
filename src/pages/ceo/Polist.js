import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination"; // npm i react-js-pagination
import axios from "axios";
import Pocheckmodal from "./Pocheckmodal";

// import GlobalStyle from './styles/GlobalStyle';

function Polist() {
  const [polist, setPolist] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState([]);

  // 검색
  const [choice, setChoice] = useState("");
  const [search, setSearch] = useState("");

  // 페이징
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  useEffect(function () {
    getPolist("", 0);
  }, []);

  // polist 불러오는 함수
  function getPolist(s, pn) {
    axios
      .get("ceo/polist", { params: { search: s, pageNumber: pn } })
      .then(function (resp) {
        // success:function
        console.log(resp.data.polist);
        setPolist(resp.data.polist);
        setTotalCnt(resp.data.cnt); // 글의 총수
      })
      .catch(function (err) {
        // error:function
        alert("error");
      });
  }

  // 검색에 대한 부분
  function searchBtn() {
    getPolist(search, 0);
  }

  // 페이지 변경함수
  function handlePageChange(page) {
    setPage(page);
    getPolist(search, page - 1);
  }
  function con(po) {
    alert(po.poYn);
    // #1. 화면에서 승인이 완료된 물품을 사라지게 하기
    const params = { id: po.id };
    axios
      .post("ceo/deleteProduct", null, { params: params })
      .then((response) => {
        // 응답을 받았을 때의 처리

        if (po.poYn === 1) {
          // 화면에서 승인이 완료된 물품을 사라지게 하는 작업을 수행
        }
      })
      .catch((error) => {
        // 오류가 발생했을 때의 처리
        console.error("error");
      });
  }

  return (
    <div className="mx-auto w-[80%]">
      <p className="text-3xl font-semibold mb-4">발주 내역</p>
      {/* <div className='container' style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
            <p className='font-semibold text-center'>발주목록</p>
          </div>
          <br/><br/> */}
      <div className="text-center">
        <input
          placeholder="상품명을 검색하세요."
          size="30"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="rounded-2xl p-5 w-[500px] shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                          focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-[40px] py-5 
                          ml-3"
          onClick={() => {
            searchBtn();
          }}
        >
          검색
        </button>
      </div>

      <br />
      <br />

      <div className="mx-auto w-[80%]">
        <table className="w-full table-fixed border-collapse">
          <thead className="bg-yellow-400 p-15">
            <tr>
              <th className="w-1/6 py-2">번호</th>
              <th className="w-1/4 py-2">대표 이미지</th>
              <th className="w-1/2 py-2">상품명</th>
              <th className="w-1/4 py-2">수량</th>
              <th className="w-1/4 py-2">발주 일자</th>
              <th className="w-1/4 py-2">승인 여부</th>
              <th className="w-1/4 py-2">확인</th>
            </tr>
          </thead>

          <tbody>
            {polist.map(function (po, i) {
              return (
                // <TableRow po={po} rownum={i+1} key={i} />
                <tr className="text-center border-b cursor-pointer" key={i}>
                  <td>{[i + 1]}</td>
                  <td className="p-2">
                    {/* <img src={po.url} alt='' style={{width:140, padding:10, margin: "auto", display: "block" }}></img></td>
                      <td className='text-left py-4'>{ po.name }</td> */}
                    <img
                      src={po.url}
                      alt=""
                      style={{ width: 140 }}
                      className="text-align"
                    ></img>
                  </td>
                  <td className="text-center py-4">{po.name}</td>

                  <td className="text-center py-4">{po.quantity}</td>
                  <td className="text-center py-4">{po.wdate}</td>
                  <td className="text-center py-4">
                    {po.poYn > 0 ? (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        승인완료
                      </span>
                    ) : (
                      "승인대기중"
                    )}
                  </td>
                  <td>
                    {/* 여기에 모달을 추가하면 거기안에 버튼까지 있으니까 괜찮을 거예요 */}
                    {/* 만약 모달에서 값을 전달해야하거나 전달받아야하면 아래의 컴포넌트에서 상호작용 하시면 됩니다 */}
                    {po.poYn === 1 ? (
                      <Pocheckmodal po={po} getPolist={getPolist} />
                    ) : (
                      ""
                    )}
                    {/* <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" 
                        onClick={()=>{con(po)}}>승인확인</button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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

export default Polist;
