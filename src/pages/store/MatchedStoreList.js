import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Modal.css";

const MatchedStoreList = ({ isOpen, closeModal, id }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    
    const goToMatchStore = (id, name) => {
      closeModal();
      navigate(`/storeproductlist/${id}?name=${name}`); // 해당 아이템의 name 값을 이용하여 페이지 이동
    };

    let params = useParams();

    const [matchedStoreList, setMatchedStoreList] = useState([]);

    async function matchedstorelist(id){
        await axios.get("http://localhost:8080/api/v1/store/matchedstorelist", {params:{ "id":id }})
             .then(function(resp){  // success:function
                console.log(resp.data);
                setMatchedStoreList(resp.data)
             })
             .catch(function(err){     // error:function
                alert('error');
             })
    }
    
    function deg2rad(deg){
        return deg * Math.PI / 180.0;
    }

    function rad2deg(rad){
        return rad *180 / Math.PI;
    }

    function calDistance(lon, lat) {
        const mylon = 129.1324683;
        const mylat = 35.16591583;

        const radlat1 = (Math.PI * mylat) / 180;
        const radlat2 = (Math.PI * lat) / 180;
        const theta = mylon - lon;
        const radtheta = (Math.PI * theta) / 180;

        let dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = (dist * 1.609344)*1000;
        
        // 반올림하여 소숫점 제거
        dist = Math.round(dist);

        return dist;
    }

    useEffect(function(){
        matchedstorelist(params.id);
    }, [params.id]);


    return (
        <div>
          {isOpen && (
            <div className="modal-container">
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-content">
            <div className="modal-header">
                <br/><h3>매장 목록</h3>
            </div>
                <div className="modal-body">
                {matchedStoreList.length > 0 && (
                    // Use a for loop to create table rows
                    (() => {
                    const rows = [];
                    const columns = 1; // Number of columns
                    for (let i = 0; i < matchedStoreList.length; i += columns) {
                        const row = [];
                        for (let j = i; j < i + columns && j < matchedStoreList.length; j++) {
                        const matchedstore = matchedStoreList[j];
                        row.push(
                            <table key={matchedstore.id} className="items-center w-[1000px] h-[200px] mb-10 p-10 rounded-xl border border-spacing-2">
                                <colgroup>
                                    <col className="w-1/6" /> {/* 매장명 */}
                                    <col className="w-2/6" /> {/* 주소 */}
                                    <col className="w-1/6" /> {/* 거리 */}
                                    <col className="w-1/6" /> {/* 전화번호 */}
                                    <col className="w-1/6" /> {/* 24H */}
                                    <col className="w-1/6" /> {/* 버튼 */}
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="p-5">매장명</th>
                                        <th>주소</th>
                                        <th>거리</th>
                                        <th>전화번호</th>
                                        <th>24H</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='text-center'>
                                        <td className='font-bold p-3'>{matchedstore.name}</td>
                                        <td>{matchedstore.address}</td>
                                        <td>{calDistance(matchedstore.lon, matchedstore.lat)}m</td>
                                        <td>{matchedstore.tel}</td>
                                        <td className='mr-7'>{matchedstore.open_ended === 0 ? 'X' : 'O'}</td>
                                        <td><button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                                                focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-8 py-1 m-4
                                                                 dark:focus:ring-yellow-900 text-center"
                                                                 onClick={() => goToMatchStore(matchedstore.id, matchedstore.name)}>
                                              선택
                                              </button></td>
                                    </tr>
                                </tbody>
                            </table>
                        );
                        }
                        rows.push(
                        <div key={i} className='modal-element'> {/* 열 간의 간격을 추가 */}
                            {row}
                        </div>
                        );
                    }
                    return rows;
                    })()
                )}
                </div>
                <span className="close-btn" onClick={closeModal}> &times; </span>
              </div>
            </div>
          )}
        </div>
      );
    };

export default MatchedStoreList;