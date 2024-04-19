import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';

export default function MyPickBox({whereHandle}) {
  const [boxData, setBoxData] = useState();
  const navi = useNavigate();

  const getMyPickBox = async () => {
    await axios.get("mypage/MyPickBox")
    .then((response)=>{
      console.log(JSON.stringify(response.data));
      // console.log(Object.values(response.data));
      setBoxData(response.data);
    })
    .catch((err)=>{
      // alert(err);
    })
  }

  useEffect(() => {
    whereHandle("Pick Box");
    getMyPickBox();
  }, []);

  function dDay(expDay) {
    // 현재 날짜와 종료 날짜 간의 차이 계산
    const today = moment();
    const end = moment(expDay);
    const duration = moment.duration(end.diff(today));
    const days = duration.asDays();

    // 남은 일수를 상태에 설정
    return(days.toFixed(0)); // 소수점 아래는 버림
  }

  function productHandle() {
    navi('/productlist/0');
  }
  // console.log(boxData);

  return (
    <div className="w-[80%]">
      {(boxData !== undefined && boxData.length === 0) &&
        <div className="flex flex-col items-center justify-center mt-32">
        <p className="flex sm:flex-col items-center text-center font-medium lg:text-xl md:text-xl sm:text-lg">
           상품의 소비기한을 확인할 수 있는
            <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-[#a044ff] via-[#FF0080] to-main-orange mx-1 lg:text-3xl md:text-3xl sm:text-2xl">Pick Box</span>
           를 채워보시는 건 어떠세요?
        </p>
        <button 
                className="my-3 font-bold text-white bg-gradient-to-r from-[#a044ff] via-[#FF0080] to-main-orange p-2.5 rounded-full hover:scale-110 transition duration-200"
                onClick={productHandle} >상품을 구매하러 가기</button>
        </div>
      }
      <div className="mx-auto w-[85%] grid grid-cols-3 gap-7 md:grid-cols-2 sm:grid-cols-1 ">
      
      { boxData && boxData.map((product, i) => {
        let endday = dDay(product.expDate);
        let day = dDay(product.expDate);
                  if (dDay(product.expDate).substring(0, 1) === "-") {
                    day = dDay(product.expDate).slice(1, 2);
                    day = "+" + day;
                  }
        return (
          <div key={i} className="mb-10 items-center rounded-xl border border-spacing-2 w-full text-center">
            <div className='mt-5'>
              <div className="relative">
                <Link to={`/productdetail/${product.id}`}>
                  <img
                    src={product.purl}
                    alt={product.pname}
                    className="mx-auto w-[60%]"
                  />
                </Link>                        
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
              </div>

              <div className="productItem__description p-4">
                <h1 className="lg:text-lg md:text-sm sm:text-xs font-medium">
                  {product.pname} {product.quantity}개
                </h1>
                <p className="lg:text-lg md:text-sm sm:text-xs font-medium">{product.date.substring(0, 10)} / {product.sname}</p>
                <p className="lg:text-lg md:text-sm sm:text-xs font-medium">소비기한 : <b>{product.expDate.substring(0, 10)}</b></p>
                
              </div>
            </div>
          </div>
        )
      })
      }
      </div>
    </div>
  )
}