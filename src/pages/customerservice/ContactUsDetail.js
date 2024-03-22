import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function ContactUsDetail() {

    let params = useParams();
    let id =  params.id;
    let managerId = "admin";
    let navigate = useNavigate();

    let adminName = localStorage.getItem('name');

    const [ccbdetailS, setCcbdetails] = useState([]);
    const [loading, setLoading] = useState(false);

    // 댓글 관리용 변수들
    const [commentList, setCommentList] = useState([]);
    const [coContent, setCoContent] = useState("");

    // 작성된 댓글 불러오기 axios
    const ccbcommentlist = async () => {
        await axios.get("http://localhost:8080/api/v1/manager/ccbcommentlist", { params: { "ccbId": id } })
            .then((resp) => {
                console.log(resp.data);
                setCommentList(resp.data);
            })
            .catch(() => {
                alert('error');
            })
    };

    // 댓글 작성 axios
    const ccbcommentwrite = async () => {
        if(coContent === "") {
            alert("내용을 입력하세요!!");
            return;
        }
    await axios.get("http://localhost:8080/api/v1/manager/ccbcommentwrite", { params:{ "ccbId":id, 'managerId':managerId, 'content':coContent }})
             .then((resp)=>{
                // alert(resp.data);
                setCommentList(resp.data);
                setCoContent("");
            })
            .catch(()=>{
                alert('error');
            })
    };

    // 댓글 삭제 axios
    const ccbcommentdelete = async (ccbaid) => {
        await axios.get("http://localhost:8080/api/v1/manager/ccbcommentdelete", { params:{"ccbId":id,"id":ccbaid}})
                .then((resp)=>{
                    console.log(resp.data);   
                    setCommentList(resp.data);
                })
                .catch(()=>{
                    alert('error');
                })
    };

    useEffect(function(){
        ccbdetail(id);
        ccbcommentlist(id);
    },[id]);

    if (loading === false) {
        return <div>loading...</div>;
    }

    async function ccbdetail() {
        await axios.get("http://localhost:8080/api/v1/manager/ccbdetail", { params:{"id":id} })
            .then(function(resp){
                console.log(resp.data);
                setCcbdetails(resp.data);
                setLoading(true);
            })
            .catch(function(){
                console.log("Error");
            });
    }

    return(
    <>
        <div className='text-center font-bold text-[40px]'>글 상세보기</div>
        <div className='flex justify-center'>
            <table className="mt-8 w-1/2 border border-spacing-2">
                <tbody>
                    <tr className='border-b'>
                        <th className="py-2 bg-gray-500 text-center text-white">작성자</th>
                        <td className="px-4 py-2">{ccbdetailS.customerId}</td>
                        <th className="py-2 bg-gray-500 text-center text-white">분류</th>
                        <td className="px-4 py-2">{ccbdetailS.category}</td>
                    </tr>
                    <tr className='border-b'>
                        <th className="py-2 bg-gray-500 text-center text-white">제목</th>
                        <td className="px-4 py-2">{ccbdetailS.title}</td>
                        <th className="py-2 bg-gray-500 text-center text-white">작성일</th>
                        <td className="px-4 py-2">{ccbdetailS.createAt}</td>    
                    </tr>
                    <tr className='border-b'> 
                        <th className="py-[250px] bg-gray-500 text-center text-white">내용</th>
                        <td colSpan={3} className="px-4 py-[250px]">
                           {ccbdetailS.content}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br/><br/>

        {/* 댓글 나타나는 table */}
        <div className='flex justify-center'>
            <div className='w-1/2 border border-spacing-2'>
                {
                    commentList &&
                    commentList.map(function(list, i){
                        return (
                            <div key={i} className='border-b'>
                                <div key={i} className='border-b flex justify-between'>
                                    <div className='py-3 pl-7'>작성자:&nbsp;&nbsp;{list.managerId}</div>
                                    <div className='py-3 pr-7'>작성일:&nbsp;&nbsp;{list.createAt}</div>
                                </div>
                                <div key={i} className='border-b flex justify-between'>
                                <div className='py-3 pl-7'>{list.content}</div>
                                <div className='py-3 pr-7'>
                                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    onClick={()=>ccbcommentdelete(list.id)}>삭제</button>
                                </div>
                                </div>
                            </div>
                        );
                    })
                }  
            </div>
        </div> <br/><br/><br/>


        {/* 댓글 작성하는 table -> 하기성(관리자)일때만 뜨게 해뒀음 */}
        {adminName === "하기성" && (
            <div className='flex justify-center'>
                <div className='w-1/2'>
                    <div className="mb-6">
                        <label className="block mb-2 text-xl font-bold">1:1문의 답변:</label>
                        <textarea placeholder="내용을 입력하세요." 
                                value={coContent}
                                onChange={(e) => setCoContent(e.target.value)} 
                                className="w-full h-[200px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"/>
                    </div>
                    <div className='text-center'>
                        <div>
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                            onClick={ccbcommentwrite}>작성완료</button>
                        </div>
                    </div>
                </div>
            </div>
)}


    </>
    );
}

export default ContactUsDetail;