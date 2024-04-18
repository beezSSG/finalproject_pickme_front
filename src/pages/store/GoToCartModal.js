import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsCartCheckFill } from "react-icons/bs";


const GoToCartModal = ({isOpen, closeModal}) => {
    const navigate = useNavigate();

    let params = useParams();

    useEffect(function () {

    }, []);

    const goToCartPage = () => {
        navigate('/mypage/cart');
        closeModal(); // 모달 닫기
    };
    
    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="relative bg-white p-10 rounded-lg w-[400px] h-[250px] overflow-y-auto border-2 border-yellow-500">

                        <div className="modal-body">
                            <div className="rounded-xl p-3 w-[80%] h-[50%] items-center justify-center mb-8">
                                <p className='text-4xl mb-2'><BsCartCheckFill /></p>
                                <p className='font-bold'>장바구니에 추가되었습니다.</p>
                            </div>

                            <div>
                                <button className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 
                                            font-bold rounded-lg text-base px-3 py-1.5" onClick={closeModal}>
                                                계속 쇼핑하기</button>
                                <button className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 
                                            font-bold rounded-lg text-base px-3 py-1.5 ml-8" onClick={goToCartPage}
                                            >장바구니 이동</button>
                            </div>

                        </div>
                        <span className="absolute top-0 right-[10px]  cursor-pointer text-3xl text-yellow-400" onClick={closeModal}> &times; </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoToCartModal;