import MyStoreProducts from "./MyStoreProducts.js";
import Promotion from "./Promotion.js";
import AdProductSet from "./AdProductSet.js";
import SearchProduct from "./SearchProduct.js";
import Chatbot from "../customerservice/Chatbot.js";
import { useEffect, useState } from "react";
import cutechatbot from "../../assets/imgs/chatbot/bee.gif";
import { ImCancelCircle } from "react-icons/im";
import MainPickBox from "./MainPickBox.js";

const Home = () => {
  const [modal, setModal] = useState(false);

  // 버튼 클릭 시 모달 상태를 토글하는 함수
  const toggleModal = () => {
    setModal(!modal);
  };
  useEffect(() => {
    window.localStorage.removeItem('product');
  }, [])

  return (
    <div>
      <main className="relative">
        <div className="py-4">
          <section className="container mx-auto w-screen mb-4">
            <MainPickBox />
          </section>
          <section className="container mx-auto w-screen mb-4">
            <Promotion />
          </section>
          <section className="container mx-auto w-screen mb-4">
            <AdProductSet />
          </section>
          <section className="container mx-auto w-screen mb-4">
            <MyStoreProducts />
          </section>
          <section className="container mx-auto w-screen mb-4">
            <SearchProduct />
          </section>
          {/* 사용안함으로 인한 주석처리 */}
          {/* <section className="container mx-auto w-screen mb-4">
            <GuideAndSc />
          </section> */}
          {modal ? (
            <div className="fixed bottom-9 right-4">
              <ImCancelCircle
                onClick={toggleModal}
                className=" text-5xl text-gray-500 font-bold cursor-pointer  hover:scale-95"
              />
            </div>
          ) : (
            <div className="fixed bottom-4 right-4 bg-gray-500 rounded-full  hover:scale-95 z-50">
              <img
                src={cutechatbot}
                onClick={toggleModal}
                className="w-16 h-16 m-2 cursor-pointer"
              />
            </div>
          )}

          <div className="fixed bottom-28 right-4 z-50">
            {modal ? <Chatbot /> : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
