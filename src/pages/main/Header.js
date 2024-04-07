// import logoImg from '../../assets/imgs/logo/logo.svg';
import { useState } from "react";
import { Link } from "react-router-dom";
import FullLogoImg from "../../assets/imgs/logo/fullLogo.svg";
// import ShortLogoImg from "../../assets/imgs/logo/logo.svg";
import { RiUser5Fill } from "react-icons/ri";
// import { BsCart4 } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
// import { Disclosure } from "@headlessui/react";
// import Toast from '../public/Toast';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const Logincom = () => {
    if (
      localStorage.getItem("name") === null &&
      localStorage.getItem("jwt") === null
    ) {
      console.log(localStorage.getItem("jwt"));
      return (
        <div className="flex">
          <Link
            className="relative w-fit inline-block after:block mx-2
                        font-semibold text-slate-500 hover:text-slate-900 transition duration-300
                        after:content-[''] after:absolute after:h-[3px] after:bg-main-yellow after:w-full 
                        after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            to="/login"
          >
            로그인
          </Link>

          {/* 장바구니 */}
          <Link to={ "http://localhost:3000/mypage" } className="group" onClick={()=>setMobileMenuOpen(false)}>
            <span className="absolute py-1 px-1.5 w-max bg-transparent text-transparent translate duration-300 group-hover:bg-main-orange
                            text-xs group-hover:text-white font-medium rounded-xl sm:top-4 sm:right-12 md:top-6 md:right-2 lg:top-0 lg:right-2"
            >
              장바구니
            </span>
            <FaShoppingCart className="size-6 ml-1.5 text-slate-500 hover:text-main-orange" />
          </Link>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          {/* 로그아웃 */}
          <Link
            className="relative w-fit inline-block after:block mx-1
                        font-semibold text-slate-500 hover:text-slate-900 transition duration-300
                        after:content-[''] after:absolute after:h-[3px] after:bg-main-yellow after:w-full 
                        after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            to={() => logout()}
          >
            로그아웃
          </Link>

          {/* 마이페이지 */}
          <Link to={ "http://localhost:3000/mypage" } className="group" onClick={()=>setMobileMenuOpen(false)}>
            <span className="absolute py-1 px-1.5 w-max bg-transparent text-transparent translate duration-300 group-hover:bg-main-orange
                            text-xs group-hover:text-white font-medium rounded-xl sm:top-4 sm:right-[78px] md:top-6 md:right-9 lg:top-0 lg:right-9"
            >
              마이페이지
            </span>
            <RiUser5Fill className="size-6 mx-1 text-slate-500 rounded-2xl hover:text-main-orange" />
          </Link>

          {/* 장바구니 */}
          <Link to={ "http://localhost:3000/mypage" } className="group" onClick={()=>setMobileMenuOpen(false)}>
            <span className="absolute py-1 px-1.5 w-max bg-transparent text-transparent translate duration-300 group-hover:bg-main-orange
                            text-xs group-hover:text-white font-medium rounded-xl sm:top-4 sm:right-12 md:top-6 md:right-2 lg:top-0 lg:right-2"
            >
              장바구니
            </span>
            <FaShoppingCart className="size-6 ml-1.5 text-slate-500 hover:text-main-orange" />
          </Link>
        </div>
      );
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000");
  };

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
      className={`mx-auto pt-6 pb-4 sm:p-0 lg:px-8 
                backdrop-blur-md shadow-md
                transition duration-700 hover:bg-slate-50
                ${mobileMenuOpen ? "bg-white" : ""}`}
    >
      <nav className="relative z-10 flex px-6 sm:px-4 items-center justify-between">
        {/* 홈 로고 */}
        <Link to="http://localhost:3000" className="pb-2 ml-10 sm:ml-3">
          <img
            src={FullLogoImg}
            alt="pickme full logo"
            className="sm:size-24 md:size-28"
            onClick={()=>setMobileMenuOpen(false)}
          />
          {/* <img
            src={ShortLogoImg}
            alt="pickme short logo"
            className="sm:size-10 md:hidden lg:hidden"
          /> */}
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
          <div className="md:block flex items-center my-1.5">
            <Logincom />
            
            {/* <a className="inline-block rounded-lg px-1.5 py-1 text-base font-bold text-slate-500 md:text-sm hover:text-slate-900" href="/login">Sign in</a> 
            {adminName === "하기성" && (
               <Link className="inline-block rounded-lg px-1.5 py-1 text-base font-bold text-slate-500 md:text-sm hover:text-slate-900" to="/manager/orderchart">관리자</Link>
            )}
            {adminName === "곽두필" && (
               <Link className="inline-block rounded-lg px-2 py-1 text-2xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" to="/pomain">점주</Link>
            )}
            <Link
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
          <div className="mx-2 my-1 md:hidden lg:hidden z-10">
            <div data-headlessui-state="">
              <button
                type="button"
                aria-label="Toggle Navigation"
                aria-expanded="false"
                data-headlessui-state=""
                className="relative flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none group"
                // id="headlessui-popover-button-:Rbpnla:"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 overflow-visible stroke-slate-500 group-hoverfill-slate-900 group-focus:fill-slate-900"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path
                    d="M0 1H14M0 7H14M0 13H14"
                    className="origin-center transition"
                  ></path>
                  <path
                    d="M2 2L12 12M12 2L2 12"
                    className="origin-center transition scale-90 opacity-0"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mt-6 z-20 h-screen w-screen transition-all duration-1000
                    ${mobileMenuOpen ? "bg-white opacity-1" : "opacity-0 h-0"} md:hidden lg:hidden`}
      >
        <div className="-my-8 pt-3 flex flex-col items-center">
          {menus.map((menu) => (
            <div className="flex flex-col items-center">
              <Link
              key={menu.name}
              to={menu.to}
              onClick={()=>setMobileMenuOpen(false)}
              className="inline-block text-base relative w-fit after:block peer
                      font-semibold text-slate-500 hover:text-slate-900 transition duration-300
                      after:content-[''] after:absolute after:h-[3px] after:-left-[20px] after:bg-main-yellow after:w-[112px]
                      after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
              >
                <p className="my-4">
                  {menu.name}
                </p>
              </Link>
              <hr className="w-28 border-2 border-slate-200" />
            </div>
          ))}
          {/* 마이페이지 */}
          {/* <Logincom /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
