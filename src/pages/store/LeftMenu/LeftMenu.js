import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

// icon
import { BsArrowLeftShort } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";

// component
import LocSelect from "./LocSelect";
import SearchStoreName from "./SearchStoreName";
import StoreCategories from "./StoreCategories.js";

// ({abc, bcd})
export default function LeftMenu({ storelist }) {
  // console.log(props);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true); // 왼쪽바 메뉴 열림 상태
  const [filterOpen, setFilterOpen] = useState(false); // 매장 검색 및 필터 열림 상태

  const [initialStores, setInitialStores] = useState(); // 초기 렌더링 시 매장들
  const [stores, setStores] = useState(storelist); // 보여질 매장 목록

  const [state, setState] = useState(""); // LocSelect에서 넘겨받은 시/도 str
  const [district, setDistrict] = useState(""); // LocSelect에서 넘겨받은 구 str

  const [filter, setFilter] = useState([]);

  console.log()


  function setStorelist(data) {
    console.log("부모에게 도달!");
    console.log(data);
    setStores(data);
    setInitialStores(data);
  }

  function setOneState(data) {
    // console.log("부모에게 도달!");
    // console.log(state);
    setState(data);
  }

  function setOneDistrict(data) {
    // console.log("부모에게 도달!");
    // console.log(district);
    setDistrict(data);
  }

  function setChosenCategories(data) {
    // console.log("부모에게 도달!");
    // console.log("filter: " + filter);
    setFilter(data);
  }

  useEffect(() => {
    // setStores(storelist); // 보여져야 할 부분
    if (filter === undefined || filter.length === 0) {
      setInitialStores(storelist);
    }
    console.log(initialStores);
    console.log(storelist);

    if (initialStores !== undefined) {
      setLoading(true);
    } else {
      console.log(stores);
    }

    if (filter !== undefined || filter.length !== 0) {
      let filteredStores = initialStores; // 필터링한 매장 목록 변수 선언
      filter.map((f) => {
        // console.log(f);
        // key 이름이 겹침 -> 키에 대한 정확한 위치를 파악 && 거기에 각각 1이 맞는지 확인 작업
        filteredStores = filteredStores.filter(
          (item) => item.hasOwnProperty(f) && item[f] === 1
        );
      });
      // console.log(filteredStores);
      setStores(filteredStores);
    }
  }, [storelist, filter]);

  function formatPhoneNumber(phoneNumber) {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const regex = /^(\d{3})(\d{3})(\d{4,5})$/;
    return cleaned.replace(regex, "$1-$2-$3");
  }

  return (
    <>
      <div
        className={`bg-slate-50 h-svh z-10 p-5 pt-8 absolute ${
          menuOpen ? "w-1/4 sm:w-3/4" : "w-14 sm:w-3"
        } opacity-100 transition-all duration-400 ease-in-out shadow-2xl`}
      >
        {/* 화살표(펼치기) 버튼 */}
        <BsArrowLeftShort
          className={`z-10 bg-white text-slate-400 text-6xl rounded-full absolute -right-8 top-1/3 border-4 border-slate-300 cursor-pointer 
          transition-all duration-300 hover:text-slate-800 hover:border-slate-400
          ${!menuOpen && "rotate-180"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <div
          className={`${
            !menuOpen && "opacity-0 transition-all duration-400 ease-in-out"
          } ${
            filterOpen
              ? "hidden opacity-0 transition-all duration-400 ease-in-out"
              : "visible"
          }`}
        >
          {/* 지역선택  */}
          <section>
            <h1 className="font-bold text-lg">지역선택</h1>
            {/* 지역-군/구 선택 */}
            <LocSelect
              menuOpen={menuOpen}
              handleState={setOneState}
              handleDistrict={setOneDistrict}
            />

            {/* 매장명 검색창 */}
            <SearchStoreName
              menuOpen={menuOpen}
              handleStorelist={setStorelist}
              stateData={state}
              districtData={district}
            />
            
          </section>

          {/* 편의점 제공 서비스 카테고리 선택 */}
          <section>
            <h1 className="font-bold text-lg py-4">매장 카테고리 선택</h1>
            <StoreCategories handleCategories={setChosenCategories} />
          </section>
        </div>

        {/* 검색필터 접기 버튼 */}
        <button
          className={`w-full my-1 py-1 flex justify-center items-center font-semibold text-base
         border-slate-400 border-2 border-opacity-50 rounded-full ${
           !menuOpen && "scale-0"
         }
           transition duration-400 hover:bg-sub-yellow hover:border-main-yellow`}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          검색필터 접기 &nbsp;&nbsp;&nbsp;
          {filterOpen ? <FaChevronDown /> : <FaChevronUp />}
        </button>

        {/* 매장 목록; 사용자 위치 연동 */}
        <ul className="pt-2 h-[40%] overflow-y-auto">
          {/* { (filter.length === 0 && initialStores !== undefined && stores !== undefined) */}
          {(filter.length === 0 && initialStores !== undefined && stores === undefined)
            ? initialStores.map((store, k) => (
                <li key={k}>
                  <h5 className="font-semibold">{store.name}</h5>
                  <p>{store.address}</p>
                  <p>
                    <FaPhone className="inline" />
                    &nbsp;&nbsp;
                    {store.tel !== "None"
                      ? formatPhoneNumber(store.tel)
                      : "전화 ✖"}
                  </p>
                  <Link
                    to={`/storeproductlist/${store.id}/${store.name}`}
                    className="flex items-center hover:text-main-orange transition duration-200"
                  >
                    <FaStore className="inline" />
                    &nbsp;매장 재고 보러가기
                  </Link>
                  <br />
                  <hr className="border border-slate-400 border-opacity-100"/>
                  <br />
                </li>
              ))
            : stores.map((store, k) => (
                <li key={k}>
                  <h5 className="font-semibold">{store.name}</h5>
                  <p>{store.address}</p>
                  <p>
                    <FaPhone className="inline" />
                    &nbsp;&nbsp;
                    {store.tel !== "None"
                      ? formatPhoneNumber(store.tel)
                      : "전화 ✖"}
                  </p>
                  <Link
                    to={`/storeproductlist/${store.id}/${store.name}`}
                    className="flex items-center hover:text-main-orange transition duration-200"
                  >
                    <FaStore className="inline" />
                    &nbsp;매장 재고 보러가기
                  </Link>
                  <br />
                  <hr className="border border-slate-400 border-opacity-100"/>
                  <br />
                </li>
              ))}
        </ul>
      </div>
    </>
  );
}
