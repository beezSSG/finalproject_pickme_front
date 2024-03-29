import axios from "axios";
import { useState } from "react";
import Antdmodal from "./Antdmodal";

function Post() {
    const [address, setAddress] = useState({});
    const [toUser, setToUser] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [zonecode, setZonecode] = useState("");
    const [roadAddress, setRoadAddress] = useState("");

    function OnSetAddress(data) {
        setAddress(data);
        // 받아온 address 데이터에서 zonecode와 address를 추출하여 각각의 상태로 설정
        setZonecode(data.zonecode || "");
        setRoadAddress(data.address || "");
    }

    function postreservation() {
        const toAddress = `${zonecode} ${roadAddress}`;
        axios.post("http://localhost:8080/api/v1/customer/postreservation", null, {
            params: { "toAddress": toAddress },
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
        })
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function () {
            console.log("error");
        });
    }

    return (
        <>
            <div className="max-w-[1200px] mx-auto">
                <div className='text-4xl font-bold mt-[70px]'>택배 예약 신청</div><br />
                <hr className="border-gray-500" /><br /><br />
                <div>
                    <div>
                        <label htmlFor="toUser" className="font-bold text-2xl mr-6 ml-7">받는분 :</label>
                        <input
                            type="text"
                            id="toUser"
                            className="rounded-xl border-2 border-gray-400 p-3 w-[300px] cursor-pointer ml-8 focus:outline-none focus:border-yellow-400"
                            value={toUser}
                            onChange={(e)=>setToUser(e.target.value)}
                        />
                    </div><br />
                    <div>
                        <label className="font-bold text-2xl ml-[52px]">주소 :</label>
                        <input
                            type="text"
                            className="rounded-xl border-2 border-gray-400 p-3 w-[300px] cursor-pointer ml-14 mb-3 focus:outline-none focus:border-yellow-400"
                            value={zonecode} 
                            onChange={(e) => setZonecode(e.target.value)}
                            readOnly
                        /><br/>
                        <input
                            type="text"
                            className="rounded-xl border-2 border-gray-400 p-3 w-[300px] cursor-pointer ml-[168px] mr-4 focus:outline-none focus:border-yellow-400"
                            value={roadAddress} 
                            onChange={(e) => setRoadAddress(e.target.value)}
                            readOnly
                        />
                        <Antdmodal updateAddress={OnSetAddress} />
                    </div><br />
                    <div className="flex">
                        <span className="font-bold text-2xl mr-[50px] text-center pt-1">물품 가격 :</span>
                        <div className="flex space-x-[74px] rounded-xl border-2 border-gray-400 p-3 w-[300px] cursor-pointer  focus:outline-none focus:border-yellow-400">
                        <input
                            type="text"      
                            value={itemPrice}
                            onChange={(e)=>setItemPrice(e.target.value)}
                            placeholder="물품가격"
                            className="focus:outline-none focus:border-non"
                        />
                        <span className="font-bold">원</span>
                        </div>                                                                                                                                   
                    </div><br />




                    <div><button onClick={postreservation}>버튼</button></div>
                </div>
            </div>
        </>
    );
}

export default Post;

