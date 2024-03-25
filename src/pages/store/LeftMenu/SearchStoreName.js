
import { BsSearch } from "react-icons/bs";

export default function SearchStoreName(menuOpen) {
    return(
        <div className="flex items-center rounded-lg border-slate-200 border-2 mt-6">
            <input
              type={"search"}
              placeholder="매장명을 검색하세요"
              className={`text-base bg-transparent w-full text-slate-600 focus:outline-none pl-4
              ${
                !menuOpen && "scale-0"
              }`}
            />
            <button className="bg-yellow-400 py-3 pe-1 pl-3 rounded-e-lg">
              <BsSearch
                className={`text-slate-600 text-lg float-left cursor-pointer 
                ${
                    menuOpen && "mr-2"
                }`}
              />
            </button>
        </div>
    )
}