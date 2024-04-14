import { Routes, Route } from 'react-router-dom';
import EventCreate from "./EventCreate";
import Coupon from "./Coupon";
import NewproductInsert from "./NewproductInsert";
import ManagerPurchaseOrder from "./ManagerPurchaseOrder";
import OrderChart from "./OrderChart";
import Event from "./Event";
import EventDetail from "./EventDetail";
import ContactUs from '../customerservice/ContactUs';
import ContactUsDetail from '../customerservice/ContactUsDetail'; 
import ContactUsWrite from '../customerservice/ContactUsWrite';
import Faq from '../customerservice/Faq';
import FaqCreate from '../customerservice/FaqCreate';
import CustomerCenter from '../customerservice/CustomerCenter';
import OcrList from './OcrList';
import OcrListDetail from './OcrListDetail';

export default function Manager() {
  
  return (
    <>
      <Routes>
        <Route path='orderchart' element={<OrderChart />} />
        <Route path='event' element={<Event />} />
        <Route path='eventdetail/:id' element={<EventDetail />} />
        <Route path='eventcreate' element={<EventCreate />} />
        <Route path='coupon' element={<Coupon />} />
        <Route path='newproductinsert' element={<NewproductInsert />} />
        <Route path='managerpurchaseorder' element={<ManagerPurchaseOrder />} />
        <Route path='customercenter' element={<CustomerCenter />} />
        <Route path='contactus' element={<ContactUs />} />
        <Route path='contactusdetail/:id' element={<ContactUsDetail />} />
        <Route path='contactuswrite' element={<ContactUsWrite />} />
        <Route path='faq' element={<Faq />} />
        <Route path='faqcreate' element={<FaqCreate />} />
        <Route path='ocrlist' element={<OcrList />} />
        <Route path='ocrlistdetail/:id' element={<OcrListDetail />} />
      </Routes>
    </>
  );
}