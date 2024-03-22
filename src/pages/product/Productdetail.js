import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import MatchedStoreList from '../store/MatchedStoreList';


function Productdetail(){
    let params = useParams();

    const [id, setId] = useState(''); // update, delete 버튼을 시각화할지 정하기 위해서  
    const [product, setProduct] = useState();

    // 댓글 목록, 평균 별점
    const[reviewList, setReviewList] = useState([]);
    const[avgRating, setAvgRating] = useState();
  
    // 받을 데이터를 읽어 들이는 처리가 끝났는지 확인
    const [loading, setLoading] = useState(false); 

    // 모달 창 변수
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let navigate = useNavigate();

    const searchMatchStore = (id) => {
        // 모달 열 때 id 값 설정
        setModalIsOpen(true);
    };

      
    async function getProduct(id){
        await axios.get("http://localhost:8080/api/v1/product/productdetail", { params:{"id":id} })
            .then(function(resp){
             //   console.log(resp.data);
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
        await axios.get("http://localhost:8080/api/v1/product/productReviewList", { params:{ "id":id }})
        .then((resp)=>{
        // alert(JSON.stringify(resp.data.content));
        // alert(resp.data);
        setReviewList(resp.data);
        })
        .catch(()=>{
        alert('error');
        })
    };

    useEffect(() => {

        getProduct(params.id);
        productReviewList(params.id);
    }, [params.id]);


    if(loading === false){
        return <div>loading...</div>;
    }

    function zzimClick() {
        alert("아구찜♥");
    }

    function cartClick() {
        alert("어처구니");
    }


    return(
        <div align="center">
            <table className="table table-bordered" style={{textAlign:"center"}}>
            <colgroup>
                <col style={{ width:'150px' }}/>
                <col style={{ width:'500px' }}/>
            </colgroup>
            <tbody>
            <tr>
                <th></th>
                <td><img src={product.url} style={{ maxWidth: '400px', maxHeight: '400px', margin: '10px' }} /></td>
                <td>                    
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
//                                                             focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
//                                                              dark:focus:ring-yellow-900"onClick={()=>(zzimClick())}>❤찜하기❤</button><br/><br/>
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
//                                                             focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
//                                                              dark:focus:ring-yellow-900"onClick={()=>(cartClick())}>👜장바구니👜</button><br/><br/>                    
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
//                                                             focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
//                                                              dark:focus:ring-yellow-900" onClick={()=>(searchMatchStore(product.id))}>🔍상품이 있는 점포 찾기🔍</button>
                    <MatchedStoreList isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} id={product.id} />
                </td>
            </tr>
            <tr>
                <th>제품명</th>
                <td>{product.name}</td>
            </tr>
            <tr>
                <th>가격</th>
                <td>{product.price}</td>
            </tr>            
            </tbody>
            </table>
            <br/><hr/><br/>

            {/* 후기 나타나는 table */}
            <table>
            <colgroup>
                <col width="500"/><col width="500"/>
            </colgroup>
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
                            <span key={index}>★</span>
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
            </table>

        </div>
    )
}

export default Productdetail;