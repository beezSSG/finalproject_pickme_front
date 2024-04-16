import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/main/PromotionStyle.css";

// import required modules
import { Autoplay, Keyboard, Pagination } from "swiper/modules";

import { useAuth } from "../../utils/AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const MainPickBox = () => {
  const [boxData, setBoxData] = useState();
  const { token } = useAuth();

  const getMyPickBox = async () => {
    await axios
      .get("mypage/MyPickBox")
      .then((response) => {
        setBoxData(response.data);
      })
      .catch((err) => {
        // alert(err);
      });
  };

  useEffect(() => {
    getMyPickBox();
  }, []);

  function dDay(expDay) {
    // 현재 날짜와 종료 날짜 간의 차이 계산
    const today = moment();
    const end = moment(expDay);
    const duration = moment.duration(end.diff(today));
    const days = duration.asDays();

    // 남은 일수를 상태에 설정
    return days.toFixed(0); // 소수점 아래는 버림
  }

  if (!token) {
    return null;
  } else {
    return (
      <div className="bg-white rounded-2xl m-auto mb-11 drop-shadow-2xl">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              내 Pick Box
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              <button>더보기</button>
            </h2>
          </div>
          <br />
          <div className="w-[80%] mx-auto">
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
              modules={[Autoplay, Keyboard, Pagination]}
              className="mySwiper"
            >
              {boxData &&
                boxData.map((product, index) => (
                  <SwiperSlide key={index} className="productItem flex flex-col">
                      <div className="relative">
                          <img src={product.purl} alt={product.pname} className="mx-auto w-[60%]" />
                          <div className="absolute top-0 right-0 bg-red-600 text-white p-2 m-2 rounded">
                              남은기한: {dDay(product.expDate)}일
                          </div>
                      </div>
                    <div className="productItem__description p-4">
                      <h4>{product.pname}</h4>
                      {/* <p>구매일: {product.date}</p> */}
                      {/* <p>구매점포: {product.sname}</p> */}
                      <p>구매수량: {product.quantity}</p>
                      {/* <p>
                        소비기한: <b>{product.expDate}</b>
                      </p> */}
                      {/* <p>
                        남은기한: <b>{dDay(product.expDate)}일</b>
                      </p> */}
                    </div>
                    <br />
                    <br />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }
};
export default MainPickBox;