import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/main/PromotionStyle.css";

// import required modules
import { Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const AdProductSet = () => {
  return (
    <>
      <div className="bg-white rounded-2xl m-auto mb-11 drop-shadow-2xl">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-bold tracking-tight text-slate-900">
              이달의 행사 상품
            </h1>
            <Link className="text-slate-500 lg:text-xl md:text-lg sm:text-lg font-bold tracking-tight hover:text-slate-800 transition duration-300"
                  to="">
              더보기
            </Link>
          </div>
          {/* 상품 분류 태그 */}
          <span>
            <button>1+1</button>
          </span>
          &nbsp;&nbsp;
          <span>
            <button>2+1</button>
          </span>
          &nbsp;&nbsp;
          <span>
            <button>신상품</button>
          </span>
          {/* 상품 목록 */}
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Keyboard, Pagination]}
            className="mySwiper AdProductSet__Slider"
          >
            <SwiperSlide className="productItem flex flex-col" width={100}>
              <img
                src="https://www.emart24.co.kr/image/MTA1NDc1"
                alt="Front of men's Basic Tee in black."
              />
              <div className="productItem__description">
                <h4>조지아)리치아로마스위트270ml</h4>
                <h3 className="font-bold text-xl">2400원</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="productItem flex flex-col">
              <img
                src="https://www.emart24.co.kr/image/MTA2MDUx"
                alt="Front of men's Basic Tee in white."
              />
              <div className="productItem__description">
                <h4>슈가로로)스파클링복숭아사이다350ml</h4>
                <h3 className="font-bold text-xl">1800원</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="productItem flex flex-col">
              <img
                src="https://www.emart24.co.kr/image/MTA1OTI1"
                alt="Front of men's Basic Tee in black."
              />
              <div className="productItem__description">
                <h4>동원)보성홍차아이스티복숭아500ml</h4>
                <h3 className="font-bold text-xl">2200원</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="productItem flex flex-col">
              <img
                src="https://www.emart24.co.kr/image/MTA3MjAz"
                alt="Front of men's Basic Tee in dark gray."
              />
              <div className="productItem__description">
                <h4>후버)파인애플&사과&포도주스200ml(S)</h4>
                <h3 className="font-bold text-xl">1200원</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="productItem flex flex-col">
              <img
                src="https://www.emart24.co.kr/image/MTA3MjA1"
                alt="Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube."
              />
              <div className="productItem__description">
                <h4>후버)복숭아&포도주스200ml(S)</h4>
                <h3 className="font-bold text-xl">1200원</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="productItem flex flex-col">
              <img
                src="https://www.emart24.co.kr/image/MTA2NjMx"
                alt="Front of men's Basic Tee in white."
              />
              <div className="productItem__description">
                <h4>츄파춥스)사워바이츠60g</h4>
                <h3 className="font-bold text-xl">1400원</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="productItem flex flex-col">
              <img
                src="https://www.emart24.co.kr/image/MTA2MTM5"
                alt="Front of men's Basic Tee in dark gray."
              />
              <div className="productItem__description">
                <h4>오뚜기)맛있는오곡밥210g</h4>
                <h3 className="font-bold text-xl">2700원</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="productItem flex flex-col">
              <img
                src="https://www.emart24.co.kr/image/MTA1ODUw"
                alt="Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube."
              />
              <div className="productItem__description">
                <h4>조지아)리치아로마스위트270ml</h4>
                <h3 className="font-bold text-xl">2400원</h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="productItem flex flex-col">
              <img
                src="https://www.emart24.co.kr/image/MTA1OTI0"
                alt="Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube."
              />
              <div className="productItem__description">
                <h4>동원)보성홍차아이스티레몬500ml</h4>
                <h3 className="font-bold text-xl">2200원</h3>
              </div>
            </SwiperSlide>
            <br />
            <br />
          </Swiper>
          {/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div className="group relative ">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src="https://www.emart24.co.kr/image/MTA1NDc1"
                  alt="Front of men's Basic Tee in black."
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="/">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      딸기타임
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">생과일딸기우유</p>
                </div>
                <p className="text-sm font-medium text-gray-900">40,000원</p>
              </div>
            </div>
            <div className="group relative productItem">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src="https://www.emart24.co.kr/image/MTA2MDUx"
                  alt="Front of men's Basic Tee in white."
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="/">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      SUGALLOLO
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">스파클링복숭아맛</p>
                </div>
                <p className="text-sm font-medium text-gray-900">30,000원</p>
              </div>
            </div>
            <div className="group relative productItem">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src="https://www.emart24.co.kr/image/MTA1NDAx"
                  alt="Front of men's Basic Tee in dark gray."
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="/">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      아침에 주스
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">100%생과일</p>
                </div>
                <p className="text-sm font-medium text-gray-900">25,000원</p>
              </div>
            </div>
            <div className="group relative productItem">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src="https://www.emart24.co.kr/image/MTA1ODUw"
                  alt="Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube."
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="/">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      고티카 빈티지
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">나의 생명수</p>
                </div>
                <p className="text-sm font-medium text-gray-900">10,000원</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default AdProductSet;
