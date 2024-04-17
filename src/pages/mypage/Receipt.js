import React, { useEffect, useRef } from "react";
import JsBarcode from 'jsbarcode';

const Receipt = ({ onClose, payInfo }) => {
  // 모든 상품의 총 수량 계산
  const totalQuantity = payInfo.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // 모든 상품의 총 합 가격 계산
  const totalPrice = payInfo.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
    <>
      {/* 배경 오버레이 */}
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-40"></div>

      {/* 모달 */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-4 rounded-md w-[35%] h-[70%] overflow-y-auto sm:w-full">
        <div className="text-right">
          <button
            className="text-black hover:text-sub-yellow font-bold text-3xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-center text-3xl font-bold mb-4">Pick Me</h2>
          {/* 선택된 결제 정보 출력 */}
          <div className="flex justify-between">
            <p>pickme</p>
            <p>{payInfo[0].date}</p>
          </div>
          <p>대표: {payInfo[0].ceoName}</p>
          <br />
          <p>주소: {payInfo[0].saddress}</p>
          <br />
          <div className="mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-t border-gray-400">
                  <th className="text-left py-2">상품명</th>
                  <th className="text-center">단가</th>
                  <th className="text-center sm:w-12">수량</th>
                  <th className="text-right">가격</th>
                </tr>
              </thead>
              <tbody>
                {payInfo.map((item, index) => (
                  <tr key={index} className="mb-2">
                    <td className="text-left py-2">{item.pname}</td>
                    <td className="text-center">
                      {item.price.toLocaleString()}
                    </td>
                    <td className="text-center">{item.quantity}개</td>
                    <td className="text-right">
                      {(item.price * item.quantity).toLocaleString()}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-b border-dashed border-black"></div>

          <div className="border-b mb-4"></div>
          <p className="text-lg font-bold">
            주문 합계: {totalQuantity} {/* 총 수량 출력 */}
          </p>
          <br />
          <div className="border-b border-dashed border-black"></div>
          <br />
          <div className="flex justify-between mx-5">
            <p className="text-xl font-bold">total</p>
            <p className="text-xl font-bold"> {totalPrice.toLocaleString()}</p>
          </div>
          <br />
          <div className="border-b border-dashed border-black"></div>
          <br />
          <div><BarcodeGenerator value={totalQuantity} /></div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
