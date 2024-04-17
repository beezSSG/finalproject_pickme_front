// import logoImg from '../../assets/imgs/logo/logo.svg';
import { useState } from "react";
import { Link } from "react-router-dom";

// 이미지 및 아이콘
import FullLogoImg from "../../assets/imgs/logo/fullLogo.svg"; // full 로고 이미지

import { RiUser5Fill } from "react-icons/ri"; // 마이페이지 아이콘
import { FaShoppingCart } from "react-icons/fa"; // 장바구니 메뉴 아이콘

function Header() {
  const [mobilemenuopen, setMobilemenuopen] = useState(false);

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
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          {/* 로그아웃 */}
          <button
            className="relative w-fit inline-block after:block mx-1
                        font-semibold text-slate-500 hover:text-slate-900 transition duration-300
                        after:content-[''] after:absolute after:h-[3px] after:bg-main-yellow after:w-full
                        after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
            onClick={logout}
          >
            로그아웃
          </button>

          {/* 마이페이지 */}
          <Link
            to="mypage"
            className="group"
            onClick={() => setMobilemenuopen(false)}
          >
            <span
              className="absolute py-1 px-1.5 w-max bg-transparent text-transparent translate duration-300 group-hover:bg-main-orange
                          text-xs group-hover:text-white font-medium rounded-xl sm:top-4 sm:right-[78px] md:top-6 md:right-9 lg:top-0 lg:right-9"
            >
              마이페이지
            </span>
            <RiUser5Fill className="size-6 mx-1 text-slate-500 rounded-2xl hover:text-main-orange" />
          </Link>

          {/* 장바구니 */}
          <Link
            to="/mypage/cart"
            className="group"
            onClick={() => setMobilemenuopen(false)}
          >
            <span
              className="absolute py-1 px-1.5 w-max bg-transparent text-transparent translate duration-300 group-hover:bg-main-orange
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
    window.location.href = "/";
  };

  const menus = [
    { name: "소개", to: "/about" },
    { name: "상품", to: "/productlist" },
    { name: "매장찾기", to: "/store" },
    { name: "택배 예약", to: "/post" },
    { name: "픽업 예약", to: "/productreservation" },
    { name: "이벤트", to: "/event" },
    { name: "고객센터", to: "/customercenter" },
  ];

  // 서비스 하위 메뉴
  function ServiceSubMenus(menu) {
    // console.log(service);
    const service = menu.menu;
    return (
      <>
        {menu && (
          <div id="service_menu" className="group inline-block">
            <div className="relative flex-cols items-center">
              <span
                className="relative text-xl md:text-lg w-fit inline-block after:block mx-3
                          font-semibold text-slate-500 hover:text-slate-900 transition duration-300
                          after:content-[''] after:absolute after:h-[3px] after:bg-main-yellow after:w-full 
                          after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center
              "
              >
                {service.name}
              </span>
            </div>

            <div className="mt-3 opacity-0 h-0 group-hover:opacity-100 group-hover:h-full transition duration-500">
              <ul className="absolute flex-col justify-center rounded-lg border-2 border-slate-200 bg-white">
                {service.submenus.map((submenu) => (
                  <li
                    key={submenu.name}
                    className="py-2 font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition duration-300"
                  >
                    <Link to={submenu.to} className="px-3">
                      {submenu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`mx-auto pt-6 pb-4 sm:p-0 lg:px-8 
                backdrop-blur-md shadow-md
                transition duration-700 hover:bg-slate-50
                ${mobilemenuopen ? "bg-white" : ""}`}
    >
      <nav className="relative z-10 flex px-6 sm:px-4 items-center justify-between">
        {/* 홈 로고 */}
        <Link to="/" className="pb-2 ml-10 sm:ml-3">
          <img
            src={FullLogoImg}
            alt="pickme full logo"
            className="sm:size-24 md:size-28"
            onClick={() => setMobilemenuopen(false)}
          />
        </Link>

        {/* 메뉴 links */}
        <div className="sm:hidden lg:flex lg:gap-x-8">
          {menus.map((menu) =>
            menu.name !== "서비스" ? (
              // 서비스 메뉴 아니면, 일반 Link
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
            ) : (
              // 서비스 메뉴일 때 Popover 메뉴
              <ServiceSubMenus menu={menu} />
            )
          )}
        </div>

        {/* 로그인 */}
        <div
          className="float-right flex items-center"
          mobilemenuopen={mobilemenuopen.toString()}
        >
          <div className="md:block flex items-center my-1.5">
            <Logincom />
          </div>

          <div className="mx-2 my-1 md:hidden lg:hidden z-10">
            <div data-headlessui-state="">
              <button
                type="button"
                aria-label="Toggle Navigation"
                aria-expanded="false"
                data-headlessui-state=""
                className=" flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none group"
                // id="headlessui-popover-button-:Rbpnla:"
                onClick={() => setMobilemenuopen(!mobilemenuopen)}
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

      <div
        className={`mt-6 z-20 h-screen w-screen md:hidden lg:hidden transition-all duration-1000
                    ${mobilemenuopen ? "opacity-1" : "h-0 opacity-0"}`}
      >
        <div
          className={`-my-8 pt-3 flex flex-col items-center ${
            mobilemenuopen ? "visible" : "hidden"
          }`}
        >
          {menus.map((menu) => (
            <div className="flex flex-col items-center" key={menu.name}>
              <Link
                to={menu.to}
                onClick={() => setMobilemenuopen(false)}
                className="inline-block text-base relative w-fit peer
                        font-semibold text-slate-500 hover:text-slate-900 transition duration-300"
              >
                <p className="my-4">{menu.name}</p>
              </Link>
              <hr className="w-28 border-2 border-slate-200 transition duration-300 peer-hover:border-main-yellow" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
