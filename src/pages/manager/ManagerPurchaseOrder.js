import { useEffect, useState } from 'react';
import axios from 'axios';
import ManagerMain from "../manager/ManagerMain";
import Pagination from 'react-js-pagination'; // npm i react-js-pagination
import { IoReceiptOutline } from "react-icons/io5";

function ManagerPurchaseOrder() {
    const [purchaseorderList, setPurchaseorderList] = useState([]);
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // 페이징
    const [page, setPage] = useState(1); 
    const [totalCnt, setTotalCnt] = useState(0);

    function purchaseorderlist(storeName, startDate, endDate,page) {
        axios.get("http://localhost:8080/api/v1/manager/purchaseorderlist", {params: {"storeName": storeName, "startDate": startDate, "endDate": endDate, "pageNumber":page}})
            .then((resp) => {
                console.log(resp.data);
                setPurchaseorderList(resp.data.purchaseorderList);
                setTotalCnt(resp.data.cnt); // 글의 총수
            })
            .catch(() => {
                console.log("error");
            })
    }

    function pohandleChange(id) {
        axios.get("http://localhost:8080/api/v1/manager/purchaseorderapprove", {params: {"id": id, "storeName": category}})
            .then(function(resp){
                console.log(resp.data);
                setPurchaseorderList(resp.data.purchaseorderList);
                setTotalCnt(resp.data.cnt); // 글의 총수
            })
            .catch(function(){
                console.log("error");
            })
    }

    function handleCategoryClick() {
        purchaseorderlist(category, startDate, endDate);
    }

    function handlePageChange(page){
        setPage(page);
        purchaseorderlist(category, startDate,endDate, page-1);
    }

    useEffect(() => {
        purchaseorderlist("", "", "",0);
    }, []);

    return (
        <>
        <div className="flex flex-row">
                <ManagerMain height="h-[1500px]" />
            <div className="w-[1500px] flex flex-col items-center mx-auto my-10 shadow-2xl rounded-lg overflow-hidden py-16">
            <div className="font-bold text-3xl flex items-center"><IoReceiptOutline className='mr-4' />발주 목록</div><br/>
            <div className='text-center mb-14'>
                <input type='text' placeholder='편의점명을 검색하세요.' value={category} onChange={(e)=>setCategory(e.target.value)}
                className='rounded-2xl p-5 w-[500px] shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400'/>&nbsp;&nbsp;&nbsp;
                <input type='date' placeholder='시작일' value={startDate} onChange={(e)=>setStartDate(e.target.value)}
                className='rounded-2xl p-5 w-[200px] shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400'/>&nbsp;&nbsp;&nbsp;
                <input type='date' placeholder='종료일' value={endDate} onChange={(e)=>setEndDate(e.target.value)}
                className='rounded-2xl p-5 w-[200px] shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400'/>&nbsp;&nbsp;&nbsp;
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-[40px] py-5 me-2 mb-2
                                dark:focus:ring-yellow-900" onClick={handleCategoryClick}>검색</button>
            </div>
            <table>
                <colgroup>
                    <col width="50px" /><col width="400px" /><col width="250px" /><col width="100px" /><col width="140px" /><col width="300px" /><col width="200px" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
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
                        <tr key={index} className="text-center border-b hover:bg-gray-200 cursor-pointer">
                            <th>{index + 1}</th>
                            <td className='text-center py-4'>{item.productName}</td>
                            <td className='text-center py-4'>{item.storeName}</td>
                            <td className='text-center py-4'>{item.quantity}</td>
                            <td className='text-center py-4'>{item.price.toLocaleString()}원</td>
                            <td className='text-center py-4'>{item.wdate}</td>
                            <td className='text-center py-4'><button className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400" onClick={()=>pohandleChange(item.id)}>승인</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/><br/><br/><br/><br/>
        <Pagination
        itemClass='page-item'
        linkClass='page-link' 
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={10}
        prevPageText={"prev"}
        nextPageText={"next"}
        onChange={handlePageChange} />
            </div>
        </div>
        </>
    );
}

export default ManagerPurchaseOrder;

