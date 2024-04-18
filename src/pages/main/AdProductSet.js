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
          {/* 상품 목록 */}

          {/* 행사 상품 슬라이더 */}
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
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default AdProductSet;
