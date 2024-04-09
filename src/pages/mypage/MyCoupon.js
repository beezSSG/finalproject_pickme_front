import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function MyCoupon() {

  const [myCoupons, setMyCoupons] = useState([]);
  
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

  return (
    <div className="w-[60%]">
      <div className="text-center text-3xl font-bold">사용가능한 쿠폰</div>
      <div className="flex flex-row">
      { myCoupons && myCoupons.map((data, i) => {
        return (
          <div key={i} className="ml-16 mt-5 border-2">
            <div className=''>
              <div className=''>
                <span>쿠폰 내용 </span>
                {data.content}
                </div>
              <div>
                <div>
                  <span>쿠폰 시작일 </span>
                  {data.startDate}
                </div>
                <div>
                  <span>쿠폰 만료일 </span>
                  {data.endDate}
                </div>
              </div>
            </div>
          </div>
        );
      })
      }
      </div>
    </div> 
  );
}