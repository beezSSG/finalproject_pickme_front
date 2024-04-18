import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination'; // npm i react-js-pagination
import GoToCartModal from './GoToCartModal';

import Toast from "../public/Toast";
import star2 from "../../assets/imgs/product/star2.png";
import Categories from "./Categories.js";
import { BsCart4 } from "react-icons/bs"; // <BsCart4 />

import "./page.css";

function StoreProductlist() {
    const [storeproductlist, setStoreProductlist] = useState([]);

    let {id, name} = useParams();
    
    // 매장 정보
    const [storeInfo, setStoreInfo] = useState({});
    const [storeStartHour, setStoreStartHour] = useState('');
    const [storeEndHour, setStoreEndHour] = useState('');
    
    // 정렬
    const [choice, setChoice] = useState('select');
    const [switching, setSwitching] = useState(true); // 정렬을 반대로 스위칭하기 위한 변수
    const [category, setCategory] = useState(0);
    // 검색  
    const [search, setSearch] = useState("");
    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    // 카테고리 스크롤 따라오기에 사용되는 변수
    const sortListRef = useRef(null);
    // 화면 쪼그라들기 시작할 시점
    const mobileWidth = 900; 
    // 장바구니 수량
    const [cartQuantity, setcartQuantity] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
    
    // 모달 창 변수
    const [modalIsOpen, setModalIsOpen] = useState(false);

    
    // 매장 정보 불러오기
    function getStoreInfo(id){
        axios.get("store/storeinfo", 
                    {params:{ "id":id }})
             .then(function(resp){  // success:function
              setStoreInfo(resp.data);
              setStoreStartHour(`${resp.data.startHour.slice(0, 2)}:${resp.data.startHour.slice(2)}`);
              setStoreEndHour(`${resp.data.endHour.slice(0, 2)}:${resp.data.endHour.slice(2)}`);
             })
             .catch(function(err){     // error:funcztion
                alert('getStoreInfo error');
             })
    }
    
    // 매장 상품 목록 불러오기
    function getStoreProductlist(c, s, pn, id, switching, category){
        axios.get("store/storeproductlist", 
                    {params:{ choice:c, search:s, pageNumber:pn,"store_id":id, "switching":switching, "category":category}})
             .then(function(resp){  // success:function
                console.log(resp.data);
                setStoreProductlist(resp.data.storeproductlist);
                setTotalCnt(resp.data.cnt); // 글의 총수
             })
             .catch(function(err){     // error:funcztion
                alert('getStoreProductlist error');
             })
    }

    // 첫 시작 시 작동
    useEffect(function(){
        getStoreInfo(id);
        getStoreProductlist('select', search, 0, id, switching, category);

        window.addEventListener('scroll', handleScroll);
        onResize();
        window.addEventListener('resize', onResize);

        return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', onResize);
        };
    }, []);


    function choiceBtn(choice){
      setChoice(choice);
      const nowSwitching = !switching;
      setSwitching(nowSwitching);
      getStoreProductlist(choice, search, 0, id, nowSwitching, category);
      setPage(1);
    }

    function searchBtn(){        
        setChoice('select');
        getStoreProductlist('select', search, 0, id, switching, category);
    }

    function categoryBtn(num){
      setCategory(num);
      getStoreProductlist(choice, search, 0, id, switching, num);
      setPage(1);
    }

    function handlePageChange(page){
        setPage(page);
        getStoreProductlist(choice, search, page-1, id, switching, category);
    }

    function onResize (){
      const zoom = Math.min(window.innerWidth / mobileWidth, 1);
      //document.documentElement.style.zoom = `${zoom}`;
    };

    const handleScroll = () => {
      const sortList = sortListRef.current;
      const sortElement = document.getElementById('sort');
      const scrollTop = window.scrollY || window.pageYOffset;
      const sortOffsetTop = sortElement.offsetTop;
      const sortHeight = sortElement.offsetHeight;
      const sortListHeight = sortList.offsetHeight;
      const bottomOffset = scrollTop - sortOffsetTop + sortListHeight;

      // sortList가 sort 요소의 아래로 넘어가면 막습니다.
      if (bottomOffset > sortHeight) {
        sortList.style.top = `${sortHeight - sortListHeight}px`;
      } else {
        sortList.style.top = `${Math.max(0, scrollTop - sortOffsetTop)}px`;
      }
    };

    // 장바구니

    const addCart = async (sProductId, quantity) => {

      await axios.post("/customer/cart/insert", null,
        { params : { "sProductId":sProductId, "quantity":quantity }}
      )
      .then((resp) => {
        // 이미 장바구니에 있을 때
        if (resp.data === "YES") {
          Toast.fire({
            icon: 'warning',
            title: "이미 장바구니에 추가된 상품입니다.",
          });
          return;
        }

        // 장바구니에 없는 상품일 때
        setModalIsOpen(true);
      })
      .catch((err)=>{
        alert(err);
      })
    };
    
  return (
    <div>

      <div name="storeInfo" align="center" className='mb-4'>
        <div name='infoBox' className='max-w-[500px] mb-14'>
          <div className='border-b-2 border-b-gray-300 mb-4'>
            <div className='mt-5 mb-4 p-2 inline-block rounded-md bg-yellow-200 shadow-lg border-2 border-stone-400'>
              <p className='font-bold text-3xl text-gray-800'>          
                {name}
              </p>
            </div>
          </div>

          <div className='max-w-[400px] text-left text-gray-800'>
            <p className='my-1'><b>매장위치:</b>　{storeInfo.address}</p>
            <p className='my-1'><b>전화번호:</b>　{storeInfo.tel}</p>
            <p className='my-1'><b>영업시간:</b>　{storeStartHour} ~ {storeEndHour}</p>
            <p className='mt-8 mb-2'><b>제공 서비스</b></p>
          </div>          
          <div className='text-left'>            
            <Categories storeInfo={storeInfo} />
          </div>

        </div>
      <hr/>
      </div>
      
      <div id='contents' align="center">
      
        <div className='flex min-w-[430px] max-w-[1600px]'>
        <div id="sort" className='w-2/12 min-h-[480px] relative top-0'>
          <div ref={sortListRef} id="sortList" className='bg-slate-100 rounded-lg absolute top-3 right-0'>
            <ul className='prodInfo m-4 p-2' align="center">
              <li id='sort_00' className={`${category === 0 ? 'font-bold text-yellow-500' : 'bg-slate-100'} hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`} onClick={()=>categoryBtn(0)}>
                전체상품
              </li>
              <hr/>

              <li id='sort_01' className={`${category === 1 ? 'font-bold text-yellow-500' : 'bg-slate-100'} hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`} onClick={()=>categoryBtn(1)}>
                음료
              </li>
              <hr/>

              <li id='sort_02' className={`${category === 2 ? 'font-bold text-yellow-500' : 'bg-slate-100'} hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`} onClick={()=>categoryBtn(2)}>
                간편식사
              </li>
              <hr/>

              <li id='sort_03' className={`${category === 3 ? 'font-bold text-yellow-500' : 'bg-slate-100'} hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`} onClick={()=>categoryBtn(3)}>
                즉석조리
              </li>
              <hr/>

              <li id='sort_04' className={`${category === 4 ? 'font-bold text-yellow-500' : 'bg-slate-100'} hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`} onClick={()=>categoryBtn(4)}>
                과자류
              </li>
              <hr/>

              <li id='sort_05' className={`${category === 5 ? 'font-bold text-yellow-500' : 'bg-slate-100'} hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`} onClick={()=>categoryBtn(5)}>
                아이스
              </li>
              <hr/>

              <li id='sort_06' className={`${category === 6 ? 'font-bold text-yellow-500' : 'bg-slate-100'} hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`} onClick={()=>categoryBtn(6)}>
                식품
              </li>
              <hr/>

              <li id='sort_07' className={`${category === 7 ? 'font-bold text-yellow-500' : 'bg-slate-100'} hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`} onClick={()=>categoryBtn(7)}>
                생활용품
              </li>
              <hr/>
              <li id='sort_08' className={`${category === 8 ? 'font-bold text-yellow-500' : 'bg-slate-100'} hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`} onClick={()=>categoryBtn(8)}>
                기타
              </li>
              <hr/>
            </ul>
          </div>
        </div>

        <div id='productMain' className='w-10/12'>
          <div id='productSearch' className='max-w-[1200px] flex flex-col items-center'>
            <div id='priceSearch'></div>
            
            <div id='nameSearch' align="center">
              <div className='flex flex-col mb-5'>
                  <div className='flex items-center mr-3'>
                      <input placeholder={`${name}의 상품을 검색하세요`} className='border border-gray-400 p-2 rounded-lg lg:w-80 sm:w-60'
                          value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                      <button className="focus:outline-none text-gray-600 bg-yellow-400 hover:bg-yellow-500
                                          font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-2 mr-16 mt-2
                                          dark:focus:ring-yellow-900" onClick={()=>searchBtn()}>검색</button>
                  </div>
                  <div className='flex items-center justify-center'>
                      <button className="focus:outline-none text-gray-600 bg-yellow-400 hover:bg-yellow-500 
                                          font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2
                                          dark:focus:ring-yellow-900" onClick={() => choiceBtn('date')}>등록순</button>
                      <button className="focus:outline-none text-gray-600 bg-yellow-400 hover:bg-yellow-500 
                                          font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2
                                          dark:focus:ring-yellow-900" onClick={() => choiceBtn('rate')}>평점순</button>
                  </div>
              </div>
            </div>
          </div>

          <div id='storeproductlist' className='flex flex-wrap justify-center gap-4 p-4 max-w-[1200px] min-h-[480px]'>
            {storeproductlist.length > 0 && (
              // Use a for loop to create table rows
              (() => {
                const rows = [];
                const columns = 1; // Number of columns
                const sortedProducts = storeproductlist.sort((a, b) => new Date(a.expDate) - new Date(b.expDate)); // Sort products by expDate
                const addedProductIds = new Set(); // Set to store added product ids
                for (let i = 0; i < sortedProducts .length; i += columns) {
                  const row = [];
                  for (let j = i; j < i + columns && j < sortedProducts .length; j++) {
                    const product = sortedProducts [j];

                    if(!addedProductIds.has(product.id)) {
                      row.push(
                        <div className="items-center w-[250px] h-[375px]
                                        mb-10 rounded-xl border border-spacing-2
                                        overflow-hidden transition duration-500 ease-in-out transform
                                        hover:ring-4 hover:ring-amber-400"
                              align="center">
                          <div className='mt-10'>
                            {/* 제품 이미지 */}
                            <img src={product.url} className="w-5/6 h-5/6 object-cover" />
                            {/* 장바구니 버튼 */}
                            <div className="absolute bottom-28 right-2 bg-yellow-200 bg-opacity-70 py-2 rounded-full
                                              px-5 hover:scale-110 transition duration-300 hover:bg-yellow-300 cursor-pointer"
                                              onClick={() => addCart(product.sproductId, 1)}>
                                  <p className='text-2xl font-bold text-gray-800'><BsCart4 /></p>
                            </div>
                            
                            {/* 1+1 스티커 */}
                            {product.promotionType === 1 && (
                              <div className="absolute top-5 right-5 bg-orange-500 bg-opacity-70 py-2 rounded-full
                                              px-5 select-none">
                                  <p className='text-2xl font-bold text-gray-800'>1+1</p>
                              </div>
                            )}
                          <br/>
                          <hr/>
                            <p className='mt-5 font-semibold'>{product.name.length > 15 ? product.name.slice(0, 15) + '...' : product.name}</p>
                            <p>{product.price.toLocaleString()}원</p>
                            <p>
                              {product.productRating === 0 ? (
                                <span>　</span>
                              ) : (
                                Array.from({ length: product.productRating }, (_, index) => (
                                  <span key={index} style={{ display: 'inline-block', marginRight: '3px' }}>
                                    <img src={star2} style={{ maxWidth: '20px', maxHeight: '20px' }} />
                                  </span>
                                ))
                              )}
                            </p>
                          </div>
                        </div>
                      );
                        addedProductIds.add(product.id); // Add product id to set
                    }
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
          <GoToCartModal isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />

          
          </div>
        </div>
        <div id='pagination' className='max-w-[1200px] bottom-0'>
          <Pagination className=""
          itemClass='page-item'
          linkClass='page-link' 
          activePage={page}           // 현재 활성화 된 페이지 번호
          itemsCountPerPage={8}      // 페이지 당 보여줄 항목의 수
          totalItemsCount={totalCnt}  // 전체 항목 수
          pageRangeDisplayed={4}     // 한 번에 보여줄 페이지 번호의 범위
          prevPageText={"prev"}
          nextPageText={"next"}
          onChange={handlePageChange} />
        </div>
      </div>
    </div>
  );

}

export default StoreProductlist;