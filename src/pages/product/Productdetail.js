import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import MatchedStoreList from '../store/MatchedStoreList';
import Toast from "../public/Toast";

import emptyHeart from "../../assets/imgs/product/emptyHeart.png";
import fullHeart from "../../assets/imgs/product/fullHeart.png";
import star2 from "../../assets/imgs/product/star2.png";


function Productdetail(){
    let params = useParams();

    const [id, setId] = useState(''); // update, delete 버튼을 시각화할지 정하기 위해서  
    const [product, setProduct] = useState();

    // 댓글 목록
    const[reviewList, setReviewList] = useState([]);
  
    // 받을 데이터를 읽어 들이는 처리가 끝났는지 확인
    const [loading, setLoading] = useState(false); 

    // 모달 창 변수
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const searchMatchStore = (id) => {
        // 모달 열 때 id 값 설정
        setModalIsOpen(true);
    };

//    const[recentlyProduct, RecentlyProduct] = useState(); // 최근본 상품


    useEffect(() => {
      getProduct(params.id);
      productReviewList(params.id);

      zzimCheck(params.id);

      recentlyProduct(params.id);

    }, []);

    // 최근본 상품 기능
    function recentlyProduct(id) { 
      let set_product = localStorage.getItem("recentlyProduct");
      if (set_product === null) {
        set_product = [];
      } else {
        set_product = JSON.parse(set_product);
      }

      if (set_product.length === 10 || set_product.length === "10") { // 최근본 상품이 11개 일때
        set_product.pop();
        set_product.unshift(id);
        set_product = new Set(set_product);
        set_product = [...set_product];
        localStorage.setItem("recentlyProduct", JSON.stringify(set_product));
      } else {  // 최근본 상품이 10개 이하
        set_product.unshift(id);
        set_product = new Set(set_product);
        set_product = [...set_product];
        localStorage.setItem("recentlyProduct", JSON.stringify(set_product));
      }
      
    }

    // 찜 상품인지 아닌지 ~
    const [zzim, setZzim] = useState(false);
      
    async function getProduct(id){
        await axios.get("http://localhost:8080/api/v1/product/productdetail", { params:{"id":id} })
            .then(function(resp){
            //    console.log(resp.data);
                setId(id);
                setProduct(resp.data);

                setLoading(true);
            })
            .catch(function(err){           
                alert('error');
            })
    };

    // 후기 목록 불러오기
    async function productReviewList(id){
        await axios.get("http://localhost:8080/api/v1/review/productReviewList", { params:{ "id":id }})
        .then((resp)=>{
        setReviewList(resp.data);
        })
        .catch(()=>{
        alert('error');
        })
    };

    if(loading === false){
        return <div>loading...</div>;
    }

    // 찜 체크
    async function zzimCheck(productId){
        if(`${localStorage.getItem('jwt')}` === null){return;}
        
        await axios.get("http://localhost:8080/api/v1/customer/checkZZIM",
         { params:{ "productId":productId },
         headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
        })
        .then((resp) => {
            if (resp.data == "YES"){
                setZzim(true);
            }
            else{
                setZzim(false);
            }            
        })
        .catch(() => {
            alert('checkZZIM error');
        });
    };

    // 찜 추가/해제
    async function zzimClick(productId){
        if(`${localStorage.getItem('jwt')}` === null){
            Toast.fire({
                icon: 'warning',
                title: "로그인 후 이용 가능합니다",
              });
              return;
        }

        if (zzim === false){
            await axios.post("http://localhost:8080/api/v1/customer/insertZZIM", null,
             { params:{ "productId":productId },             
             headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }})
            .then((resp)=>{
                Toast.fire({
                    icon: 'success',
                    title: "찜 완료 ❤",
                  });
            })
            .catch(()=>{
            alert('insertZZIM error');
            })
        }
        else{
            await axios.post("http://localhost:8080/api/v1/customer/deleteZZIM", null, { params:{ "productId":productId },
            headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }})
            .then((resp)=>{
                Toast.fire({
                    icon: 'success',
                    title: "찜 해제 완료 🤍",
                  });
            })
            .catch(()=>{
            alert('deleteZZIM error');
            })
        }
       
        zzimCheck(productId);
    };

    // 장바구니 담기
    function cartClick() {
        if(`${localStorage.getItem('jwt')}` === null){
            Toast.fire({
                icon: 'warning',
                title: "로그인 후 이용 가능합니다",
              });
              return;
        }

        alert("어처구니 😛");
    }


    return(        
        <div align="center">
            <div className="prodDetail rounded-xl border border-spacing-2 p-3" style={{ width: '1060px', height: '450px', display: 'flex' }}>
                
                <div class="prodDetailPic" style={{ position: 'relative', width: '400px', height: '400px' }}>
                    <img src={product.url} style={{ maxWidth: '400px', maxHeight: '400px', margin: '10px' }} />
                    
                </div>

                <div class="prodDetailText" className='ml-20'>
                    <p class="tit" className='font-bold mt-20 mb-5 text-3xl '> <td>{product.name}</td> </p>
                    <hr/><br/>
                    <div class="prodInfo" >
                        <dl className="ml-5" style={{ display: 'flex' }}>
                            <dt  className='font-bold text-xl mb-8'>가격</dt>
                            <dd className='ml-8 text-xl'>
                                <p><span>{product.price.toLocaleString()} 원</span></p>
                            </dd>
                        </dl>
                        <dl className="ml-5" style={{ display: 'flex' }}>
                            <dt  className='font-bold text-xl mb-8'>태그</dt>
                            <dd className='ml-8 text-xl'>
                                <p><span>카테고리 들어갈 자리</span></p>
                            </dd>
                        </dl>
                        <hr/><br/>
                        <dl style={{ display: 'flex' }}>
                            <dd>
                                {zzim === false ?
                                (
                                    <button className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 
                                    focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-2xl px-5 py-1.5 me-2 mb-2
                                    dark:focus:ring-yellow-900"onClick={() => zzimClick(product.id)}>
                                        🤍
                                    </button>
                                ) : 
                                (
                                    <button className="focus:outline-none bg-red-400 hover:bg-yellow-500 
                                    focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-2xl px-5 py-1.5 me-2 mb-2
                                    dark:focus:ring-yellow-900"onClick={() => zzimClick(product.id)}>
                                        ❤
                                    </button>
                                )}
                            </dd>
                            <dd>
                                <button className="focus:outline-none text-gray-800 bg-yellow-400 font-bold hover:bg-yellow-500 
                                                    focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 me-2 mb-2
                                                    dark:focus:ring-yellow-900"onClick={()=>(cartClick())}>장바구니</button>
                            </dd>
                            <dd>
                                <button className="focus:outline-none text-gray-800 bg-yellow-400 font-bold hover:bg-yellow-500 
                                                    focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 me-2 mb-2
                                                    dark:focus:ring-yellow-900" onClick={()=>(searchMatchStore(product.id))}>상품이 있는 점포 찾기 🔍</button>
                                <MatchedStoreList isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} id={product.id} />
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <br/><br/><hr/><br/>

            {/* 후기 나타나는 table */}
            <div class="prodReview">

                <div class="prodReviewHeader">

                </div>

                <div class="prodReviewList">
                {
                    reviewList &&
                    reviewList.map(function(list, i){
                    return (
                    <tbody key={i}>                    
                        <tr>
                            <td>상품 후기</td>
                            <td>평점</td>
                        </tr>
                        <tr>                    
                        <td>작성자:&nbsp;&nbsp;{list.customerId}</td>
                        <td>
                            {Array.from({ length: list.rating }, (_, index) => (
                                <span key={index} style={{ display: 'inline-block' }}>
                                    <img src={star2} style={{ maxWidth: '15px', maxHeight: '15px', margin: '2px' }} />
                                </span>
                            ))}
                        </td>
                        </tr>
                        <tr>
                        <td colSpan='2'>{list.content}</td>
                        </tr>
                        <tr>
                        <td colSpan='2'>&nbsp;</td>
                        </tr>
                    </tbody>
                    );
                    })
                }  
                </div>

            </div>

            <table>
            <colgroup>
                <col width="500"/><col width="500"/>
            </colgroup>
            
            </table>

        </div>
    )
}

export default Productdetail;