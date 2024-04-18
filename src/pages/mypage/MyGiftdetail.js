import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import JsBarcode from 'jsbarcode';
import FullLogoImg from "../../assets/imgs/logo/fullLogo.svg"; // full 로고 이미지

export default function MyGiftdetail() {
  const [giftData, setGiftData] = useState();

  const params = useParams();
  const navigate = useNavigate();

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
  // 뒤로가기 버튼
  function backBtn(){
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  }
  const BarcodeGenerator = ({ value }) => {
    const barcodeRef = useRef(null);
  
    useEffect(() => {
      if (barcodeRef.current) {
        JsBarcode(barcodeRef.current, value, {
          displayValue: false,  // 바코드 아래 값 표시 X
        });
      }
    }, [value]);
  
    return <svg ref={barcodeRef} className="w-full" />;
  };
  
  return (
    <div align="center" className="w-full">
      <div name="giftCard" className="bg-yellow-50 shadow-xl border-gray-800 rounded-lg p-2.5 m-5 w-[600px] sm:w-[400px] ">
        { giftData && giftData.map((product, i) => {
            return (
              <div>
                  { Number(params.id) === product.id ?
                    <div key={i}>       
                      <img src={FullLogoImg} className="sm:size-24 md:size-28 mt-5"/> 
                      <div name="title" className="rounded-2xl p-2.5 m-5 w-[400px] sm:w-[280px]
                                                  font-bold text-3xl text-gray-800">
                        <p>{product.giftUserName}님이</p>
                        <p>선물을 보냈어요!</p>
                      </div>
                      <div  className=" border-gray-800 bg-white rounded-2xl p-2.5 m-5 text-center">
                        <div className='mt-5'>
                            <img src={product.productUrl} className="mx-auto w-[50%]" />
                          <div className='mt-5 font-bold'>{product.productName}</div>
                          <div>
                            <span>유효기간 : {product.expDay}</span>
                          </div>
                          <div className="bg-gray-50 rounded-3xl p-5 m-5 text-left text-gray-800 shadow-lg">
                            <p className="text-sm font-bold">from.{product.giftUserName}</p>
                            <p className="px-10 mt-2">{product.content}</p>
                          </div>
                          <div>
                            <BarcodeGenerator value={product.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    ""
                  }
              </div>
            )
          })
        }
        
      </div>




      <div className="w-[600px] sm:w-[400px] mx-auto" align="right">
        <div className="w-[80%] mt-5 mx-auto grid grid-cols-1 gap-11 ">
          
          </div>
          <button className="focus:outline-none text-gray-800 bg-main-yellow font-bold hover:bg-yellow-500
                              rounded-lg p-2.5 m-1" onClick={()=>backBtn()}>목록</button>
      </div>
    </div>
  );
}