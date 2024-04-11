import React, { useState } from "react";
import axios from "axios";
import { FaRegImage } from "react-icons/fa6";
import Toast from "../public/Toast";

function OcrModal({ onClose, checkOcr, onCheckOcrUpdate }) {
    const [resp, setResp] = useState({
        inferText: '',
        titleText: ''
    });
    const [uploadfile, setUploadedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [error, setError] = useState('');
    const today = new Date().toISOString().substr(0, 10);   // 오늘날짜

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setUploadedFile(file);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!uploadedImage) {
            setError('이미지를 업로드해주세요.');
            return;
        }

        let formData = new FormData();
        formData.append('uploadfile', uploadfile);

        try {
            const response = await axios.post('user/ocr', formData);
            const inferText = response.data.images[0]?.fields[0]?.subFields[0]?.inferText || 'N/A';
            const titleText = response.data.images[0]?.title?.subFields[0]?.inferText || 'N/A';
            setResp({ inferText, titleText });
            onCheckOcrUpdate(1);
        } catch (error) {
            console.error('Error:', error);
            setError('이미지 처리 중 오류가 발생했습니다.');
        }
    };

    const handleConfirmation = () => {
        // 여기에 확인 작업을 추가하세요.
        if (!resp.titleText) {
            Toast.fire({
                icon: 'error',
                title: '정상적인 사업자가 아닙니다!',
            });
            return;
        }
        Toast.fire({
            icon: 'success',
            title: '사업자 등록이 완료되었습니다!',
        });
        onClose(); // 모달 닫기
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
            <div className="modal bg-white p-8 rounded-lg z-50 relative w-[50%] h-[70%] overflow-y-auto">
                <span className="close absolute top-0 right-2 -mt-4 -mr-4 p-4 cursor-pointer text-3xl text-sub-yellow font-bold" onClick={onClose}>&times;</span>
                <p className="font-bold text-3xl">사업자 등록</p><br/>
                    <div className="mb-6">
                        <h3 className="block mb-2 text-xl font-bold text-left">상호명</h3>
                        <input className="w-full border p-3 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 mb-6" value={resp.inferText} readOnly />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-xl font-bold text-left">신청일</label>
                        <input type="date"  value={today} readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"/>
                    </div>
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="mb-6">
                    <label className="block mb-2 text-xl font-bold text-left">사업자 등록증</label>
                    <div className="w-full h-[1300px] border-dashed border-2 border-gray-300 relative hover:bg-slate-100 rounded-xl">
                        <input
                            type="file"
                            name="uploadfile"
                            className="cursor-pointer absolute inset-0 opacity-0"
                            onChange={handleFileUpload}
                        />
                        {uploadedImage ? (
                            <img
                                src={uploadedImage}
                                alt="Uploaded Preview"
                                className="w-full h-full"
                            />          
                        ) : (
                            <FaRegImage className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl" />
                        )}
                    </div>
                </div>

                        <div className="flex flex-col items-center">
                            <button
                                type="submit"
                                className="focus:outline-none  bg-sub-yellow hover:bg-sub-orange focus:ring-4 focus:ring-yellow-300 font-bold rounded-lg  px-[15px] py-3 me-2 mb-2 "
                            >
                                사업자 등록
                            </button>
                            {error && <div className="text-red-500">{error}</div>}
                        </div>
                    </form>
                    <div>
                        <h3 className="block mb-2 text-xl font-bold text-left">등록번호</h3>
                        <input className="w-full border p-3 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 mb-6" value={resp.titleText} readOnly />
                        <h3 className="block mb-2 text-xl font-bold text-left">사업등록여부</h3>
                        <input
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 ${resp.titleText ? 'font-bold text-blue-600' : ''}`}
                            value={resp.titleText ? "등록 가능" : ""}
                            readOnly
                        />
                    </div>
                    <button className="w-full bg-sub-yellow hover:bg-sub-orange p-3 rounded-xl mt-5 font-bold" onClick={handleConfirmation}>확인</button>
            </div>
        </div>
    );
}

export default OcrModal;

