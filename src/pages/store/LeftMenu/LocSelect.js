import { Fragment, useEffect, useState } from "react";
import { Listbox, Combobox, Transition } from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";

const states = [
  {
    id: 1,
    name: "전국",
    eng: "Nation",
  },
  {
    id: 2,
    name: "강원특별자치도",
    eng: "Gangwon-do",
  },
  {
    id: 3,
    name: "경기도",
    eng: "Gyeonggi-do",
  },
  {
    id: 4,
    name: "경상남도",
    eng: "South Gyeongsang Province",
  },
  {
    id: 5,
    name: "경상북도",
    eng: "North Gyeongsang Province",
  },
  {
    id: 6,
    name: "광주광역시",
    eng: "Gwangju",
  },
  {
    id: 7,
    name: "대구광역시",
    eng: "Daegu",
  },
  {
    id: 8,
    name: "대전광역시",
    eng: "Deajeon",
  },
  {
    id: 9,
    name: "부산광역시",
    eng: "Busan",
  },
  {
    id: 10,
    name: "서울특별시",
    eng: "Seoul",
  },
  {
    id: 11,
    name: "세종특별자치시",
    eng: "Sejong",
  },
  {
    id: 12,
    name: "울산광역시",
    eng: "Ulsan",
  },
  {
    id: 13,
    name: "인천광역시",
    eng: "Incheon",
  },
  {
    id: 14,
    name: "전라남도",
    eng: "Jeollanam-do",
  },
  {
    id: 15,
    name: "전북특별자치도",
    eng: "Jeonbuk-do",
  },
  {
    id: 16,
    name: "제주특별자치도",
    eng: "Jeju",
  },
  {
    id: 17,
    name: "충청남도",
    eng: "South Chungcheong Province",
  },
  {
    id: 18,
    name: "충청북도",
    eng: "North Chungcheong Province",
  },
];

const districts = {
  "Nation": [
    { id: 1, name: "전국" }
  ],
  "Busan": [
    { id: 1, name: "강서구" },
    { id: 2, name: "금정구" },
    { id: 3, name: "기장군" },
    { id: 4, name: "남구" },
    { id: 5, name: "동구" },
    { id: 6, name: "동래구" },
    { id: 7, name: "부산진구" },
    { id: 8, name: "북구" },
    { id: 9, name: "사상구" },
    { id: 10, name: "사하구" },
    { id: 11, name: "서구" },
    { id: 12, name: "수영구" },
    { id: 13, name: "연제구" },
    { id: 14, name: "영도구" },
    { id: 15, name: "중구" },
    { id: 16, name: "해운대구" },
  ],
  "Seoul": [
    { id: 1, name: "강남구" },
    { id: 2, name: "강동구" },
    { id: 3, name: "강북구" },
    { id: 4, name: "강서구" },
    { id: 5, name: "관악구" },
    { id: 6, name: "광진구" },
    { id: 7, name: "구로구" },
    { id: 8, name: "금천구" },
    { id: 9, name: "노원구" },
    { id: 10, name: "도봉구" },
    { id: 11, name: "동대문구" },
    { id: 12, name: "동작구" },
    { id: 13, name: "마포구" },
    { id: 14, name: "서대문구" },
    { id: 15, name: "서초구" },
    { id: 16, name: "성동구" },
    { id: 17, name: "성북구" },
    { id: 18, name: "송파구" },
    { id: 19, name: "양천구" },
    { id: 20, name: "영등포구" },
    { id: 21, name: "용산구" },
    { id: 22, name: "은평구" },
    { id: 23, name: "종로구" },
    { id: 24, name: "중구" },
    { id: 25, name: "중랑구" },
  ],
};

export default function LocSelect(menuOpen) {
  const [selected, setSelected] = useState(states[0]);
  const [districtArr, setDistrictArr] = useState(districts[selected.eng]);
  const [districtsData, setDistrictsData] = useState(districts);
  const [query, setQuery] = useState("");

  const filteredDistricts =
    query === ""
      ? districtArr
      : districtArr.filter((district) =>
          district.name
            .replace(/\s+/g, "")
            .includes(query.replace(/\s+/g, ""))
        );

    useEffect(()=>{
        setDistrictArr(districts[selected.eng]);
    }, [selected])

  return (
    <div className="relative mt-2 w-full flex space-x-2">
      {/* 일반 select */}
      <Listbox
        value={selected}
        onChange={setSelected}
        className={`${!menuOpen && "scale-0"}`}
      >
        <div className="w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md 
          focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 
          focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          onClick={(e)=>(console.log(e.target.value))}>
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-1/2 overflow-auto rounded-md 
            bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
              {states.map((state, stateIdx) => (
                <Listbox.Option
                  key={stateIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={state}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {state.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* 검색 select */}
      <Combobox value={districtsData} onChange={setDistrictsData}>
        <div className="relative w-full">
          <div className="shadow-md sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2.5 pl-3 pr-10 text-base leading-5 text-gray-900 
              border-0 ring-0 focus:ring-0 focus:border-0 select-none"
              displayValue={(district) => district.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md 
            bg-white py-1 text-base shadow-lg focus:outline-4 sm:text-sm">
              {filteredDistricts.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  다시 검색해주세요
                </div>
              ) : (
                filteredDistricts.map((district) => (
                  <Combobox.Option
                    key={district.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-9 pr-4 ${
                        active ? "bg-amber-100 text-amber-600" : "text-gray-900"
                      }`
                    }
                    value={district}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {district.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-amber-600"
                            }`}
                          >
                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      {/* <button onClick={()=>console.log(selected)}>버튼</button> */}
    </div>
  );
}
