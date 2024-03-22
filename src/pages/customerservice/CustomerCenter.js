import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcCustomerSupport } from "react-icons/fc";


function CustomerCenter() {

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

    return(
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
            <div className="max-w-[1200px] mx-auto mt-[70px]">
            <div className="flex"><FcCustomerSupport className="text-4xl mr-3" /><div className="font-bold text-4xl">고객센터 홈</div></div>
                <div className="font-medium text-lg mt-3 text-gray-500">무엇이든 물어보세요! 질문에 대답할 준비가 되어있습니다.</div>

            </div>

        </>
    )
}

export default CustomerCenter;