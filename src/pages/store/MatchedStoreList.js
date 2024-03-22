import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function MatchedStoreList(){
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

    useEffect(function(){
        matchedstorelist(params.id);
    }, [params.id]);


    function goToMatchStore(id, name) {
        window.location.href = `/storeproductlist/${id}?name=${name}`;
    }

    return(
        <div align="center">
            <h3>매장 목록</h3><br/>

            <div className="flex flex-col items-center">
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
                        <table key={matchedstore.id} className="items-center w-[1000px] h-[200px] mb-10 rounded-xl border border-spacing-2">
                            <thead>
                                <tr>
                                    <th>매장명</th>
                                    <th>주소</th>
                                    <th>거리</th>
                                    <th>전화번호</th>
                                    <th>24H</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center'>
                                    <td className='font-bold'>{matchedstore.name}</td>
                                    <td>{matchedstore.address}</td>
                                    <td>XXXm</td>
                                    <td>{matchedstore.tel}</td>
                                    <td className='mr-7'>{matchedstore.open_ended === 0 ? 'X' : 'O'}</td>
                                    <td>　<button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                                            focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                                             dark:focus:ring-yellow-900"
                                                             onClick={() => goToMatchStore(matchedstore.id, matchedstore.name)}>
                                          선택
                                          </button>　</td>
                                </tr>
                            </tbody>
                        </table>
                    );
                    }
                    rows.push(
                    <div key={i} className='flex space-x-20'> {/* 열 간의 간격을 추가 */}
                        {row}
                    </div>
                    );
                }
                return rows;
                })()
            )}
            </div>

        </div>
    );
}

export default MatchedStoreList;