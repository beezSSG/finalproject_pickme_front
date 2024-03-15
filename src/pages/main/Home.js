import GuideAndSc from "./GuideAndSc.js";
import NewProducts from "./NewProducts.js";
import Promotion from "./Promotion.js";
import AdProductSet from "./AdProductSet.js";
import SearchProduct from "./SearchProduct.js";

const Home = () => {

    //임시 홈 왔을때 스토리지 비움
    //로그인 테스트를 위해서.
    localStorage.clear();

    return (
        <div>
            <div className='container mx-auto' style={{width: 1400}}>
                <Promotion />
            </div>
            <div className='container mx-auto' style={{width: 1400}}>
                <AdProductSet />
            </div>
            <div className='container mx-auto' style={{width: 1400}}>
                <NewProducts />
            </div>
            <div className='container mx-auto' style={{width: 1400}}>
                <SearchProduct />
            </div>
            <div className='container mx-auto' style={{width: 1400}}>
                <GuideAndSc />
            </div>
        </div>
    )
}

export default Home;