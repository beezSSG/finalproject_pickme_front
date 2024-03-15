import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // location.href
import axios from 'axios';
import { react } from '@babel/types';
import { Checkbox } from '@mui/material';

const Powrite = () => {
    const [product, setProduct] = react.useState(""); // 


    const PowriteAf = () => {
        axios.post("http://localhost:8081/powrite", 
                    {params:{  }})
             .then((resp)=>{
                if(resp.data.id !== undefined &&  resp.data.id !== ""){
                    alert('발주가 성공적으로 이루어졌습니다');
                    // 여기서 JWT token을 받는다
                    localStorage.setItem("login", JSON.stringify(resp.data));
                    // (그전의 페이지로)이동
                    let before = localStorage.getItem("before");
                }else{
                    alert("id 나 password를 확인하십시오");
                }
             })
             .catch((err)=>{
                alert('error');
             })
    }

    return(
        <div>
            <h1>신청가능 품목</h1>

            <Checkbox value={product} onChange={setProduct}>
                <Checkbox value=""></Checkbox>
                <Checkbox value=""></Checkbox>
                <Checkbox value=""></Checkbox>
                <Checkbox value=""></Checkbox>
            </Checkbox>
        </div>
    );
}

export default Powrite;