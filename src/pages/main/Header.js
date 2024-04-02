
// import logoImg from '../../assets/imgs/logo/logo.svg';
import FullLogoImg from '../../assets/imgs/logo/fullLogo.svg';
import Toast from '../public/Toast';
import { useState } from 'react';


function Header() {

    let adminName = localStorage.getItem('name');

    // 로그인 확인
    const Logincom = () => {
        if (localStorage.getItem("name") === null) {
            return (
                <a className="inline-block rounded-lg px-2 py-1 text-base font-bold text-slate-500 hover:text-slate-900" href="/login">Login</a>
            )
        } else {
            return (
                <div>
                    <span className="inline-block rounded-lg px-2 py-1 text-base text-slate-700 hover:bg-slate-100 hover:text-slate-900">안녕하세요 { localStorage.getItem("name") } 님</span>
                    <button className="inline-block rounded-lg px-2 py-1 text-base text-slate-700 hover:bg-slate-100 hover:text-slate-900" onClick={()=>(logout())}>Logout</button>
                </div>
            )
        }
    }

    // 로그아웃
    const logout = () => {
        localStorage.clear();
        window.location.replace("http://localhost:3000/");
    }


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const menuLinks = ["/about", "/productlist", "/store", "/post", "/event", "/customercenter"];
    const menuNames = ["서비스소개", "상품", "매장찾기", "서비스", "이벤트", "고객센터"];


    return (
        <div className="mx-auto pt-6 pb-4 sm:px-4 sm:py-0 lg:px-8 
                        backdrop-blur-md border-b-[1px] border-slate-50
                        transition duration-700 hover:bg-slate-200">
            <nav className="relative z-10 flex items-center justify-between">
                <a href="/" className="mb-3 mx-7 ">
                    <img src={FullLogoImg} alt="pickme logo" className=" sm:size-28"/>
                </a>
                <div className="flex items-center">
                    <div className="lg:block hidden">
                        {
                        
                            menuNames.map((menu, i)=>(
                                <a key={i} className="inline-block rounded-lg px-3 font-medium text-slate-500 text-2xl md:text-base hover:text-slate-900" href={ menuLinks[i] }>{ menu }</a>
                            ))
                        }
                        {/* <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-500 hover:bg-slate-100 hover:text-slate-900" href="/about">서비스소개</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-500 hover:bg-slate-100 hover:text-slate-900" href="/productlist">상품</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-500 hover:bg-slate-100 hover:text-slate-900" href="/store">매장찾기</a>
                        <div className="relative inline-block">
                            <button onClick={toggleDropdown} className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none">서비스</button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                    <a href="/post" className="block px-4 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900">택배 예약</a>
                                    <a href="/productreservation" className="block px-4 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900">상품 예약</a>
                                </div>
                            )}
                        </div>

                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-500 hover:bg-slate-100 hover:text-slate-900" href="/event">이벤트</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-2xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/customercenter">고객센터</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-500 hover:bg-slate-100 hover:text-slate-900" href="/ceo">발주하자</a> */}
                    </div>
                </div>

                {/* 로그인 */}
                {/* flex items-center gap-x-5 md:gap-x-8 */}
                <div className="float-right flex items-center">
                    <div className="md:block">
                        <Logincom />
                        {/* <a className="inline-block rounded-lg px-1.5 py-1 text-base font-bold text-slate-500 md:text-sm hover:text-slate-900" href="/login">Sign in</a> */}
                        {adminName === "하기성" && (
                            <a className="inline-block rounded-lg px-1.5 py-1 text-base font-bold text-slate-500 md:text-sm hover:text-slate-900" href="/orderchart">관리자</a>
                        )}
                        <a className="inline-block rounded-lg px-1.5 py-1 text-base font-bold text-slate-500 md:text-sm hover:text-slate-900" href="/mypage">마이페이지</a>
                    </div>

                    {/* <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-bold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600" color="blue" variant="solid" href="/register">
                        <span>Get started 
                            <span class="hidden lg:inline">today</span>
                        </span></a> */}
                    <div className="mx-2 lg:hidden">
                        <div data-headlessui-state="">
                            <button className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none" aria-label="Toggle Navigation" type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:Rbpnla:">
                                <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-500" fill="none" strokeWidth="2" strokeLinecap="round">
                                    <path d="M0 1H14M0 7H14M0 13H14" className="origin-center transition"></path>
                                    <path d="M2 2L12 12M12 2L2 12" className="origin-center transition scale-90 opacity-0"></path>
                                </svg>
                            </button>
                        </div>
                        {/* <div style={{ position: 'fixed', top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0, display: 'none' }}></div> */}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;