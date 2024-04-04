import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import Toast from '../public/Toast';
import axios from 'axios';
import { BsArrowLeftShort, BsAppIndicator, BsSearch } from "react-icons/bs";
import { FaDiceD6 } from "react-icons/fa";
import { RiDashboardFill, RiCoupon3Fill,RiCustomerService2Fill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { IoReceiptSharp } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import SalesChart from "./SalesChart";
function PoMainpage() {
    // let ceoEmail = localStorage.getItem('email');
    // let navigate = useNavigate();
    // useEffect(() => {
    //     if(ceoEmail===null){
    //         Toast.fire({
    //             icon: 'error',
    //             title: "당신은 점주가 아닙니다!!",              
    //         });
    //         navigate("/");
    //     }
    // });

    const Menus = [
        { title: "발주 관리", path: "/ceo" },
        { title: "픽업 관리", path: "/" },
        { title: "택배 관리", path: "/" },
        { title: "재고 관리", path: "/" }
    ];

    return(
        <div>
            {Menus.map((menu, index) => (
                <div className="m-auto pl-[200px] pr-[10px] pt-5 pb-5 font-bold rounded-3xl shadow-xl bg-stone-100 mx-5 float-left" key={index}>
                  <button className="text-left w-full  items-center  justify-center" onClick={ () => {window.location.href = `${menu.path}`} }>
                    <div className=" text-2xl text-neutral-500 ">{menu.title}</div>
                    <div className="text-right mt-4 text-4xl text-yellow-600 ">10건</div>
                  </button>
                </div>
                 ))
            }
            <br/><br/><br/>
            <SalesChart/>
        </div>        
    )
}

export default PoMainpage;