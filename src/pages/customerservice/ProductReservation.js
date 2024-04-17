import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import StoreMap from "../store/StoreMap";
import LeftMenu2 from "./LeftMenu2";

function ProductReservation() {
  // 매장 찾기
  const [storeName, setStoreName] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);

  const handleStoreSelect = (storeData) => {
    setSelectedStore(storeData);
    setStoreName(storeData.name); // 선택한 매장 이름 설정
    setShowstoreModal(false); // 매장 모달 닫기
  };

  // 예약할 상품 테이블

  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // 페이지 번호 추가

  const [search, setSearch] = useState("");

  function selectstorename() {
    axios
      .get("/customer/selectstorename", { params: { id: selectedStore } })
      .then(function (resp) {
        console.log(resp.data);
        setStoreName(resp.data);
      })
      .catch(function () {
        console.log("error");
      });
  }

  useEffect(
    function () {
      window.localStorage.removeItem('product');
      console.log(selectedStore);
      if (selectedStore !== null) {
        selectstorename();
      }
    },
    [selectedStore]
  );

  const fetchMoreData = () => {
    axios
      .get("customer/reservationproductlist", {
        params: { search: search, pageNumber: page + 1, perPage: 12 },
      })
      .then(function (resp) {
        if (resp.data.length === 0) {
          setHasMore(false); // No more data available
        } else {
          setProducts((prevProducts) => [...prevProducts, ...resp.data]);
          setPage((prevPage) => prevPage + 1); // Increment page number
        }
      })
      .catch(function () {
        console.log("error");
      });
  };

  useEffect(() => {
    const perPage = 12; // 한페이지 보여질 항목 수
    setPage(1); // 페이지 번호 초기화
    setHasMore(true); // 더 많은 데이터가 있는지 초기화
    reservationproductlist(search, 1, perPage); // 초기 데이터 불러오기
  }, [search]); // 검색어가 변경될 때마다 실행

  function reservationproductlist(search, page, perPage) {
    axios
      .get("customer/reservationproductlist", {
        params: { search: search, pageNumber: page, perPage: perPage },
      })
      .then(function (resp) {
        if (resp.data.length === 0) {
          setHasMore(false); // No more data available
        } else {
          setProducts(resp.data); // 새로운 데이터로 대체
          setPage(page); // 현재 페이지 번호 업데이트
        }
      })
      .catch(function () {
        console.log("error");
      });
  }

  // 최종 예약 상품 목록
  const [reservationProduct, setReservationProduct] = useState([]);

  // 수량
  const [quantities, setQuantities] = useState(Array(products.length).fill(1));
  // 선택 상품목록
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (event, product, index) => {
    const quantity = quantities[index];
    if (event.target.checked && !isNaN(quantity) && quantity > 0) {
      // 이미 선택된 상품인지 확인
      const existingProductIndex = selectedProducts.findIndex(
        (item) => item.name === product.name
      );
      if (existingProductIndex !== -1) {
        // 이미 선택된 상품이라면 수량만 업데이트
        const updatedProducts = [...selectedProducts];
        updatedProducts[existingProductIndex].quantity = quantity;
        updatedProducts[existingProductIndex].price = product.price * quantity;
        setSelectedProducts(updatedProducts);
      } else {
        // 선택된 상품이 아니라면 추가
        setSelectedProducts((prevState) => [
          ...prevState,
          {
            url: product.url,
            name: product.name,
            quantity: quantity,
            price: product.price * quantity,
          },
        ]);
      }
    } else {
      // 체크가 해제되면 해당 상품을 선택에서 제거
      setSelectedProducts((prevState) =>
        prevState.filter((item) => item.name !== product.name)
      );
    }
  };
  // 수량 계산
  const handleQuantityChange = (event, index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = parseInt(event.target.value);
    setQuantities(newQuantities);
  };
  // 총 결제 금액 계산
  const totalPrice = reservationProduct.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  // 최종적으로 상품 담기
  function insertproduct() {
    setReservationProduct(selectedProducts);
    closeproductModal();
  }

  // 픽업 날짜
  const [pickDate, setPickDate] = useState("");

  // 모달들
  const [showstoreModal, setShowstoreModal] = useState(false);
  function searchStore() {
    setShowstoreModal(true);
  }
  function closestoreModal() {
    setShowstoreModal(false);
  }

  const [showproductModal, setShowproductModal] = useState(false);
  function choiceProduct() {
    setShowproductModal(true);
  }
  function closeproductModal() {
    setShowproductModal(false);
  }

  function consolee() {
    console.log(reservationProduct);
  }

  function scrollToTop() {
    const modalDiv = document.getElementById("modalScrollableDiv");
    modalDiv.scrollTop = 0; // 모달 내 스크롤을 맨 위로 이동
  }

  return (
    <>
      <div className="max-w-[1200px] mx-auto sm:px-3">
        <div className="text-4xl font-bold mt-[70px]">픽업 예약</div>
        <br />
        <hr className="border-gray-500" />
        <br />
        <br />
        <div className=" font-bold text-3xl text-gray-700">픽업 매장찾기</div>
        <br />

        <label className="font-bold text-2xl text-slate-500">매장 명</label>
        <div className="flex space-x-3 mt-2">
          <div className="border-2 border-gray-400 w-[20%] sm:w-[50%] text-center p-2 rounded-xl">
            {storeName}
          </div>
          <div className="text-center">
            <button
              className="bg-sub-yellow rounded-xl p-2 font-bold w-[100px] h-full hover:bg-yellow-500"
              onClick={searchStore}
            >
              매장 찾기
            </button>
          </div>
        </div>
        {showstoreModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-65 z-50">
            <div className="w-full h-full">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white">
                {/* 모달 제목 */}
                <div className="relative text-center my-5 text-3xl">
                  <p className="font-bold">매장 찾기</p>
                </div>
                {/* 모달 내용 */}
                <div className="flex justify-center ">
                  <LeftMenu2 handleStoreSelect={handleStoreSelect} />
                </div>
              </div>
            </div>
          </div>
        )}
        <br />
        <div className=" font-bold text-3xl text-gray-700">예약 상품찾기</div>
        <br />

        <label className="font-bold text-2xl text-slate-500">상품</label>
        <div className="text-red-500 font-bold mb-3">
          ※최소 1개 이상의 상품을 담아주세요
        </div>
        <div>
          <div className="text-center">
            {reservationProduct.length > 0 && (
              <div className="grid grid-cols-6 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {reservationProduct.map((product, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 p-4 rounded-md"
                  >
                    <img
                      src={product.url}
                      className="w-32 h-32 object-cover mx-auto"
                    />
                    <div className="text-center mt-2 font-bold h-[63px]">
                      {product.name}
                    </div>
                    <div className="text-center mt-2 font-bold">
                      {product.quantity}개
                    </div>
                    <div className="text-center mt-2 font-bold">
                      {product.price.toLocaleString()}원
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <br />
          <button
            className="bg-sub-yellow hover:bg-yellow-500 rounded-xl p-2 font-bold w-[100px] h-full"
            onClick={choiceProduct}
          >
            상품 찾기
          </button>
        </div>
        <br />

        {/* 아마 이것도 상품선택하는 모달창이 뜨고 거기서 상품을 체크하고 수량을 선택해서 확인 버튼을 누르면 그 값들이 저장되게 ? */}
        {showproductModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-65">
            <div className="w-[70%] h-screen pt-36 pb-20 sm:pb-5">
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white overflow-y-auto"
                id="modalScrollableDiv"
              >
                {/* 모달 제목 */}
                <div className="relative text-center my-5 text-3xl">
                  <p className="font-bold">상품 찾기</p>
                </div>
                <div className="text-center sm:mt-6">
                  <input
                    type="search"
                    placeholder="검색어를 입력하세요."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border-2 border-gray-500 rounded-xl sm:p-1"
                  />
                </div>
                {/* 모달 내용 */}
                <div className="justify-center p-2 rounded-b">
                  {/* 상품 선택 부분 들어갈것 */}
                  <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    scrollableTarget="modalScrollableDiv" // 모달 스크롤 지정
                  >
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-1 lg:grid-cols-3">
                      {products.map((product, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 p-4 rounded-md"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-gray-600 mb-2"
                            onChange={(event) =>
                              handleCheckboxChange(event, product, index)
                            }
                          />
                          <div className="flex justify-center">
                            <img
                              src={product.url}
                              alt=""
                              className="w-32 h-32 object-cover"
                            />
                          </div>
                          <h4 className="text-center mt-2 font-bold h-11">
                            {product.name}
                          </h4>
                          <div className="flex justify-center mt-2">
                            <input
                              type="number"
                              className="appearance-none w-24 bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                              min="0"
                              defaultValue="0"
                              onChange={(event) =>
                                handleQuantityChange(event, index)
                              }
                            />
                          </div>
                          <div className="text-center mt-2 font-bold">
                            {product.price.toLocaleString()}원
                          </div>
                        </div>
                      ))}
                    </div>
                  </InfiniteScroll>
                  <br />
                  <br />
                  <br />
                  <br />
                  <div className="fixed top-[200px]">
                    <button
                      className="bg-yellow-500 text-white active:bg-yellow-600 font-bold text-sm px-2 py-3 rounded-full cursor-pointer sm:text-xs sm:px-2"
                      type="button"
                      onClick={() => insertproduct()}
                    >
                      확인
                    </button>
                  </div>
                  <div className="fixed top-[150px]">
                    <button
                      className="bg-gray-700 text-white active:bg-gray-900 font-bold text-sm px-3 py-3 rounded-full cursor-pointer sm:text-xs sm:px-2"
                      type="button"
                      onClick={scrollToTop}
                    >
                      top
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className=" font-bold text-3xl text-gray-700">픽업날짜 찾기</div>
        <br />
        <label className="font-bold text-2xl text-slate-500">
          픽업 날짜 선택
        </label>
        <div className="text-red-500 font-bold mb-3">
          ※당일 기준 최소 3일 이후 부터 예약 가능
        </div>
        <div className="border-2 border-gray-400 w-[20%] text-center p-2 rounded-xl sm:w-[45%] ">
          <input
            type="date"
            value={pickDate}
            onChange={(e) => setPickDate(e.target.value)}
            className="focus:outline-none"
          />
        </div>
        <div className="text-right font-bold text-lg">
          최종 결제 금액: {totalPrice.toLocaleString()}원
        </div>
        <div className="text-right mt-3">
          <button
            className="bg-gray-700 rounded-xl p-3 text-white"
            onClick={consolee}
          >
            결제하기
          </button>
        </div>
        <div>결제하고 나면 mypage 픽박스로 가야함</div>
      </div>
    </>
  );
}

export default ProductReservation;
