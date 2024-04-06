import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useAuth } from "../../utils/AuthProvider";


import { useState, useEffect } from 'react';
import Toast from '../public/Toast';
import axios from 'axios';

import SalesChart from "./SalesChart";

function PoMainpage() {
    let ceoEmail = localStorage.getItem('email');

    const navigate = useNavigate();
    const {token} = useAuth();

    const [open, setOpen] = useState(true);
    const [info, setInfo] = useState();
    const [topInfo, setTopInfo] = useState([]); 

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
    useEffect(() => {
      if (token === null || token === undefined) {
        alert('로그인이 필요한 서비스 입니다.');
        navigate('/login');
      }
      getCeoInfo();
    }, []);

    const getCeoInfo = async () => {
        await axios.post("http://localhost:8080/api/v1/mypage/pomain", null,{
          headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
        })
        .then((response)=>{
          //console.log(JSON.stringify(response.data));
          // console.log(Object.values(response.data));
          setInfo(response.data);
          setTopInfo(Object.values(response.data));
        })
        .catch((err)=>{
          alert(err);
        })
      }

    const Menus = [
        { title: "발주 관리", path: "/ceo" },
        { title: "픽업 관리", path: "/" },
        { title: "택배 관리", path: "/" },
        { title: "재고 관리", path: "/" }
    ];

    if (info === undefined || info === null) {
      return <div>loding...</div>
    }

    return(
        <>
        <div className="grid grid-cols-6 w-full mb-10">
          <div className="pl-4 pt-5">
            <div>
              <span className="text-4xl font-bold  text-black-500">{info.name}</span>
              <span className="pl-2 text-3xl font-bold text-yellow-500">{info.grade}</span>
            </div>
            <div className="mt-2 text-sm font-bold text-neutral-500">
              <Link to="/mypage/userinfo" >회원정보수정</Link>
            </div>
          </div>
                
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
       
        </>        
    )
}

export default PoMainpage;