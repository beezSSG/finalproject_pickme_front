import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContactUsWrite() {

    let navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    function addCcbList() {
        axios.post("http://localhost:8080/api/v1/mypage/addCcbList",null,{params:{"category":category,"customerId":customerId,"title":title,"content":content}})
                    .then(function(resp){
                        alert("성공적으로 문의 작성 완료!");
                        navigate("/contactus");
                    })
                    .catch(function(){
                        alert("문의 작성 실패!");
                    })
    }

    return(
        <>
            <div>문의 작성 페이지 입니다!!!</div>
            <table>
                <tr>
                    <th>분류</th>
                    <td>
                        <select value={category} onChange={handleCategoryChange}>
                            <option value="">전체</option>
                            <option value="문의">문의</option>
                            <option value="칭찬">칭찬</option>
                            <option value="불만">불만</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>아이디</th>
                    <td>
                        <input type="text" value={customerId} onChange={(e)=>setCustomerId(e.target.value)} placeholder="아이디를 입력하세요."/>
                    </td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>
                        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="제목을 입력하세요."/>
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td><textarea rows={15} cols={50} value={content} onChange={(e)=>setContent(e.target.value)} placeholder="내용을 입력하세요."/></td>
                </tr>
            </table>
            <button onClick={()=>addCcbList()}>작성완료</button>
        </>
    )
}

export default ContactUsWrite;