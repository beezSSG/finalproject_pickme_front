import Newproduct from "./Newproduct.js";
import Promotion from "./Promotion.js";
import Promproduct from "./Promproduct.js";

const Home = () => {

    //임시 홈 왔을때 스토리지 비움
    //로그인 테스트를 위해서.
    localStorage.clear();

    return (
        <div>
            <div className='container mx-auto' style={{width: 1400}}>
                <Promotion />
            </div>
            <div>
                <Promproduct />
            </div>
            <div className='container mx-auto' style={{width: 1400}}>
                <Newproduct />
            </div>
            <h1>Home</h1>
            <p>Welcome To My Home</p>
        </div>
    )
}

export default Home;