import { useState } from "react";
import { Link } from "react-router-dom";

// 즉석조리 - 컵라면
import InstantIcon_top from "../../assets/imgs/main/searchProduct/instant/instant_top.svg";
import InstantIcon_body from "../../assets/imgs/main/searchProduct/instant/instant_body.svg";

// 간편식사 - 햄버거
import ConvIcon_top from "../../assets/imgs/main/searchProduct/conv/hamburger_topbun.svg";
import ConvIcon_btm from "../../assets/imgs/main/searchProduct/conv/hamburger_btmGroup.svg";

// 아이스 - 아이스크림
import IcecreamIcon_drop from "../../assets/imgs/main/searchProduct/icecream/droppingCream2.svg";
import IcecreamIcon_body from "../../assets/imgs/main/searchProduct/icecream/icecream.svg";

// 스낵/과자류 - 도넛
import SnackIcon_bf from "../../assets/imgs/main/searchProduct/snack/snackBF.svg";
import SnackIcon_af from "../../assets/imgs/main/searchProduct/snack/snackAF.svg";

// 생활용품 - 세제
import Household_top from "../../assets/imgs/main/searchProduct/household/household_top.svg";
import Household_body from "../../assets/imgs/main/searchProduct/household/household_body.svg";
import Bubble_bf from "../../assets/imgs/main/searchProduct/household/bubbleBF.svg";
import Bubble_af from "../../assets/imgs/main/searchProduct/household/bubbleAF.svg";

// 음료 - 캔음료
import Drink_bf from "../../assets/imgs/main/searchProduct/drink/drink_body.svg";
import Drink_af from "../../assets/imgs/main/searchProduct/drink/drink.svg";

// 식품 - 삶은 계란
import Egg_behind from "../../assets/imgs/main/searchProduct/food/eggLeft.svg";
import Egg_front from "../../assets/imgs/main/searchProduct/food/eggRight.svg";

