import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RiCustomerService2Fill } from "react-icons/ri";

function ContactUs() {
  let navigate = useNavigate();

  let adminName = localStorage.getItem("name");

  const [id, setId] = useState("");
  const [ccblist, setCcblist] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.localStorage.removeItem("product");
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

  function ccblistup() {
    axios
      .get("manager/ccblist")
      .then(function (resp) {
        console.log(resp.data);
        setCcblist(resp.data);
      })
      .catch(function () {
        console.log("error");
      });
  }

  function ccbdelete(id) {
    axios
      .get("manager/ccbdelete", {
        params: { id: id },
      })
      .then(function (resp) {
        setCcblist(resp.data);
      })
      .catch(function () {
        console.log("error");
      });
  }

  useEffect(() => {
    ccblistup();

    if (localStorage.getItem("jwt") !== null) {
      getid();
    }

    console.log(id);
  }, []);

  function getid() {
    axios.get("customer/getid").then(function (resp) {
      console.log(resp.data);
      setId(resp.data);
    });
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
      <div className="flex justify-center items-center mt-[70px] px-3">
        <div>
          <div className="flex flex-col items-center justify-center mt-10 mb-70">
            <div className="flex items-center">
              <div className="text-[60px] font-bold text-center">
                무엇을 도와드릴까요?
              </div>
              <RiCustomerService2Fill className="ml-2 text-[70px]" />
            </div>
            <div className="mt-2 text-[20px] text-gray-500">
              궁금하신 질문들을 작성해주세요.
            </div>
          </div>

          <table className="mt-8 w-full border-collapse">
            <colgroup>
              <col width="100px" />
              <col width="70px" />
              <col width="200px" />
              <col width="500px" />
              <col width="150px" />
              <col width="300px" />
              {adminName === "하기성" && <col width="200px" />}
            </colgroup>
            <thead>
              <tr className="bg-gray-500">
                <th className="px-4 py-2 text-white">번호</th>
                <th className="px-4 py-2 text-white">분류</th>
                <th className="px-4 py-2 text-white">상태</th>
                <th className="px-4 py-2 text-white">제목</th>
                <th className="px-4 py-2 text-white">작성자</th>
                <th className="px-4 py-2 text-white">작성일</th>
                {adminName === "하기성" && (
                  <th className="px-4 py-2 text-white">비고</th>
                )}
              </tr>
            </thead>
            <tbody>
              {ccblist.map((ccb, index) => {
                return (
                  <tr
                    key={ccb.id}
                    className="text-center border-b hover:bg-gray-200 cursor-pointer"
                  >
                    <td className="px-4 py-5">{index + 1}</td>
                    <td className="px-4 py-2">{ccb.category}</td>
                    <td className="px-4 py-2">
                      {ccb.answerYn === 0 ? (
                        <span className="inline-flex items-center bg-gray-300 text-black text-xs font-medium px-2.5 py-0.5 rounded-full">
                          <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                          답변대기중
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          답변완료
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-left">
                      {id === ccb.customerId || adminName === "하기성" ? (
                        <Link
                          to={`/contactusdetail/${ccb.id}`}
                          className="text-blue-500 hover:underline visited:text-black"
                        >
                          {ccb.title}
                        </Link>
                      ) : (
                        ccb.title
                      )}
                    </td>

                    <td className="px-4 py-2">
                      {ccb.customerName.length > 2
                        ? ccb.customerName[0] +
                          "*".repeat(ccb.customerName.length - 2) +
                          ccb.customerName[ccb.customerName.length - 1]
                        : ccb.customerName}
                    </td>

                    <td className="px-4 py-2">{ccb.createAt}</td>
                    {adminName === "하기성" && (
                      <td className="px-4 py-2">
                        <button
                          onClick={() => ccbdelete(ccb.id)}
                          className="bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                          삭제
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="text-center">
            {id && (
              <button
                className="mt-[50px] bg-yellow-400 hover:bg-yellow-500  font-medium rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-[200px]"
                onClick={() => navigate("/contactuswrite")}
              >
                문의작성
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
