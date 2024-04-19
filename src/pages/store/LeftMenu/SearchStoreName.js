import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
// import { Combobox } from "@headlessui/react";
import axios from "axios";

// 함수는 첫 번째 인자로 {}안에 넣어야함 b/c props 객체 전체를 나타내지 않음
export default function SearchStoreName({menuOpen, handleStorelist, stateData, districtData}) {
  const [targetStore, setTargetStore] = useState(""); // 검색값

  console.log(targetStore);

  function searchStore(target) {
    axios
      .get("/store/searchstore", {
        params: { stateName: stateData, districtName: districtData, storeName: target },
      })
      .then((resp) => {
        // console.log(resp.data);
        console.log(resp.data);
        handleStorelist(resp.data);
        console.log('부모에게 전송완료');
      })
      .catch((err) => {
        // alert(err);
        console.log(err);
      });
    
  }

  return (
    <div
      className="flex items-center rounded-lg border-slate-300 border-2 mt-6
                    transition duration-500 hover:border-main-yellow focus:border-sub-yellow"
    >
      <input
        type={"search"}
        placeholder="매장명을 검색하세요"
        className={`text-base bg-transparent w-full text-slate-900 pl-4 mr-2
              ${!menuOpen && "scale-0"} focus:outline-none`}
        onChange={(e) => setTargetStore(e.target.value)}
      />
      <button
        className="group bg-slate-300 py-3 pe-1 pl-3 rounded-r-md
                transition duration-300 hover:bg-main-yellow"
        onClick={() => {
          searchStore(targetStore);
        }}
      >
        <BsSearch
          className={`text-slate-700 text-lg font-black float-left cursor-pointer
                transition duration-300 group-hover:scale-125 
                group-hover:text-black group-active:scale-125 group-active:text-black
                group-focus:scale-125 group-focus:text-black
                ${menuOpen && "mr-2"}`}
        />
      </button>
      {/* <button onClick={()=>{console.log(stateData); console.log(districtData); console.log(targetStore)}}>console</button> */}
    </div>
  );
}
