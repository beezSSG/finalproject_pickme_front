import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination'; // npm i react-js-pagination

import "./page.css";
import star2 from "../../assets/imgs/product/star2.png";

function Productlist() {
    const [productlist, setProductlist] = useState([]);
    
    // 정렬
    const [choice, setChoice] = useState("");
    const [switching, setSwitching] = useState(true); // 정렬을 반대로 스위칭하기 위한 변수
    const [category, setCategory] = useState(0);
    // 검색  
    const [search, setSearch] = useState("");
    // 페이징 
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    

    /* Axios를 사용하여 서버에서 데이터를 가져오기 위한 비동기 함수, fetchData */
    
    function getProductlist(c, s, pn, switching, category){
        axios.get("http://localhost:8080/api/v1/product/productlist", 
                    {params:{ choice:c, search:s, pageNumber:pn, "switching":switching, "category":category}})
             .then(function(resp){  // success:function
                console.log(resp.data);
                setProductlist(resp.data.productlist);
                setTotalCnt(resp.data.cnt); // 글의 총수
             })
             .catch(function(err){     // error:function
                alert('error');
             })
    }

    useEffect(function(){
        getProductlist('select', search, 0, switching, category);
    }, []);


    function choiceBtn(choice){
      getProductlist(choice, search, 0, switching, category);
      setSwitching(!switching);
      setPage(0);
    }

    function searchBtn(){        
        getProductlist('select', search, 0, switching, category);
    }
    
    function categoryBtn(num){
      setCategory(num);
      getProductlist('select', search, 0, switching, num);
      setPage(0);
    }

    function handlePageChange(page){
        setPage(page);
        getProductlist('select', search, page-1, switching, category);
    }


  return (
    <div align="center">

      <div className='font-bold mt-5 mb-10 text-3xl'>
        <p>전체 상품 목록</p>
      </div>
      <div className='mb-5'>
        <div className="flex flex-col items-center mt-7">
            <div className='flex mb-5'>
                <div className='flex items-center mr-3'>
                    <input placeholder='상품명을 입력하세요' className='border border-gray-400 p-2 rounded-lg'
                        value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-2 mr-16
                                        dark:focus:ring-yellow-900" onClick={()=>searchBtn()}>검색</button>
                </div>
                <div className='flex items-center'>
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                        dark:focus:ring-yellow-900" onClick={() => choiceBtn('date')}>등록순</button>
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                        dark:focus:ring-yellow-900" onClick={() => choiceBtn('rate')}>평점순</button>
                </div>
            </div>

            <div className='flex items-center'>
                <button className="focus:outline-none text-white bg-sky-950 hover:bg-sky-700
                                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-2 mr-16
                                    dark:focus:ring-yellow-900" onClick={()=>categoryBtn(0)}>전체 상품</button>
                <button 
                    className={`focus:outline-none text-white ${category === 1 ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-600 
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 1 ? null : () => categoryBtn(1)}>
                    음료
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 2 ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-600 
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 2 ? null : () => categoryBtn(2)}>
                    간편식사
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 3 ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-600 
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 3 ? null : () => categoryBtn(3)}>
                    즉석조리
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 4 ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-600 
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 4 ? null : () => categoryBtn(4)}>
                    과자류
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 5 ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-600 
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 5 ? null : () => categoryBtn(5)}>
                    아이스크림
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 6 ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-600 
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 6 ? null : () => categoryBtn(6)}>
                    식품
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 7 ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-600 
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 7 ? null : () => categoryBtn(7)}>
                    생활용품
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 8 ? 'bg-yellow-600' : 'bg-yellow-500'} hover:bg-yellow-600 
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 8 ? null : () => categoryBtn(8)}>
                    기타
                </button>
            </div>
        </div>
      </div>
      <hr/>

      <div className="flex flex-col items-center mt-7">
        {productlist.length > 0 && (
          // Use a for loop to create table rows
          (() => {
            const rows = [];
            const columns = 3; // Number of columns
            for (let i = 0; i < productlist.length; i += columns) {
              const row = [];
              for (let j = i; j < i + columns && j < productlist.length; j++) {
                const product = productlist[j];
                row.push(
                  <Link to={`/productdetail/${product.id}`}>
                    <div key={product.id} className="items-center w-[300px] h-[450px] mb-10 rounded-xl border border-spacing-2
                              overflow-hidden transition duration-500 ease-in-out transform hover:ring-4 hover:ring-amber-400">
                      <div className='mt-10'>
                          <img src={product.url} className="w-[250px] h-[250px] object-cover hover:scale-110 transition duration-300" />
                        <br/>
                        <hr/>
                            <p className='mt-5' >{product.name}</p>
                          <p>{product.price.toLocaleString()}원</p>
                          <p>
                            {Array.from({ length: product.productRating }, (_, index) => (
                              <span key={index} style={{ display: 'inline-block' }}>
                                <img src={star2} style={{ maxWidth: '20px', maxHeight: '20px', margin: '3px' }} />
                              </span>
                            ))}
                          </p>
                        </div>
                    </div>
                  </Link>
                );
              }
              rows.push(
                <div key={i} className='flex space-x-20'> {/* 열 간의 간격을 추가 */}
                  {row}
                </div>
              );
            }
            return rows;
          })()
        )}
      </div>


      <br/>

    <Pagination className=""
        itemClass='page-item'
        linkClass='page-link' 
        activePage={page}           // 현재 활성화 된 페이지 번호
        itemsCountPerPage={9}      // 페이지 당 보여줄 항목의 수
        totalItemsCount={totalCnt}  // 전체 항목 수
        pageRangeDisplayed={10}     // 한 번에 보여줄 페이지 번호의 범위
        prevPageText={"prev"}
        nextPageText={"next"}
        onChange={handlePageChange} />

    </div>
  );

}

export default Productlist;
