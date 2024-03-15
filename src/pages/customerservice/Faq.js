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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {faqlist.map((faq) => (
                        <tr key={faq.id}>
                            <td>{faq.id}</td>
                            <td>{faq.title}</td>
                            <td>{faq.content}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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



