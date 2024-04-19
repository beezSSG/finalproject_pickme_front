import AppDownload from "../../assets/imgs/login/image.png";
import LogoImg from "../../assets/imgs/logo/fullLogo.svg";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import IdFind from "./IdFind";
import Toast from "../public/Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // 모달을 열기 위한 함수
  const openModal = () => {
    setModalOpen(true);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setIsLoggedIn } = useAuth();

  // localStorge에 토큰이 있는 경우 로그인 상태로 간주, 최상위 레벨에서 호출되어야 한다.
  useEffect(() => {
    window.localStorage.removeItem('product');
    const token = sessionStorage.getItem("jwt");
    if (token) setIsLoggedIn(true);
  }, []);

  const goGoogleLogin = () => {
    let base_url = process.env.REACT_APP_GOOGLE_LOGIN_API_BASE_URL;
    let client_id = process.env.REACT_APP_GOOGLE_LOGIN_API_CLIENT_ID;
    let redirect_uri = process.env.REACT_APP_GOOGLE_LOGIN_API_REDIRECT_URI;
    let response_type = process.env.REACT_APP_GOOGLE_LOGIN_API_RESPONSE_TYPE;
    let scope = process.env.REACT_APP_GOOGLE_LOGIN_API_SCOPE;

    let url =
      base_url +
      "client_id=" +
      client_id +
      "&redirect_uri=" +
      redirect_uri +
      "&response_type=" +
      response_type +
      "&scope=" +
      scope;

    console.log(url);
    window.location.href = url;
  };

  const goNaverLogin = () => {
    let base_url = process.env.REACT_APP_NAVER_LOGIN_API_BASE_URL;
    let client_id = process.env.REACT_APP_NAVER_LOGIN_API_CLIENT_ID;
    let redirect_uri = process.env.REACT_APP_NAVER_LOGIN_API_REDIRECT_URI;
    let response_type = process.env.REACT_APP_NAVER_LOGIN_API_RESPONSE_TYPE;

    let url =
      base_url +
      "client_id=" +
      client_id +
      "&redirect_uri=" +
      redirect_uri +
      "&response_type=" +
      response_type;

    console.log(url);
    window.location.href = url;
  };

  const goKakaoLogin = () => {
    let base_url = process.env.REACT_APP_KAKAO_LOGIN_API_BASE_URL;
    let client_id = process.env.REACT_APP_KAKAO_LOGIN_API_CLIENT_ID;
    let redirect_uri = process.env.REACT_APP_KAKAO_LOGIN_API_REDIRECT_URI;
    let response_type = process.env.REACT_APP_KAKAO_LOGIN_API_RESPONSE_TYPE;

    let url =
      base_url +
      "client_id=" +
      client_id +
      "&redirect_uri=" +
      redirect_uri +
      "&response_type=" +
      response_type;
    console.log("여기에도달");
    console.log(url);
    window.location.href = url;
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const onClickConfirmButton = () => {
    // console.log("Button clicked!");          // 1. 로그 확인
    // console.log("email:", email, "PW:", pw); // 2. 상태 값 확인
    const endpoint = "user/login";
    let data = JSON.stringify({
      email: email,
      pw: pw,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: endpoint,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    //  로컬 스토리지에 토큰을 저장하는 부분
    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        if (response.data !== undefined) {
          Toast.fire({
            icon: 'success',
            title: "로그인에 성공했어요",
          });
          setToken(response.data.jwt); // 상태에 토큰 저장
          setIsLoggedIn(true);
          const redirectToPage = () => {
            if (response.data.who === "점주") {
              window.location.href = "ceo/pomain";
            } else {
              sessionStorage.setItem('name', response.data.name);
              window.location.href = "/";
            }
          };
          setTimeout(redirectToPage, 600);
        } else {
          Toast.fire({
            icon: 'error',
            title: "로그인 실패했습니다. \n아이디나 비밀번호를 확인해주세요.",
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        Toast.fire({
          icon: 'error',
          title: "로그인 실패했습니다. \n아이디나 비밀번호를 확인해주세요.",
        });
      });
  };

  return (
    <div className="relative flex min-h-full shrink-0 justify-center md:px-12 lg:px-0">
      <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
        <h2 className="mt-20 text-4xl font-black">로그인</h2>
        <p className="mt-2 text-base font-medium text-slate-900">
          계정이 없으신가요?&nbsp;
          <Link
            className="font-bold text-blue-600 hover:underline transition duration-300"
            to="/register"
          >
            회원가입
          </Link>
          을 진행해주세요.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-y-8">
          <div>
            <label
              htmlFor=":S1:"
              className="mb-3 block font-medium text-slate-900 text-xl"
            >
              이메일
            </label>
            <input
              id=":S1:"
              autoComplete="email"
              required=""
              className="block w-full appearance-none rounded-md border border-slate-400 border-2 bg-gray-50 px-3 py-2 text-slate-900
                          placeholder-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div>
            <label
              htmlFor=":S2:"
              className="mb-3 block text-xl font-medium text-slate-900"
            >
              비밀번호
            </label>
            <input
              id=":S2:"
              autoComplete="current-password"
              required=""
              className="block w-full appearance-none rounded-md border-2 border-slate-400 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 
                          focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              type="password"
              name="password"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={openModal} className="hover:text-blue-600 font-medium transition duration-300">아이디 찾기</button>
            {modalOpen && <IdFind onClose={closeModal} />}
            <Link to="/pwfind" className="hover:text-blue-600 font-medium transition duration-300">
              비밀번호 찾기
            </Link>
          </div>
          <div>
            <button
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 
                        bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-700 active:bg-blue-700 active:text-blue-100 focus-visible:outline-blue-600 w-full mb-10 transition duration-200"
              type="button"
              onClick={onClickConfirmButton}
              variant="solid"
              color="blue"
            >
              <span>
                로그인
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-2">
          <div>
            <button
              onClick={() => goGoogleLogin()}
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 transition duration-200
                      bg-slate-600 text-white hover:text-slate-100 hover:bg-gray-800 active:bg-gray-800 active:text-gray-100 focus-visible:outline-gray-600 w-full"
              type="submit"
              variant="solid"
              color="gray"
            >
              <span>
                Google
              </span>
            </button>
          </div>
          <div>
            <button
              onClick={() => goKakaoLogin()}
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#f5af19] text-white transition duration-200
                      hover:text-slate-100 hover:bg-[#FF8C00] active:bg-[#FF8C00] active:text-yellow-100 focus-visible:outline-yellow-600 w-full"
              type="submit"
              variant="solid"
              color="yellow"
            >
              <span>
                KaKao
              </span>
            </button>
          </div>
          <div>
            <button
              onClick={() => goNaverLogin()}
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-600 text-white transition duration-200
              hover:text-slate-100 hover:bg-green-800 active:bg-green-800 active:text-green-100 focus-visible:outline-green-600 w-full"
              type="submit"
              variant="solid"
              color="green"
            >
              <span>
                Naver
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
