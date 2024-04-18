import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcCustomerSupport } from "react-icons/fc";
import axios from "axios";
import { PiPlusCircleBold } from "react-icons/pi";

function CustomerCenter() {
  const [visible, setVisible] = useState(true);
  const [topfaqList, setFaqlist] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {

    window.localStorage.removeItem('product');
    
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function topfaqlist() {
    axios
      .get("manager/topfaqlist")
      .then(function (resp) {
        console.log(resp.data);
        setFaqlist(resp.data);
      })
      .catch(function () {
        console.log("error");
      });
  }

  useEffect(() => {
    topfaqlist();
  }, []);

  function goFaq() {
    navigate("/faq");
  }

  return (
    <>
      <ul
        className={`flex justify-end bg-gray-700 p-7 transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <li>
          <Link
            to="/contactus"
            className="text-white text-[20px] hover:text-yellow-500 mr-[100px]"
          >
            1:1 문의하기
          </Link>
        </li>
        <li>
          <Link
            to="/faq"
            className="text-white text-[20px] hover:text-yellow-500 mr-[100px]"
          >
            자주 묻는 질문
          </Link>
        </li>
      </ul>
      <div className="max-w-[1200px] mx-auto mt-[70px]">
        <div className="flex">
          <FcCustomerSupport className="text-4xl mr-3" />
          <div className="font-bold text-4xl">고객센터 홈</div>
        </div>
        <div className="font-medium text-lg mt-3 text-gray-500">
          무엇이든 물어보세요! 질문에 대답할 준비가 되어있습니다.
        </div>
        <div class="flex justify-between items-center mt-[70px]">
          <div class="text-3xl font-bold pl-[480px]">Top10 자주 묻는 질문</div>
          <div
            className="flex text-xl hover:text-yellow-400 cursor-pointer font-bold"
            onClick={goFaq}
          >
            전체보기
            <div>
              <PiPlusCircleBold className="text-[25px] text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="wrapper w-full">
          {topfaqList.map((faq, index) => (
            <div
              key={faq.id}
              className={`tab px-5 py-2 bg-white shadow-lg relative mb-2 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                index === 0 ? "mt-10" : ""
              }`}
            >
              <input
                type="checkbox"
                name="faq"
                id={`faq${faq.id}`}
                className="appearance-none peer"
              />
              <label
                htmlFor={`faq${faq.id}`}
                className="flex items-center cursor-pointer font-semibold text-lg after:content-['+'] after:absolute after:right-5 after:text-2xl after:text-gray-400 hover:after:text-gray-950 peer-checked:after:transform peer-checked:after:rotate-45"
              >
                <h2 className="w-8 h-8 bg-main-yellow text-white flex justify-center items-center rounded-sm mr-3">
                  {index + 1}
                </h2>
                <h3>{faq.title} </h3>
              </label>
              <div className="answer content mt-5 h-0 overflow-hidden transition-height ease-in-out duration-300 peer-checked:h-auto">
                <p>{faq.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomerCenter;
