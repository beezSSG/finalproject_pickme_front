import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bootpay } from '@bootpay/client-js';

import GiftFindUserModal from './GiftFindUserModal';
import axios from 'axios';
import Toast from "../public/Toast";

const GiftModal = ({ isOpen, closeModal, productId, productName, productPrice, productUrl}) => {
    const navigate = useNavigate();
    let params = useParams();

    // 받는 사람 정보
    const [receiveId, setReceiveId] = useState(0);
    const [receiveName, setReceiveName] = useState('');
    const [receivePhone, setReceivePhone] = useState('');

    // 메시지
    const [giftContent, setGiftContent] = useState('');

    // 모달 창 변수
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isUserSelected, setIsUserSelected] = useState(false);
 

    useEffect(function () {
    }, []);


    // 받는 사람 조회    
    async function findFromUser(receivePhone){
        await axios.get("/product/findFromUser",  { params:{ "phone":receivePhone } })
        .then((resp) => {
            if (!resp.data) { // resp.data 값이 없는 경우
                setReceivePhone('');
                Toast.fire({
                    icon: 'warning',
                    title: "전화번호를 다시 확인해 주세요!",
                });
                return;
            }

            setReceiveId(resp.data.id);
            setReceiveName(resp.data.name);

            setModalIsOpen(true); // 모달 열 때 id 값 설정
        })
        .catch(() => {
            alert('findFromUser Error');
        });
    };

    function clickYes(){
        setIsUserSelected(true);
    }
    function clickNo() {
        setIsUserSelected(false);
        setReceiveName("");
        setReceiveId(0);
        setReceivePhone("");
    }

    // 전화번호만 가능하게 만들기
    const parsingPhoneNumber = (num) => {
        return (
            num
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                .replace(/(-{1,2})$/g, '')
        )
    }

    // 선물 보내기 
    async function sendGift(sendCustomerId, productId, giftContent, expDay, useYn){
        if(sendCustomerId === 0){
            Toast.fire({
                icon: 'warning',
                title: "선물을 받을 사람을 선택해 주세요!",
            });
            return;
        }

        if(giftContent === ""){
            setGiftContent("선물을 보냈어요.");
            giftContent = "선물을 보냈어요.";
        }

        // 결제 핸들러
        try {
        const response = await Bootpay.requestPayment({
            "application_id": "65efaac4d25985001c6e5e40",
            "price": productPrice,                                       //  상품 금액
            "order_name": "Pick ME 상품결제 - "+ productName,
            "order_id": "TEST_ORDER_ID",
            "tax_free": 0,
            "user": {
            "id": "회원아이디",
            "username": "회원이름",
            "phone": "01000000000",
            "email": "test@test.com"
            },
            "items": [
            {
                "id": "item_id",
                "name": "item_name",                                    // 상품 이름
                "qty": 1,
                "price": productPrice                                    //  상품 금액
            }
            ],
            "extra": {
            "open_type": "iframe",
            "card_quota": "0,2,3",
            "escrow": false
            }
        })
        switch (response.event) {
            case 'issued':
            // 가상계좌 입금 완료 처리
            break
            case 'done':
            console.log(response);

            await axios.post("/product/sendGift", null,
                { params:{ "sendCustomerId":sendCustomerId, "productId":productId,
                            "content":giftContent, "expDay":expDay, "useYn":useYn }})
            .then((resp)=>{
                Toast.fire({
                    icon: 'success',
                    title: "선물을 보냈습니다 🎁",
                });

                setTimeout(() => {
                    clickNo();
                    setGiftContent("");
                    closeModal();
                }, 1000); // 1초를 기다린 후 closeModal 실행
            })
            .catch(()=>{
            alert('sendGift error');
            })

            // 결제 완료 처리
            break
            case 'confirm': //payload.extra.separately_confirmed = true; 일 경우 승인 전 해당 이벤트가 호출됨
            console.log(response.receipt_id);
            /**
             * 1. 클라이언트 승인을 하고자 할때
             * // validationQuantityFromServer(); //예시) 재고확인과 같은 내부 로직을 처리하기 한다.
             */
            const confirmedData = await Bootpay.confirm() //결제를 승인한다
            if(confirmedData.event === 'done') {
                //결제 성공
            }
            /**
             * 2. 서버 승인을 하고자 할때
             * // requestServerConfirm(); //예시) 서버 승인을 할 수 있도록  API를 호출한다. 서버에서는 재고확인과 로직 검증 후 서버승인을 요청한다.
             * Bootpay.destroy(); //결제창을 닫는다.
             */
            break;
        }
        } catch (e) {
        // 결제 진행중 오류 발생
        // e.error_code - 부트페이 오류 코드
        // e.pg_error_code - PG 오류 코드
        // e.message - 오류 내용
        console.log(e.message)
        switch (e.event) {
            case 'cancel':
            // 사용자가 결제창을 닫을때 호출
            console.log(e.message);
            break;
            case 'error':
            // 결제 승인 중 오류 발생시 호출
            console.log(e.error_code);
            break;
        }
        }        
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="relative bg-white p-10 rounded-lg min-w-[350px] max-w-[1100px] lg:max-h-[450px] sm:max-h-[70%] overflow-y-auto">
                        <div className="text-3xl font-bold lg:mb-10 sm:mb-2">선물하기</div>
                        <div className="modal-body">

                            <div className="rounded-xl border border-spacing-2 p-3 mx-48 sm:m-5 ">
                                <div className='flex sm:flex-wrap items-center justify-center'>
                                    <div>
                                        <img src={productUrl} className="w-[250px] h-[250px] sm:w-[125px] sm:h-[125px]" />
                                        <p className='font-bold mt-2 mb-5 '> {productName} </p>                              
                                    </div>

                                    <div className='lg:ml-8'>
                                        <dl className='flex'>
                                            <dt  className='font-bold text-xl mb-5'>받는 분 전화번호</dt>
                                        </dl>

                                        <dl style={{ display: 'flex' }}>
                                            <dd className='text-sm'>
                                                <input
                                                className="rounded-xl border-2 border-gray-400 p-3 cursor-pointer focus:outline-none focus:border-yellow-400"
                                                    type="tel"
                                                    placeholder="전화번호"
                                                    maxLength={13}
                                                    value={receivePhone}
                                                    onChange={(e) => setReceivePhone(parsingPhoneNumber(e.target.value))}/>
                                            </dd>
                                            <dd className='ml-2 items-center'>
                                                <button className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 
                                                focus:ring-4 focus:ring-yellow-300 font-bold rounded-lg text-base px-5 py-1.5 
                                                dark:focus:ring-yellow-900" onClick={() => findFromUser(receivePhone)}>확인</button>
                                                <GiftFindUserModal clickYes={clickYes} clickNo={clickNo} isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} receiveName={receiveName} receivePhone={receivePhone} />
                                            </dd>
                                        </dl>
                                        

                                        {isUserSelected && (
                                            <dl className='mt-3 flex'>      
                                                <dd className='text-sm flex'>
                                                    <p className='text-green-700 font-bold'>{receiveName}</p>
                                                    <p className='text-gray-600'> 님에게 선물을 보내요! </p>
                                                </dd>
                                            </dl>
                                        )}

                                        <dl>
                                            <dd className='text-sm mt-5'>
                                            <textarea
                                                    type="text"
                                                    id="giftContent"
                                                    className="lg:w-[300px] h-[150px] sm:w-[250px] rounded-xl border-2 border-gray-400 p-3 cursor-pointer focus:outline-none focus:border-yellow-400"
                                                    value={giftContent}
                                                    placeholder="선물과 함께 보낼 메시지를 입력해 주세요!"
                                                    onChange={(e) => setGiftContent(e.target.value)} />
                                            </dd>
                                        </dl>

                                    </div>
                                </div>


                                <div className='mt-8 mb-5'>
                                    <button className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 
                                    focus:ring-4 focus:ring-yellow-300 font-bold rounded-lg text-base px-5 py-1.5
                                    dark:focus:ring-yellow-900"
                                    onClick={() => {
                                        // 현재 시간
                                        let currentDate = new Date();

                                        // 현재 시간에 1년 추가
                                        let expDate = new Date(currentDate);
                                        expDate.setFullYear(expDate.getFullYear() + 1);

                                        // yyyy-mm-dd hh:mm:ss 형식으로 변환
                                        let expDateString = expDate.getFullYear() + '-' + 
                                                            ('0' + (expDate.getMonth() + 1)).slice(-2) + '-' + 
                                                            ('0' + expDate.getDate()).slice(-2) + ' ' + 
                                                            ('0' + expDate.getHours()).slice(-2) + ':' + 
                                                            ('0' + expDate.getMinutes()).slice(-2) + ':' + 
                                                            ('0' + expDate.getSeconds()).slice(-2);
                                        sendGift(receiveId, productId, giftContent, expDateString, 0);
                                    }}>보내기</button>
                                </div>


                            </div>

                            

                        </div>
                        <span className="absolute top-0 right-[10px]  cursor-pointer text-3xl text-yellow-400" onClick={closeModal}> &times; </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GiftModal;