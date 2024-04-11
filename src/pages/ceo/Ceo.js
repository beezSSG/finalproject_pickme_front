import { Routes, Route } from 'react-router-dom';
import Polist from './Polist';
import PoMainpage from './PoMainpage';
import Powrite from './Powrite';
import SalesChart from './SalesChart';
import Inventory from './Inventory';
import Pickup from './Pickup';
import Postcheck from './PostCheck';
import GroupBuying from './GroupBuying';

export default function Ceo() {

    return(
        <>
            <Routes>
            <Route path='pomain/*' element={<PoMainpage />} />
            <Route path='po' element={<Polist/>} />    
            <Route path='pow' element={<Powrite />} />
            <Route path='sales' element={<SalesChart />} />
            {/* <Route path='inventory' element={<Inventory />} />
            <Route path='pickup' element={<Pickup />} />
            <Route path='postcheck' element={<Postcheck />} />
            <Route path='groupbuying' element={<GroupBuying />} /> */}
            </Routes>
        
        </>
    )


}