import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function MyMenuButton() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(menu[0]);
  const [subSelected, setSubSelected] = useState([  { "subname": "없음", "subpath": "" } ]);
  const [sName, setSName] = useState("없음");

  useEffect(()=> {
    if (selected.val === "pickPay") {
      setSubSelected(pickPay);
      setSName(pickPay[0].subname);
      // console.log('도착');
    } else if (selected.val === "myActive") {
      setSubSelected(myActive);
      setSName(myActive[0].subname);
    } else if (selected.val === "service") {
      setSubSelected(service);
      setSName(service[0].subname);
    } else if (selected.val === "customerCenter") {
      setSubSelected(customerCenter);
      setSName(customerCenter[0].subname);
    } else {
      setSubSelected([  { "subname": "없음", "subpath": "" } ]);
      setSName("없음");
    }
  }, [selected])

  return (
    <div className="w-full flex lg:invisible md:invisible">
      <Listbox value={selected} onChange={setSelected} className="w-full">
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {menu.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
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

      <Listbox value={sName} onChange={setSName} className="w-full">
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{sName}</span>
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {subSelected.map((select, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={select.subname}
                  onClick={()=>{navigate(`${select.subpath}`)}}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {select.subname}
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
    </div>
  );
}

const menu = 
[
  { name: '메뉴선택', val:'' },
  { name: 'Pick Pay', val:'pickPay' },
  { name: '내 활동', val:'myActive' },
  { name: '서비스 이용', val:'service' },
  { name: '고객센터', val:'customerCenter' }
]

const pickPay =
[
  { "subname": "Pick Box", "subpath": "pickbox" },
  { "subname": "결제내역", "subpath": "payinfo" },
  { "subname": "장바구니", "subpath": "cart" },
  { "subname": "선물함", "subpath": "gift" },
  { "subname": "쿠폰함", "subpath": "coupon" }
]

const myActive =
[
  { "subname": "찜목록", "subpath": "save" },
  { "subname": "나의 후기", "subpath": "review" }
]
const service =
[
  { "subname": "택배 예약", "subpath": "/post" },
  { "subname": "픽업 예약", "subpath": "/productreservation" }
]
const customerCenter =
[
  { "subname": "F&Q보기", "subpath": "/faq" },
  { "subname": "1:1 문의하기", "subpath": "/contactuswrite"}
]
