import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManagerMain from "./ManagerMain";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

function NewproductInsert() {

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
         <div className="flex flex-row">
                <ManagerMain />
                <div className="w-[850px] h-[700px] flex flex-col items-center mx-auto shadow-2xl rounded-lg overflow-hidden my-28">
                <div className="font-bold text-3xl flex items-center mt-8"><MdOutlineProductionQuantityLimits className="mr-1" />&nbsp;&nbsp;신제품 등록</div>
                    <div className='h-[500px] mt-10'>
                        <div className='h-[500px]'>
                            <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
                                    <div className="mb-6">
                                        <label className="block mb-2 text-xl font-bold">상품 명:</label>
                                        <input type='text'
                                            placeholder="상품 명을 입력하세요." 
                                            value={name} 
                                            onChange={(e)=>setName(e.target.value)}
                                            className='p-3 border border-gray-300 rounded-xl w-[620px]  focus:outline-none focus:ring-2 focus:ring-yellow-400'/>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-xl font-bold">상품 가격:</label>
                                        <input type='text'
                                            placeholder="상품 가격을 입력하세요." 
                                            value={price} 
                                            onChange={(e)=>setPrice(e.target.value)}
                                            className='p-3 border border-gray-300 rounded-xl w-[620px] focus:outline-none focus:ring-2 focus:ring-yellow-400'/>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-xl font-bold">상품 이미지:</label>
                                        <input type='file' 
                                            name='uploadfile' 
                                            className='cursor-pointer
                                            file:bg-[#ffc300]
                                            file:px-3 file:py-2 file:m-1
                                            file:border-none
                                            file:rounded-xl
                                            bg-gradient-to-br from-gray-400 to-gray-400
                                            text-white/80
                                            rounded-xl
                                            w-[625px]
                                            ' />
                                    </div>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <div className="flex flex-col items-center">
                        <button type="submit" 
                            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            style={{ backgroundColor: "#ffc300" }}>
                            상품 등록
                        </button>
                    </div>
                </div>
        </div>

        </>
    )
}

export default NewproductInsert;