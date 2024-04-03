import { useState } from "react";


function PostModal({ isOpen, onClose, onConfirm, Radiovalue }) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleConfirm = () => {
        onConfirm(selectedOption);
        onClose();
    };


    if (!isOpen || !Radiovalue || Radiovalue.length === 0) return null; // Radiovalue가 없거나 빈 배열인 경우 반환

    return (
<div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-65">
    <div className="relative bg-white p-10 rounded-lg h-[60%] overflow-y-auto sm:w-[85%]">
        <h2 className="text-center font-bold text-2xl mb-4 lg:hidden ">택배운임 선택</h2>
        <h2 className="text-center font-bold text-2xl mb-4 sm:hidden">택배운임을 선택해주세요.</h2>

                <div className="text-left">
                    {Radiovalue.map((item, index) => (
                        <div key={index} className="mx-auto my-0">
                            <input
                                type="radio"
                                id={`weight-${index}`}
                                name="itemWeight"
                                value={item.split(",")[0].split(":")[1].trim()}
                                onChange={handleOptionChange}
                                className="mb-4"
                            />
                            <label htmlFor={`weight-${index}`}>
                                {item}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8">
                    <button onClick={handleConfirm} className="bg-yellow-500 hover:bg-yellow-600 e font-bold py-2 px-4 rounded">
                        완료
                    </button>
                    <button onClick={onClose} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostModal;

