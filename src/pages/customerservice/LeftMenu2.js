import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// icon
import { BsArrowLeftShort } from "react-icons/bs";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";

// component
import LocSelect from "../store/LeftMenu/LocSelect";
import SearchStoreName from "../store/LeftMenu/SearchStoreName";
import StoreCategories from "../store/LeftMenu/StoreCategories";

// ({abc, bcd})
export default function LeftMenu2(props) {
  // console.log(props);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true); // 왼쪽바 메뉴 열림 상태
  const [filterOpen, setFilterOpen] = useState(false); // 매장 검색 및 필터 열림 상태

  const [targetStore, setTargetStore] = useState(""); // 검색할 매장명
  // 임시로 array slice함
  const [initialStores, setInitialStores] = useState(); // 초기 렌더링 시 매장들
  const [stores, setStores] = useState(props.stores); // 검색한 매장들
  // const [filteredStores, setFilteredStores] = useState([]); // 카테고리에 해당되는 매장들

  const [state, setState] = useState(""); // LocSelect에서 넘겨받은 시/도 str
  const [district, setDistrict] = useState(""); // LocSelect에서 넘겨받은 구 str

  const [filter, setFilter] = useState([]);

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

  function setChosenCategories(data) {
    console.log("부모에게 도달!");
    setFilter(data);
    console.log("filter: " + filter);
  }

  function storeselect(storename) {
    axios
      .get("/customer/storeselect", { params: { storename: storename } })
      .then(function (resp) {
        console.log(resp.data);
        props.handleStoreSelect(resp.data); // 부모로 선택한 매장 정보 전달
      })
      .catch(function () {
        console.log("error");
      });
  }

  useEffect(() => {
    // setStores(props.stores); 보여져야할 부분
    setInitialStores(props.stores);
    if (initialStores !== undefined) {
      setLoading(true);
    } else {
      // console.log(stores);
    }

    if (filter !== undefined || filter.length !== 0) {
      let filteredStores = initialStores;
      filter.map((f) => {
        console.log(f);
        // key이름이 겹침 -> 키에 대한 정확한 위치를 파악 && 거기에 각각 1이 맞는지 확인 작업
        filteredStores = filteredStores.filter(
          (item) => item.hasOwnProperty(f) && item[f] === 1
        );
      });
      console.log(filteredStores);
      // console.log(noneStores);
      setStores(filteredStores);
      // 초기화 작업을 따로 해줘야겠네요
    }
    // if (stores !== undefined) {
    //   setLoading(true);
    // } else {
    //   // console.log(stores);
    // }

    // if (filter !== undefined || filter.length !== 0) {
    //   let filteredStores = stores;
    //   filter.map((f)=>{
    //     console.log(f);
    //     // key이름이 겹치자나요 키에대한 정확한 위치를 파악하고 거기에 각각 1이맞는지 확인작업까지 하는것
    //     filteredStores = filteredStores.filter((item) => item.hasOwnProperty(f) && item[f] === 1)
    //   })
    //   console.log(filteredStores);
    //   // console.log(noneStores);
    //   setStores(filteredStores);
    // }

    // console.log(stores);
  }, [props.stores, filter]);
  // }, [stores])

  // 여기에 함수를 만들어서 stores 에 있는 json중에 카테고리가 1이 되어있는 부분을 뽑아내고 나머지는 지워서 setStores 다시 집어넣는것
  // 두번째 방법은 내가 가지고있는 부분을 다시 백에 넘겨줘서 쿼리문으로 처리하고 다시 넘겨받기
  // 둘다 함 수는 만들어야함

  function formatPhoneNumber(phoneNumber) {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const regex = /^(\d{3})(\d{3})(\d{4,5})$/;
    return cleaned.replace(regex, "$1-$2-$3");
  }

  return (
    <>
      <div className="bg-slate-50 h-svh z-10 p-5 pt-8 absolute opacity-100 transition-all duration-400 ease-in-out">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => props.handleClose()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div>
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

        {/* <button onClick={()=>{console.log(state); console.log(district); console.log(district)}}>도/시 구 state, 검색어 확인용</button> */}

        {/* 매장 목록; 사용자 위치 연동 */}
        <ul className="pt-2 h-3/6 overflow-y-auto">
          {stores &&
            stores.map((store, k) => (
              <li key={k}>
                <button
                  className="hover:text-sub-orange"
                  onClick={() => storeselect(store.name)}
                >
                  <h5 className="font-semibold">{store.name}</h5>
                </button>
                <p>{store.address}</p>
                <p>
                  <FaPhone className="inline" />
                  &nbsp;&nbsp;
                  {store.tel !== "None"
                    ? formatPhoneNumber(store.tel)
                    : "전화 ✖"}
                </p>
                <br />
                <hr />
                <br />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
