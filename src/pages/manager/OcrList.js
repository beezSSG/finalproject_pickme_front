import axios from "axios";
import { useState, useEffect } from "react";
import ManagerMain from "./ManagerMain";
import { Link } from "react-router-dom";

function OcrList() {
  const [ocrlist, setOcrlist] = useState([]);

  function selectocrlist() {
    axios
      .get("http://localhost:8080/api/v1/user/selectocrlist")
      .then(function (resp) {
        console.log(resp.data);
        setOcrlist(resp.data);
      })
      .catch(function () {
        console.log("error");
      });
  }

  useEffect(() => {
    selectocrlist();
  }, []);

  return (
    <>
      <div className="flex">
        <ManagerMain height="h-[1500px]" />
        <div className="mt-[150px] w-full mx-10">
          <div className="text-3xl font-bold mb-3">사업자 등록 목록</div>
          <hr className="border-gray-500" />
          <br />
          <br />
          <div className="grid grid-cols-4 gap-4">
            {ocrlist.map((ocr, index) =>
              ocr.ocrYn === 0 ? (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-md cursor-pointer hover:ring-2 ring-sub-yellow duration-500 ease-in-out transform overflow-hidden"
                >
                  <Link to={`/manager/ocrlistdetail/${ocr.id}`}>
                    <img
                      src={ocr.url}
                      className="w-80 h-96 object-cover mx-auto hover:scale-105 duration-500 ease-in-out transform"
                    />
                  </Link>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OcrList;
