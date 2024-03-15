import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EventCreate() {

    let naviagte = useNavigate();

    const [bannerPhoto, setBannerPhoto] = useState("");
    const [detailPhoto, setDetailPhoto] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    function eventinsert(id) {
        axios.post("http://localhost:8080/api/v1/manager/eventcreate",null, 
                        { params:{"bannerPhoto":bannerPhoto,
                                  "detailPhoto":detailPhoto,
                                  "startDate":startDate,
                                  "endDate":endDate} })
                        .then(function(resp){
                            console.log(resp.data);
                            if(resp.data === "YES") {
                                alert('이벤트가 성공적으로 생성되었습니다');
                                naviagte('/event');
                            }
                            else {
                                alert('이벤트 생성에 실패하였습니다');
                                naviagte('/event');
                            }
                        })
                        .catch(function(){
                            console.log("Error");
                        })
                       
    }

    return(
        <>
        <div>이벤트 생성</div>
        <table>
            <tbody>
            <tr>
                <td>배너사진</td>
                <td><input type='text' placeholder='배너사진 URL 입력' value={bannerPhoto} onChange={(e)=>setBannerPhoto(e.target.value)}></input></td>
            </tr>
            <tr>
                <td>상세사진</td>
                <td><input type='text' placeholder='상세사진 URL 입력' value={detailPhoto} onChange={(e)=>setDetailPhoto(e.target.value)}></input></td>
            </tr>
            <tr>
                <td>시작일자</td>
                <td><input type='text' placeholder='시작일자 입력' value={startDate} onChange={(e)=>setStartDate(e.target.value)}></input></td>
            </tr>
            <tr>
                <td>종료일자</td>
                <td><input type='text' placeholder='종료일자 입력 'value={endDate} onChange={(e)=>setEndDate(e.target.value)}></input></td>
            </tr>
            </tbody>
        </table> <br/>
        <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                               focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                             dark:focus:ring-yellow-900" onClick={()=>eventinsert()}>
                생성하기</button>
        </>
    )
}

export default EventCreate;