import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import ManagerMain from "./ManagerMain";
import { FaEllipsisV } from "react-icons/fa";

function OrderChart(){

    const [orderList, setOrderList] = useState([]);
    const [open, setOpen] = useState(false);

    const showDropDown = () => {
        setOpen(!open);
    }

    // 주문 목록을 받아오는 함수
    function orderchart() {
        axios.get("http://localhost:8080/api/v1/manager/orderchart")
                .then(function(resp) {
                    console.log(resp.data);
                    setOrderList(resp.data);
                })
                .catch(function(){
                    console.log("error");
                })
    }

    useEffect(() => {
        orderchart();
    }, []);

    // 상점별 총 가격을 계산하는 함수
    const calculateTotalPriceByStoreName = () => {
        const totalPriceByStoreName = {};

        orderList.forEach(order => {
            const storeName = order.storeName;
            const totalPrice = order.totalPrice;

            if (totalPriceByStoreName[storeName]) {
                totalPriceByStoreName[storeName] += totalPrice;
            } else {
                totalPriceByStoreName[storeName] = totalPrice;
            }
        });

        return totalPriceByStoreName;
    };
     // 제품별 총 가격을 계산하는 함수
     const calculateTotalPriceByProductName = () => {
        const totalPriceByProductName = {};

        orderList.forEach(order => {
            const productName = order.productName;
            const totalPrice = order.totalPrice;

            if (totalPriceByProductName[productName]) {
                totalPriceByProductName[productName] += totalPrice;
            } else {
                totalPriceByProductName[productName] = totalPrice;
            }
        });

        return totalPriceByProductName;
    };

    // 바 그래프 차트 데이터 생성 함수
    const generateBarChartData = () => {
        const totalPriceByStoreName = calculateTotalPriceByStoreName();
        const labels = Object.keys(totalPriceByStoreName);
        const data = Object.values(totalPriceByStoreName);
        // 동적으로 색상 할당
        const backgroundColor = [];
        const borderColor = [];

        for (let i = 0; i < labels.length; i++) {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            backgroundColor.push(`rgba(${red}, ${green}, ${blue}, 0.5)`);
            borderColor.push(`rgba(${red}, ${green}, ${blue}, 1)`);
        }

        return {
            labels: labels,
            datasets: [{
                label: "가격",
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            }],
            options: {
                responsive: false,
            },
        };
    };

    // 도넛 차트 차트 데이터 생성 함수
    const generateDoughnutChartData = () => {
        const totalPriceByProductName = calculateTotalPriceByProductName();
        const labels = Object.keys(totalPriceByProductName);
        const data = Object.values(totalPriceByProductName);
        // 동적으로 색상 할당
        const backgroundColor = [];
        const borderColor = [];

        for (let i = 0; i < labels.length; i++) {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            backgroundColor.push(`rgba(${red}, ${green}, ${blue}, 0.5)`);
            borderColor.push(`rgba(${red}, ${green}, ${blue}, 1)`);
        }

        return {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            }],
            options: {
                responsive: false,
            },
        }
        };

    return (
            <>
                <div className="flex">
                <div>
                    <ManagerMain height={open ? "h-[1400px]" : "h-[500px]"} />
                </div>

                    <div className="flex-1 p-10">
                        <div className="py-[25px] px-[25px] bg-[#ebedf4] rounded-xl">
                            <div className="flex items-center justify-between">
                                <h1 className="text-[#5a5c69] text-[28px] leanding-[34px] font-normal cursor-pointer">관리자 메인</h1>
                                <button className="bg-yellow-500 h-[32px] rounded-[3px] text-white flex items-center justify-center px-[30px] cursor-pointer " onClick={showDropDown} >펼치기</button>
                            </div>
                            { open &&
                            <div className="grid grid-cols-4 gatp-[30px] mt-[25px] pb-[15px]">
                                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-yellow-500 flex items-center justify-between px-[30px] cursor-pointer hover:shoadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
                                    <div>
                                        <h2 className="text-gray-700 text-[15px] leading-[17px] font-bold">문의</h2>
                                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px] ml-[250px]">1개</h1>
                                    </div>
                                </div>
                                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-yellow-500 flex items-center justify-between px-[30px] cursor-pointer hover:shoadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
                                    <div>
                                        <h2 className="text-gray-700  text-[15px] leading-[17px] font-bold">문의</h2>
                                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px] ml-[250px]">1개</h1>
                                    </div>
                                </div>
                                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-yellow-500 flex items-center justify-between px-[30px] cursor-pointer hover:shoadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
                                    <div>
                                        <h2 className="text-gray-700  text-[15px] leading-[17px] font-bold">문의</h2>
                                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px] ml-[250px]">1개</h1>
                                    </div>
                                </div>
                                <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-yellow-500 flex items-center justify-between px-[30px] cursor-pointer hover:shoadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
                                    <div>
                                        <h2 className="text-gray-700  text-[15px] leading-[17px] font-bold">문의</h2>
                                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px] ml-[250px]">1개</h1>
                                    </div>
                                </div>
                            </div>
                            }
                            { open &&
                            <div className="flex mt-[22px] w-full gap-[30px]">
                                    <div className="w-[70%] h-[700px] border bg-white shadow-md cursor-pointer rounded-xl">
                                            <div className="bg-[#f8f9fc] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
                                                <p className="text-xl font-bold mb-6">편의점 별 매출현황</p>
                                                <FaEllipsisV color="gray" className="cursor-pointer" />
                                            </div>
                                            <div className="w-[80%] h-[570px] mx-auto">
                                                <Bar
                                                    data={generateBarChartData()}
                                                    options={{ maintainAspectRatio: false }}
                                                />
                                            </div>
                                    </div>
                                    <div className="w-[30%] h-[700px] border bg-white shadow-md cursor-pointer rounded-xl">
                                        <div className="bg-[#f8f9fc] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
                                            <p className="text-xl font-bold mb-6">상품 별 매출현황</p>
                                            <FaEllipsisV color="gray" className="cursor-pointer" />
                                        </div>
                                        <div className="w-[80%] h-[600px] mx-auto">
                                            <Doughnut
                                                data={generateDoughnutChartData()}
                                                options={{ maintainAspectRatio: false }}
                                            />
                                        </div>
                                    </div>
                            </div>
                            }
                            <div className="w-full mt-[25px] pb-[15px] rounded-xl h-[300px] border bg-white shadow-md ">
                                <div className="p-[40px]">
                                    <p className="text-[20px] font-bold">메모:</p>
                                    <textarea className="w-full h-[200px] border-2 border-gray-400 rounded-xl p-[20px]" placeholder="메모를 입력하세요" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}

export default OrderChart;