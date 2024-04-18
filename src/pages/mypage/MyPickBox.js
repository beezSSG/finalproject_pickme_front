import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

export default function MyPickBox({whereHandle}) {
  const [boxData, setBoxData] = useState();

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

  return (
    <div className="w-[80%]">
      <div className="w-[70%] mx-auto grid grid-cols-3 gap-11 md:grid-cols-2 sm:grid-cols-1 ">
      { boxData && boxData.map((product, i) => {
        let endday = dDay(product.expDate);
        return (
          <div key={i} className="mb-10 items-center rounded-xl border border-spacing-2 w-full text-center">
            <div className='mt-5'>
              <Link to={`/productdetail/${product.id}`}>
                <img src={product.purl} className="mx-auto w-[60%]" />
              </Link>
              <p className='mt-5'>{product.pname}</p>
              <p>구매일: {product.date}</p>
              <p>구매점포: {product.sname}</p>
              <p>구매수량: {product.quantity}</p>
              <p>소비기한 : <b>{product.expDate}</b></p>
              <p>남은기한 : <b>{endday}일</b></p>
            </div>
          </div>
        )
      })
      }
      </div>
    </div>
  )
}