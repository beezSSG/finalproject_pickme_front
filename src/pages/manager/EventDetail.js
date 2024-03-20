import { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function EventDetail() {

    let params = useParams();
    let navigate = useNavigate();

    const[event, setEvent] = useState();
    const [loading, setLoading] = useState(false);

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
                                 alert("이벤트 종료되었습니다.");
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



    return(
        <>
        <div>상세보기</div>
        <div>
            <img src={event.detailPhoto}></img>
        </div>
        <br/>
        <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                               focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                             dark:focus:ring-yellow-900" onClick={()=>EventStop()}>
                이벤트 종료</button>
        </>
    );
}

export default EventDetail;