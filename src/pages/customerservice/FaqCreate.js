import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ManagerMain from "../manager/ManagerMain";
import { FaPen } from "react-icons/fa";

function FaqCreate() {

    let navigate = useNavigate();

    const [title, setTtitle] = useState("");
    const [content, setContent] = useState("");


    function faqinsert() {
        if(title === ""){
            alert("제목을 입력해주세요!");
            return;
        }else if(content === ""){
            alert("내용을 입력해주세요!");
            return;
        }
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
            <div className="flex flex-row">
                <ManagerMain height="h-[1100px]" />
                <div className="w-[1000px] flex flex-col items-center mx-auto my-10 shadow-2xl rounded-lg overflow-hidden py-16">
                <div className="font-bold text-3xl flex items-center"><FaPen className="mr-2" />&nbsp;&nbsp;FAQ 생성</div><br/>
                    <div className="mb-6">
                        <label className="block mb-2 text-xl font-bold">제목:</label>
                        <input type="text" 
                            placeholder="제목을 입력하세요." 
                            value={title} 
                            onChange={(e) => setTtitle(e.target.value)} 
                            className="w-[700px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"/>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-xl font-bold">내용:</label>
                        <textarea placeholder="내용을 입력하세요." 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)} 
                                className="w-[700px] h-[400px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"/>
                    </div>
                    <div>
                        <button onClick={() => faqinsert()} className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            등록하기
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default FaqCreate;