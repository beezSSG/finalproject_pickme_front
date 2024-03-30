import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination'; // npm i react-js-pagination
import axios from 'axios';
// import GlobalStyle from './styles/GlobalStyle';

// import "./Polist.css";

function Polist(){
    const [polist, setPolist] = useState([]);
    const [deleteProduct, setDeleteProduct] = useState([]);

    // 검색
    const [choice, setChoice] = useState("");
    const [search, setSearch] = useState("");

    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    useEffect(function(){
      getPolist('', '', 0);
    }, []);

    // polist 불러오는 함수
    function getPolist(c, s, pn){
        axios.get("http://localhost:8080/polist", 
              {params:{ choice:c, search:s, pageNumber:pn}})
            .then(function(resp){  // success:function
              console.log(resp.data.polist);
              setPolist(resp.data.polist);
              setTotalCnt(resp.data.cnt); // 글의 총수
            })
            .catch(function(err){     // error:function
              alert('error');
            })
    }

    // 검색에 대한 부분
    function searchBtn(){        
        // choice, search 검사
        if(choice === ''){
            alert('카테고리를 선택해 주십시오');
            return;
        }

      getPolist(choice, search, 0);
    }  

    // 페이지 변경함수
    function handlePageChange(page){
        setPage(page);
        getPolist(choice, search, page-1);
    }

    // 승인확인 버튼을 누르면 발생하는 함수
    function con(po) {
      alert("con");
      alert(po.poYn);
        // #1. 화면에서 승인이 완료된 물품을 사라지게 하기
        const params = {"id": po.id};
          axios.post("http://localhost:8080/deleteProduct", null, {params:params})
          .then(response => {
              // 응답을 받았을 때의 처리

              if (props.po.poYn === 1) {
                  // 화면에서 승인이 완료된 물품을 사라지게 하는 작업을 수행
              }
            })
            .catch(error => {
              // 오류가 발생했을 때의 처리
              console.error('Error during deleteProduct request:', error);
            });
    }

    return(
      <div>
          <table style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }} >
            <tbody>
              <tr>
                <td style={{ paddingLeft:"3px" }} >
                  <select className='mr-4 shadow-xl rounded-2xl p-5 w-[125px] focus:outline-none focus:ring-2 focus:ring-yellow-400'  value={choice} onChange={(e)=>{setChoice(e.target.value)}}>
                  <option value="">검색</option>
                    <option value="name">상품명</option>
                    <option value="wdate">발주 일자</option>
                  </select>
                  <span class="icoArrow"><img src="https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png" alt=""/></span>
                </td>
                <td style={{ paddingLeft:"5px"}} className='align-middle'>
                  <input placeholder='카테고리를 선택해 주십시오' size='30'
                      value={search} onChange={(e)=>{setSearch(e.target.value)}} className='rounded-2xl p-5 w-[500px] shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400'/>
                </td> 
                <td style={{ paddingLeft:"5px" }}>  
                  <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                          focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-[40px] py-5 me-2 mb-2
                          dark:focus:ring-yellow-900"  onClick={()=>{searchBtn()}}>검색</button>
                </td>
              </tr>                
            </tbody>    
          </table>

          <br/>

          <div className='container' style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
          <p>발주목록</p>
          </div>
          <br/><br/>


          <table className='mx-auto' style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }} >
          <colgroup>
              <col width="70"/><col width="200"/><col width="300"/><col width="100"/><col width="200"/><col width="150"/><col width="150"/>
          </colgroup>

          <thead className='bg-yellow-400'>
          <tr>
              <th>번호</th><th>대표 이미지</th><th>상품명</th><th>수량</th><th>발주 일자</th><th>승인여부</th><th>확인</th>
          </tr>
          </thead>

          <tbody style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
          {
              polist.map(function(po, i){
                return(
                      // <TableRow po={po} rownum={i+1} key={i} />
                      <tr className="text-center border-b hover:bg-gray-200 cursor-pointer" key={i}>
                      <td>{ po.id }</td>
                      <td>
                          <img src={po.url} alt='' style={{width:140}}></img></td>
                      <td className='text-center py-4'>{ po.name }</td>
                      <td className='text-center py-4'>{ po.quantity }</td> 
                      <td className='text-center py-4'>{ po.wdate }</td>
                      <td className='text-center py-4'>{ po.poYn > 0 ? '승인완료' : '승인대기중'}</td>  
                      <td>
                        <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" 
                        onClick={()=>{con(po)}}>승인확인</button>
                      </td> 
                  </tr>
                );     
              })
          }
          </tbody>
          </table>

          <br/>

          {/* 세번째의 경우 */}     
          <Pagination
            itemClass='page-item'
            linkClass='page-link' 
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalCnt}
            pageRangeDisplayed={10}
            prevPageText={"prev"}
            nextPageText={"next"}
            onChange={handlePageChange} />

        <div className='my-5 d-flex justify-content-center'>
            <Link  style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"to="/pow">발주신청</Link>
        </div>       

      </div>
    );
}
// 승인중 : 0 // 승인완료 : 1 -> 관리자가 승인중(0)을 보고 발주를 승인하면 승인완료라고 뜨게 하고 싶고 
// 확인칸에 승인확인이라는 버튼이 나타나면서 승인 확인 버튼을 클릭하면 승인이 완료되었습니다라는 알림창이 뜨게 하고 싶습니다

export default Polist;