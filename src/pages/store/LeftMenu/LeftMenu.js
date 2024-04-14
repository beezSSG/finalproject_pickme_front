import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

// icon
import { BsArrowLeftShort } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

// component
import LocSelect from "./LocSelect";
import SearchStoreName from "./SearchStoreName";
import StoreCategories from "./StoreCategories.js";

// icon
import { FaPhone } from "react-icons/fa6";

// ({abc, bcd})
export default function LeftMenu(props) {
  // console.log(props);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true); // 왼쪽바 메뉴 열림 상태
  const [filterOpen, setFilterOpen] = useState(false); // 매장 검색 및 필터 열림 상태

  const [targetStore, setTargetStore] = useState(""); // 검색할 매장명
  // 임시로 array slice함
  const [stores, setStores] = useState(); // 검색한 매장들
  const [filteredStores, setFilteredStores] = useState([]); // 카테고리에 해당되는 매장들

  const [state, setState] = useState("");        // LocSelect에서 넘겨받은 시/도 str 
  const [district, setDistrict] = useState("");  // LocSelect에서 넘겨받은 구 str

  function setStorelist(data) {
    console.log("부모에게 도달!");
    setStores(data);
  }
  // useEffect(()=>{
  //   // console.log(stores);
  //   setStores(props.stores);
  //   // setLoading(true);

  //   // - 지금 뭔가 워링이 무제한으로 걸리고 있다 useeffect 관련
  //   // - 컴포넌트에 대한 방법을 해보니 일정 부분의 값이 고정되고 나머지가 리렌더링이 되고 있는 부분이 있다
  // }, [])

  
  function setOneState(data) {
    console.log("부모에게 도달!");
    setState(data);
    console.log(state);
  }
  
  function setOneDistrict(data) {
    console.log("부모에게 도달!");
    setDistrict(data);
    console.log(district);
  }

  useEffect(() => {
    // console.log(stores);
    setStores(props.stores);
    if (stores !== undefined) {
      setLoading(true);
    } else {
      // console.log(stores);
    }
  }, [props.stores]);
  // }, [stores])

  // 여기에 함수를 만들어서 stores 에 있는 json중에 카테고리가 1이 되어있는 부분을 뽑아내고 나머지는 지워서 setStores 다시 집어넣는것
  // 두번째 방법은 내가 가지고있는 부분을 다시 백에 넘겨줘서 쿼리문으로 처리하고 다시 넘겨받기
  // 둘다 함 수는 만들어야함

  return (
    <>
      <div
        className={`bg-slate-50 h-svh z-10 p-5 pt-8 absolute ${
          menuOpen ? "w-1/4 sm:w-3/4" : "w-14 sm:w-3"
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
            <StoreCategories />
          </section>
          {/* <button onClick={() => console.log(props.stores)}>매장 목록 보기</button> */}
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
          검색필터 접기
          &nbsp;&nbsp;&nbsp;
          {filterOpen ? <FaChevronDown /> : <FaChevronUp />}
        </button>
        {/* <button onClick={()=>{console.log(state); console.log(district); console.log(district)}}>도/시 구 state, 검색어 확인용</button> */}

        {/* 매장 목록; 사용자 위치 연동 */}
        <ul className="pt-2 h-full overflow-y-auto">
          {stores &&
            stores.map((store, k) => (
              <li key={k}>
                <h5 className="font-semibold">{store.name}</h5>
                <p>{store.address}</p>
                <p>
                  <FaPhone className="inline" />
                  &nbsp;&nbsp;
                  <span>{store.tel !== "None" ? store.tel : ""}</span>
                </p>
                <Link to={`/storeproductlist/${store.id}/${store.name}`}>
                  매장 재고 보러가기
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
