import { Link } from "react-router-dom";


function CustomerCenter() {
    return(
        <>
        <div>고객센터 입니다.</div>
        <ul>
            <li><Link to="/contactus">1:1 문의하기</Link></li>
            <li><Link to="/faq">자주 묻는 질문</Link></li>
            <li><Link to="/">챗봇</Link></li>
        </ul>
        </>
    )
}

export default CustomerCenter;