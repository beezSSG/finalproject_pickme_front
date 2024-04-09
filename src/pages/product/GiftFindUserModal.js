import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GiftFindUserModal = ({ clickYes, clickNo, isOpen, closeModal, receiveName, receivePhone }) => {
    const navigate = useNavigate();

    let params = useParams();

    function selectYes(){
        clickYes();
        closeModal();
    }
    function selectNo() {
        clickNo();
        closeModal();
    }

    useEffect(function () {

    }, []);
    
    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="relative bg-white p-10 rounded-lg w-[40%] h-[30%] overflow-y-auto">
                        <div className="text-3xl font-bold mb-10">받는 분 확인</div>
                        <div className="modal-body">

                            <div className="rounded-xl border border-spacing-2 p-3 w-[80%] h-[50%] items-center justify-center mb-8">
                                <p>{receivePhone}</p>
                                <p>받는 분이 <b>{receiveName}</b>님이 맞나요 ?</p>
                            </div>

                            <div>
                                <button className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 
                                            focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-base px-5 py-1.5
                                            dark:focus:ring-yellow-900" onClick={selectYes}>예</button>
                                <button className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 
                                            focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-base px-5 py-1.5
                                            dark:focus:ring-yellow-900 ml-8" onClick={selectNo}>아니오</button>
                            </div>

                        </div>
                        <span className="absolute top-0 right-[10px]  cursor-pointer text-3xl text-yellow-400" onClick={selectNo}> &times; </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GiftFindUserModal;