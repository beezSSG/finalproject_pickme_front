import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PostCheck() {
  const [postcheck, setPostCheck] = useState([]);

  useEffect(() => {
    getPostCheck();
  }, []);

    const getPostCheck = async () => {
        await axios.get("/ceo/postcheck")
        .then((response)=>{

        console.log(response.data);

          console.log(JSON.stringify(response.data.postcheck));
          setPostCheck(response.data);
        })
        .catch((err)=>{
           alert(err);
        })
      }

  return (
    <div className="mx-auto w-[60%]">
      <p className="text-lg font-semibold mb-4">배달 승인</p>

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-1/4 py-2">발송자</th>
            <th className="w-1/4 py-2">제품분류</th>
            <th className="w-1/4 py-2">무게</th>
            <th className="w-1/4 py-2">금액</th>
            <th className="w-1/4 py-2">날짜</th>
            <th className="w-1/4 py-2">승인여부</th>
          </tr>
        </thead>
        <tbody>
          {postcheck.map((group, index) => (
            <tr key={index} className="border-b border-gray-300">
               <td className="text-center py-3">{group.customerName}</td>
              <td className="text-center py-3">{group.itemCategory}</td>
              <td className="text-center py-3">{group.itemWeight}</td>
              <td className="text-center py-3">{group.totalPrice}</td>
              <td className="text-center py-3">{group.date}</td>
              <td className="text-center py-3">{group.postYn}</td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
  );
}
