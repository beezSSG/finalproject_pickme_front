// import logoImg from '../../assets/imgs/logo/logo.svg';
import { useState } from "react";
import { Link } from "react-router-dom";
import FullLogoImg from "../../assets/imgs/logo/fullLogo.svg";
import { RiUser5Line } from "react-icons/ri";
// import { Disclosure } from "@headlessui/react";
// import Toast from '../public/Toast';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let adminName = localStorage.getItem("name");

  const Logincom = () => {
    if (
      localStorage.getItem("name") === null &&
      localStorage.getItem("jwt") === null
    ) {
      console.log(localStorage.getItem("jwt"));
      return (
        <Link
          className="relative text-l w-fit inline-block after:block mx-2
                        font-semibold text-slate-500 hover:text-slate-900 transition duration-300
                        after:content-[''] after:absolute after:h-[3px] after:bg-main-yellow after:w-full 
                        after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
          to="/login"
        >
          로그인
        </Link>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          {/* 로그아웃 */}
          <Link
            className="relative text-l w-fit inline-block after:block mx-3
                        font-semibold text-slate-500 hover:text-slate-900 transition duration-300
                        after:content-[''] after:absolute after:h-[3px] after:bg-main-yellow after:w-full 
                        after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            to={() => logout()}
          >
            로그아웃
          </Link>
          
          {/* 마이페이지 */}
          <Link to={"http://localhost:3000/mypage" }>
            <RiUser5Line className="size-8 text-slate-600 hover:text-slate-900 hover:bg-main-yellow rounded-2xl p-1" />
          </Link>
        </div>
      );
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000");
  };

  // const menuNames = [
  //   "서비스 소개",
  //   "상품",
  //   "매장찾기",
  //   "서비스",
  //   "이벤트",
  //   "고객센터",
  // ];

  // const menuLinks = [
  //   "/about",
  //   "/productlist",
  //   "/store",
  //   "/post",
  //   "/event",
  //   "/customercenter",
  // ];

  const menus = [
    { name: "서비스 소개", to: "/about" },
    { name: "상품", to: "/productlist" },
    { name: "매장찾기", to: "/store" },
    { name: "서비스", to: "/post" },
    { name: "이벤트", to: "/event" },
    { name: "고객센터", to: "/customercenter" },
  ];

  return (
    <div
      className="mx-auto pt-6 pb-4 sm:px-4 sm:py-0 lg:px-8 
                backdrop-blur-md shadow-md
                transition duration-700 hover:bg-slate-50"
    >
      <nav className="relative z-10 flex px-6 sm:px-2 items-center justify-between sm:bg-slate-50">
        {/* 홈 로고 */}
        <Link to="http://localhost:3000" className="mb-3 ml-10 sm:ml-3">
          <img
            src={FullLogoImg}
            alt="pickme logo"
            className="sm:size-24 md:size-28"
          />
        </Link>
        
        {/* 메뉴 links */}
        <div className="sm:hidden">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              className="relative text-xl md:text-lg w-fit inline-block after:block mx-3
                          font-semibold text-slate-500 hover:text-slate-900 transition duration-300
                          after:content-[''] after:absolute after:h-[3px] after:bg-main-yellow after:w-full 
                          after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
              to={menu.to}
            >
              {menu.name}
            </Link>
          ))}
        </div>

        {/* 로그인 */}
        {/* flex items-center gap-x-5 md:gap-x-8 */}
        <div
          className="float-right flex items-center"
          mobileMenuOpen={mobileMenuOpen}
        >
          <div className="md:block my-1.5">
            <Logincom />
            {/* <a className="inline-block rounded-lg px-1.5 py-1 text-base font-bold text-slate-500 md:text-sm hover:text-slate-900" href="/login">Sign in</a> */}
            {adminName === "하기성" && (
              <Link
                className="inline-block rounded-lg mx-1.5 text-base font-bold text-slate-500 md:text-sm
                          hover:text-slate-900 border-transparent border-b-4 transition hover:border-sub-yellow"
                to="/manager/orderchart"
              >
                관리자
              </Link>
            )}
            {/* <Link
              className="inline-block px-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 
                          lg:text-base border-transparent border-b-4 transition hover:border-sub-yellow"
              to="/mypage"
            >
              마이페이지
            </Link> */}
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
