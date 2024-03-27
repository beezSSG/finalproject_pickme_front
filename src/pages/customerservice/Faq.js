import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FaBullhorn } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Faq() {
    const navigate = useNavigate();
    const [faqlist, setFaqlist] = useState([]);
    const [category, setCategory] = useState('');
    const [isChecked, setIsChecked] = useState(false); // 체크박스 상태를 저장하는 상태

    let adminName = localStorage.getItem('name');
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let prevScrollPos = window.scrollY;
    
        const handleScroll = () => {
          const currentScrollPos = window.scrollY;
          setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
          prevScrollPos = currentScrollPos;
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);



    useEffect(() => {
        // 초기에는 '' 카테고리로 호출
        faqlistup('');
        console.log(adminName);
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

    function faqreadcount(faqid) {
        axios.get("http://localhost:8080/api/v1/manager/faqreadcount",{params:{"id":faqid}})
            .then(function(resp){
            })
            .catch(function(){
                console.log("error");
            })
    }

    function handleCategoryClick(selectedCategory) {
        setCategory(selectedCategory); // 선택된 카테고리 값을 설정
        faqlistup(selectedCategory); // 선택된 카테고리로 호출
    }

    function faqcreate() {
        navigate('/faqcreate');
    }

    const handleCheckboxChange = (faqid) => {
        setIsChecked(!isChecked); // 체크 상태를 토글
        faqreadcount(faqid);
    };

    return (
        <>
            <ul className={`flex justify-end bg-gray-700 p-7 transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`}>
                <li>
                    <Link to="/contactus" className="text-white text-[20px] hover:text-yellow-500 mr-[100px]">1:1 문의하기</Link>
                </li>
                <li>
                    <Link to="/faq" className="text-white text-[20px] hover:text-yellow-500 mr-[100px]">자주 묻는 질문</Link>
                </li>
                <li>
                    <Link to="/" className="text-white text-[20px] hover:text-yellow-500 mr-[200px]">챗봇</Link>
                </li>
            </ul>
            <div className='flex items-center justify-center mt-[100px]'><FaBullhorn className='text-5xl mr-4' /><div className='font-bold text-5xl text-center'>자주 묻는 질문</div>
            </div>
            <br/><br/><br/>
            <div className='text-center mb-7'>
                <input type='text' placeholder='궁금하신 내용을 검색해주세요.' value={category} onChange={(e)=>setCategory(e.target.value)}
                className='rounded-2xl p-5 w-[1000px] shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400'/>&nbsp;&nbsp;&nbsp;
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-[80px] py-5 me-2 mb-2
                                dark:focus:ring-yellow-900" onClick={()=>handleCategoryClick(category)}>검색</button>
            </div>
            <div className='flex items-center justify-center mb-11'>
                {/* 각 카테고리에 해당하는 버튼 */}
                {['전체', '카드', '매장', '택배', '쿠폰', '영수증'].map((category, index) => (
                    <button key={index} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                                                focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                                                dark:focus:ring-yellow-900"
                            onClick={() => handleCategoryClick(category)}>{category}</button>
                ))}
            </div>
            <div className="bg-white grid place-items-center h-[100vh] flex items-start">
                <div className="wrapper w-5/6">
                    {faqlist.map((faq, index) => (
                     <div key={faq.id} className={`tab px-5 py-2 bg-white shadow-lg relative mb-2 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${isChecked ? 'mt-10' : ''}`}>
                     <input
                         type="checkbox"
                         name="faq"
                         id={`faq${faq.id}`}
                         className="appearance-none peer"
                         checked={isChecked} // 체크박스의 체크 여부를 상태와 연결
                         onChange={()=>handleCheckboxChange(faq.id)} // 체크박스 상태 변경 시 실행되는 함수
                     />
                     <label htmlFor={`faq${faq.id}`}
                         className="flex items-center cursor-pointer font-semibold text-lg after:content-['+'] after:absolute after:right-5 after:text-2xl after:text-gray-400 hover:after:text-gray-950 peer-checked:after:transform peer-checked:after:rotate-45">
                         <h2 className="w-8 h-8 bg-yellow-400 text-white flex justify-center items-center rounded-sm mr-3">{index + 1}</h2>
                         <h3>
                             {faq.title.split(category).map((part, i) => (
                                 i === 0 ?
                                     <span key={`title-part-${i}`}>{part}</span> :
                                     <span key={`title-part-${i}`}><span className="text-yellow-500">{category}</span>{part}</span>
                             ))}
                         </h3>
                     </label>
                     <div className="answer content mt-5 h-0 overflow-hidden transition-height ease-in-out duration-300 peer-checked:h-auto">
                         <p>
                             {faq.content.split(category).map((part, i) => (
                                 i === 0 ?
                                     <span key={`content-part-${i}`}>{part}</span> :
                                     <span key={`content-part-${i}`} ><span className="text-yellow-500">{category}</span>{part}</span>
                             ))}
                         </p>
                     </div>
                 </div>
                    ))}
                </div>
                {/* 이 버튼은 로그인이 구현되면 관리자일시에만 뜨게 할꺼임(하기성만 뜨게 해뒀음) */} 
                {adminName === "하기성" && (
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                        onClick={faqcreate}>글 생성하기</button>
                )}
            </div>
            
        </>
    );
}

export default Faq;



