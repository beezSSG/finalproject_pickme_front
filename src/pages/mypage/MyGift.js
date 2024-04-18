import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FullLogoImg from "../../assets/imgs/logo/fullLogo.svg"; // full 로고 이미지

export default function MyGift(prop) {
  const [giftData, setGiftData] = useState();
  const [type, setType] = useState(0);

  useEffect(() => {
    prop.whereHandle("선물함");
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
                  className={`mb-10 items-center w-full text-center rounded-xl shadow-md
                  ${type === 0 ? "transition duration-500 ease-in-out transform hover:ring-4 hover:ring-amber-400" : ""}`}>
                  <div className="mt-5">
                    {type === 0 ? (
                      <Link to={`/mypage/giftdetail/${product.id}`}>
                        <div className=" ">
                          <img
                            src={product.productUrl}
                            alt={product.productName}
                            className="mx-auto w-[80%] cursor-pointer"
                          />
                          <div className="w-[80%] m-auto mb-4" align="left">
                            <img src={FullLogoImg} className="size-20 mt-5 ml-2"/> 
                            <p className="font-bold">{product.productName}</p>
                            <p>보낸 사람 : {product.giftUserName}</p>
                            <p>유효기간 : {product.expDay}</p>                    
                          </div>
                        </div>                        
                        
                      </Link>
                    ) : (
                      <div>
                        <img
                          src={product.productUrl}
                          alt={product.productName}
                          className="mx-auto w-[80%]"
                          style={applyGrayScaleFilter(product.productUrl)}
                        />
                        <div className="w-[80%] m-auto mb-4 " align="left">
                          <img src={FullLogoImg} className="size-20 mt-5 ml-2 grayscale"/> 
                          <p className="font-bold">{product.productName}</p>
                          <p>보낸 사람 : {product.giftUserName}</p>
                          <p>유효기간 : {product.expDay}</p>                    
                        </div>
                      </div>
                    )}

                    

                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
