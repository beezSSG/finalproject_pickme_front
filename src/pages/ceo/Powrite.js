import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination'; // npm i react-js-pagination


import "./page.css";

function StoreProductlist() {
    const [storeproductlist, setStoreProductlist] = useState([]);

    let params = useParams();
    let id = params.id;
    let name = params.name;
    
    // 정렬
    const [choice, setChoice] = useState(" ");
    const [switching, setSwitching] = useState(true); // 정렬을 반대로 스위칭하기 위한 변수
    // 검색  
    const [search, setSearch] = useState("");
    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    

    /* Axios를 사용하여 서버에서 데이터를 가져오기 위한 비동기 함수, fetchData */
    
    function getStoreProductlist(c, s, pn, id, switching){
        axios.get("http://localhost:8080/api/v1/store/storeproductlist", 
                    {params:{ choice:c, search:s, pageNumber:pn,"store_id":id, "switching":switching}})
             .then(function(resp){  // success:function
                console.log(resp.data);
                setStoreProductlist(resp.data.storeproductlist);
                setTotalCnt(resp.data.cnt); // 글의 총수
             })
             .catch(function(err){     // error:funcztion
                alert('error');
             })
    }
    

    // 첫 시작 시 작동
    useEffect(function(){
        getStoreProductlist('', '', 0, id, switching);
        console.log(id);
        console.log(name);
    }, []);


    function choiceBtn(choice){
      getStoreProductlist(choice, search, 0, id, switching);
      setSwitching(!switching);
      setPage(0);
    }

    function searchBtn(){        
        getStoreProductlist('select', search, 0, id, switching);
    }
    

    function handlePageChange(page){
        setPage(page);
        getStoreProductlist('select', search, page-1, id, switching);
    }


  return (
    <div align="center">
      <table style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
        <tbody>
            <tr>
                <td style={{ paddingLeft:"5px"}} className='align-middle'>
                    <input className="border-2" placeholder='검색어' 
                        value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                </td>
                <td style={{ paddingLeft:"5px" }}>  
                
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
//                                                             focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
//                                                              dark:focus:ring-yellow-900" onClick={()=>searchBtn()}>검색</button>
                  </td>
                  <td style={{ paddingLeft:"5px" }}>
                      <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
//                                                             focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
//                                                              dark:focus:ring-yellow-900" onClick={() => choiceBtn('date')}>등록순</button>
                  </td>
                  <td style={{ paddingLeft:"5px" }}>
                      <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
//                                                             focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
//                                                              dark:focus:ring-yellow-900" onClick={() => choiceBtn('rate')}>평점순</button>
                  </td>
                
            </tr>                
        </tbody>    
      </table>
      <br/>
      <h3><b>{name} 상품 목록</b></h3>
      <br/> 
      
      <table>
        <colgroup>
                  <col width="70"/><col width="500"/><col width="100"/><col width="150"/>
        </colgroup>
        <thead>
          <tr>
            <th>제품 사진</th><th>제품명</th><th>가격</th><th>평점</th>
          </tr>
        </thead>
        <tbody>
            {storeproductlist.length > 0 && (
              // Use a for loop to create table rows
              (() => {
                const rows = [];
                for (let i = 0; i < storeproductlist.length; i++) {
                  const product = storeproductlist[i];
                  //console.log(product);
                  rows.push(
                    <tr key={product.id}>
                      <td>
                      <Link to={`/productdetail/${product.id}`}>
                        <img src={product.url} style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
                      </Link>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                          {Array.from({ length: product.productRating }, (_, index) => (
                              <span key={index}>★</span>
                          ))}
                      </td>
                      </tr>
                  );
                }
                return rows;
              })()
            )}
        </tbody>
      </table>

        <br/>

    <Pagination className=""
        itemClass='page-item'
        linkClass='page-link' 
        activePage={page}           // 현재 활성화 된 페이지 번호
        itemsCountPerPage={5}      // 페이지 당 보여줄 항목의 수
        totalItemsCount={totalCnt}  // 전체 항목 수
        pageRangeDisplayed={10}     // 한 번에 보여줄 페이지 번호의 범위
        prevPageText={"prev"}
        nextPageText={"next"}
        onChange={handlePageChange} />

    </div>
  );

}

export default StoreProductlist;