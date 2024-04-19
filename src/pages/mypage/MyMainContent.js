import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import star2 from "../../assets/imgs/product/star2.png";

export default function MyMainContent(prop) {
  let getProduct = JSON.parse(localStorage.getItem("recentlyProduct"));
  const [pdata, setPdata] = useState();
  const navi = useNavigate();

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

  function productHandle() {
    navi('/productlist/0');
  }

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
        {!pdata &&
          <div className="flex flex-col items-center justify-center mt-32">
          <p className="flex sm:flex-col items-center text-center font-medium lg:text-xl md:text-xl sm:text-lg">
            <span className="font-black text-4xl my-2">최근에 구경한 상품이 없어요</span>
              {/* <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-[#a044ff] via-[#FF0080] to-main-orange mx-1 lg:text-3xl md:text-3xl sm:text-2xl"></span> */}
          </p>
          <button 
                  className="my-3 font-bold text-white bg-gradient-to-r from-[#a044ff] via-[#FF0080] to-main-orange p-2.5 rounded-full hover:scale-110 transition duration-200"
                  onClick={productHandle} >상품을 구매하러 가기</button>
          </div>
        }

    </div>
  );
}