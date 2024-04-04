import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Event from './Event';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftShort, BsAppIndicator, BsSearch } from "react-icons/bs";
import { FaDiceD6, FaClipboardList } from "react-icons/fa";
import { RiDashboardFill, RiCoupon3Fill,RiCustomerService2Fill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";
import { IoReceiptSharp } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import Toast from '../public/Toast';


function ManagerMain({height}) {

    let adminEmail = localStorage.getItem('email');
    let navigate = useNavigate();
    useEffect(() => {
        if(adminEmail===null){
            Toast.fire({
                icon: 'error',
                title: "당신은 관리자가 아닙니다!!",
              });
            navigate("/");
        }
    });

    const [open, setOpen] = useState(true);

    const Menus = [
        { title: "관리자 홈", path: "/manager/orderchart" },
        { title: "이벤트", path: "/manager/event" },
        { title: "발주 목록", path: "/manager/managerpurchaseorder" },
        { title: "신제품", path: "/manager/newproductinsert" },
        { title: "쿠폰생성", path: "/manager/coupon" },
        { title: "자주묻는질문", path: "/manager/faq" },
        { title: "1:1 문의", path: "/manager/contactus" },
        { title: "사업자 등록", path: "/manager/ocrlist"}
    ];

    const iconComponents = [
        <RiDashboardFill />,
        <FaGift />,
        <IoReceiptSharp />,
        <MdProductionQuantityLimits />,
        <RiCoupon3Fill />,
        <FaQuestion />,
        <RiCustomerService2Fill />,
        <FaClipboardList />
    ];

    return(
        <>
        <div>
            <div className='flex'>
                <div className={`bg-gray-800 ${height} p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}>
                    <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-black cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                    <div className='inline-flex'>
                        <FaDiceD6 className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
                        <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Manager</h1>
                    </div>

                    <div className={`flex items-center rounded-md bg-gray-500 mt-6 ${!open ? "px-2.5" : "px-4"} py-2`}>
                        <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`} />
                        <input type={"search"} placeholder='Search' className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`} />
                    </div>

                    <ul className='pt-2'>
                        {Menus.map((menu, index) => (
                            <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-4 hover:bg-gray-500 rounded-md ${menu} mt-2`}>
                                <Link to={menu.path}>
                                    <span className='text-2xl block float-left mr-3'>
                                        {iconComponents[index]}
                                    </span>
                                    <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>{menu.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </>

    )
}

export default ManagerMain;
