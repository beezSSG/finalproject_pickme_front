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
    <div className="mx-auto w-[60%]">
      <p>결제정보</p>

      <table className="w-full  sm:hidden">
        <thead>
          <tr>
            <th>구매 내역</th>
            <th>구매 날짜</th>
            <th>총 구매 수량</th>
            <th>전자 영수증 보기</th>
            <th>결제취소 요청</th>
          </tr>
        </thead>
        <tbody>
          { payInfo && payInfo.map((data, i) => {
            const newDate = data.date.substring(0, 4) + "년" + data.date.substring(5, 7) + "월" + data.date.substring(8, 10) + "일";
              return (
                <tr key={i} className="text-center">
                  {data.quantity === 1 ? <td>{data.pname}</td> : <td>{data.pname} 외 {data.pquantity}개</td>}
                  <td>{newDate}</td>
                  <td>{data.quantity}개</td>
                  <td>
                    <button>영수증 보기</button>
                  </td>
                  <td>
                    <button>결제취소</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

    </div>
  );
}