import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './pages/main/Header';
import Footer from './pages/main/Footer';
import Home from './pages/main/Home';
import Login from './pages/login/Login';
import LoginGoogle from './pages/login/LoginGoogle';
import LoginKakao from './pages/login/LoginKakao';
import LoginNaver from './pages/login/LoginNaver';

import Productlist from './pages/product/Productlist';
import Productdetail from './pages/product/Productdetail';
import StoreMap from './pages/store/StoreMap';
import StoreProduct from './pages/store/StoreProductlist';
import MatchedStoreList from './pages/store/MatchedStoreList';
import Polist from './pages/ceo/Polist';
import Powrite from './pages/ceo/Powrite';

import ManagerMain from './pages/manager/ManagerMain';
import Event from './pages/manager/Event';
import EventDetail from './pages/manager/EventDetail';
import EventCreate from './pages/manager/EventCreate';
import Coupon from './pages/manager/Coupon';
import NewproductInsert from './pages/manager/NewproductInsert';
import ManagerPurchaseOrder from './pages/manager/ManagerPurchaseOrder';

import CustomerCenter from './pages/customerservice/CustomerCenter';
import ContactUs from './pages/customerservice/ContactUs';
import ContactUsDetail from './pages/customerservice/ContactUsDetail';
import ContactUsWrite from './pages/customerservice/ContactUsWrite';

import Faq from './pages/customerservice/Faq';
import FaqCreate from './pages/customerservice/FaqCreate';
import { AuthProvider } from './utils/AuthProvider';
import MyMain from './pages/mypage/MyMain';

function App() {

  return (
    <>
      <AuthProvider>
      <header className="w-full sticky top-0 z-50">
        <Header />
      </header>

      <BrowserRouter>
        {/* <nav className='navbar navbar-expand-md navbar-dark bg-info sticky-top'>
          <div className='container'>
            <div className="collapse navbar-collapse" id="navbar-content">
              <ul className="navbar-nav mr-auto">
                <li className='nav-item'>
                  <Link className='nav-link' to="/">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}

        <main className="relative">
          <div className='py-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/LoginGoogle' element={<LoginGoogle />} />
              <Route path='/LoginKakao' element={<LoginKakao />} />
              <Route path='/LoginNaver' element={<LoginNaver />} />
              <Route path='/productlist' element={<Productlist />} />
              <Route path='/productdetail/:id' element={<Productdetail />} />

              <Route path='/store' element={<StoreMap />} />
              <Route path='/storeproductlist/:id' element={<StoreProduct />} />
              {/* <Route path='/matchedstorelist/:id' element={<MatchedStoreList />} /> */}
              <Route path='/ceo' element={<Polist />} />
              <Route path='/pow' element={<Powrite />} />
                
              <Route path='/manager' element={<ManagerMain />} />
              <Route path='/event' element={<Event />} />
              <Route path='/eventdetail/:id' element={<EventDetail />} />
              <Route path='/eventcreate' element={<EventCreate />} />
              <Route path='/coupon' element={<Coupon />} />
              <Route path='/newproductinsert' element={<NewproductInsert />} />
              <Route path='/managerpurchaseorder' element={<ManagerPurchaseOrder />} />

              <Route path='/customercenter' element={<CustomerCenter />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/contactusdetail/:id' element={<ContactUsDetail />} />
              <Route path='/contactuswrite' element={<ContactUsWrite />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/faqcreate' element={<FaqCreate />} />

              <Route path='/mypage/*' element={<MyMain />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>

      <footer className='py-4 bg-info text-light'>
        <Footer />
      </footer>
      </AuthProvider>
    </>
  );
}

export default App;