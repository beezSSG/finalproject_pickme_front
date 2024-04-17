import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyGift() {
  const [giftData, setGiftData] = useState();
  const [type, setType] = useState(0);

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    try {
      const response = await axios.get("product/getMyGift");
      setGiftData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  // 진행 중인 이벤트만 보여주는 함수
  const canCouponHandle = () => {
    setType(0);
  };

  // 종료된 이벤트만 보여주는 함수
  const expCouponHandle = () => {
    setType(1);
  };

  // 이미지에 흑백 필터를 적용하는 함수
  const applyGrayScaleFilter = (url) => {
    return {
      filter: "grayscale(100%)", // 흑백 필터
      backgroundImage: `url(${url})`, // 이미지 배경 설정
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <div className="w-[80%] mx-auto">
      <div className="grid grid-cols-2 gap-10 sm:gap-1">
        <button
          onClick={canCouponHandle}
          className="focus:outline-none text-gray-800 bg-main-yellow hover:bg-sub-orange font-bold focus:ring-4 focus:ring-yellow-300 rounded-lg mb-10 py-3"
        >
          사용가능
        </button>
        <button
          onClick={expCouponHandle}
          className="focus:outline-none text-main-yellow bg-gray-800 hover:bg-gray-600 font-bold focus:ring-4 focus:ring-gray-800 rounded-lg text-sm mb-10 py-3"
        >
          사용완료
        </button>
      </div>

      <div className="w-[80%] mt-5 mx-auto grid grid-cols-3 gap-11 md:grid-cols-2 sm:grid-cols-1">
        {giftData &&
          giftData.map((product) => {
            if (
              (type === 0 && product.useYn === 0) ||
              (type === 1 && product.useYn === 1)
            ) {
              return (
                <div
                  key={product.id}
                  className="mb-10 items-center rounded-xl border border-spacing-2 w-full text-center"
                >
                  <div className="mt-5">
                    <Link to={`/mypage/giftdetail/${product.id}`}>
                      <img
                        src={product.productUrl}
                        alt={product.productName}
                        className="mx-auto w-[60%]"
                        style={
                          type === 1
                            ? applyGrayScaleFilter(product.productUrl)
                            : {}
                        }
                      />
                    </Link>
                    <div className="mt-5">{product.productName}</div>
                    <div>
                      <span>선물한 사람 : {product.giftUserName}</span>
                    </div>
                    <div>
                      <span>유효기간 : {product.expDay}</span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
