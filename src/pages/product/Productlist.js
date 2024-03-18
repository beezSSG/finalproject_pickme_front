import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination'; // npm i react-js-pagination

function Productlist() {
    const [productlist, setProductlist] = useState([]);
    
    // 정렬
    const [choice, setChoice] = useState("");
    // 검색  
    const [search, setSearch] = useState("");
    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    

    /* Axios를 사용하여 서버에서 데이터를 가져오기 위한 비동기 함수, fetchData */
    
    function getProductlist(c, s, pn){
        axios.get("http://localhost:8080/api/v1/product/productlist", 
                    {params:{ choice:c, search:s, pageNumber:pn}})
             .then(function(resp){  // success:function
                console.log(resp.data.productlist);
                setProductlist(resp.data.productlist);
                setTotalCnt(resp.data.cnt); // 글의 총수
             })
             .catch(function(err){     // error:function
                alert('error');
             })
    }

    useEffect(function(){
        getProductlist('', '', 0);
    }, []);


    function choiceBtn(choice){

      if(search === ''){
        getProductlist(choice, '', 0);
        return;
      }

      getProductlist(choice, search, 0);
    }

    function searchBtn(){        
        getProductlist('select', search, 0);
    }
    
    function handlePageChange(page){
        setPage(page);
        getProductlist('', search, page-1);
    }


  return (
    <div align="center">
      <table style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
        <tbody>
            <tr>
                <td style={{ paddingLeft:"5px"}} className='align-middle'>
                    <input placeholder='검색어' 
                        value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                </td>
                <td style={{ paddingLeft:"5px" }}>  
                    <button onClick={()=>searchBtn()}>검색</button>
                  </td>
                  <td style={{ paddingLeft:"5px" }}>
                      <button className='btn btn-secondary' onClick={() => choiceBtn('date')}>등록순</button>
                  </td>
                  <td style={{ paddingLeft:"5px" }}>
                      <button className='btn btn-secondary' onClick={() => choiceBtn('rate')}>평점순</button>
                  </td>
                
            </tr>                
        </tbody>    
      </table>
      
      <h3>전체 상품 목록</h3>

      {<table border="1">
      <colgroup>
                <col width="70"/><col width="500"/><col width="100"/><col width="150"/>
      </colgroup>

        <thead>
          <tr>
          <th>제품 사진</th><th>제품명</th><th>가격</th><th>평점</th>
          </tr>
        </thead>

        <tbody>
            {productlist.length > 0 && (
              // Use a for loop to create table rows
              (() => {
                const rows = [];
                for (let i = 0; i < productlist.length; i++) {
                  const product = productlist[i];
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
      </table>}

        <br/>

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
        <Link className='btn btn-primary' to="/bbswrite">글쓰기</Link>
    </div>  

    </div>
  );

}

export default Productlist;