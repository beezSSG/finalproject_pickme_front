
import { Ri24HoursLine } from "react-icons/ri";
import { RiRobot2Fill } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import { GrAtm } from "react-icons/gr";
import { MdWineBar } from "react-icons/md";
import { CgCoffee } from "react-icons/cg";
import { LuCupSoda } from "react-icons/lu";
import { RiAppleFill } from "react-icons/ri";
import { FaMoneyBill1 } from "react-icons/fa6";

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

export default function Categories({storeInfo}) {
    return (
        <>
            <ul className="flex flex-wrap">
            {
                categories.map((category, idx)=> { 
                    
                    return (
                    <>
                        { storeInfo[`${category.val}`] === 1 ?
                        <li className="mb-1.5 mx-1" key={idx}>
                            {/* <input type="checkbox" className="hidden peer" id={`category-${idx}`} /> */}
                            <label 
                                // htmlFor={`category-${idx}`}
                                className="inline-flex items-center justify-between p-1 text-gray-500 border-2 
                                    rounded-xl transition duration-300 ease-in-out bg-sub-yellow border-main-yellow"
                            > 
                                <category.icon className="size-8 ml-1 mr-0.5"/>                          
                                <div className="w-full text-sm font-bold text-center">{ category.name }</div>
                            </label>
                        </li>
                        :
                        <li className="mb-1.5 mx-1" key={idx}>
                            {/* <input type="checkbox" className="hidden peer" id={`category-${idx}`} /> */}
                            <label 
                                // htmlFor={`category-${idx}`}
                                className="inline-flex items-center justify-between p-1 text-gray-500 border-2 
                                    border-gray-200 rounded-xl transition duration-300 ease-in-out"
                            > 
                                <category.icon className="size-8 ml-1 mr-0.5"/>                          
                                <div className="w-full text-sm font-bold text-center">{ category.name }</div>
                            </label>
                        </li>
                        }
                    </>
                    )
                })
            }
            </ul>
        </>
    )
}
