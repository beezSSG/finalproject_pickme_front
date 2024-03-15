import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function FaqCreate() {

    let navigate = useNavigate();

    const [title, setTtitle] = useState("");
    const [content, setContent] = useState("");


    function faqinsert() {
        axios.get("http://localhost:8080/api/v1/manager/faqcreate", {params:{"title":title,"content":content}})
                .then(function(resp){
                     console.log(resp.data);
                     if(resp.data === "YES") {
                         alert("등록되었습니다.");
                         navigate("/faq");
                     }
                     else {
                         alert("등록실패");
                         navigate("/faq");
                     }
                })
                .catch(function() {
                     console.log("error");
                })
    }

    return(
        <>
        <div>자주 묻는 질문 생성 창입니다</div>
        <table>
            <tr>
                <td>제목</td>
                <input type="text" placeholder="제목을 입력하세요." value={title} onChange={(e)=>setTtitle(e.target.value)}/>
            </tr>
            <tr>
                <td>내용</td>
                <textarea placeholder="내용을 입력하세요." value={content} onChange={(e)=>setContent(e.target.value)} />
            </tr>
        </table>
        <br/>
        <button onClick={()=>faqinsert()}></button>
        </>
    );
}

export default FaqCreate;