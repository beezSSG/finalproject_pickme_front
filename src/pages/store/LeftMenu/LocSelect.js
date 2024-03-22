import { Fragment, useEffect, useState } from "react";
import { Listbox, Combobox, Transition } from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";

import { states } from "../../../assets/data/store/states"
import districts from "../../../assets/data/store/districts.json"

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
