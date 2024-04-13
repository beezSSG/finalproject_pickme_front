import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
// import { Combobox } from "@headlessui/react";
import axios from "axios";

// 함수는 첫 번째 인자로 {}안에 넣어야함 b/c props 객체 전체를 나타내지 않음
export default function SearchStoreName({menuOpen, handleStorelist, stateData, districtData}) {
  const [state, setState] = useState("");             // 
  const [district, setDistrict] = useState("");       //
  const [targetStore, setTargetStore] = useState(""); // 
  // const [storelist, setStorelist] = useState([]);

  // const [selectedStore, setSelectedStore] = useState(storeList[0])
  // const [query, setQuery] = useState('')

  // const filteredPeople =
  //   query === ''
  //     ? people
  //     : people.filter((person) => {
  //         return person.toLowerCase().includes(query.toLowerCase())
  //       })

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
      className="flex items-center rounded-lg border-slate-200 border-2 mt-6 
                    transition duration-500 hover:border-sub-yellow focus:border-sub-yellow"
    >
      <input
        type={"search"}
        placeholder="매장명을 검색하세요"
        className={`text-base bg-transparent w-full text-slate-600 pl-4 mr-2
              ${!menuOpen && "scale-0"} focus:outline-none`}
        onChange={(e) => setTargetStore(e.target.value)}
      />
      <button
        className="group bg-slate-200 py-3 pe-1 pl-3
                transition duration-300 hover:bg-sub-yellow"
        onClick={() => {
          searchStore(targetStore);
        }}
      >
        <BsSearch
          className={`text-slate-500 text-lg float-left cursor-pointer
                transition duration-300 group-hover:scale-125
                ${menuOpen && "mr-2"}`}
        />
      </button>
      {/* <button onClick={()=>{console.log(stateData); console.log(districtData); console.log(targetStore)}}>console</button> */}
    </div>
  );
}
