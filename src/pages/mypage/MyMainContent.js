import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import star2 from "../../assets/imgs/product/star2.png";

export default function MyMainContent(prop) {
  let getProduct = JSON.parse(localStorage.getItem("recentlyProduct"));
  const [pdata, setPdata] = useState();

  // axios로 배열 전송시 []삭제 back에서도 RequestParam 해야한다
  axios.defaults.paramsSerializer = function (paramObj) {
    const params = new URLSearchParams();
    for (const key in paramObj) {
      params.append(key, paramObj[key]);
    }
    return params.toString();
  };

  useEffect(() => {
    prop.whereHandle("최근본 상품");
    if (getProduct !== null) {
      getRecentlyProduct();
    }
    
  }, []);

  const getRecentlyProduct = async () => {
    await axios.get("mypage/getRecentlyProduct", { params : { "id" : getProduct } })
    .then((response)=>{
      // console.log(JSON.stringify(response.data));
      // console.log(Object.values(response.data));
      if (response.data !== undefined || response.data !== null) {
        setPdata(response.data);
      }
    })
    .catch((err)=>{
      // alert(err);
    })
  }

  return (
    <div className="w-full">
        <div className="w-[80%] mt-5 mx-auto grid grid-cols-3 gap-11 md:grid-cols-2 sm:grid-cols-1">
        { pdata && pdata.map((product, i) => {
            return (
              <div key={product.id} className="mb-10 items-center rounded-xl border border-spacing-2 w-full text-center">
                <div className='mt-5'>
                  <Link to={`/productdetail/${product.id}`}>
                    <img src={product.url} className="mx-auto w-[60%]" />
                  </Link>
                  <div className='mt-5'>{product.name}</div>
                  <div>{product.price.toLocaleString()}원</div>
                  { product.productRating !== 0 ?
                  <div>
                    {Array.from({ length : product.productRating }, (_, index) => (
                      <span key={index} className="align-middle" style={{ display: 'inline-block' }}>
                        <img src={star2} style={{ maxWidth: '20px', maxHeight: '20px', margin: '3px' }} />
                      </span>
                    ))}
                  </div>
                  :
                  <p>현재 후기가 없습니다</p>
                  }
                </div>
              </div>
            )
          })}
        </div>
        {pdata ? "" : <div className="mx-auto mt-44 sm:my-10 sm:text-xl lg:text-4xl text-center">최근 본 상품이 없습니다.</div>}

        {/* { pdata &&
          pdata.map((da, i) => {
            
            return (
              <div key={da.id} className="w-[50%] flex">
                <div className="w-[20%]"><img src={da.url}/></div>
                <div>{da.name}</div>
                <div>{da.price.toLocaleString()}원</div>
                <div>{da.productRating}</div>
              </div>
            );
          })
        } */}
    </div>
  );
}