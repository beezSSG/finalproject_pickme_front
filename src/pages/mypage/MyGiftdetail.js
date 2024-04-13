import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import JsBarcode from 'jsbarcode';

export default function MyGiftdetail() {
  const [giftData, setGiftData] = useState();

  const params = useParams();

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
    <div className="w-[60%] mx-auto">
      <div className="w-[80%] mt-5 mx-auto grid grid-cols-1 gap-11 ">
        { giftData && giftData.map((product, i) => {
            return (
              <>
                { Number(params.id) === product.id ?
                  <div key={i}>
                    <div>
                      From : {product.giftUserName}
                    </div>
      
                    <div  className="mb-10 items-center rounded-xl border border-spacing-2 w-full text-center">
                      <div className='mt-5'>
                          <img src={product.productUrl} className="mx-auto w-[60%]" />
                        <div className='mt-5'>{product.productName}</div>
                        <div>
                          <span>유효기간 : {product.expDay}</span>
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
              </>
            )
          })
        }
        </div>
    </div>
  );
}