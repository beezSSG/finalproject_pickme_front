import { Fragment, useEffect, useState } from "react";
import { Listbox, Combobox, Transition } from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";

import { states } from "../../../assets/data/store/states"
import districts from "../../../assets/data/store/districts.json"

export default function LocSelect({menuOpen, handleState, handleDistrict}) {
  const [selectedState, setSelectedState] = useState(states[0]);    // 선택한 시/도
  const [selectedDistrict, setSelectedDistrict] = useState(districts[selectedState.eng][0]);  // 선택한 구

  const [districtArr, setDistrictArr] = useState(districts[selectedState.eng]); // 구 data array 불러오는 state
  const [districtsData, setDistrictsData] = useState(districts); // 구 검색값 넣는 state
  const [query, setQuery] = useState(""); // 검색어 state

  const filteredDistricts =
    query === ""
      ? districtArr
      : districtArr.filter((district) =>
          district.name
            .replace(/\s+/g, "")
            .includes(query.replace(/\s+/g, ""))
        );

    useEffect(()=>{
        setDistrictArr(districts[selectedState.eng]);
    }, [selectedState])

    // 아래의 함수를 통해 화면에 보여지는 값은 i로 수정, 부모한테는 name을 통해서 값을 던져줌
    function changeState(i, name) {
      // console.log("state");
      setSelectedState(states[i]);
      handleState(name);
    }

    function changeDistrict(name) {
      // setSelectedState(states[i]);
      // console.log("district");
      setSelectedDistrict(name);
      handleDistrict(name);
    }

  return (
    <div className="relative mt-2 w-full flex space-x-2">
      {/* 시/도 select */}
      <Listbox
        value={selectedState}
        className={`${!menuOpen && "scale-0"}`}
      >
        <div className="w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md border-2 border-slate-300
                                      focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 
                                      focus-visible:ring-offset-2 focus-visible:ring-offset-main-orange-300 sm:text-sm"
          >
            <span className="block truncate">{selectedState.name}</span>
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
                                      bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
            >
              {/* i에 해당하는 숫자를 가져옴 -> onclick에 숫자, state 이름값을 넘김 */}
              {states.map((state, i) => (
                <Listbox.Option
                  key={state.id} 
                  onClick={()=>{changeState(i, state.name)}}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-main-orange" : "text-gray-900"
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
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-main-orange">
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

      {/* 구 검색 select */}
      <Combobox value={districtsData} onChange={setDistrictsData}> 
        <div className="relative w-full">
          <div className="shadow-md border-slate-300 border-2 sm:text-sm rounded-lg">
            <Combobox.Input className="w-full border-none py-2.5 pl-3 pr-10 text-base leading-5 text-gray-900 
              border-0 ring-0 focus:ring-0 focus:border-0 select-none rounded-lg"
              displayValue={(district) => district.name}
              onChange={(e) => {
                          setQuery(e.target.value); 
                          // setSelectedDistrict(event.target.value);
                          // console.log(selectedDistrict);
                }
              }
              // onClick={(e)=>console.log(e.target.value)}
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
            {/* 구 이름 적힌 각각 option */}
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md 
                                      bg-white py-1 text-base shadow-lg border-2 border-slate-300 focus:outline-4 sm:text-sm"
              // onChange={(e) => console.log(e.target.value)}
              >
              {/* 만약 검색 입력값이 없거나 검색한 값이 목록에 없을때 */}
              {filteredDistricts.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  다시 검색해주세요
                </div>
              ) : (
                filteredDistricts.map((district) => (
                  <Combobox.Option
                    key={district.name}
                    className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-9 pr-4 ${
                        active ? "bg-amber-100 text-main-orange" : "text-gray-900"
                      }`
                    }
                    value={district} // 이거 푸니까 값이 들어가서 보이는듯
                    onClick={()=>{setSelectedDistrict(district.name); changeDistrict(district.name)}}

                    // onChange={(e) => console.log(e.target.value)}
                    // onClick={(e) => console.log(e.target.value)} // 옵션 클릭 시 selectedDistricttrict state에 district.name 저장
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
                              active ? "text-white" : "text-main-orange"
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
