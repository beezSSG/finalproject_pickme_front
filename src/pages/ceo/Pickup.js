import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckModal from "./CheckModal"


export default function Pickup() {
  const [pickup, setPickup] = useState([]);


  useEffect(() => {
    getPickup();
  }, []);

    const getPickup = async () => {
        await axios.get("/ceo/pickup")
        .then((response)=>{

        console.log(response.data);

          console.log(JSON.stringify(response.data.pickup));
          setPickup(response.data);
        })
        .catch((err)=>{
           alert(err);
        })
      }

  return (
    <div className="mx-auto w-[60%]">
      <p className="text-lg font-semibold mb-4">픽업 승인</p>

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className='bg-yellow-400 p-15'>
            <th className="w-1/4 py-2">상품 이름</th>
            <th className="w-1/4 py-2">가격</th>
            <th className="w-1/4 py-2">구매자</th>
            <th className="w-1/4 py-2">승인여부</th>
            <th className="w-1/4 py-2">확인</th>
          </tr>
        </thead>
        <tbody>
          {pickup.map((group, index) => (
            <tr key={index} className="border-b border-gray-300">
               <td className="text-center py-3">{group.productName}</td>
              <td className="text-center py-3">{group.price.toLocaleString()}원</td>
              <td className="text-center py-3">{group.customerName}</td>
              <td className='text-center py-4'>{ group.pickDel > 0 ? '승인완료' : '승인대기중'}</td>
              <td className="text-center py-3">
              <CheckModal/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
  );
}
