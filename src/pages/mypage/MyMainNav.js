import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDashboardFill } from "react-icons/ri";
import jsonData from '../../assets/data/mypage/list.json';

export default function MyMainNav() {

  const data = jsonData;
  const res = data.res;

  return(
    <>
        <div className='flex'>
          <div className={`shadow-2xl pl-5 w-70 duration-300 relative`}>
            <ul className='pt-1'>
              {
                res.map((data, i) => {
                  const service = data.subtitle;

                  return (
                    <ul key={i}>
                      <li className={`text-yellow-500 text-sm flex-col items-center gap-x-4 p-2 rounded-md ${data} mt-2`}>                      
                          {/* <span className='text-2xl block float-left'>
                            <RiDashboardFill />
                          </span> */}
                          <span className='text-3xl font-bold flex-1'>{data.title}</span>
                          <ul>
                          {
                            service.map(service => {
                              return (
                                <li key={service.subname} className='text-black text-xl  pl-5 pt-3'>
                                  <Link to={service.subpath} className='cursor-pointer hover:text-orange-500'>
                                    {service.subname}
                                  </Link>
                                </li>
                              )
                            })
                          }
                          </ul>
                      </li>
                    </ul>
                  )
                })
              }
            </ul>
          </div>
        </div>
    </>
  )
}


