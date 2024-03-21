import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

function Productdetail(){
    let params = useParams();
    let navigate = useNavigate();

    const [id, setId] = useState(''); // update, delete 버튼을 시각화할지 정하기 위해서  
    const [product, setProduct] = useState();

    // 댓글 목록, 평균 별점
    const[reviewList, setReviewList] = useState([]);
    const[avgRating, setAvgRating] = useState();

    // 받을 데이터를 읽어 들이는 처리가 끝났는지 확인
    const [loading, setLoading] = useState(false); 

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

    function searchMatchStore() {
        window.location.href = `/matchedstorelist/${product.id}`;
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
                    <button onClick={()=>(zzimClick())}>❤찜하기❤</button><br/><br/>
                    <button onClick={()=>(cartClick())}>👜장바구니👜</button><br/><br/>                    
                    <button onClick={()=>(searchMatchStore())}>🔍상품이 있는 점포 찾기🔍</button>
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