import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewproductInsert() {

    let navigate = useNavigate();
    
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault(); // 이동하지 않도록 하는 함수
    
        // 짐을 싼다
        let formData = new FormData();
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("uploadfile1", file1);
        formData.append("uploadfile2", file2);
    
        // 보내자
        // multipart인 경우에는 두번째 매개변수 보내는 파라미터가 된다
        axios.post("http://localhost:8080/api/v1/manager/eventcreate", formData)
       .then((res) => {
            console.log(res.data);
            if(res.data === "YES") {
                alert("이벤트 생성이 성공적으로 완료되었습니다.");
                navigate("/event");
            }
            else {
                alert("실패하였습니다.");
                navigate("/event");
            }           
          })
       .catch((err) => {
            console.log(err);
          });
      }

    const handleFile1Change = (e) => {
        setFile1(e.target.files[0]);
    }

    const handleFile2Change = (e) => {
        setFile2(e.target.files[0]);
    }
 
    return(
        <>
        <h1>이벤트 등록 페이지 입니다...</h1>
        <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
        <table>
            <tbody>
            <tr>
                <td>시작날짜</td>
                <td><input type='text' placeholder='시작날짜를 입력하세요.'
                value={startDate} onChange={(e)=>setStartDate(e.target.value)}/></td>
            </tr>
            <tr>
                <td>종료날짜</td>
                <td><input type='text' placeholder='종료날짜를 입력하세요.'
                value={endDate} onChange={(e)=>setEndDate(e.target.value)}/></td>
            </tr>
            <tr>
                <td>배너사진</td>
                <td><input type='file' name='uploadfile1' onChange={handleFile1Change} /></td>
            </tr>
            <tr>
                <td>상세사진</td>
                <td><input type='file' name='uploadfile2' onChange={handleFile2Change} /></td>
            </tr>
            </tbody>
        </table>
        <br/>
        <input type="submit" value="이벤트 등록등록" />
        </form>

        </>
    )
}

export default NewproductInsert;
