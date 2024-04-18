// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/main/PromotionStyle.css";

// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const tags = [
  {
    id: 1,
    name: "1 + 1",
  },
  {
    id: 2,
    name: "2 + 1",
  },
  {
    id: 3,
    name: "신상품",
  },
];

const AdProductSet = (prop) => {
  const [selectedTag, setSelectedTag] = useState(1);
  const [products, setProducts] = useState([]);
  const navigator = useNavigate();

  function getProducts(tag) {
    axios
      .get("/product/promotedproductlist", { params: { tag: tag } })
      .then((resp) => {
        // console.log(resp.data);
        setProducts(resp.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleSelectedTag = (tagId) => {
    console.log(tagId);
    setSelectedTag(tagId);
  };

  function handlenavi() {
    prop.choiceHandle('bogo');
    window.localStorage.setItem('product', '확인');
    navigator("/productlist/0");
  }

  useEffect(() => {
    // console.log(selectedTag);
    getProducts(selectedTag); // 페이지가 처음으로 로드될 때 기본 태그에 맞는 상품 가져오기
  }, [selectedTag]);

  return (
    <>
      <div className="bg-white rounded-2xl m-auto mb-11 drop-shadow-2xl">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              이달의 행사 상품
            </h1>
            <button 
              className="text-slate-500 lg:text-xl md:text-lg sm:text-lg font-bold tracking-tight hover:text-slate-800 transition duration-300"
              onClick={handlenavi}
            >
              더보기
            </button>
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
        </div>
      </div>
    </>
  );
};
export default AdProductSet;
