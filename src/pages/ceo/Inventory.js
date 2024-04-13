import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getInventory();
  }, []);

    const getInventory = async () => {
        await axios.get("/ceo/inventory")
        .then((response)=>{

        console.log(response.data);
          setInventory(response.data);
        })
        .catch((err)=>{
           alert(err);
        })
      }

  return (
    <div className="mx-auto w-[60%]">
      <p className="text-lg font-semibold mb-4">재고 현황</p>

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-1/3 py-2">상품 번호</th>
            <th className="w-1/4 py-2">점포 이름</th>
            <th className="w-1/4 py-2">상품 이름</th>
            <th className="w-1/4 py-2">가격</th>
            <th className="w-1/4 py-2">수량</th>
            <th className="w-1/4 py-2">exp_date</th>

          </tr>
        </thead>
        <tbody>
          {inventory.map((group, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="text-center py-3">{group.id}</td>
              <td className="text-center py-3">{group.storeName}</td>
              <td className="text-center py-3">{group.productName}</td>
              <td className="text-center py-3">{group.price}원</td>
              <td className="text-center py-3">{group.quantity}개</td>
              <td className="text-center py-3">{group.expDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
  );
}
