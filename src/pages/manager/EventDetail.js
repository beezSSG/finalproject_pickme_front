import { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from '../public/Toast';


function EventDetail() {

    let params = useParams();
    let navigate = useNavigate();

    const[event, setEvent] = useState();
    const [loading, setLoading] = useState(false);

    let adminName = localStorage.getItem("name");

     useEffect(function(){
         getevent(params.id);
     },[]);

     if(loading === false){
         return <div>loading...</div>;
     }

     async function getevent(id) {
         await axios.post("http://localhost:8080/api/v1/manager/eventdetail",null, { params:{"id":id} })
                         .then(function(resp){
                             console.log(resp.data);
                             setEvent(resp.data);

                             setLoading(true);
                         })
                         .catch(function(){
                             console.log("Error");
                         })
                        
     }

     function EventStop() {
        axios.get("http://localhost:8080/api/v1/manager/eventstop", {params:{"id":params.id}})
                        .then(function(resp){
                             console.log(resp.data);
                             if(resp.data === "YES") {
                                Toast.fire({
                                    icon: 'success',
                                    title: '이벤트가 종료되었습니다!',
                                  });
                                 navigate("/event");
                             }
                             else {
                                 alert("이벤트가 종료되지 않았습니다.");
                                 navigate("/event");
                             }
                        })
                        .catch(function(){
                             console.log("Error");
                        })
     }

     function formatDate(dateString) {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${year}.${month}.${day}`;
      }
      
    return(
        <>
        <div className="max-w-[1200px] mx-auto">
            <div className='text-4xl font-bold'>진행중인 이벤트</div>
            <div className="mt-4 text-xl text-gray-500">Pick me 만의 이벤트를 이용해보세요.</div>
            <br/><br/>
            <div className='mb-3 text-xl font-medium flex justify-between'>
                <div>이벤트 제목</div> 
                <div>{formatDate(event.startDate)}~{formatDate(event.endDate)}</div>
            </div>

            <hr className=" border-gray-500" /><br/><br/>
                <div className='flex items-center justify-center'>
                    <img src={event.detailPhoto} alt="Event Detail" className='w-full' />
                </div>
                <br/><br/><br/>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-10 py-4 me-2 mb-2 dark:focus:ring-yellow-900" onClick={()=>navigate("/event")}>
                    목록
                </button>
                <br/><br/><hr className=" border-gray-500" /><br/>
                {adminName === "하기성" && (
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={()=>EventStop()}>
                        이벤트 종료
                    </button>
                )}               
        </div>
        </>
    );
}

export default EventDetail;