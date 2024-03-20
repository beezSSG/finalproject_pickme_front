// import Carousel from "react-material-ui-carousel";
// import { Paper } from "@mui/material";
// import { matchPath } from "react-router-dom";
// npm install tw-elements

// npm install swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/main/PromotionStyle.css"

const Promotion = () => {

  return (
    <>
      {/* <Carousel>
        <Paper className="flex-wrap flex justify-center items-center drop-shadow-2xl" sx={{ boxShadow: 0 }}>
          <img src="https://www.emart24.co.kr/image/NzM2NzY=" alt="이벤트1" />
        </Paper>
        <Paper className="flex-wrap flex justify-center items-center drop-shadow-2xl" sx={{ boxShadow: 0 }}>
          <img src="https://www.emart24.co.kr/image/NzM2NDc=" alt="이벤트2" />
        </Paper>
        <Paper className="flex-wrap flex justify-center items-center drop-shadow-2xl" sx={{ boxShadow: 0 }}>
          <img src="https://www.emart24.co.kr/image/NzM1OTU=" alt="이벤트3" />
        </Paper>
      </Carousel> */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://www.emart24.co.kr/image/NzM2NzY=" alt="이벤트1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.emart24.co.kr/image/NzM2NDc=" alt="이벤트2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.emart24.co.kr/image/NzM1OTU=" alt="이벤트3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://www.emart24.co.kr/image/NzM2NzY=" alt="이벤트4" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default Promotion;
