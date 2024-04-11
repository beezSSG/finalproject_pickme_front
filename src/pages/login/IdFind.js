import axios from "axios";
import { useState } from "react";
import Toast from "../public/Toast";

function IdFind({ onClose }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // 전화번호만 가능하게 만들기
  const parsingPhoneNumber = (num) => {
    return num
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");
  };

  // 아이디 찾기
  function findEmail() {
    axios
      .get("/user/findEmail", { params: { name: name, phone: phoneNumber } })
      .then(function (resp) {
        console.log(resp.data);
        setEmail(resp.data);
        Toast.fire({
          icon: "success",
          title: "이메일을 찾았습니다.",
        });
        if (resp.data === "") {
          Toast.fire({
            icon: "error",
            title: "일치하는 이메일이 없습니다.",
          });
        }
      })
      .catch(function () {
        console.log("error");
      });
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-8 rounded-lg z-50 relative w-[30%] h-[50%] xl:w-[50%] xl:h-[75%]">
          <span
            className="absolute top-0 right-2 -mt-4 -mr-4 p-4 cursor-pointer text-3xl text-sub-yellow font-bold"
            onClick={onClose}
          >
            &times;
          </span>
          <div className="font-bold text-3xl my-8 text-center">아이디 찾기</div>
          <div className="h-[70%] overflow-y-auto">
            <div className="border-2 border-gray-300 rounded-xl p-6">
              <label className="font-bold">이름</label>
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm mb-5"
              />
              <label className="font-bold">전화번호</label>
              <input
                type="tel"
                placeholder="전화번호"
                maxLength={13}
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(parsingPhoneNumber(e.target.value))
                }
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
              {email && (
                <div className="mt-5">
                  <label className="font-bold">이메일</label>
                  <input
                    type="type"
                    value={email}
                    readOnly
                    className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              )}
              <div className="text-center mt-6">
                <button
                  className="bg-sub-yellow rounded-xl p-3 w-full font-bold hover:bg-sub-orange"
                  onClick={() => findEmail()}
                >
                  아이디 찾기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IdFind;
