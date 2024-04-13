import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyGift() {
  const [giftData, setGiftData] = useState();

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    await axios.get("product/getMyGift"
    )
    .then((response)=>{
      console.log(JSON.stringify(response.data));
      // console.log(Object.values(response.data));
      setGiftData(response.data);
    })
    .catch((err)=>{
      alert(err);
    })
  }

  return(
    <div className="w-[60%]">
      <h1>선물함입니다.</h1>  

      <div className="w-[80%] mt-5 mx-auto grid grid-cols-3 gap-11 md:grid-cols-2 sm:grid-cols-1 ">
        { giftData && giftData.map((product, i) => {
            return (
              <div key={product.id} className="mb-10 items-center rounded-xl border border-spacing-2 w-full text-center">
                <div className='mt-5'>
                  <Link to={`/mypage/giftdetail/${product.id}`}>
                    <img src={product.productUrl} className="mx-auto w-[60%]" />
                  </Link>
                  <div className='mt-5'>{product.productName}</div>
                  <div>
                    <span>선물한 사람 : {product.giftUserName}</span>
                  </div>
                  <div>
                    <span>유효기간 : {product.expDay}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
    </div>
  );
}