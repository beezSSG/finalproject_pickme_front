import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import MatchedStoreList from "../store/MatchedStoreList";
import Toast from "../public/Toast";

import star2 from "../../assets/imgs/product/star2.png";
import { CgProfile } from "react-icons/cg";

function Productdetail() {
  let params = useParams();

  const [id, setId] = useState(""); // update, delete 버튼을 시각화할지 정하기 위해서
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const [productCategory, setProductCategory] = useState("");

  // 받을 데이터를 읽어 들이는 처리가 끝났는지 확인
  const [loading, setLoading] = useState(false);

  // 모달 창 변수
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const searchMatchStore = (id) => {
    // 모달 열 때 id 값 설정
    setModalIsOpen(true);
  };

  //    const[recentlyProduct, RecentlyProduct] = useState(); // 최근본 상품

  useEffect(() => {
    getProduct(params.id);
    productReviewList(params.id);

    zzimCheck(params.id);

    recentlyProduct(params.id);
  }, []);

  // 뒤로가기 버튼
  function backBtn() {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  }

  // 최근본 상품 기능
  function recentlyProduct(id) {
    let set_product = localStorage.getItem("recentlyProduct");
    if (set_product === null) {
      set_product = [];
    } else {
      set_product = JSON.parse(set_product);
    }

    if (set_product.length === 10 || set_product.length === "10") {
      // 최근본 상품이 11개 일때
      set_product.pop();
      set_product.unshift(id);
      set_product = new Set(set_product);
      set_product = [...set_product];
      localStorage.setItem("recentlyProduct", JSON.stringify(set_product));
    } else {
      // 최근본 상품이 10개 이하
      set_product.unshift(id);
      set_product = new Set(set_product);
      set_product = [...set_product];
      localStorage.setItem("recentlyProduct", JSON.stringify(set_product));
    }
  }

  // 찜 상품인지 아닌지 ~
  const [zzim, setZzim] = useState(false);

  // 후기 변수
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewCnt, setReviewCnt] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [reviewCheck, setReviewCheck] = useState(0);
  const [cd, setCd] = useState(0);

  // 후기 목록
  const [reviewList, setReviewList] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(5); // 처음엔 3개의 후기만 보이도록 설정
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 상품 상세정보 받아오기
  async function getProduct(id) {
    await axios
      .get("http://localhost:8080/api/v1/product/productdetail", {
        params: { id: id },
      })
      .then(function (resp) {
        //    console.log(resp.data);
        setId(id);
        setProduct(resp.data);
        setCategory(resp.data.categoryId);

        setLoading(true);
      })
      .catch(function (err) {
        alert("error");
      });
  }

  // 카테고리 id를 이용해 카테고리 저장
  function setCategory(categoryId) {
    if (categoryId === 7) {
      setProductCategory("생활용품");
    }
  }

  // 후기 등록
  async function reviewInsert() {
    if (reviewContent === "") {
      Toast.fire({
        icon: "warning",
        title: "내용을 입력하세요.",
      });
      return;
    }

    if (`${localStorage.getItem("jwt")}` === "null") {
      Toast.fire({
        icon: "warning",
        title: "로그인 후 이용 가능합니다",
      });
      return;
    }

    await axios
      .get("http://localhost:8080/api/v1/review/reviewInsert", {
        params: { productId: id, content: reviewContent, rating: reviewRating },
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((resp) => {
        Toast.fire({
          icon: "success",
          title: "후기 등록 완료!",
        });
        setReviewContent("");
        productRatingAvg(id);
        setProductRating(product.productRating);
        productReviewList(id);
      })
      .catch(() => {
        alert("error");
      });
  }

  // 후기 삭제
  async function reviewDelete(listId) {
    await axios
      .get("http://localhost:8080/api/v1/review/reviewDelete", {
        params: { productId: id, id: listId },
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((resp) => {
        alert(resp.data);
        productRatingAvg(id);
        setProductRating(product.productRating);
        productReviewList(id);
      })
      .catch(() => {
        alert("error");
      });
  }

  // 후기 등록 시 별점 체크
  const handleRatingChange = (event) => {
    const selectedRating = parseInt(event.target.value);
    setReviewRating(selectedRating);
  };

  // 후기 평점 업데이트 후, 후기 수 반환
  async function productRatingAvg(id) {
    await axios
      .get("http://localhost:8080/api/v1/review/productRatingAvg", {
        params: { productId: id },
      })
      .then((resp) => {
        setReviewCnt(resp.data);
      })
      .catch(() => {
        alert("error");
      });
  }

  // 후기 목록 불러오기
  async function productReviewList(id) {
    await axios
      .get("http://localhost:8080/api/v1/review/productReviewList", {
        params: { id: id },
      })
      .then((resp) => {
        setReviewList(resp.data);
      })
      .catch(() => {
        alert("error");
      });

    // 이미 후기 작성했는지 체크
    await axios
      .get("http://localhost:8080/api/v1/review/productReviewCheck", {
        params: { id: id },
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((resp) => {
        setReviewCheck(resp.data.cnt);
        if (resp.data.cnt > 0) {
          setCd(resp.data.cd);
        }
      })
      .catch(() => {
        alert("error");
      });
  }

  // '더보기' 버튼
  function moreReviews() {
    setIsLoading(true);

    setTimeout(() => {
      setVisibleReviews((prev) => prev + 5);
      setIsLoading(false);
    }, 500);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////// useEffect //////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    getProduct(params.id);

    productReviewList(params.id);

    zzimCheck(params.id);
    productRatingAvg(params.id);
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////// useEffect //////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (loading === false) {
    return <div>loading...</div>;
  }

  // 찜 체크
  async function zzimCheck(productId) {
    if (`${localStorage.getItem("jwt")}` === "null") {
      return;
    }

    await axios
      .get("http://localhost:8080/api/v1/customer/checkZZIM", {
        params: { productId: productId },
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((resp) => {
        if (resp.data == "YES") {
          setZzim(true);
        } else {
          setZzim(false);
        }
      })
      .catch(() => {
        alert("checkZZIM error");
      });
  }

  // 찜 추가/해제
  async function zzimClick(productId) {
    if (`${localStorage.getItem("jwt")}` === "null") {
      Toast.fire({
        icon: "warning",
        title: "로그인 후 이용 가능합니다",
      });
      return;
    }

    if (zzim === false) {
      await axios
        .post("http://localhost:8080/api/v1/customer/insertZZIM", null, {
          params: { productId: productId },
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        })
        .then((resp) => {
          Toast.fire({
            icon: "success",
            title: "찜 완료 ❤",
          });
        })
        .catch(() => {
          alert("insertZZIM error");
        });
    } else {
      await axios
        .post("http://localhost:8080/api/v1/customer/deleteZZIM", null, {
          params: { productId: productId },
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        })
        .then((resp) => {
          Toast.fire({
            icon: "success",
            title: "찜 해제 완료 🤍",
          });
        })
        .catch(() => {
          alert("deleteZZIM error");
        });
    }

    zzimCheck(productId);
  }

  // 장바구니 담기
  function giftClick() {
    if (`${localStorage.getItem("jwt")}` === "null") {
      Toast.fire({
        icon: "warning",
        title: "로그인 후 이용 가능합니다",
      });
      return;
    }

    Toast.fire({
      icon: "warning",
      title: "선물은 위험해요 😛",
    });
  }

  return (
    <div align="center">
      <div className="prodDetail rounded-xl border border-spacing-2 p-3 mx-48 flex sm:m-5 sm:flex-wrap ">
        <div
          name="prodDetailPic"
          style={{ position: "relative", width: "400px", height: "400px" }}
        >
          <img
            src={product.url}
            style={{ maxWidth: "400px", maxHeight: "400px", margin: "10px" }}
          />
        </div>

        <div name="prodDetailText" className="ml-20">
          <p name="tit" className="font-bold mt-20 mb-5 text-3xl ">
            {" "}
            {product.name}{" "}
          </p>
          <hr />
          <br />
          <div name="prodInfo">
            <dl className="ml-5" style={{ display: "flex" }}>
              <dt className="font-bold text-xl mb-8">가격</dt>
              <dd className="ml-8 text-xl">
                <p>
                  <span>{product.price.toLocaleString()} 원</span>
                </p>
              </dd>
            </dl>
            <dl className="ml-5" style={{ display: "flex" }}>
              <dt className="font-bold text-xl mb-8">태그</dt>
              <dd className="ml-8 text-xl">
                <div
                  className="focus:outline-none text-white bg-red-800
                                    from-neutral-50 font-medium rounded-lg text-sm px-2 py-1.5"
                >
                  {productCategory}
                </div>
              </dd>
            </dl>
            <hr />
            <br />
            <dl style={{ display: "flex" }}>
              <dd>
                {zzim === false ? (
                  <button
                    className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 
                                    focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-2xl px-5 py-1.5 me-2 mb-2
                                    dark:focus:ring-yellow-900"
                    onClick={() => zzimClick(product.id)}
                  >
                    🤍
                  </button>
                ) : (
                  <button
                    className="focus:outline-none bg-red-400 hover:bg-yellow-500 
                                    focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-2xl px-5 py-1.5 me-2 mb-2
                                    dark:focus:ring-yellow-900"
                    onClick={() => zzimClick(product.id)}
                  >
                    ❤
                  </button>
                )}
              </dd>
              <dd>
                <button
                  className="focus:outline-none text-gray-800 bg-yellow-400 font-bold hover:bg-yellow-500 
                                                    focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 me-2 mb-2
                                                    dark:focus:ring-yellow-900"
                  onClick={() => giftClick()}
                >
                  선물하기🎁
                </button>
              </dd>
              <dd>
                <button
                  className="focus:outline-none text-gray-800 bg-yellow-400 font-bold hover:bg-yellow-500 
                                                    focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 me-2 mb-2
                                                    dark:focus:ring-yellow-900"
                  onClick={() => searchMatchStore(product.id)}
                >
                  상품이 있는 점포 찾기 🔍
                </button>
                <MatchedStoreList
                  isOpen={modalIsOpen}
                  closeModal={() => setModalIsOpen(false)}
                  id={product.id}
                />
              </dd>
              <dd>
                <button
                  className="focus:outline-none text-gray-800 bg-yellow-400 font-bold hover:bg-yellow-500 
                                                    focus:ring-4 focus:ring-yellow-300 rounded-lg px-5 py-2.5 me-2 mb-2
                                                    dark:focus:ring-yellow-900"
                  onClick={() => backBtn()}
                >
                  목록
                </button>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <br />
      <br />
      <hr />
      <br />

      {/* 후기 나타나는 table */}

      <div className="prodReview rounded-xl p-3 mx-48 sm:m-5 sm:flex-wrap ">
        <div name="prodReviewHeader " align="left" style={{ width: "750px" }}>
          <p className="font-bold text-xl mb-2">상품평</p>
        </div>
        <div
          name="prodReviewAvg"
          align="left"
          style={{ width: "750px", display: "flex" }}
        >
          {Array.from({ length: product.productRating }, (_, index) => (
            <span key={index} style={{ display: "inline-block" }}>
              <img
                src={star2}
                style={{ maxWidth: "30px", maxHeight: "30px", margin: "3px" }}
              />
            </span>
          ))}
          <p className="ml-2 text-2xl">({reviewCnt})</p>
        </div>

        {localStorage.getItem("jwt") !== null && reviewCheck === 0 && (
          <div
            name="prodReviewWriter"
            className="rounded-xl border border-spacing-2 p-3 mt-5"
            style={{ width: "800px", height: "110px" }}
          >
            <div name="writerInbox">
              <textarea
                placeholder="후기를 남겨보세요"
                rows={2}
                style={{
                  overflow: "hidden",
                  overflowWrap: "break-word",
                  width: "700px",
                  height: "50px",
                  resize: "none",
                  outline: "none",
                }}
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </div>
            <div name="writerAttach" className="flex justify-between">
              <div className="flex items-center me-2 mb-2">
                <select
                  className="ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none text-yellow-500"
                  style={{ maxWidth: "120px" }}
                  value={reviewRating}
                  onChange={handleRatingChange}
                >
                  <option value={5}>★★★★★</option>
                  <option value={4}>★★★★</option>
                  <option value={3}>★★★</option>
                  <option value={2}>★★</option>
                  <option value={1}>★</option>
                </select>
              </div>
              <button
                className="focus:outline-none text-gray-800 bg-yellow-400 font-bold hover:bg-yellow-500 
                                                    focus:ring-4 focus:ring-yellow-300 rounded-lg px-2 py-1 me-2 mb-2
                                                    dark:focus:ring-yellow-900"
                onClick={() => reviewInsert()}
              >
                등록
              </button>
            </div>
          </div>
        )}

        <div name="prodReviewList" className="mt-10">
          {reviewList.slice(0, visibleReviews).map((review, index) => (
            <div key={index}>
              <div
                className="reviewListProfile flex sm:flex-wrap p-5 bg-orange-100 rounded-md"
                style={{ maxWidth: "800px" }}
              >
                <CgProfile size="40" color="#51abf3" />
                <div className="ml-2 text-left w-[100px]">
                  <p>
                    {review.name.substring(0, 1) +
                      "*" +
                      review.name.substring(review.name.length - 1)}
                  </p>
                  <p>
                    {Array.from({ length: review.rating }, (_, index) => (
                      <span key={index} style={{ display: "inline-block" }}>
                        <img
                          src={star2}
                          style={{
                            maxWidth: "15px",
                            maxHeight: "15px",
                            margin: "2px",
                          }}
                        />
                      </span>
                    ))}
                  </p>
                </div>
                <div className="ml-20 text-left">
                  <p>{review.content}</p>
                </div>
                {localStorage.getItem("jwt") !== null &&
                  cd === review.customerId && (
                    <div className="ml-auto">
                      <button
                        className="focus:outline-none text-gray-800 bg-yellow-300 font-bold hover:bg-yellow-500
                                        focus:ring-4 focus:ring-yellow-300 rounded-lg px-3 py-0.5 me-2 mb-2 dark:focus:ring-yellow-900"
                        onClick={() => reviewDelete(review.id)}
                      >
                        X
                      </button>
                    </div>
                  )}
              </div>
              <p>&nbsp;</p>
            </div>
          ))}
        </div>

        {reviewList.length > visibleReviews && (
          <div className="loadMoreBtn mt-5">
            <button
              className="focus:outline-none text-gray-800 bg-yellow-400 font-bold hover:bg-yellow-500 
                                                    focus:ring-4 focus:ring-yellow-300 rounded-lg px-2 py-1 me-2 mb-2
                                                    dark:focus:ring-yellow-900"
              onClick={moreReviews}
              disabled={isLoading}
            >
              {isLoading ? "로딩 중..." : "더보기"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Productdetail;
