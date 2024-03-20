import React, { useEffect, useState } from 'react'
import logo from "../../assets/image.png";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../utils/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const { setToken, setIsLoggedIn } = useAuth();

  // localStorge에 토큰이 있는 경우 로그인 상태로 간주, 최상위 레벨에서 호출되어야 한다.
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) setIsLoggedIn(true);
  }, []);

  // 로그아웃 함수도 최상위 레벨에 위치
  const logout = () => {
    localStorage.removeItem('jwt');
    console.log('토큰 삭제 완료:', localStorage.getItem('jwt'));
    setIsLoggedIn(false);
    alert('로그아웃에 성공했습니다.');
    navigate('/');
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePw = (e) => {
      setPw(e.target.value);
  };

  const onClickConfirmButton = () => {
    console.log("Button clicked!");          // 1. 로그 확인
    console.log("email:", email, "PW:", pw);      // 2. 상태 값 확인

    const endpoint = 'http://localhost:8080/api/v1/user/login';

    let data = JSON.stringify({
        "email": email,
        "pw": pw
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: endpoint,
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    //  로컬 스토리지에 토큰을 저장하는 부분
    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        // console.log(response.data);
        if( response.data.token !== null ) {
            alert('로그인에 성공했습니다.');
            // localStorage.setItem("jwt",  response.data.token);
            setToken(response.data.token); // 상태에 토큰 저장
            setIsLoggedIn(true);

            // setTimeout(() => {
            //     navigate('/');
            // }, 2000);
        } else {
            alert('로그인 실패했습니다. 아이디나 비밀번호를 확인해주세요');
        }

    })
    .catch((error) => {
        console.log(error);
        alert('로그인 실패했습니다. 아이디나 비밀번호를 확인해주세요');
    });
  }

    return (
        <div className="relative flex min-h-full shrink-0 justify-center md:px-12 lg:px-0">
            <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
                <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
                    <div className="flex">
                        <a aria-label="Home" href="/">
                            <img src="https://www.emart24.co.kr/assets/assets/imgs/logo.png" alt="..." />
                        </a>
                    </div>
                    <h2 className="mt-20 text-lg font-semibold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-700">Don’t have an account?
                        <a className="font-medium text-blue-600 hover:underline" href="/register">Sign up</a>
                        for a free trial.</p>
                    <form className="mt-10 grid grid-cols-1 gap-y-8"><div>
                        <label htmlFor=":S1:" className="mb-3 block text-sm font-medium text-gray-700">Email address</label>
                        <input id=":S1:" autoComplete="email" required="" className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" type="email" name="email" value={email} onChange={handleEmail}/>
                    </div>
                        <div>
                            <label htmlFor=":S2:" className="mb-3 block text-sm font-medium text-gray-700">Password</label>
                            <input id=":S2:" autoComplete="current-password" required="" className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" type="password" name="password" value={pw} onChange={handlePw}/>
                        </div>
                        <div>
                            <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full mb-10" type="button" onClick={onClickConfirmButton} variant="solid" color="blue">
                                <span>Sign in <span aria-hidden="true">→</span>
                                </span>
                            </button>
                        </div>
                    </form>
                    <div className="grid grid-cols-1 gap-y-2">
                        <div>
                            <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-600 text-white hover:text-slate-100 hover:bg-gray-500 active:bg-gray-800 active:text-gray-100 focus-visible:outline-gray-600 w-full" type="submit" variant="solid" color="gray"><span>Google <span aria-hidden="true">→</span></span>
                            </button>
                        </div>
                        <div>
                            <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-yellow-600 text-white hover:text-slate-100 hover:bg-yellow-500 active:bg-yellow-800 active:text-yellow-100 focus-visible:outline-yellow-600 w-full" type="submit" variant="solid" color="yellow"><span>KaKao <span aria-hidden="true">→</span></span>
                            </button>
                        </div>
                        <div>
                            <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-600 text-white hover:text-slate-100 hover:bg-green-500 active:bg-green-800 active:text-green-100 focus-visible:outline-green-600 w-full" type="submit" variant="solid" color="green"><span>Naver <span aria-hidden="true">→</span></span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
            <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
                <img alt="" loading="lazy" width="1664" height="1866" decoding="async" data-nimg="1" className="absolute inset-0 h-full w-full object-cover" src={logo} style={{ color: "transparent" }} />
            </div>
        </div>
    )
}
export default Login;