import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from "../login/Login";
import IdFind from "../login/IdFind";
import PwFind from "../login/PwFind";
import Register from "../login/Register";
import UserRegister from "../login/UserRegister";
import CeoRegister from "../login/CeoRegister";
import LoginGoogle from "../login/LoginGoogle";
import LoginKakao from "../login/LoginKakao";
import LoginNaver from "../login/LoginNaver";
import About from "../about/About";
import Productdetail from "../product/Productdetail";
import Productlist from "../product/Productlist";
import StoreMap from "../store/StoreMap";
import StoreProductlist from "../store/StoreProductlist";
import Post from "../customerservice/Post";
import ProductReservation from "../customerservice/ProductReservation";
import CustomerCenter from "../customerservice/CustomerCenter";
import ContactUs from "../customerservice/ContactUs";
import ContactUsDetail from "../customerservice/ContactUsDetail";
import ContactUsWrite from "../customerservice/ContactUsWrite";
import Faq from "../customerservice/Faq";
import FaqCreate from "../customerservice/FaqCreate";
import MyMain from "../mypage/MyMain";
import Event from "../manager/Event";
import EventDetail from "../manager/EventDetail";
import Chatbot from "../customerservice/Chatbot";
import Polist from "../ceo/Polist";
import Powrite from "../ceo/Powrite";
import PoMainpage from "../ceo/PoMainpage.js";
import About from "./About";

import { useState } from "react";

export default function MainHome() {
  const [choice, setChoice] = useState('select');
  const [switching, setSwitching] = useState(true); // 정렬을 반대로 스위칭하기 위한 변수
  const [category, setCategory] = useState(0);
  // 검색  
  const [search, setSearch] = useState("");
  // 페이징 
  const [page, setPage] = useState(1);

  function choiceHandle(pa) {
    // console.log(pa);
    setChoice(pa);
  }
  function switchingHandle(pa) {
    setSwitching(pa);
  }
  function searchHandle(pa) {
    setSearch(pa);
  }
  function pageHandle(pa) {
    setPage(pa);
  }
  function categoryHandle(pa) {
    setCategory(pa);
  }



  return (
    <>
      <header className="w-full sticky top-0 z-50">
        <Header />
      </header>

      <main className="relative">
        <div className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/idfind" element={<IdFind />} />
            <Route path="/pwfind" element={<PwFind />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userregister" element={<UserRegister />} />
            <Route path="/ceoregister" element={<CeoRegister />} />
              
            <Route path="/LoginGoogle" element={<LoginGoogle />} />
            <Route path="/LoginKakao" element={<LoginKakao />} />
            <Route path="/LoginNaver" element={<LoginNaver />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/productlist/:id" 
            element={<Productlist newchoice={choice} newswitching={switching} newsearch={search} newpage={page} newcategory = {category}
                        choiceHandle={choiceHandle} switchingHandle={switchingHandle} searchHandle={searchHandle} pageHandle={pageHandle} categoryHandle={categoryHandle} />} />
            <Route path="/productdetail/:id" 
            element={<Productdetail />} />

            <Route path="/storeproductlist/:id/:name" element={<StoreProductlist />} />
            {/* <Route path='/matchedstorelist/:id' element={<MatchedStoreList />} /> */}

            <Route path="/store" element={<StoreMap />} />

            <Route path="/post" element={<Post />} />
            <Route path="/productreservation" element={<ProductReservation />} />

            <Route path="event" element={<Event />} />
            <Route path="eventdetail/:id" element={<EventDetail />} />

            <Route path="/customercenter" element={<CustomerCenter />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/contactusdetail/:id" element={<ContactUsDetail />} />
            <Route path="/contactuswrite" element={<ContactUsWrite />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/faqcreate" element={<FaqCreate />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/mypage/*" element={<MyMain />} />
          </Routes>
        </div>
      </main>

      <footer className="py-4 bg-info text-light">
        <Footer />
      </footer>
    </>
  );
}
