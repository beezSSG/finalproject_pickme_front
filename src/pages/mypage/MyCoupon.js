import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import moment from 'moment';

export default function MyCoupon() {

  const [myCoupons, setMyCoupons] = useState([]);
  const [type, setType] = useState(0);
  const today = moment();
  
  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    await axios.post("mypage/user/getCoupon")
    .then((response)=>{
      //console.log(JSON.stringify(response.data));
      setMyCoupons(response.data);
    })
    .catch((err)=>{
      alert(err);
    })
  }

    // 진행 중인 이벤트만 보여주는 함수
    const canCouponHandle = () => {
      setType(0);
    };
  
    // 종료된 이벤트만 보여주는 함수
    const expCouponHandle = () => {
      setType(1);
    };

  return (
    <div className="w-[60%] mx-auto">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-0">
        <button
          onClick={()=>{canCouponHandle()}}
          className="focus:outline-none text-gray-800 bg-main-yellow hover:bg-sub-orange font-bold
                  focus:ring-4 focus:ring-yellow-300 rounded-lg mb-10 py-3
              "
        >
          사용가능 쿠폰
        </button>
        <button
          onClick={()=>{expCouponHandle()}}
          className="focus:outline-none text-main-yellow bg-gray-800 hover:bg-gray-600 font-bold
                  focus:ring-4 focus:ring-gray-800 rounded-lg text-sm mb-10 py-3 
              "
        >
          만료된 쿠폰
        </button>
      </div>
      <div className="flex flex-row">
      { myCoupons && myCoupons.map((data, i) => {
        let length = data.content.length;
        let content = data.content.substring(0, length-1);
        content = parseInt(content).toLocaleString()
        
        const end = moment(data.endDate);
        const duration = moment.duration(end.diff(today));
        // console.log(duration);

        if (
          (type === 0 && duration >= 0) ||
          (type === 1 && duration < 0 )
        ) {
        return (
          
          <div className="flex ml-16 mt-5">
            <div key={i} className="border-2">
              <div className=''>
              <div className=''>
                  <span>쿠폰 이름</span>
                  {/* {data.title} */}
                </div>
                <div className=''>
                  <span className="font-bold">금액 </span>
                  {content}원
                </div>
                <div>
                  <div>
                    <span>유효기간 </span>
                    {data.startDate} ~ {data.endDate}
                  </div>
                </div>
              </div>
            </div>
            <div className="align-middle"><button>사<br/>용</button></div>
          </div>
        );
        }
      })
      }
      </div>
    </div> 
  );
}