import { Link } from 'react-router-dom';

import jsonData from '../../assets/data/mypage/list.json';
import { BsArrowLeftShort} from "react-icons/bs";

import axios from 'axios';
import { useState, useEffect } from 'react';
import { RiDashboardFill } from "react-icons/ri";

export default function MyMainNav() {
  const [open, setOpen] = useState(true);
  
  const data = jsonData;
  const res = data.res;

  return(
    <div className='shadow-2xl pl-5 w-[18%] sm:hidden '>    
        <ul lassName='pt-1'>
          {
            res.map((data, i) => {
              const service = data.subtitle;
              return (
                <ul key={i}>
                  <li className='mt-2 p-2 gap-x-4 rounded-md text-yellow-500 items-center font-bold sm:text-sm'>
                    <span className='text-3xl'>{data.title}</span>
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
  )
}


