import axios from "axios";
import { useEffect, useState } from "react";

export default function MyPayinfo() {
  const [payInfo, setPayInfo] = useState([]);

  useEffect(() => {
    getMypayinfo();
  }, []);

  const getMypayinfo = async () => {
    await axios.get("http://localhost:8080/api/v1/mypage/MyOrdersList", {
      headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    })
    .then((response)=>{
      console.log(JSON.stringify(response.data));
      //console.log(Object.values(response.data));
      setPayInfo(response.data);
    })
    .catch((err)=>{
      alert(err);
    })
  }

  return (
    <div className="ml-10 w-[60%]">
      <p>결제정보창입니다</p>

      <div className="flex flex-row">
        <div>구매 날짜</div>
        <div className="ml-8">구매 수량</div>
      </div>
      { payInfo && payInfo.map((data, i) => {
          return (
            <div key={i} className="flex flex-row">
              <div>{data.date}</div>
              <div className="ml-8">{data.quantity}</div>
            </div>
          );
        })
      }
    </div>
  );
}