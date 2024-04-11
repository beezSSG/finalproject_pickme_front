import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination'; // npm i react-js-pagination
import axios from 'axios';
// import GlobalStyle from './styles/GlobalStyle';

function PostCheck(){
    const [postcheck, setPostCheck] = useState([]);
    const [deleteProduct, setDeleteProduct] = useState([]);


    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    useEffect(function(){
      getPostCheck('', '', 0);
    }, []);

    // postcheck 불러오는 함수
    function getPostCheck(c, s, pn){
        axios.get("http://localhost:8080/api/v1/ceo/getPostCheck", 
              {params:{ choice:c, search:s, pageNumber:pn}})
            .then(function(resp){  // success:function
              console.log(resp.data.polist);
              setPostCheck(resp.data.polist);
              setTotalCnt(resp.data.cnt); // 글의 총수
            })
            .catch(function(err){     // error:function
              alert('error');
            })
    }

    // 페이지 변경함수
    function handlePageChange(page){
        setPage(page);
        getPostCheck(choice, search, page-1);
    }

    return(
      <div>
          <table style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }} >
            <tbody>
              <tr>
              </tr>                
            </tbody>    
          </table>

          <br/>

          <div className='container' style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
          <p>배달 관리</p>
          </div>
          <br/><br/>


          <table className='mx-auto' style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }} >
          <colgroup>
              <col width="70"/><col width="200"/><col width="300"/><col width="100"/><col width="200"/><col width="150"/><col width="150"/>
          </colgroup>

          <thead className='bg-yellow-400'>
          <tr>
              <th>번호</th><th>상품명</th><th>수량</th><th>구매자</th><th>여부</th><th>확인</th>
          </tr>
          </thead>

          <tbody style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
          {
              postcheck.map(function(po, i){
                return(
                      // <TableRow po={po} rownum={i+1} key={i} />
                      <tr className="text-center border-b hover:bg-gray-200 cursor-pointer" key={i}>
                      <td>{ po.id }</td>
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

export default PostCheck;