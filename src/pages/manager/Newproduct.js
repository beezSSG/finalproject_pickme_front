import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Newproduct() {

    let navigate = useNavigate();
    
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [url,setUrl] = useState("");

    function newproductinsert(){
        axios.get("http://localhost:8080/api/v1/product/newproductinsert", 
                {params: {"name":name, 
                          "price":price,
                          "url":url}})
            .then(function(resp){
                console.log(resp.data);
                if(resp.data === "YES") {
                    alert("등록되었습니다.");
                    navigate("/manager");
                }
                else {
                    alert("등록 실패");
                    navigate("/manager");
                }
            })
    }
 
    return(
        <>
        <div>신제품 등록 페이지 입니다..</div>
        <table>
            <tr>
                <td>상품명</td>
                <td><input type='text' placeholder='상품명을 입력하세요.'
                value={name} onChange={(e)=>setName(e.target.value)}/></td>
            </tr>
            <tr>
                <td>가격</td>
                <td><input type='text' placeholder='상품가격을 입력하세요.'
                value={price} onChange={(e)=>setPrice(e.target.value)}/></td>
            </tr>
            <tr>
                <td>상품 이미지</td>
                <td><input type='text' placeholder='상품이미지 URL을 입력하세요.'
                value={url} onChange={(e)=>setUrl(e.target.value)}/></td>
            </tr>
        </table>
        <br/>
        <button onClick={()=>newproductinsert()}>상품 등록</button>

        </>
    )
}

export default Newproduct;