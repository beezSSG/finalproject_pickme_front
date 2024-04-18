import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TbBuildingStore } from "react-icons/tb"; //    <TbBuildingStore />

const MatchedStoreList = ({ isOpen, closeModal, id }) => {

    const navigate = useNavigate();

    const goToMatchStore = (id, name) => {
        closeModal();
        navigate(`/storeproductlist/${id}/${name}`);
    };

    let params = useParams();

    const [matchedStoreList, setMatchedStoreList] = useState([]);
    const [searchDistance, setSearchDistance] = useState(1);

    async function matchedstorelist(id) {
        await axios.get("store/matchedstorelist", { params: { "id": id } })
            .then(function (resp) {
                console.log(resp.data);
                setMatchedStoreList(resp.data)
            })
            .catch(function (err) {
                alert('matchedstorelist error');
            })
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
        dist = (dist * 1.609344) * 1000;

        dist = Math.round(dist);

        return dist;
    }


    useEffect(function () {
        matchedstorelist(params.id);
        setSearchDistance(1);

    }, [params.id]);

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="relative bg-white p-10 rounded-lg min-w-[350px] max-w-[1000px] lg:max-h-[450px] sm:max-h-[70%] overflow-y-auto">
                        <div className="text-3xl font-bold mb-10">매장 목록</div>

                        {/* 거리 선택 바 */}
                        <div className="flex justify-center items-center mb-5 p-2 rounded-2xl
                                        bg-yellow-50 lg:w-[400px] sm:w-[260px]">
                            <label htmlFor="searchDistance" className="mr-3 font-bold">거리 선택:</label>
                            <input type="range" name="searchDistance" min="1" max="5" step="1" defaultValue={searchDistance} 
                                className="w-48 appearance-none bg-yellow-400 h-1 rounded-lg focus:outline-none focus:bg-yellow-400 focus:ring-2 focus:ring-yellow-200" 
                                onChange={(e) => setSearchDistance(e.target.value)}
                            />
                            <span className="ml-3">{searchDistance}km 이내</span>
                        </div>

                        <div className="modal-body">
                            {matchedStoreList.length > 0 ? (
                                matchedStoreList
                                    .filter(matchedstore => calDistance(matchedstore.lon, matchedstore.lat) <= searchDistance * 1000)
                                    .sort((a, b) => calDistance(a.lon, a.lat) - calDistance(b.lon, b.lat))
                                    .reduce((uniqueStores, matchedstore, index) => {
                                        // Check if matchedstore.id is already added
                                        if (!uniqueStores.some(store => store.id === matchedstore.id)) {
                                            uniqueStores.push(matchedstore);
                                        }
                                        return uniqueStores;
                                    }, [])
                                    .map((matchedstore, index) => (
                                        <div key={matchedstore.id} >
                                            <div className="mb-10 p-4 border border-gray-300 rounded-xl lg:w-[800px] pt-8">
                                                {index === 0 && <p className="text-green-600 font-bold text-lg">가장 가까운 점포!</p>}
                                                <div name="logo" className='border-4 border-yellow-400 bg-pink-100 rounded-full w-fit mb-8'>
                                                    <p className='text-7xl text-gray-800'>
                                                        <TbBuildingStore />
                                                    </p>
                                                </div>
                                                <div name="storeInfo" className="text-left max-w-fit">
                                                    <p><b>매장명: </b>{matchedstore.name}</p>
                                                    <p><b>주소: </b>{matchedstore.address}</p>
                                                    <p><b>거리: </b>{calDistance(matchedstore.lon, matchedstore.lat).toLocaleString()}m</p>
                                                    <p><b>전화번호: </b>{matchedstore.tel}</p>
                                                    <p><b>24H: </b>{matchedstore.open_ended === 0 ? 'O' : 'X'}</p>
                                                </div>
                                                <div name="button">
                                                    <button className="text-gray-800 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-bold rounded-lg text-sm px-8 py-3 m-4 focus:outline-none min-w-[92px]"
                                                        onClick={() => goToMatchStore(matchedstore.id, encodeURIComponent(matchedstore.name))}>
                                                        바로가기
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="text-center min-h-[150px] flex justify-center items-center">
                                    <p className="text-xl mb-6 text-gray-400">조건을 만족하는 점포가 없어요 😓</p>
                                </div>
                            )}
                        </div>

                        <span className="absolute top-0 right-[10px]  cursor-pointer text-3xl text-yellow-400" onClick={closeModal}> &times; </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchedStoreList;