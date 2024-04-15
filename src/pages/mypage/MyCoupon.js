import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

export default function MyCoupon() {
  const [myCoupons, setMyCoupons] = useState([]);
  const [type, setType] = useState(0);
  const today = moment();

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    await axios
      .post("mypage/user/getCoupon")
      .then((response) => {
        //console.log(JSON.stringify(response.data));
        setMyCoupons(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // 사용가능 쿠폰만 보여주는 함수
  const canCouponHandle = () => {
    setType(0);
  };

  // 만료된 쿠폰만 보여주는 함수
  const expCouponHandle = () => {
    setType(1);
  };

  return (
    <div className="w-[80%] mx-auto">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-2">
        <button
          onClick={() => {
            canCouponHandle();
          }}
          className="focus:outline-none text-gray-800 bg-main-yellow hover:bg-sub-orange font-bold
                  focus:ring-4 focus:ring-yellow-300 rounded-lg  py-3 
              "
        >
          사용가능 쿠폰
        </button>
        <button
          onClick={() => {
            expCouponHandle();
          }}
          className="focus:outline-none text-main-yellow bg-gray-800 hover:bg-gray-600 font-bold
                  focus:ring-4 focus:ring-gray-800 rounded-lg text-sm  py-3 
              "
        >
          만료된 쿠폰
        </button>
      </div>
      <br />
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-2">
        {myCoupons &&
          myCoupons.map((data, i) => {
            let length = data.content.length;
            let content = data.content.substring(0, length - 1);
            content = parseInt(content).toLocaleString();

            const end = moment(data.endDate);
            const duration = moment.duration(end.diff(today));
            // console.log(duration);

            if ((type === 0 && duration >= 0) || (type === 1 && duration < 0)) {
              return (
                <div className="flex justify-center">
                  {type === 0 && (
                    <div className="bg-gradient-to-br from-sub-orange to-sub-yellow  text-center py-10 px-20 rounded-lg shadow-md relative">
                      <div className="w-[400px] sm:w-[200px]">
                        <span className="sm:text-xs">{data.title}</span>
                        <div className="">
                          <span className="font-bold ">{content}원</span>
                        </div>
                        <div className="mb-3">
                          <div>
                            <span>
                              {data.startDate} ~ {data.endDate}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-700 p-2 rounded-lg hover:bg-gray-500 cursor-pointer">
                          <button className="font-bold text-white ">
                            쿠폰 사용
                          </button>
                        </div>
                      </div>
                      <div class="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                      <div class="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
                    </div>
                  )}
                  {type === 1 && (
                    <div className="bg-gradient-to-br bg-gray-300   text-center py-10 px-20 rounded-lg shadow-md relative">
                      <div className="w-[400px] sm:w-[200px]">
                        <span className="sm:text-xs">{data.title}</span>
                        <div className="">
                          <span className="font-bold ">{content}원</span>
                        </div>
                        <div>
                          <div>
                            <span>
                              {data.startDate} ~ {data.endDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                      <div class="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
                    </div>
                  )}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
