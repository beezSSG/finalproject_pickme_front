import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ManagerMain from './ManagerMain';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaRegImage } from "react-icons/fa6";
import Toast from '../public/Toast';

function NewproductInsert() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            setUploadedFileName(file.name);
            setUploadSuccess(true);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '') {
            Toast.fire({
                icon: 'error',
                title: '상품명을 입력하세요!',
            });
            return;
        } else if (price === '') {
            Toast.fire({
                icon: 'error',
                title: '가격을 입력하세요!',
            });
            return;
        } else if (!uploadedFile) {
            Toast.fire({
                icon: 'error',
                title: '파일을 업로드하세요!',
            });
            return;
        }

        let formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('uploadfile', uploadedFile);

        axios.post('product/newproductinsert', formData)
            .then((res) => {
                console.log(res.data);
                navigate('/productlist');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex flex-row">
            <ManagerMain height="h-[800px]" />
            <div className="max-w-[1000px] mx-auto">
                <div className="font-bold text-3xl flex items-center mt-8 ">
                    <MdOutlineProductionQuantityLimits className="mr-1" />&nbsp;&nbsp;신제품 등록
                </div>
                <div className="h-[500px] mt-10">
                    <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
                        <div className="mb-6">
                            <label className="block mb-2 text-xl font-bold">상품 명:</label>
                            <input
                                type="text"
                                placeholder="상품 명을 입력하세요."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-3 border border-gray-300 rounded-xl w-[800px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-xl font-bold">상품 가격:</label>
                            <input
                                type="text"
                                placeholder="상품 가격을 입력하세요."
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="p-3 border border-gray-300 rounded-xl w-[800px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-xl font-bold">상품 이미지:</label>
                            <div className="w-[800px] h-[300px] border-dashed border-2 border-gray-300 relative hover:bg-slate-100 rounded-xl">
                                <input
                                    type="file"
                                    name="uploadfile"
                                    className="cursor-pointer absolute inset-0 opacity-0"
                                    onChange={handleFileUpload}
                                />
                                <FaRegImage className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl" />
                                <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-lg ">
                                    {uploadSuccess ? `파일명: ${uploadedFileName}` : '이미지를 업로드해주세요!'}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                type="submit"
                                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-[15px] py-3 me-2 mb-2 dark:focus:ring-yellow-900"
                            >
                                상품 등록
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewproductInsert;
