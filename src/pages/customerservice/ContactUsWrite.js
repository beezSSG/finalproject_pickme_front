import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../public/Toast";

function ContactUsWrite() {

    let adminEmail = localStorage.getItem("email");
    let navigate = useNavigate();
   
    useEffect(() => {
        if(adminEmail===null){
            Toast.fire({
                icon: 'error',
                title: "로그인 해주세요!!",
              });
            navigate("/contactus");
        }
    });

    

    const [category, setCategory] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    function addCcbList() {
        if(category === "") {
            Toast.fire({
                icon: 'error',
                title: '카테고리를  선택해주세요!',
              });
            return ;
        }else if(title === "") {
            Toast.fire({
                icon: 'error',
                title: '제목을 입력해주세요!',
              });
            return ;
        }else if(content === "") {
            Toast.fire({
                icon: 'error',
                title: '내용을 입력해주세요!',
              });
            return ;
        }
        axios.post("http://localhost:8080/api/v1/mypage/addCcbList",null,{params:{"category":category,"customerId":adminEmail,"title":title,"content":content}})
                    .then(function(resp){
                        Toast.fire({
                            icon: 'success',
                            title: '성공적으로 작성되었습니다!!',
                          });
                        navigate("/contactus");
                    })
                    .catch(function(){
                        alert("문의 작성 실패!");
                    })
    }

    return(
        <>
            <div className="max-w-[1200px] mx-auto">
                <div className='text-4xl font-bold mt-[70px]'>1:1 문의하기</div><br/>
                <hr className=" border-gray-500" /><br/><br/>
                <div>
                    <label htmlFor="category" className="font-bold text-2xl mr-10">문의유형 :</label>
                    <select className="border-2 border-gray-400 p-3 w-[500px] cursor-pointer focus:outline-none focus:border-yellow-400" id="category" value={category} onChange={handleCategoryChange}>
                        <option value="">전체</option>
                        <option value="문의">문의</option>
                        <option value="칭찬">칭찬</option>
                        <option value="불만">불만</option>
                    </select>
                </div> <br/>             
                <div>
                    <label htmlFor="customerId" className="font-bold text-2xl mr-10">아이디 :</label>
                    <input
                        type="text"
                        id="customerId"
                        value={adminEmail}
                        readOnly
                        className="border-2 border-gray-400 p-3 w-[500px] cursor-pointer ml-6 focus:outline-none focus:border-yellow-400"
                    />
                </div><br/>
                <div>
                    <label htmlFor="title" className="font-bold text-2xl mr-10">제목 :</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요."
                        className="border-2 border-gray-400 p-3 w-[500px] cursor-pointer ml-12 focus:outline-none focus:border-yellow-400"
                    />
                </div><br/>
                <div className="flex flex-col">
                    <label htmlFor="content" className="font-bold text-2xl mr-10 mb-3">내용 :</label>
                    <textarea
                        id="content"
                        rows={15}
                        cols={50}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요."
                        className="resize-none border-2 border-gray-400 p-3 focus:outline-none focus:border-yellow-400"
                    />
                </div>
                <div className="text-center my-[70px]">
                    <button onClick={()=>addCcbList()
                    } className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                    focus:ring-4 focus:ring-yellow-300 font-medium text-lg px-[15px] py-3 me-2 mb-2 w-[300px]
                    dark:focus:ring-yellow-900">작성완료</button>
                </div>
            </div>

            
        </>
    )
}

export default ContactUsWrite;