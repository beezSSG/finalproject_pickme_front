import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination"; // npm i react-js-pagination

import "./page.css";
import star2 from "../../assets/imgs/product/star2.png";

function Productlist({newchoice, newswitching, newsearch, newpage, newcategory, choiceHandle, switchingHandle, searchHandle, pageHandle, categoryHandle} ) {
    let params = useParams();
    const [productlist, setProductlist] = useState([]);

    // 정렬
    const [choice, setChoice] = useState('select');
    const [switching, setSwitching] = useState(true); // 정렬을 반대로 스위칭하기 위한 변수
    const [category, setCategory] = useState(Number(params.id));
    // 검색
    const [search, setSearch] = useState("");
    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    // 카테고리 스크롤 따라오기에 사용되는 변수
    const sortListRef = useRef(null);
    // 화면 쪼그라들기 시작할 시점
    const mobileWidth = 900;

    /* Axios를 사용하여 서버에서 데이터를 가져오기 위한 비동기 함수, fetchData */

    function getProductlist(c, s, pn, switching, category){
        axios.get("product/productlist",
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
      // console.log(category);
      if (window.localStorage.getItem('product') === '확인') {
        if (newchoice === 'select' && newcategory > 0) {
          getProductlist(newchoice, newsearch, (newpage-1), newswitching, newcategory);
          setPage(newpage);
          setSearch(newsearch);
          setCategory(newcategory);
        } else if ( newchoice === 'select' && newsearch !== undefined ) {
          getProductlist('select', newsearch, (newpage-1), newswitching, 0);
          setPage(newpage);
          setSearch(newsearch);
        } else if ( newchoice !== 'select' && newcategory !== 0) {
          getProductlist(newchoice, search, (newpage-1), newswitching, newcategory);
          setPage(newpage);
          setSearch(newsearch);
        } else {
          getProductlist(choice, newsearch, (newpage-1), newswitching, category);
          setSearch(newsearch);
          setChoice(newchoice);
          setPage(newpage);
        }
      } else {
        getProductlist("select", search, 0, switching, 0);
      }

      window.addEventListener('scroll', handleScroll);
      onResize();
      window.addEventListener('resize', onResize);

        return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', onResize);
        };

    }, []);


    function choiceBtn(choice){
      choiceHandle(choice);
      setChoice(choice);
      const nowSwitching = !switching;
      setSwitching(nowSwitching);
      switchingHandle(nowSwitching);
      setPage(1);
      getProductlist(choice, search, 0, nowSwitching, category);
    }

    function searchBtn(){
      setChoice('select');
      setPage(1);
      getProductlist('select', search, 0, switching, category);
    }

    function categoryBtn(num){
      if (num === 0) {
        setCategory(num);
        categoryHandle(num);
        setChoice('select');
        pageHandle(1);
        setPage(1);
        getProductlist('select', search, 0, switching, num);
      } else {
        setCategory(num);
        categoryHandle(num);
        pageHandle(1);
        setPage(1);
        getProductlist(choice, search, 0, switching, num);
      }
      
    }

  function handlePageChange(page) {
    setPage(page);
    pageHandle(page);
    getProductlist(choice, search, page - 1, switching, category);
  }

  function onResize() {
    const zoom = Math.min(window.innerWidth / mobileWidth, 1);
    //document.documentElement.style.zoom = `${zoom}`;
  }

  function changeHandle(e) {
    setSearch(e.target.value);
    searchHandle(e.target.value);
  }

  const handleScroll = () => {
    const sortList = sortListRef.current;
    const sortElement = document.getElementById("sort");
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

  return (
    <div>
      <div name="title" align="center" className="mt-5 mb-10">
        <p className="font-bold text-3xl text-gray-800">전체 상품 목록</p>
      </div>

      <div id="contents" align="center">
        <div className="flex min-w-[430px] max-w-[1600px]">
          <div id="sort" className="w-2/12 min-h-[480px] relative top-0">
            <div
              ref={sortListRef}
              id="sortList"
              className="bg-slate-100 rounded-lg absolute top-3 right-0"
            >
              <ul className="prodInfo m-4 p-2" align="center">
                <li
                  id="sort_00"
                  className={`${
                    category === 0
                      ? "font-bold text-yellow-500"
                      : "bg-slate-100"
                  } hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`}
                  onClick={() => categoryBtn(0)}
                >
                  전체상품
                </li>
                <hr />

                <li
                  id="sort_01"
                  className={`${
                    category === 1
                      ? "font-bold text-yellow-500"
                      : "bg-slate-100"
                  } hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`}
                  onClick={() => categoryBtn(1)}
                >
                  음료
                </li>
                <hr />

                <li
                  id="sort_02"
                  className={`${
                    category === 2
                      ? "font-bold text-yellow-500"
                      : "bg-slate-100"
                  } hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`}
                  onClick={() => categoryBtn(2)}
                >
                  간편식사
                </li>
                <hr />

                <li
                  id="sort_03"
                  className={`${
                    category === 3
                      ? "font-bold text-yellow-500"
                      : "bg-slate-100"
                  } hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`}
                  onClick={() => categoryBtn(3)}
                >
                  즉석조리
                </li>
                <hr />

                <li
                  id="sort_04"
                  className={`${
                    category === 4
                      ? "font-bold text-yellow-500"
                      : "bg-slate-100"
                  } hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`}
                  onClick={() => categoryBtn(4)}
                >
                  과자류
                </li>
                <hr />

                <li
                  id="sort_05"
                  className={`${
                    category === 5
                      ? "font-bold text-yellow-500"
                      : "bg-slate-100"
                  } hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`}
                  onClick={() => categoryBtn(5)}
                >
                  아이스
                </li>
                <hr />

                <li
                  id="sort_06"
                  className={`${
                    category === 6
                      ? "font-bold text-yellow-500"
                      : "bg-slate-100"
                  } hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`}
                  onClick={() => categoryBtn(6)}
                >
                  식품
                </li>
                <hr />

                <li
                  id="sort_07"
                  className={`${
                    category === 7
                      ? "font-bold text-yellow-500"
                      : "bg-slate-100"
                  } hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`}
                  onClick={() => categoryBtn(7)}
                >
                  생활용품
                </li>
                <hr />

                <li
                  id="sort_08"
                  className={`${
                    category === 8
                      ? "font-bold text-yellow-500"
                      : "bg-slate-100"
                  } hover:bg-slate-200
                                cursor-pointer p-2 rounded-lg`}
                  onClick={() => categoryBtn(8)}
                >
                  기타
                </li>
                <hr />
              </ul>
            </div>
          </div>

          <div id="productMain" className="w-10/12">
            <div
              id="productSearch"
              className="max-w-[1200px] flex flex-col items-center"
            >
              <div id="priceSearch"></div>

              <div id="nameSearch" align="center">
                <div className="flex flex-col mb-5">
                  <div className="flex items-center mr-3">
                    <input
                      placeholder="상품명을 입력하세요"
                      className="border border-gray-400 p-2 rounded-lg w-60"
                      value={search}
                      onChange={(e) => {
                        changeHandle(e);
                      }}
                    />
                    <button
                      className="focus:outline-none text-gray-600 bg-yellow-400 hover:bg-yellow-500
                                          font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-2 mr-16 mt-2
                                          dark:focus:ring-yellow-900"
                      onClick={() => searchBtn()}
                    >
                      검색
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="focus:outline-none text-gray-600 bg-yellow-400 hover:bg-yellow-500
                                          font-bold rounded-lg text-sm px-5 py-2.5 me-2 my-2
                                          dark:focus:ring-yellow-900"
                      onClick={() => choiceBtn("bogo")}
                    >
                      행사상품
                    </button>
                    <button
                      className="focus:outline-none text-gray-600 bg-yellow-400 hover:bg-yellow-500
                                          font-bold rounded-lg text-sm px-5 py-2.5 me-2 my-2
                                          dark:focus:ring-yellow-900"
                      onClick={() => choiceBtn("date")}
                    >
                      등록순
                    </button>
                    <button
                      className="focus:outline-none text-gray-600 bg-yellow-400 hover:bg-yellow-500
                                          font-bold rounded-lg text-sm px-5 py-2.5 me-2 my-2
                                          dark:focus:ring-yellow-900"
                      onClick={() => choiceBtn("rate")}
                    >
                      평점순
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="productList"
              className="flex flex-wrap justify-center gap-4 p-4 max-w-[1200px] min-h-[480px] "
            >
              {productlist.length > 0 &&
                // Use a for loop to create table rows
                (() => {
                  const rows = [];
                  const columns = 1; // Number of columns
                  for (let i = 0; i < productlist.length; i += columns) {
                    const row = [];
                    for (
                      let j = i;
                      j < i + columns && j < productlist.length;
                      j++
                    ) {
                      const product = productlist[j];
                      row.push(
                        <Link
                          key={product.id}
                          to={`/productdetail/${product.id}`}
                        >
                          <div
                            className="items-center w-[250px] h-[375px]
                                        mb-10 rounded-xl border border-spacing-2
                                        overflow-hidden transition duration-500 ease-in-out transform
                                        hover:ring-4 hover:ring-amber-400"
                              align="center">
                          <div className='mt-10'>
                            <img src={product.url} className="w-5/6 h-5/6 object-cover hover:scale-110 transition duration-300" />
                            {product.promotionType === 1 && (
                              <div className="absolute top-5 right-5 bg-main-orange bg-opacity-90 py-2 rounded-full
                                              px-5 select-none">
                                  <p className='text-2xl font-bold text-white'>1+1</p>
                              </div>
                            )}
                            {product.promotionType === 2 && (
                              <div className="absolute top-5 right-5 bg-[#833ab4] bg-opacity-90 py-2 rounded-full
                                              px-5 select-none">
                                  <p className='text-2xl font-bold text-white'>2+1</p>
                              </div>
                            )}
                            {product.promotionType === 3 && (
                              <div className="absolute top-5 right-5 bg-[#fd1d1d] bg-opacity-90 py-2 rounded-full
                                              px-5 select-none">
                                  <p className='text-2xl font-bold text-white'>HOT</p>
                              </div>
                            )}
                          <br/>
                          <hr/>
                            <p className='mt-5 font-semibold'>{product.name.length > 15 ? product.name.slice(0, 15) + '...' : product.name}</p>
                            <p>{product.price.toLocaleString()}원</p>
                              {product.productRating === 0 ? (
                                <span>　</span>
                              ) : (
                                Array.from({ length: product.productRating }, (_, index) => (
                                  <span key={index} style={{ display: 'inline-block', marginRight: '3px' }}>
                                    <img src={star2} style={{ maxWidth: '20px', maxHeight: '20px' }} />
                                  </span>
                                ))
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    }
                    rows.push(
                      <div key={i} className="flex space-x-20">
                        {" "}
                        {/* 열 간의 간격을 추가 */}
                        {row}
                      </div>
                    );
                  }
                  return rows;
                })()}
            </div>
          </div>
        </div>
        <div id="pagination" className="max-w-[1200px] bottom-0">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={page} // 현재 활성화 된 페이지 번호
            itemsCountPerPage={8} // 페이지 당 보여줄 항목의 수
            totalItemsCount={totalCnt} // 전체 항목 수
            pageRangeDisplayed={4} // 한 번에 보여줄 페이지 번호의 범위
            prevPageText={"prev"}
            nextPageText={"next"}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Productlist;