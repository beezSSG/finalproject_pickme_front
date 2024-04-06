import { useState } from "react";
import axios from "axios";
import Toast from "../public/Toast";
import { useNavigate } from "react-router-dom";

function PwFind() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [code, setCode] = useState("");
  const [code2, setCode2] = useState("");
  const [read, setRead] = useState(false);
  const [newpw, setNewpw] = useState(false);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  // 이메일 체크
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const emailCheck = (email) => {
    const isValid = emailRegEx.test(email);
    setIsValidEmail(isValid);
  };
  const handleInputEmailChange = (e) => {
    setEmail(e.target.value);
    emailCheck(e.target.value);
  };

  // 이메일 확인 및 인증
  function emailSend() {
    axios
      .get("/user/countEmail", {
        params: { email: email },
      })
      .then(function (resp) {
        let checkId = resp.data;
        console.log(checkId);
        if (checkId === 1) {
          axios
            .post("/user/sendCodeToEmail", null, {
              params: { email: email },
            })
            .then(function (resp) {
              Toast.fire({
                icon: "success",
                title: "임시 비밀번호가 발급되었습니다!",
              });
              console.log(resp.data);
              setCode(resp.data);
            })
            .catch(function () {
              console.log("error");
            });
        } else {
          Toast.fire({
            icon: "error",
            title: "존재하지 않는 이메일입니다!",
          });
        }
      })
      .catch(function () {
        console.log("Error");
      });
  }

  // 코드 일치 확인
  function codeCheck() {
    if (code === code2) {
      Toast.fire({
        icon: "success",
        title: "알맞은 임시 비밀번호 입니다!",
      });
      setRead(true);
      setNewpw(true);
      return;
    } else {
      Toast.fire({
        icon: "error",
        title: "인증번호가 다릅니다!",
      });
      setCode2("");
    }
  }

  // 비밀번호 비교 함수
  const handleInputChange = (e) => {
    const newPassword = e.target.value;
    const confirmPassword = e.target.name === "password" ? pw2 : pw;
    const currentPassword = e.target.name === "password" ? pw : pw2;

    if (newPassword === confirmPassword) {
      setMessage("비밀번호가 일치합니다.");
      setMessageColor("blue");
    } else {
      setMessage("비밀번호가 일치하지 않습니다.");
      setMessageColor("red");
    }

    if (e.target.name === "password") {
      setPw(newPassword);
    } else {
      setPw2(newPassword);
    }
  };

  function changePw() {
    axios
      .post("/user/changePw", null, { params: { email: email, pw: pw } })
      .then(function (resp) {
        console.log(resp.data);
        Toast.fire({
          icon: "success",
          title: "비밀번호가 변경되었습니다!",
        });
        navigate("/login");
      })
      .catch(function () {
        console.log("error");
      });
  }

  return (
    <>
      <div className="max-w-[600px] mx-auto px-3">
        <div className="text-3xl font-bold mt-10">비밀번호 찾기</div>
        <div className="flex items-center my-3">
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleInputEmailChange}
            className="border-2 border-gray-400 rounded-xl w-full p-3 focus:outline-none focus:border-yellow-400"
            readOnly={read}
          />
          {!read && (
            <button
              className="bg-sub-yellow w-20 py-4 rounded-xl font-bold ml-3 hover:bg-sub-orange"
              onClick={emailSend}
            >
              발급
            </button>
          )}
        </div>

        {!isValidEmail && email && (
          <p className="text-red-500">올바른 이메일 형식이 아닙니다.</p>
        )}
        {!read && (
          <div className="flex items-center my-3">
            <input
              type="text"
              placeholder="임시 비밀번호"
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
              className="border-2 border-gray-400 rounded-xl w-full p-3 focus:outline-none focus:border-yellow-400"
            />
            <button
              className="bg-sub-yellow w-20 py-4 rounded-xl font-bold ml-3 hover:bg-sub-orange"
              onClick={() => codeCheck()}
            >
              확인
            </button>
          </div>
        )}
        {newpw && (
          <div>
            <input
              type="password"
              name="password"
              placeholder="새로운 비밀번호"
              value={pw}
              onChange={handleInputChange}
              className="border-2 border-gray-400 rounded-xl w-full p-3 my-3 focus:outline-none focus:border-yellow-400"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={pw2}
              onChange={handleInputChange}
              className="border-2 border-gray-400 rounded-xl w-full p-3 my-3 focus:outline-none focus:border-yellow-400"
            />
            {pw && pw2 && <p style={{ color: messageColor }}>{message}</p>}
            <button
              className="w-full rounded-xl bg-sub-yellow hover:bg-sub-orange my-3 p-3 font-bold"
              onClick={changePw}
            >
              비밀번호 변경
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default PwFind;
