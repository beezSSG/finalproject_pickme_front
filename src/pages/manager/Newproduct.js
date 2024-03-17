import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Newproduct() {

    let navigate = useNavigate();
    
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");


    const onSubmit = (e) => {
        e.preventDefault(); // 이동하지 않도록 하는 함수
    
        // 짐을 싼다
        let formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
    
        // file -> byte
        formData.append("uploadfile",document.frm.uploadfile.files[0]);
    
        // 보내자
        // multipart인 경우에는 두번째 매개변수 보내는 파라미터가 된다
        axios.post("http://localhost:8080/api/v1/product/newproductinsert", formData)
       .then((res) => {
            console.log(res.data);
            navigate("/productlist");
          })
       .catch((err) => {
            console.log(err);
          });
      }
 
    return(
        <>
        <div>신제품 등록 페이지 입니다..</div>
        <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
        <table>
            <tbody>
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
                <td><input type='file' name='uploadfile' /></td>
            </tr>
            </tbody>
        </table>
        <br/>
        <input type="submit" value="상품등록" />
        </form>

        </>
    )
}

export default Newproduct;