import { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerMain from "../manager/ManagerMain";

function ManagerPurchaseOrder() {
    const [purchaseorderList, setPurchaseorderList] = useState([]);



    const purchaseorderlist = () => {
        axios.get("http://localhost:8080/api/v1/manager/purchaseorderlist")
            .then((resp) => {
                console.log(resp.data);
                    setPurchaseorderList(resp.data);
            })
            .catch(() => {
                console.log("error");
            })
    }

    function pohandleChange(id) {
        axios.get("http://localhost:8080/api/v1/manager/purchaseorderapprove", {params: {"id": id}})
            .then(function(resp){
                console.log(resp.data);
                    setPurchaseorderList(resp.data);
            })
            .catch(function(){
                 console.log("error");
            })
    }

    useEffect(() => {
        purchaseorderlist();
    }, []);

    return (
        <>
        <div className="flex flex-row">
                <ManagerMain />
            <div className="w-[1500px] flex flex-col items-center mx-auto my-10 shadow-2xl rounded-lg overflow-hidden py-16">
            <div className="font-bold text-3xl flex items-center">발주 목록</div><br/>
            <table>
                <colgroup>
                    <col width="50px" /><col width="150px" /><col width="200px" /><col width="200px" /><col width="50px" /><col width="100px" /><col width="150px" /><col width="100px" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품 이미지</th>
                        <th>상품명</th>
                        <th>편의점명</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>발주일자</th>
                        <th>여부</th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseorderList.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={item.productUrl} alt="상품 이미지" style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} /></td>
                            <td className='text-center'>{item.productName}</td>
                            <td className='text-center'>{item.storeName}</td>
                            <td className='text-center'>{item.quantity}</td>
                            <td className='text-center'>{item.price}원</td>
                            <td className='text-center'>{item.wdate}</td>
                            <td className='text-center '><button className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400" onClick={()=>pohandleChange(item.id)}>승인</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </>
    );
}

export default ManagerPurchaseOrder;
