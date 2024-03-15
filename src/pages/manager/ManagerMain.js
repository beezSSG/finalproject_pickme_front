import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Event from './Event';

function ManagerMain() {
    return(
        <div>관리자 메인 페이지 입니다!
            <ul>
                <li><Link to="/event">이벤트</Link></li>
            </ul>
            <ul>
                <li><Link to="/event">발주</Link></li>
            </ul>
            <ul>
                <li><Link to="/newproduct">신제품</Link></li>
            </ul>
            <ul>
                <li><Link to="/coupon">쿠폰</Link></li>
            </ul>
            <ul>
                <li><Link to="/event">매출현황</Link></li>
            </ul>
            <ul>
                <li><Link to="/faq">FAQ메뉴로 가기</Link></li>
            </ul>
        </div>
    )
}

export default ManagerMain;
