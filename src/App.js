import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './pages/main/Header';
import Footer from './pages/main/Footer';
import Home from './pages/main/Home';
import Login from './pages/login/Login';
import Productlist from './pages/product/Productlist';
import Productdetail from './pages/product/Productdetail';

import StoreMap from './pages/store/StoreMap';
import Polist from './pages/ceo/Polist';

import ManagerMain from './pages/manager/ManagerMain';
import Event from './pages/manager/Event';
import EventDetail from './pages/manager/EventDetail';
import EventCreate from './pages/manager/EventCreate';
import Coupon from './pages/manager/Coupon';
import Newproduct from './pages/manager/Newproduct';

import CustomerCenter from './pages/customerservice/CustomerCenter';
import ContactUs from './pages/customerservice/ContactUs';
import Faq from './pages/customerservice/Faq';
import FaqCreate from './pages/customerservice/FaqCreate';

function App() {
  return (
    <>
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

              <Route path='/productlist' element={<Productlist />} />
              <Route path='/productdetail/:id' element={<Productdetail />} />

              <Route path='/store' element={<StoreMap />} />
              <Route path='/ceo' element={<Polist />} />

              <Route path='/manager' element={<ManagerMain />} />
              <Route path='/event' element={<Event />} />
              <Route path='/eventdetail/:id' element={<EventDetail />} />
              <Route path='/eventcreate' element={<EventCreate />} />
              <Route path='/coupon' element={<Coupon />} />
              <Route path='/newproduct' element={<Newproduct />} />

              <Route path='/customercenter' element={<CustomerCenter />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/faqcreate' element={<FaqCreate />} />
              

            </Routes>
          </div>
        </main>
      </BrowserRouter>

      <footer className='py-4 bg-info text-light'>
        <Footer />
      </footer>
    </>
  );
}

export default App;