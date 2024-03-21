
import GuideAndSc from "./GuideAndSc.js";
import MyStoreProducts from "./MyStoreProducts.js";
import Promotion from "./Promotion.js";
import AdProductSet from "./AdProductSet.js";
import SearchProduct from "./SearchProduct.js";

const Home = () => {

    //임시 홈 왔을때 스토리지 비움
    //로그인 테스트를 위해서.
    //localStorage.clear();

    return (
        <div>
            {/* style={{width: 1400}} */}
            <section className="container mx-auto w-screen mb-4">
                <Promotion />
            </section>
            <section className='container mx-auto w-screen mb-4'>
                <AdProductSet />
            </section>
            <section className='container mx-auto w-screen mb-4'>
                <MyStoreProducts />
            </section>
            <section className='container mx-auto w-screen mb-4'>
                <SearchProduct />
            </section>
            <section className='container mx-auto w-screen mb-4'>
                <GuideAndSc />
            </section>
        </div>
    )
}

export default Home;