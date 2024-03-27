import { BsSearch } from "react-icons/bs";
import { useState } from 'react'
import { Combobox } from '@headlessui/react'

export default function SearchStoreName(menuOpen) {

  // const [selectedStore, setSelectedStore] = useState(storeList[0])
  // const [query, setQuery] = useState('')

  // const filteredPeople =
  //   query === ''
  //     ? people
  //     : people.filter((person) => {
  //         return person.toLowerCase().includes(query.toLowerCase())
  //       })

  function searchStore() {

  }

  return (
    <div className="flex items-center rounded-lg border-slate-200 border-2 mt-6">
      <input
        type={"search"}
        placeholder="매장명을 검색하세요"
        className={`text-base bg-transparent w-full text-slate-600 focus:outline-none pl-4
              ${!menuOpen && "scale-0"}`}
      />
      <button className="bg-sub-yellow py-3 pe-1 pl-3 rounded-e-lg" onClick={searchStore()}>
        <BsSearch
          className={`text-slate-600 text-lg float-left cursor-pointer
                transition hover:scale-125
                ${menuOpen && "mr-2"}`}
        />
      </button>


      {/* 자동완성 검색창 */}
      {/* <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {filteredPeople.map((person) => (
          <Combobox.Option key={person} value={person}>
            {person}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox> */}
    </div>
  );
}