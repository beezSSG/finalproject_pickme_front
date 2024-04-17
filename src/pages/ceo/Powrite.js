import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../public/Toast";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const SelectedProducts = ({ selectedProducts, removeProduct }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-[300px] right-0">
      <h2
        className="text-xl font-bold mb-2 cursor-pointer bg-rose-500 text-white p-1 rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        선택된 상품 {isOpen ? "▲" : "▼"}
      </h2>
      {isOpen && (
        <div className="absolute top-full right-0 bg-white border-2 border-gray-700 p-4 w-[300px] h-[300px] overflow-y-auto">
          {selectedProducts.map((product, index) => (
            <div key={index} className="mb-2">
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="font-bold">{product.quantity}개</p>
                <p className="font-bold">{product.price.toLocaleString()}원</p>
              </div>
              <div>
                <button
                  onClick={() => removeProduct(product)}
                  className="bg-sub-yellow rounded-xl font-bold p-2"
                >
                  취소
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Powrite = () => {
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedProductToAdd, setSelectedProductToAdd] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchMoreData = () => {
    axios
      .get("customer/reservationproductlist", {
        params: { search: search, pageNumber: page + 1, perPage: 12 },
      })
      .then(function (resp) {
        if (resp.data.length === 0) {
          setHasMore(false);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...resp.data]);
          setPage((prevPage) => prevPage + 1);
        }
      })
      .catch(function () {
        console.log("error");
      });
  };

  useEffect(() => {
    const perPage = 12;
    setPage(1);
    setHasMore(true);
    reservationproductlist(search, 1, perPage);
  }, [search]);

  function reservationproductlist(search, page, perPage) {
    axios
      .get("customer/reservationproductlist", {
        params: { search: search, pageNumber: page, perPage: perPage },
      })
      .then(function (resp) {
        if (resp.data.length === 0) {
          setHasMore(false);
        } else {
          setProducts(resp.data);
          setPage(page);
        }
      })
      .catch(function () {
        console.log("error");
      });
  }

  const handleAddToCart = (product, quantity) => {
    setSelectedProductToAdd({ ...product, quantity });
  };

  const addToCartAfterQuantityChange = () => {
    if (selectedProductToAdd) {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        selectedProductToAdd,
      ]);
      setSelectedProductToAdd(null); // Reset selected product
      // Reset quantity input field
      const quantityInput = document.getElementById("quantityInput");
      if (quantityInput) {
        quantityInput.value = 1;
      }
    }
  };

  const removeProduct = (productToRemove) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product !== productToRemove)
    );
  };

  const totalPrice = selectedProducts.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  function insertproduct() {
    axios
      .post("/ceo/powritefinal", selectedProducts)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data === "YES") {
          Toast.fire({
            icon: "success",
            title: "성공적으로 발주가 신청되었습니다.",
          });
          navigate("/ceo/pomain");
        }
      })
      .catch((error) => {
        // handle error
      });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="w-full h-[1000px] relative">
      <div className="text-center sm:mt-6">
        <input
          type="search"
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border-2 border-gray-500 rounded-xl sm:p-1 focus:outline-none  focus:border-sub-yellow"
        />
      </div>

      <div className="justify-center p-2 rounded-b">
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore}
        >
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-1 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-md"
              >
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
                <div className="text-center mt-2 font-bold">
                  {product.price.toLocaleString()}원
                </div>
                <div className="flex justify-center mt-2">
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    onChange={(e) => {
                      const quantity = parseInt(e.target.value);
                      handleAddToCart(product, quantity);
                    }}
                    className="w-20 text-center border border-gray-300 rounded-md focus:outline-none"
                    id="quantityInput" // Add id to identify the input field
                  />
                  <button
                    className="ml-2 bg-yellow-500 text-white active:bg-yellow-600 font-bold text-sm px-2 py-2 rounded-md cursor-pointer"
                    onClick={addToCartAfterQuantityChange}
                  >
                    담기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
        <div className="fixed top-[250px] right-0">
          <button
            className="bg-yellow-500 text-white active:bg-yellow-600 font-bold text-sm px-2 py-3 rounded-full cursor-pointer sm:text-xs sm:px-2"
            type="button"
            onClick={() => insertproduct()}
          >
            발주
          </button>
        </div>
        <div className="fixed top-[200px] right-0">
          <button
            className="bg-gray-700 text-white active:bg-gray-900 font-bold text-sm px-2 py-3 rounded-full cursor-pointer sm:text-xs sm:px-2"
            type="button"
            onClick={scrollToTop}
          >
            맨위
          </button>
        </div>
      </div>
      <div className="absolute top-[250px] right-0">
        <SelectedProducts
          selectedProducts={selectedProducts}
          removeProduct={removeProduct}
        />
      </div>
    </div>
  );
};

export default Powrite;
