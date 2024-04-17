import { useEffect, useState, useRef } from "react";
import axios from "axios";
import React from "react";
import { VscArrowCircleDown, VscArrowCircleUp } from "react-icons/vsc";
import { TiDelete } from "react-icons/ti";

const Powrite = () => {
  const [categoryList, setCategoryList] = useState([]);

  const [checkboxList, setCheckboxList] = useState([]); // 체크박스 목록을 저장할 상태
  const [checkboxValues, setCheckboxValues] = useState({}); // 체크박스 값들을 저장할 상태

  const [categoryName, setCategoryname] = useState([]);
  const [productList, setProductList] = useState([]);
  const [counters, setCounters] = useState([]); // 각 체크박스에 대한 수량을 저장할 상태

  const [ckyn, setCkyn] = useState(false);

  const [checkedList, setCheckedList] = useState([]);

  // 검색
  const [choice, setChoice] = useState("");
  const [search, setSearch] = useState("");

  const getPowrite = () => {
    axios
      .get("ceo/powriteCn")
      .then(function (resp) {
        console.log(resp); // 확인용
        setCategoryList(resp.data);
      })
      .catch(function (err) {
        alert("error");
      });
  };

  function searchBtn() {
    // choice, search 검사
    if (choice === "") {
      alert("카테고리를 선택해 주십시오");
      return;
    }
    getPowrite(choice, search);
  }

  useEffect(() => {
    getPowrite();
  }, []);

  useEffect(() => {}, [productList]);

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
      let b;
      for (let i = 0; i < item.length; i++) {
        b = item[i];
        productList.push(b);
        counters.push(0);
      }
      setProductList(productList);
      setCounters(counters);
    } else if (!checked) {
      setCheckedList(checkedList.filter((e) => e !== item));
      for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < productList.length; j++) {
          if (productList[j] === item[i]) {
            productList.splice(j, 1);
            counters.splice(j, 1);
          }
        }
        console.log(productList);
        setProductList(productList);
        setCounters(counters);
      }
      // alert('여기에 도달했는지');
      setProductList(productList);
      setCounters(counters);
    }
  };

  //   const onRemove = item => {
  //     // setCheckedList(checkedList.filter(e => e !== item));
  //     setProductList
  //   };
  const onRemove = (i) => {
    productList.splice(i, 1);
    counters.splice(i, 1);
    setProductList(productList.filter(() => productList));
    setCounters(counters.filter(() => counters));
  };

  // 체크박스를 토글하는 함수
  const handleCheckboxChange = (id, isChecked) => {
    setCheckboxValues({
      ...checkboxValues,
      [id]: isChecked,
    });
    if (isChecked) {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [id]: 1, // 체크된 상태에서는 수량을 1로 초기화
      }));
    } else {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [id]: 0, // 체크가 해제되면 수량을 0으로 초기화
      }));
    }
  };

  // 카운터를 증가시키는 함수
  // const increaseCounter = (i) => {
  //    setCounters(prevCounters => ({
  //        ...prevCounters,
  //        [i]: prevCounters[i] + 1 // 해당 제품의 수량 증가
  //    }));
  // 숫자를 올릴때 배열에서 object로 바뀌기 때문에 이걸 고치면 된다.
  // console.log(counters);
  // console.log(productList);
  //};
  const increaseCounter = (i) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[i]++;
      return newCounters;
    });
    console.log(counters);
  };

  // 카운터를 감소시키는 함수
  const decreaseCounter = (i) => {
    if (counters[i] > 0) {
      setCounters((prevCounters) => {
        const newCounters = [...prevCounters];
        newCounters[i]--;
        return newCounters;
      });
    }
    // alert(counters[i]);
  };

  const categoryNames = Array.from(
    new Set(categoryList.map((item) => item.categoryName))
  );
  console.log(categoryNames);

  const categoryCN = categoryNames.map((categoryName) => {
    const subMenus = categoryList
      .filter((item) => item.categoryName === categoryName)
      .map((item) => item["name"]);
    return { categoryName, name: subMenus };
  });

  function button() {
    console.log(categoryCN);
  }

  return (
    <div className="w-full ml-4">
      <div className="align-middle">
        <table
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "3px",
            marginBottom: "3px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ paddingLeft: "3px" }}>
                <select
                  className="mr-4 shadow-xl rounded-2xl p-5 w-[125px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={choice}
                  onChange={(e) => {
                    setChoice(e.target.value);
                  }}
                >
                  <option value="">검색</option>
                  <option value="name">상품명</option>
                  <option value="wdate">발주 일자</option>
                </select>
                <span class="icoArrow">
                  <img
                    src="https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png"
                    alt=""
                  />
                </span>
              </td>
              <td style={{ paddingLeft: "5px" }} className="align-middle">
                <input
                  placeholder="카테고리를 선택해 주십시오"
                  size="30"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="rounded-2xl p-5 w-[500px] shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </td>
              <td style={{ paddingLeft: "5px" }}>
                <button
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
                          focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-[40px] py-5 me-2 mb-2
                          dark:focus:ring-yellow-900"
                  onClick={() => {
                    searchBtn();
                  }}
                >
                  검색
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">카테고리</h3>
      <div>
        <div className="grid grid-cols-3 gap-8 rounded-2xl p-2">
          {/* <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"> */}
          <ul>
            <li className="w-1/2 border-gray-200 rounded-t-lg dark:border-gray-200">
              {categoryCN.map((item, i) => {
                return (
                  <div
                    key={item}
                    className="grid grid-cols-2 gap-2 items-center ps-3"
                  >
                    <label
                      htmlFor={`vue-checkbox-${i}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {item.categoryName}
                    </label>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={(e) => {
                        onCheckedElement(e.target.checked, item.name);
                      }}
                      id={`vue-checkbox-${i}`}
                    />
                  </div>
                );
              })}
              <button className="w-1/2 ml-1 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                발주신청
              </button>
            </li>
          </ul>

          <div>
            {checkedList.length === 0 && (
              <div>{"카테고리를 지정해 주세요."}</div>
            )}
            {productList.map((item, i) => {
              // console.log("체크 리스트 : ");
              // console.log(item);
              console.log(item.id);

              return (
                <div>
                <div
                  key={i}
                  className="grid grid-cols-2 rounded-2xl p-2 w-[450px] focus:ring-2 border-2 border-yellow-400"
                >
                  <p>{productList[i]}</p>
                  <div className="flex justify-center gap-2 text-xl sm:text-xs">

                    <div className="relative h-10 w-40 ">
                        <span>
                          <button onClick={() => decreaseCounter(i)}>
                            <VscArrowCircleDown />
                          </button>
                        </span>
                        {counters[i]}
                        <span>
                          <button onClick={() => increaseCounter(i)}>
                            <VscArrowCircleUp />
                          </button>
                        </span>
                        <span>
                          <button onClick={() => onRemove(i)}>
                            <TiDelete />
                          </button>
                        </span>
                        <div className="text-xl"></div>
                    </div>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Powrite;