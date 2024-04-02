import { useState, useEffect } from "react";
import SearchStoreName from "../store/LeftMenu/SearchStoreName";
import StoreMap from "../store/StoreMap";
import LeftMenu from "../store/LeftMenu/LeftMenu";

function ProductReservation() {

    // 매장 찾기
    const [storeName, setStoreName] = useState("센텀프리미어호텔점");

    // 예약할 상품 테이블
    const [products, setProducts] = useState([]);
    // 임시로 넣어둠 (모달 창에서 받은 수량과 상품명을 가지고 axios 를 통해 set해줄꺼임!)
    const reservationProduct = [
        { "상품명": "햄버거", "수량": 3, "가격": 3000 },
        { "상품명": "삼각김밥", "수량": 6, "가격": 6000 }
    ];
    // 총 결제 금액 계산
    const totalPrice = reservationProduct.reduce((acc, product) => {
        return acc + (product.가격);
    }, 0);

    // 픽업 날짜
    const [pickDate, setPickDate] = useState("");


    // 모달들
    const [showstoreModal, setShowstoreModal] = useState(false);
    function searchStore() {
        setShowstoreModal(true);
    }
    function closestoreModal() {
        setShowstoreModal(false);
    }

    const [showproductModal, setShowproductModal] = useState(false);
    function choiceProduct() {
        setShowproductModal(true);
    }
    function closeproductModal() {
        setShowproductModal(false);
    }

    return(
        <>
            <div className="max-w-[1200px] mx-auto">
                <div className="text-4xl font-bold mt-[70px]">상품 예약하기</div><br/>
                <hr className="border-gray-500" /><br/><br/>
                <div className=" font-bold text-3xl">픽업 매장찾기</div><br/>
                
                <label className="font-bold text-2xl">매장 명:</label>
                <div className="flex space-x-3">
                    <div className="border-2 border-gray-400 w-[20%] text-center p-2 rounded-xl">{storeName}</div>
                    <div className="text-center">
                        <button className="bg-yellow-500 rounded-xl p-2 font-bold w-[100px] h-full"
                        onClick={searchStore}>매장 찾기</button>
                    </div>
                </div>
                {showstoreModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-65">
                        <div className="w-[70%] h-[40%]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white">
                                {/* 모달 제목 */}
                                <div className="relative text-center my-5 text-3xl">
                                    <p className="font-bold">매장 찾기</p>
                                </div>
                                {/* 모달 내용 */}
                                <div className="flex justify-center p-2 rounded-b">
                                    {/* 매장찾기 검색부분 들어갈 예정 */}
                                    <button
                                        className="bg-yellow-500 text-white active:bg-yellow-600 font-bold text-sm px-6 py-3 mr-1 mb-1 rounded-xl cursor-pointer"
                                        type="button"
                                        onClick={()=>closestoreModal()}
                                    >
                                        확인
                                    </button>
                                    <button
                                        className="bg-gray-700 text-white active:bg-gray-900 font-bold text-sm px-6 py-3  mr-1 mb-1 rounded-xl"
                                        type="button"
                                        onClick={()=>closestoreModal()}
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}<br/>
                <div className=" font-bold text-3xl">예약 상품찾기</div><br/>
                
                <label className="font-bold text-2xl">상품:</label>
                <div className="text-red-500 font-bold mb-3">※최소 1개 이상의 상품을 담아주세요</div>
                <div>
                    <div className="text-center">
                        {reservationProduct.length > 0 && (
                            <table className="border-collapse border border-gray-400 w-full">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 p-2">상품명</th>
                                        <th className="border border-gray-400 p-2">수량</th>
                                        <th className="border border-gray-400 p-2">가격</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservationProduct.map((product, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-400 p-2">{product.상품명}</td>
                                            <td className="border border-gray-400 p-2">{product.수량}</td>
                                            <td className="border border-gray-400 p-2">{product.가격.toLocaleString()}원</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                        {reservationProduct.length == 0 && (
                            <button className="bg-yellow-500 rounded-xl p-2 font-bold w-[100px] h-full" onClick={choiceProduct}>
                                상품 찾기
                            </button>
                        )}
                    </div>
                
                {/* 아마 이것도 상품선택하는 모달창이 뜨고 거기서 상품을 체크하고 수량을 선택해서 확인 버튼을 누르면 그 값들이 저장되게 ? */}
                {showproductModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-65">
                        <div className="w-[70%] h-[40%]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white">
                                {/* 모달 제목 */}
                                <div className="relative text-center my-5 text-3xl">
                                    <p className="font-bold">상품 찾기</p>
                                </div>
                                {/* 모달 내용 */}
                                <div className="flex justify-center p-2 rounded-b">
                                    {/* 상품 선택 부분 들어갈것 */}
                                    <button
                                        className="bg-yellow-500 text-white active:bg-yellow-600 font-bold text-sm px-6 py-3 mr-1 mb-1 rounded-xl cursor-pointer"
                                        type="button"
                                        onClick={()=>closeproductModal()}
                                    >
                                        확인
                                    </button>
                                    <button
                                        className="bg-gray-700 text-white active:bg-gray-900 font-bold text-sm px-6 py-3  mr-1 mb-1 rounded-xl"
                                        type="button"
                                        onClick={()=>closeproductModal()}
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}<br/><br/>
                <label className="font-bold text-2xl">픽업 날짜 선택:</label>
                <div className="text-red-500 font-bold mb-3">※당일 기준 최소 3일 이후 부터 예약 가능</div>
                <div className="border-2 border-gray-400 w-[20%] text-center p-2 rounded-xl "><input type="date" value={pickDate} onChange={(e)=>(setPickDate(e.target.value))} className="focus:outline-none"/></div>
                <div className="text-right font-bold text-lg">최종 결제 금액: {totalPrice.toLocaleString()}원</div>
                <div className="text-right mt-3"><button className="bg-gray-700 rounded-xl p-3 text-white" >결제하기</button></div>
                <div>결제하고 나면 mypage 픽박스로 가야함</div>
            </div>
        </>
    );
}

export default ProductReservation;

