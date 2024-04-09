import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import star2 from "../../assets/imgs/product/star2.png";

export default function MySave() {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    getMySave();
  }, []);

  // 찜목록 호출 [productid도 받아야함]
  const getMySave = async () => {
    await axios.get("http://localhost:8080/api/v1/mypage/save/getSave", {
      headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    })
    .then((resp)=>{
      console.log(resp.data);
      setData(resp.data);
    })
    .catch((err)=>{
      alert(err);
    })
  }

  function comma(cost) {
    // console.log(cost);
  }

  return (
    <div className="flex-row w-[82%]">
      <p className="text-center font-bold text-xl">찜목록</p>
      <div className="w-[70%] mx-auto grid grid-cols-3 gap-11 md:grid-cols-2 sm:grid-cols-1 ">
      { data && data.map((product, i) => {
        return (
          <div key={product.id} className="mb-10 items-center rounded-xl border border-spacing-2 w-full text-center">
            <div className='mt-5'>
              <Link to={`/productdetail/${product.id}`}>
                <img src={product.url} className="mx-auto w-[60%]" />
              </Link>
              <p className='mt-5'>{product.name}</p>
              <p>{product.price.toLocaleString()}원</p>
              <p>
                {Array.from({ length: product.productRating }, (_, index) => (
                  <span key={index} className="align-middle" style={{ display: 'inline-block' }}>
                    <img src={star2} style={{ maxWidth: '20px', maxHeight: '20px', margin: '3px' }} />
                  </span>
                ))}
              </p>
            </div>
          </div>
        )
      })
      }
      </div>
    </div>
  );
}