const SearchProduct = () => {
  const [drinkHovered, setDrinkHovered] = useState(false);
  const [donutHovered, setDonutHovered] = useState(false);

  const [search, setSearch] = useState("");

  return (
    <>
      <div className="bg-white drop-shadow-2xl rounded-2xl m-auto mb-11">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between mb-11">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              상품찾기
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-slate-500 hover:text-slate-900 transition duration-300">
              <button>더보기</button>
            </h2>
          </div>
          <form className="flex items-center justify-center">
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-screen">
              <input
                type="search"
                // id="voice-search"
                className="py-6 bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs text-lg
                          rounded-lg focus:border-gray-300 focus-visible:ring-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500
                          hover:drop-shadow-xl duration-300 ease-in-out text-center
                          block w-full ps-10 px-12"
                placeholder="찾고 싶은 상품을 입력하세요!"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />

              <div>
                {/* 음성검색 버튼 */}
                {/* <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-12
                            text-gray-400 hover:text-gray-700 transition-colors duration-400 ease-in-out "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                    />
                  </svg>
                </button> */}

                {/* 검색 버튼 */}
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-4
                      text-gray-400 focus:outline-none focus:text-gray-800
                      hover:text-gray-700 transition-colors duration-400 ease-in-out 
                       rounded-full text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* <button
              type="submit"
              // className="inline-flex items-center py-5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            > */}
          </form>

          {/* 상품 카테고리 아이콘 */}
          <section className="mt-10 p-5 sm:p-2 rounded-full bg-[#ffe992] flex flex-col items-center">
            <h1 className="font-bold mt-[5%] text-slate-800 sm:text-xl md:text-3xl lg:text-4xl">
              음식을 터치해 보세요!
            </h1>
            <div className="flex justify-between items-end">
              {/* 음료 */}
              <div
                className="relative group"
                onMouseEnter={() => setDrinkHovered(true)}
                onMouseLeave={() => setDrinkHovered(false)}
              >
                <p
                  className="absolute z-10 sm:top-[40%] sm:left-[23%] sm:text-sm md:left-[30%] md:text-xl
                            top-[45%] lg:left-[25%] lg:text-5xl text-center font-semibold text-transparent rounded-full 
                            group-hover:text-white group-hover:mt-[11%] transition duration-200"
                >
                  음료
                </p>
                <Link to="/productlist/1">
                  <img
                    src={drinkHovered ? Drink_af : Drink_bf}
                    alt="음료 카테고리 아이콘"
                    className="transition duration-300 w-[80%]"
                  />
                </Link>
              </div>

              {/* 간편식사 */}
              <div className="relative group mb-30">
                <p
                  className="absolute sm:p-1.5 sm:top-[50%] sm:left-[27%] sm:text-sm md:p-2.5 md:top-[55%] md:left-[35%] md:text-xl 
                              lg:p-3 lg:top-[56%] lg:left-[28%] lg:text-5xl
                              text-center font-semibold bg-transparent text-transparent rounded-full 
                            group-hover:bg-[#f8a100] group-hover:text-white transition duration-300"
                >
                  간편식사
                </p>
                <Link to="/productlist/2">
                  <img
                    src={ConvIcon_top}
                    alt="간편식사 카테고리 아이콘 top"
                    className="z-10 translate-y-[55%] scale-[80%] transition duration-300 ease-in-out translate-x-0 group-hover:translate-x-[10%] group-hover:translate-y-[25%] group-hover:rotate-45 transform"
                  />
                  <img
                    src={ConvIcon_btm}
                    alt="간편식사 카테고리 아이콘 bottom"
                    className="scale-[85%]"
                  />
                </Link>
              </div>

              {/* 즉석조리 */}
              <div className="relative group mb-[5%]">
                <p
                  className="absolute w-full sm:top-[60%] sm:text-sm md:top-[60%] md:text-xl
                              left-0 lg:top-[60%] lg:text-5xl
                              text-center font-semibold bg-transparent text-transparent rounded-full 
                            group-hover:text-white transition duration-300 z-10"
                >
                  즉석조리
                </p>
                <Link to="/productlist/3">
                  <img
                    src={InstantIcon_top}
                    alt="즉석조리 카테고리 아이콘 top"
                    className="translate-y-[60%] -translate-x-2.5 transition duration-300 ease-in-out group-hover:translate-x-4 group-hover:translate-y-0 group-hover:-rotate-12 transform"
                  />
                  <img
                    src={InstantIcon_body}
                    alt="즉석조리 카테고리 아이콘 body"
                    className="relative"
                  />
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* 과자류 */}
              <div
                className={`relative group ${donutHovered ? "mr-[1%]" : ""}`}
                onMouseEnter={() => setDonutHovered(true)}
                onMouseLeave={() => setDonutHovered(false)}
              >
                <p
                  className="absolute sm:w-[40%] sm:text-xs md:p-2.5 md:text-lg
                            mb-2 lg:p-3 top-[20%] left-[60%] lg:text-4xl text-center
                            font-semibold bg-transparent text-transparent rounded-full 
                            group-hover:bg-[#ff6e7f] group-hover:text-white transition duration-400"
                >
                  과자
                </p>
                <Link to="/productlist/4">
                  <img
                    src={donutHovered ? SnackIcon_af : SnackIcon_bf}
                    alt="과자류 카테고리 아이콘"
                    className="transition duration-300 scale-90"
                  />
                </Link>
              </div>

              {/* 아이스크림 */}
              <div className="sm:px-0 relative group">
                <p
                  className="absolute z-10 sm:p-0 sm:text-xs md:text-xl sm:left-[24%] top-[48%] md:left-[27%] lg:left-[25%] lg:text-4xl
                              text-center font-semibold bg-transparent text-transparent rounded-full 
                            group-hover:text-[#E091BB] transition duration-300"
                >
                  아이스크림
                </p>
                <Link to="/productlist/5">
                  <div className="relative group">
                    <img
                      src={IcecreamIcon_drop}
                      alt="아이스크림 카테고리 아이콘 drop"
                      className="absolute z-10 w-[15%] top-[60%] left-[50%] transition-transform transform group-hover:animate-melt"
                    />

                    <img
                      src={IcecreamIcon_body}
                      alt="아이스크림 카테고리 아이콘 body"
                      className="scale-[70%]"
                    />
                  </div>
                </Link>
              </div>

              {/* 식품 */}
              <div className="relative group">
                <Link to="/productlist/6">
                  <div className="relative">
                    <p
                      className="absolute sm:p-[0.2rem] sm:text-xs sm:top-[10%] sm:left-[19%] md:p-1.5 md:top-[16%] md:left-[23%]
                                  lg:p-2 lg:top-[15%] lg:left-[23%]
                                  text-center lg:text-3xl font-semibold bg-transparent text-transparent rounded-full 
                                 group-hover:bg-[#FDC830] group-hover:text-white transition duration-300"
                    >
                      식품
                    </p>
                    <img
                      src={Egg_behind}
                      alt="식품 카테고리 아이콘 behind"
                      className="w-[86%]"
                    />
                  </div>
                  <img
                    src={Egg_front}
                    alt="식품 카테고리 아이콘 front"
                    className="absolute sm:w-[90%] md:w-[86%]
                                lg:w-[86%] top-0 left-0
                                transition duration-300 ease-in-out group-hover:-translate-x-[60%]
                                group-hover:translate-y-[10%] group-hover:-rotate-12 transform"
                  />
                </Link>
              </div>

              {/* 생활용품 */}
              <div className="group relative">
                <p
                  className="sm:text-xs md:text-xl lg:text-3xl top-[60%] right-[35%]
                              absolute z-10 text-center font-semibold bg-transparent text-transparent rounded-full 
                            group-hover:text-white transition duration-300"
                >
                  생활용품
                </p>
                <Link to="/productlist/7">
                  <img
                    src={Bubble_bf}
                    alt="생활용품 카테고리 아이콘 bubble before"
                    className="absolute opacity-0 w-[20%] right-[54%] top-[25%] group-hover:animate-bubble"
                  />
                  <img
                    src={Bubble_af}
                    alt="생활용품 카테고리 아이콘 bubble after"
                    className="absolute opacity-0 w-[20%] right-[55%] top-[5%] group-hover:animate-pop"
                  />
                  <img
                    src={Household_top}
                    alt="생활용품 카테고리 아이콘 top"
                    className="scale-[20%] translate-y-[56%] -translate-x-[14%] transition duration-300 ease-in-out 
                                    group-hover:translate-x-4 group-hover:-translate-y-2 group-hover:rotate-45 transform"
                  />
                  <img
                    src={Household_body}
                    alt="생활용품 카테고리 아이콘 body"
                    className="scale-90"
                  />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
