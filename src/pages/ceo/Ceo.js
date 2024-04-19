import { Routes, Route } from 'react-router-dom';
import PoMainpage from './PoMainpage';



export default function Ceo() {

    return(
        <>
            <Routes>
            <Route path='pomain/*' element={<PoMainpage />} />
            </Routes>
        
        </>
    )


}