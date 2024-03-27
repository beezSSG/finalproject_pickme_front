import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManagerMain from "./ManagerMain";
import { PiConfettiBold } from "react-icons/pi";
import Toast from '../public/Toast';


function EventCreate() {
    let navigate = useNavigate();
    
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [uploadedFile1Name, setUploadedFile1Name] = useState('');
    const [uploadedFile2Name, setUploadedFile2Name] = useState('');
    const [upload1Success, setUpload1Success] = useState(false);
    const [upload2Success, setUpload2Success] = useState(false);

    const onSubmit = (e) => {

        e.preventDefault(); // 이동하지 않도록 하는 함수
        if(startDate === "" || startTime === ""){
            Toast.fire({
                icon: 'error',
                title: '시작일자를 입력해주세요!',
              });
              return;
        }else if(endDate === "" || endTime === "") {
            Toast.fire({
                icon: 'error',
                title: '종료일자를 입력해주세요!',
              });
              return;
        }else if(file1 === null || file2 === null) {
            Toast.fire({
                icon: 'error',
                title: '사진을 모두 업로드해주세요!',
              });
              return;
        }
        
        // 시작 시간과 종료 시간을 합치기
        const startDateTime = startDate.replace(/-/g, '') + startTime.replace(/:/g, '');
        const endDateTime = endDate.replace(/-/g, '') + endTime.replace(/:/g, '');

        // 짐을 싼다
        let formData = new FormData();
        formData.append("startDate", startDateTime);
        formData.append("endDate", endDateTime);
        formData.append("uploadfile1", file1);
        formData.append("uploadfile2", file2);

        // 보내자
        // multipart인 경우에는 두번째 매개변수 보내는 파라미터가 된다
        axios.post("http://localhost:8080/api/v1/manager/eventcreate", formData)
            .then((res) => {
                console.log(res.data);
                if (res.data === "YES") {
                    Toast.fire({
                        icon: 'success',
                        title: "이벤트 생성이 성공적으로 완료되었습니다.",
                      });
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
         <div className="flex flex-row">
            <ManagerMain height="h-[1000px]" />
            <div className="max-w-[1000px] mx-auto">
            <div className="font-bold text-3xl flex items-center my-8"><PiConfettiBold className="mr-2" />&nbsp;&nbsp;이벤트 생성</div>
                <div className='h-[500px]'>
                    <div className='h-[500px]'>
                        <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
                                <div className="mb-6">
                                    <label className="block mb-2 text-xl font-bold">시작일자:</label>
                                    <input type='date' 
                                        value={startDate} 
                                        onChange={(e)=>setStartDate(e.target.value)}
                                        className='p-3 border border-gray-300 rounded-xl w-[300px] focus:outline-none focus:ring-2 focus:ring-yellow-400'/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type='time' 
                                        value={startTime} 
                                        onChange={(e)=>setStartTime(e.target.value)}
                                        className='p-3 border border-gray-300 rounded-xl w-[300px] focus:outline-none focus:ring-2 focus:ring-yellow-400'/>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-xl font-bold">종료일자:</label>
                                    <input type='date' 
                                        value={endDate} 
                                        onChange={(e)=>setEndDate(e.target.value)}
                                        className='p-3 border border-gray-300 rounded-xl w-[300px] focus:outline-none focus:ring-2 focus:ring-yellow-400'/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type='time' 
                                        value={endTime} 
                                        onChange={(e)=>setEndTime(e.target.value)}
                                        className='p-3 border border-gray-300 rounded-xl w-[300px] focus:outline-none focus:ring-2 focus:ring-yellow-400'/>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-xl font-bold">배너사진:</label>
                                    <input type='file' 
                                        name='uploadfile1' 
                                        onChange={handleFile1Change}
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
                                <div className="mb-6">
                                    <label className="block mb-2 text-xl font-bold">상세사진:</label>
                                    <input type='file' 
                                        name='uploadfile2' 
                                        onChange={handleFile2Change}
                                        className='cursor-pointer
                                        file:bg-[#ffc300]
                                        file:px-3 file:py-2 file:m-1
                                        file:border-none
                                        file:rounded-xl
                                        bg-gradient-to-br from-gray-400 to-gray-400
                                        text-white/80
                                        rounded-xl
                                        w-[625px]' />
                                </div>
                                <div className="flex flex-col items-center">
                                    <br/><br/>
                                    <button type="submit"
                                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                        focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-[15px] py-3 me-2 mb-2
                                        dark:focus:ring-yellow-900"
                                        >
                                        이벤트 등록
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default EventCreate;

