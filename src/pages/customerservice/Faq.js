import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Faq() {
    const navigate = useNavigate();
    const [faqlist, setFaqlist] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        // 초기에는 '카드' 카테고리로 호출
        faqlistup('');
    }, []);

    function faqlistup(selectedCategory) {
        axios.get("http://localhost:8080/api/v1/manager/faqlist", { params: { choice: selectedCategory } })
            .then((resp) => {
                console.log(resp.data);
                setFaqlist(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCategoryClick(selectedCategory) {
        setCategory(selectedCategory); // 선택된 카테고리 값을 설정
        faqlistup(selectedCategory); // 선택된 카테고리로 호출
    }

    function faqcreate() {
        navigate('/faqcreate');
    }

    return (
        <>
            <div>자주 묻는 질문 창입니다.</div>
            <div>
                {/* 각 카테고리에 해당하는 버튼 */}
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                   focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                 dark:focus:ring-yellow-900"
                onClick={() => handleCategoryClick('전체')}>전체</button>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                   focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                 dark:focus:ring-yellow-900"
                onClick={() => handleCategoryClick('카드')}>카드</button>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                   focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                 dark:focus:ring-yellow-900"
                onClick={() => handleCategoryClick('매장')}>매장</button>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                   focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                 dark:focus:ring-yellow-900"
                onClick={() => handleCategoryClick('택배')}>택배</button>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                   focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                 dark:focus:ring-yellow-900"
                onClick={() => handleCategoryClick('쿠폰')}>쿠폰</button>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                   focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                 dark:focus:ring-yellow-900"
                onClick={() => handleCategoryClick('영수증')}>영수증</button>
            </div>
            <div className="bg-white grid place-items-center h-[100vh] flex items-start">
                <div className="wrapper w-5/6">
                    {faqlist.map((faq, index) => (
                    <div key={faq.id} className={`tab px-5 py-2 bg-white shadow-lg relative mb-2 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${index === 0 ? 'mt-10' : ''}`}>
                        <input type="checkbox" name="faq" id={`faq${faq.id}`} className="appearance-none peer"/>
                        <label htmlFor={`faq${faq.id}`}
                            className="flex items-center cursor-pointer font-semibold text-lg after:content-['+'] after:absolute after:right-5 after:text-2xl after:text-gray-400 hover:after:text-gray-950 peer-checked:after:transform peer-checked:after:rotate-45">
                            <h2 className="w-8 h-8 bg-yellow-400 text-white flex justify-center items-center rounded-sm mr-3">{index + 1}</h2>
                            <h3>
                                {faq.title.split(category).map((part, i) => (
                                    i === 0 ?
                                        <span>{part}</span> :
                                        <span><span className="text-yellow-500">{category}</span>{part}</span>
                                ))}
                            </h3>
                        </label>
                        <div className="answer content mt-5 h-0 transition-all ease-in-out duration-500 overflow-hidden peer-checked:h-full">
                            <p>
                                {faq.content.split(category).map((part, i) => (
                                    i === 0 ?
                                        <span>{part}</span> :
                                        <span><span className="text-yellow-500">{category}</span>{part}</span>
                                ))}
                            </p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <br/>
            {/* 이 버튼은 로그인이 구현되면 관리자일시에만 뜨게 할꺼임 */}
            <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                               focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                             dark:focus:ring-yellow-900"
                    onClick={faqcreate}>글 생성하기</button>
        </>
    );
}

export default Faq;


