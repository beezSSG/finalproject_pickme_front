import { Routes, Route } from 'react-router-dom';
import ManagerMain from "./ManagerMain";
import EventCreate from "./EventCreate";
import Coupon from "./Coupon";
import NewproductInsert from "./NewproductInsert";
import ManagerPurchaseOrder from "./ManagerPurchaseOrder";
import OrderChart from "./OrderChart";
import Event from "./Event";
import EventDetail from "./EventDetail";

export default function Manager() {
  
  return (
    <>
      <Routes>
        <Route path='main' element={<ManagerMain />} />
        <Route path='event' element={<Event />} />
        <Route path='eventdetail/:id' element={<EventDetail />} />
        <Route path='eventcreate' element={<EventCreate />} />
        <Route path='coupon' element={<Coupon />} />
        <Route path='newproductinsert' element={<NewproductInsert />} />
        <Route path='managerpurchaseorder' element={<ManagerPurchaseOrder />} />
        <Route path='orderchart' element={<OrderChart />} />
      </Routes>
    </>
  );
}