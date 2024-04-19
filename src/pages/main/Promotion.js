
// npm install swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/main/PromotionStyle.css";
import { Link, Navigate } from 'react-router-dom';

const Promotion = () => {
  const [eventList, setEventList] = useState([]);

  function eventlist() {
    axios
      .get("/manager/eventlist")
      .then(function (resp) {
        // console.log(resp.data);
        setEventList(resp.data);
      })
      .catch(function () {
        console.log("error");
      });
  }

  useEffect(function () {
    window.localStorage.removeItem('product');
    eventlist();
  }, []);

  return (
    <>
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
        {eventList.map(
          (event, index) =>
            event.promotionYn === 0 && (
              <SwiperSlide key={index}>
                <img src={event.bannerPhoto} alt={`이벤트 ${index + 1}`} />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </>
  );
};
export default Promotion;
