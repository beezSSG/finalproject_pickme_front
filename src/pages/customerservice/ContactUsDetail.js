import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function ContactUsDetail() {

    let params = useParams();
    let id =  params.id;
    let managerId = "admin";
    let navigate = useNavigate();

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
    await axios.get("http://localhost:8080/api/v1/manager/ccbcommentwrite", { params:{ "ccbId":id, 'managerId':managerId, 'content':coContent }})
             .then((resp)=>{
                // alert(resp.data);
                setCommentList(resp.data);
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
        <div>1:1문의 상세보기 창입니다.....</div>
        <table>
            <tbody>
            <tr>
                <th>작성자</th>
                <td>{ccbdetailS.customerId}</td>
            </tr>
            <tr>
                <th>작성일</th>
                <td>{ccbdetailS.createAt}</td>
            </tr>
            <tr>
                <th>제목</th>
                <td>{ccbdetailS.title}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td>{ccbdetailS.content}</td>
            </tr>
            </tbody>
        </table>
        <br/><hr/><br/>

        {/* 댓글 나타나는 table */}
        <table>
        <colgroup>
            <col width="500"/><col width="500"/>
        </colgroup>
        {
            commentList &&
            commentList.map(function(list, i){
            return (
            <tbody key={i}>
                <tr>
                    <td>작성자:&nbsp;&nbsp;{list.managerId}</td>
                    <td>작성일:&nbsp;&nbsp;{list.createAt}</td>
                </tr>
                <tr>
                    <td colSpan='2'>{list.content}</td>
                </tr>
                <tr>
                    <td><button onClick={()=>ccbcommentdelete(list.id)}>삭제</button></td>
                </tr>
                <tr>
                    <td colSpan='2'>&nbsp;</td>
                </tr>
            </tbody>
          );
        })
      }  
    </table>
    <br/><hr/><br/>

    {/* 댓글 작성하는 table */}
    <table>
      <tbody>
        <tr>
          <td>댓글작성</td>
          <td>올리기</td>
        </tr>
        <tr>
          <td>
            <textarea rows="3" value={coContent} onChange={(e)=>setCoContent(e.target.value)}></textarea>
          </td>
          <td>
            <button onClick={ccbcommentwrite}>작성완료</button>
          </td>
        </tr>
      </tbody>
    </table>
        </>
    );
}

export default ContactUsDetail;