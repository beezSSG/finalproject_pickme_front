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
import { Link } from 'react-router-dom';

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
    return <div></div>;
  } else {
    return (
      <div className="bg-white rounded-2xl m-auto mb-11 drop-shadow-2xl">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-bold tracking-tight text-slate-900">
              나의 Pick Box
            </h1>
            <Link className="text-slate-500 lg:text-xl md:text-lg sm:text-lg font-bold tracking-tight hover:text-slate-800 transition duration-300"
                  to="">
              더보기
            </Link>
          </div>
          <br />
          <div className="mx-auto">
            <Swiper
              slidesPerView={3}
              spaceBetween={0}
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
                boxData.map((product, index) => {
                  let day = dDay(product.expDate);
                  if (dDay(product.expDate).substring(0, 1) === "-") {
                    day = dDay(product.expDate).slice(1, 2);
                    day = "+" + day;
                  }
                  // console.log(day);
                  return (
                    <SwiperSlide
                      key={index}
                      className="productItem flex flex-col"
                    >
                      <div className="relative">
                        <img
                          src={product.purl}
                          alt={product.pname}
                          className="mx-auto w-[60%]"
                        />
                        {
                         <>
                            {(dDay(product.expDate) === "-0" || dDay(product.expDate) === "0") && 
                              (
                                <div className="absolute top-[0.5%] lg:right-0 md:right-0 sm:-right-1 bg-[#EB3349] text-white font-bold lg:text-lg md:text-base sm:text-[8px] p-1 lg:px-2 md:px-2 sm:px-1.5 m-2 rounded-full animate-bounce">
                                  <span className="font-black text-white">
                                    D-Day
                                  </span>
                                </div>
                              )
                            }
                            {dDay(product.expDate) >= 1 && (
                              <div className="absolute top-[1%] lg:right-0 md:right-0 sm:-right-1 bg-main-orange text-white font-bold lg:text-lg md:text-base sm:text-[8px] p-1 lg:px-2 md:px-2 sm:px-1.5 m-2 rounded-full">
                                  <span className="font-black text-white">
                                    D-{dDay(product.expDate)}
                                  </span>
                              </div>
                            )
                            }
                            {(dDay(product.expDate).substring(0, 1) === "-" && dDay(product.expDate).substring(1) >= 1) 
                              && (
                                <div className="absolute top-[1%] lg:right-0 md:right-0 sm:-right-1 bg-slate-400 text-white font-bold lg:text-lg md:text-base sm:text-[8px] p-1 lg:px-2 md:px-2 sm:px-1.5 m-2 rounded-full">
                                  <span className="font-black text-white">
                                    D{day}
                                  </span>
                                </div>
                              )}
                          </>
                        }
                        {/* 
                          <div className="absolute -top-2 lg:right-0 md:right-0 sm:-right-1 bg-[#EB3349] text-white font-bold lg:text-lg md:text-base sm:text-[8px] p-1 lg:px-2 md:px-2 sm:px-1.5 m-2 rounded-full group">
                            {(dDay(product.expDate) === "-0" || dDay(product.expDate) === "0") && <span className="font-black text-white">D-Day</span>}
                            {dDay(product.expDate) >= 1 && <span className="font-black text-white animate-bounce">D-{dDay(product.expDate)}</span>}
                            {(dDay(product.expDate).substring(0, 1) === "-" && dDay(product.expDate).substring(1) >= 1) && <span className="font-black text-white animate-bounce">D{day}</span>}
                          </div> 
                        */}
                      </div>
                      <div className="productItem__description p-4">
                        <h4 className="lg:text-xl md:text-lg sm:text-xs font-medium">
                          {product.pname}
                        </h4>
                        <p className="lg:text-xl md:text-lg sm:text-xs font-medium w-full text-white">
                          {product.quantity}개
                        </p>
                      </div>
                      <br />
                      <br />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }
};
export default MainPickBox;
