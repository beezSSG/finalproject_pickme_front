import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MatchedStoreList = ({ isOpen, closeModal, id }) => {
    const navigate = useNavigate();

    const goToMatchStore = (id, name) => {
        closeModal();
        navigate(`/storeproductlist/${id}/${name}`);
    };

    let params = useParams();

    const [matchedStoreList, setMatchedStoreList] = useState([]);

    async function matchedstorelist(id) {
        await axios.get("store/matchedstorelist", { params: { "id": id } })
            .then(function (resp) {
                console.log(resp.data);
                setMatchedStoreList(resp.data)
            })
            .catch(function (err) {
                alert('error');
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
    }, [params.id]);

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="relative bg-white p-10 rounded-lg w-[80%] h-[60%] overflow-y-auto">
                        <div className="text-3xl font-bold mb-10">매장 목록</div>
                        <div className="modal-body">
                            {matchedStoreList.length > 0 ? (
                                matchedStoreList.map(matchedstore => (
                                    <div key={matchedstore.id} className="mb-10">
                                        <table className="w-full border border-gray-300 rounded-xl">
                                            <colgroup>
                                                <col width="250px" /><col width="250px" /><col width="70px" /><col width="150px" /><col width="70px" /><col width="100px" />
                                            </colgroup>
                                            <thead className="bg-gray-200">
                                                <tr>
                                                    <th className="p-5">매장명</th>
                                                    <th>주소</th>
                                                    <th>거리</th>
                                                    <th>전화번호</th>
                                                    <th>24H</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='text-center'>
                                                    <td className='font-bold p-3'>{matchedstore.name}</td>
                                                    <td>{matchedstore.address}</td>
                                                    <td>{calDistance(matchedstore.lon, matchedstore.lat)}m</td>
                                                    <td>{matchedstore.tel}</td>
                                                    <td className='mr-7'>{matchedstore.open_ended === 0 ? 'X' : 'O'}</td>
                                                    <td className='py-3'>
                                                        <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-8 py-3 m-4 focus:outline-none"
                                                            onClick={() => goToMatchStore(matchedstore.id, encodeURIComponent(matchedstore.name))}
                                                        >
                                                            선택
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center">
                                    <br/><br/><br/><br/><br/><br/>
                                    <p className="text-xl mb-6 text-gray-400">조건을 만족하는 점포가 없습니다.</p>
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