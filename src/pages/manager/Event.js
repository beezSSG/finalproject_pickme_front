import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Event() {

    const navigate = useNavigate();
    // 이벤트 목록을 담을 상태 변수
    const [eventlist, setEventlist] = useState([]);
    // 현재 표시할 이벤트 유형 (0: 진행 중인 이벤트, 1: 종료된 이벤트)
    const [eventType, setEventType] = useState(0);

    // 컴포넌트가 마운트되었을 때 이벤트 목록을 가져오는 함수 호출
    useEffect(() => {
        eventlistup();
    }, []);

    // 이벤트 목록을 서버에서 가져오는 함수
    const eventlistup = () => {
        axios.get("http://localhost:8080/api/v1/manager/eventlist")
            .then(function(resp) {
                console.log(resp.data);
                setEventlist(resp.data);
            })
            .catch(function(error) {
                console.log("Error:", error);
            });
    }

    function EventCreate(){
        navigate('/eventcreate');
    }

    // 진행 중인 이벤트만 보여주는 함수
    const showOngoingEvents = () => {
        setEventType(0);
    }

    // 종료된 이벤트만 보여주는 함수
    const showFinishedEvents = () => {
        setEventType(1);
    }

    return (
        <div>
            {/* 이벤트 목록을 화면에 출력 */}
            <h2>이벤트 목록</h2>
            <button onClick={showOngoingEvents}
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
            focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
          dark:focus:ring-yellow-900">진행중인 이벤트</button>
            <button onClick={showFinishedEvents}
            className="focus:outline-none text-yellow-400 bg-black hover:bg-gray-800
            focus:ring-4 focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
          dark:focus:ring-gray-900">종료된 이벤트</button>
            {eventlist.map(event => {
                if ((eventType === 0 && event.promotionYn === 0) || (eventType === 1 && event.promotionYn === 1)) {
                    return (
                        <div key={event.id}>
                            <div>ID: {event.id}</div>
                            <Link to={`/eventdetail/${event.id}`}>
                                Banner Photo: <img src={event.bannerPhoto} />
                            </Link>
                            <div>Start Date: {event.startDate}</div>
                            <div>End Date: {event.endDate}</div>
                        </div>
                    );
                }
            })}
            <br/>
            <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                               focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                             dark:focus:ring-yellow-900" onClick={EventCreate}>
                이벤트 생성</button>
        </div>
    );
}

export default Event;


