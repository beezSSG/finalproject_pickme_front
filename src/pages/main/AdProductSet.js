// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/main/PromotionStyle.css";

// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
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

const AdProductSet = () => {
  const [selectedTag, setSelectedTag] = useState(1);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    // console.log(selectedTag);
    getProducts(selectedTag); // 페이지가 처음으로 로드될 때 기본 태그에 맞는 상품 가져오기
  }, [selectedTag]);

  return (
    <>
      <div className="bg-white rounded-2xl m-auto mb-11 drop-shadow-2xl">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-bold tracking-tight text-slate-900">
              이달의 행사 상품
            </h1>
            <Link
              className="text-slate-500 lg:text-xl md:text-lg sm:text-lg font-bold tracking-tight hover:text-slate-800 transition duration-300"
              to=""
            >
              더보기
            </Link>
          </div>

          {/* 상품 분류 태그 */}
          <ul className="flex flex-wrap my-4 gap-2">
            {tags.map((tag) => (
              <li className="mb-1.5 mx-1" key={tag.id}>
                <input
                  value={tag.id}
                  type="radio"
                  className="hidden peer"
                  name="tag"
                  id={tag.name}
                  onChange={()=>handleSelectedTag(tag.id)}
                  checked={selectedTag === tag.id}
                />
                <label
                  htmlFor={tag.name}
                  className="inline-flex items-center justify-between p-3 text-xl font-extrabold text-center text-slate-600 border-2
                          border-slate-300 rounded-full cursor-pointer transition duration-300 ease-in-out 
                          hover:bg-main-orange hover:border-sub-orange hover:text-slate-900 peer-checked:text-slate-900
                          peer-checked:bg-main-orange peer-checked:border-sub-orange"
                >
                  <div className="w-full text-xl font-extrabold text-center">
                    {tag.name}
                  </div>
                </label>
              </li>
            ))}
          </ul>
          {/* 상품 목록 */}

          {/* 행사 상품 슬라이더 */}
          <Swiper
            slidesPerView={3}
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
            { 
              products &&
              products.map((product) => (
                <SwiperSlide key={product.id} className="flex flex-col py-[5%]">
                  <img src={product.url} alt={`이벤트상품 ${product.id}`} />
                  <h1 className="py-[3%] font-bold text-center text-slate-800 lg:text-xl md:text-lg sm:text-sm">{product.name}</h1>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default AdProductSet;
