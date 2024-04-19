
import { Ri24HoursLine } from "react-icons/ri";
import { RiRobot2Fill } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import { GrAtm } from "react-icons/gr";
import { MdWineBar } from "react-icons/md";
import { CgCoffee } from "react-icons/cg";
import { LuCupSoda } from "react-icons/lu";
import { RiAppleFill } from "react-icons/ri";
import { FaMoneyBill1 } from "react-icons/fa6";

import { useState, useEffect } from "react";

const categories = [
    {
        name: "24시간",
        val: "open_ended",
        icon: Ri24HoursLine
    },
    {
        name: "무인매장",
        val: "unmanned",
        icon: RiRobot2Fill
    },
    {
        name: "배달",
        val: "delivery",
        icon: FaTruckFast
    },
    {
        name: "ATM",
        val: "atm",
        icon: GrAtm
    },
    {
        name: "와인",
        val: "sell_wine",
        icon: MdWineBar
    },
    {
        name: "커피",
        val: "sell_coffee",
        icon: CgCoffee
    },
    {
        name: "스무디킹",
        val: "smoothieking",
        icon: LuCupSoda
    },
    {
        name: "애플 액세사리",
        val: "apple_acc",
        icon: RiAppleFill
    },
    {
        name: "토토",
        val: "toto",
        icon: FaMoneyBill1
    },
]

export default function StoreCategories({handleCategories}) {
    const [checkedBoxes, setCheckedBoxes] = useState([]);

    useEffect(()=>{
        console.log(checkedBoxes);
        handleCategories(checkedBoxes);
    }, [checkedBoxes])

    return (
        <>
            <ul className="flex flex-wrap">
            {
                categories.map((category)=> (
                    <li className="mb-1.5 mx-1" key={category.name}>
                        <input value={category.val} type="checkbox" className="hidden peer" id={category.name}
                            onChange={(e) => {
                                // 체크된 상태를 업데이트
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    // 체크 -> 배열에 추가
                                    // console.log(e.target.value);
                                    setCheckedBoxes([...checkedBoxes, (e.target.value) ]);
                                } else {
                                    // 체크 X -> 배열에서 제거
                                    // console.log(e.target.value);
                                    setCheckedBoxes(checkedBoxes.filter(item => item !== (e.target.value)));
                                }
                                // handleCategories(checkedBoxes);
                            }} 
                            />
                        <label 
                            htmlFor={category.name}
                            className="inline-flex items-center justify-between p-1 text-slate-700 border-2 
                                border-slate-300 rounded-xl cursor-pointer transition duration-300 ease-in-out 
                                peer-hover:bg-sub-yellow peer-checked:bg-sub-yellow
                                peer-checked:text-black peer-checked:font-black peer-checked:border-main-yellow"
                        > 
                            <category.icon className="size-8 ml-1 mr-0.5"/>                          
                            <div className="w-full text-sm font-bold text-center">{ category.name }</div>
                        </label>
                    </li>
                ))
            }
            </ul>
        </>
    )
}
