import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination'; // npm i react-js-pagination

import Toast from "../public/Toast";
import star2 from "../../assets/imgs/product/star2.png";
import { BsCart4 } from "react-icons/bs"; // <BsCart4 />
import { IoIosAdd, IoIosRemove } from "react-icons/io"; // <IoIosAdd /> <IoIosRemove />

import "./page.css";

function StoreProductlist() {
    const [storeproductlist, setStoreProductlist] = useState([]);

    let {id, name} = useParams();
    
    
    // 정렬
    const [choice, setChoice] = useState('select');
    const [switching, setSwitching] = useState(true); // 정렬을 반대로 스위칭하기 위한 변수
    const [category, setCategory] = useState(0);
    // 검색  
    const [search, setSearch] = useState("");
    // 페이징
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    // 장바구니 수량
    const [cartQuantity, setcartQuantity] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
    

    /* Axios를 사용하여 서버에서 데이터를 가져오기 위한 비동기 함수, fetchData */
    
    function getStoreProductlist(c, s, pn, id, switching, category){
        axios.get("store/storeproductlist", 
                    {params:{ choice:c, search:s, pageNumber:pn,"store_id":id, "switching":switching, "category":category}})
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
        getStoreProductlist('select', search, 0, id, switching, category);
    }, []);


    function choiceBtn(choice){
      setChoice(choice);
      const nowSwitching = !switching;
      setSwitching(nowSwitching);
      getStoreProductlist(choice, search, 0, id, nowSwitching, category);
      setPage(0);
    }

    function searchBtn(){        
        setChoice('select');
        getStoreProductlist('select', search, 0, id, switching, category);
    }

    function categoryBtn(num){
      setCategory(num);
      getStoreProductlist(choice, search, 0, id, switching, num);
      setPage(0);
    }

    function handlePageChange(page){
        setPage(page);
        getStoreProductlist(choice, search, page-1, id, switching, category);
    }


    // 장바구니

    const addCart = async (productId, storeId, quantity) => {

      await axios.post("/customer/cart/insert", null,
        { params : { "productId":productId, "storeId":storeId, "quantity":quantity }}
      )
      .then((resp) => {
        console.log(resp.data);
        if (resp.data === "YES") {
          Toast.fire({
            icon: 'warning',
            title: "이미 장바구니에 추가되어 있습니다.",
          });
          return;
        }
        Toast.fire({
            icon: 'success',
            title: "✔ 장바구니에 추가되었습니다!",
          });
      })
      .catch((err)=>{
        alert(err);
      })
    };

    function increaseQuantity(i) {
      if (cartQuantity[i] < 50) {
        const newCartQuantity = [...cartQuantity]; // 이전 상태 배열을 복사
        newCartQuantity[i] = newCartQuantity[i] + 1; // 인덱스에 해당하는 항목 증가
        setcartQuantity(newCartQuantity); // 새로운 배열로 상태 업데이트
      }
    }
    
    function decreaseQuantity(i) {
      if (cartQuantity[i] > 1) {
        const newCartQuantity = [...cartQuantity]; // 이전 상태 배열을 복사
        newCartQuantity[i] = newCartQuantity[i] - 1; // 인덱스에 해당하는 항목 감소
        setcartQuantity(newCartQuantity); // 새로운 배열로 상태 업데이트
      }
    }

  return (
    <div align="center">
      
      <div className='font-bold mt-5 mb-10 text-2xl'>
        <p>"{name}" 상품 목록</p>
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
                    className={`focus:outline-none text-white ${category === 1 ? 'bg-orange-400' : 'bg-amber-600'} hover:bg-orange-400
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 1 ? null : () => categoryBtn(1)}>
                    음료
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 2 ? 'bg-orange-400' : 'bg-amber-600'} hover:bg-orange-400
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 2 ? null : () => categoryBtn(2)}>
                    간편식사
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 3 ? 'bg-orange-400' : 'bg-amber-600'} hover:bg-orange-400
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 3 ? null : () => categoryBtn(3)}>
                    즉석조리
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 4 ? 'bg-orange-400' : 'bg-amber-600'} hover:bg-orange-400
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 4 ? null : () => categoryBtn(4)}>
                    과자류
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 5 ? 'bg-orange-400' : 'bg-amber-600'} hover:bg-orange-400
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 5 ? null : () => categoryBtn(5)}>
                    아이스크림
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 6 ? 'bg-orange-400' : 'bg-amber-600'} hover:bg-orange-400
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 6 ? null : () => categoryBtn(6)}>
                    식품
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 7 ? 'bg-orange-400' : 'bg-amber-600'} hover:bg-orange-400
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 7 ? null : () => categoryBtn(7)}>
                    생활용품
                </button>
                <button 
                    className={`focus:outline-none text-white ${category === 8 ? 'bg-orange-400' : 'bg-amber-600'} hover:bg-orange-400
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                dark:focus:ring-yellow-900`}
                    onClick={category === 8 ? null : () => categoryBtn(8)}>
                    기타
                </button>
            </div>
        </div>
      </div>
      <hr/>


      <div className="mt-7">
        <table>
          <colgroup>
                    <col width="122"/><col width="250"/><col width="100"/><col width="100"/>
          </colgroup>
          <thead>
            <tr className="bg-slate-200">
              <th className=' h-[40px]'>제품 사진</th><th>제품명</th><th>가격</th><th>장바구니</th>
            </tr>
          </thead>
          <tbody className='items-center text-center'>
              {storeproductlist.length > 0 && (
                // Use a for loop to create table rows
                (() => {
                  const rows = [];
                  for (let i = 0; i < storeproductlist.length; i++) {

                    const product = storeproductlist[i];
                    //console.log(product);
                    rows.push(
                      <tr key={product.id} className="border-b border-slate-200">
                        <td className='h-[146px]'>
                        <Link to={`/productdetail/${product.id}`}>
                          <img src={product.url} style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
                        </Link>
                        {Array.from({ length: product.productRating }, (_, index) => (
                                <span key={index} style={{ display: 'inline-block' }}>
                                  <img src={star2} style={{ maxWidth: '15px', maxHeight: '15px', margin: '1px' }} />
                                </span>
                            ))}
                        </td>
                        <td>{product.name}</td>
                        <td>{product.price.toLocaleString()}원</td>
                        <td>
                          <div className='flex items-center justify-center text-center hover:text-orange-500 cursor-pointer'
                              onClick={() => {addCart(product.id, id, cartQuantity[i])}}>
                              <BsCart4 className='w-7 h-7' />
                          </div>
                          <div className='flex items-center justify-center text-center ml-1 mr-1 mt-5 border border-gray-500 text-xl rounded-xl'>
                              <div className='flex items-center justify-center text-center w-[35px] cursor-pointer border-r border-gray-500
                                              hover:text-orange-500' onClick={() => {decreaseQuantity(i)}}>
                                <IoIosRemove />
                              </div>
                              <div className='w-[30px]'>
                                {cartQuantity[i]}
                              </div>
                              <div className='flex items-center justify-center text-center w-[35px] cursor-pointer border-l border-gray-500
                                              hover:text-orange-500' onClick={() => {increaseQuantity(i)}}>
                                <IoIosAdd />
                              </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                  return rows;
                })()
              )}
          </tbody>
        </table>
      </div>

        <br/>

    <Pagination className=""
        itemClass='page-item'
        linkClass='page-link' 
        activePage={page}           // 현재 활성화 된 페이지 번호
        itemsCountPerPage={8}      // 페이지 당 보여줄 항목의 수
        totalItemsCount={totalCnt}  // 전체 항목 수
        pageRangeDisplayed={10}     // 한 번에 보여줄 페이지 번호의 범위
        prevPageText={"prev"}
        nextPageText={"next"}
        onChange={handlePageChange} />

    </div>
  );

}

export default StoreProductlist;