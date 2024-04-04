import styled from "styled-components";
import { useState } from "react";
import { Link } from 'react-router-dom';
// import axios from "axios";

// icon
import { BsArrowLeftShort } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

// component
import LocSelect from "./LocSelect";
import SearchStoreName from './SearchStoreName';
import StoreCategories from "./StoreCategories.js";

// icon
import { FaPhone } from "react-icons/fa6";

const LeftMenuStyle = styled.div`
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  border: 1px solid rgba(255, 255, 255, 0.22);
`;

// ({abc, bcd})
export default function LeftMenu(props) {
  // console.log(props);
  const [menuOpen, setMenuOpen] = useState(true); // 왼쪽바 메뉴 열림 상태
  const [filterOpen, setFilterOpen] = useState(false); // 매장 검색 및 필터 열림 상태

  const [targetStore, setTargetStore] = useState(""); // 검색할 매장명
  // 임시로 array slice함
  const [stores, setStores] = useState(props.props.slice(0, 9)); // 검색한 매장들
  // console.log(stores);
  const [filteredStores, setFilteredStores] = useState([]); // 카테고리에 해당되는 매장들

  function setStorelist(data) {
    console.log("부모에게 도달!");
    // console.log(stores);
    // 임시로 array slice함
    setStores(data.slice(0,9)); // 함수 종료 후에 setter 적용
  }

  return (
    <>
      <div
        className={`bg-slate-50 h-svh p-5 pt-8 relative ${
          menuOpen ? "w-2/6" : "w-14"
        } opacity-100 transition-all duration-400 ease-in-out`}
      >
        {/* 이거 부드럽게 애니메이션 주기 */}

        {/* 화살표(펼치기) 버튼 */}
        <BsArrowLeftShort
          className={`z-10 bg-white text-slate-400 text-6xl rounded-full absolute -right-8 top-1/3 border-4 border-slate-200 cursor-pointer 
          transition-all duration-500 hover:text-slate-600 
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
            {/* <FaDiceD6
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              menuOpen && "rotate-[360deg]"
            }`}
          /> */}
            {/* <h1
            className={`text-slate-600 origin-left font-medium text-2xl duration-300 ${
              !menuOpen && "scale-0"
            }`}
          >
            Manager
          </h1> */}
            <h1 className="font-bold text-lg">지역선택</h1>

            {/* 지역-군/구 선택 */}
            <LocSelect menuOpen={menuOpen} />

            {/* 매장명 검색창 */}
            <SearchStoreName
              menuOpen={menuOpen}
              handleStorelist={setStorelist}
            />
          </section>

          {/* 편의점 제공 서비스 카테고리 선택 */}
          <section>
            <h1 className="font-bold text-lg py-4">매장 카테고리 선택</h1>
            <StoreCategories />
          </section>
        </div>

        {/* 검색필터 접기 버튼 */}
        <button
          className={`w-full my-1 py-1 flex justify-center items-center font-semibold text-base
         border-slate-300 border-2 border-opacity-50 rounded-full ${
           !menuOpen && "scale-0"
         }
           transition duration-300 hover:bg-sub-yellow hover:border-main-yellow`}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          검색필터 접기&nbsp;&nbsp;&nbsp;
          {filterOpen ? <FaChevronDown /> : <FaChevronUp />}
        </button>

        {/* 매장 목록; 사용자 위치 연동 */}
        <ul className="pt-2">
          {
            stores.map((store, k) => (
              <li key={k}>
                <h5>{store.name}</h5>
                <p>{store.address}</p>
                <p>
                  <FaPhone className="inline" />
                  &nbsp;&nbsp;
                  <span>{store.tel}</span>
                </p>
                <Link to={`/storeproductlist/${ store.id }/${ store.name }`}>매장 재고</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}
