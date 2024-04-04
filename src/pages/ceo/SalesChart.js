import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import axios from 'axios';
import PoMainpage from "./PoMainpage";


function SalesChart(){

    let navigate = useNavigate();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 달이 한 자리면 앞에 0을 붙임
    const day = String(today.getDate()).padStart(2, '0'); // 날짜가 한 자리면 앞에 0을 붙임
    const todaydate = year + "-" + month + "-" + day;

    // 차트를 위한 useState들
    const [orderList, setOrderList] = useState([]);
    const [categorycountList, setCategorycountList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(todaydate);
    const [selectedRegion, setSelectedRegion] = useState('부산광역시');
    const [selectedDistrict, setSelectedDistrict] = useState('해운대구');
    const districts = {
        '서울특별시': ['강남구', '강서구', '송파구', '마포구', '서초구', '영등포구', '성동구'],
        '부산광역시': ['해운대구', '사하구', '동래구', '금정구', '연제구', '수영구', '기장군']
        // 필요한 만큼 광역시와 구 추가
    };
    const showDropDown = () => {
        setOpen(!open);
    }

    useEffect(() => {
        function parseDateString(dateString) {
          const year = dateString.substr(0, 4);
          const month = dateString.substr(4, 2) - 1; // 월은 0부터 시작하므로 1을 뺍니다.
          const day = dateString.substr(6, 2);
          const hours = dateString.substr(8, 2);
          const minutes = dateString.substr(10, 2);
          return new Date(year, month, day, hours, minutes);
        }
    
        const today = new Date();
        const threeDaysLater = new Date();
        threeDaysLater.setDate(today.getDate() + 3);

    }, []);

    // 월별 매출 현황을 받아오는 함수
    function saleschart() {
        const address = selectedRegion && selectedDistrict ? `${selectedRegion} ${selectedDistrict}` : selectedRegion || selectedDistrict;
    
        if (address) { //
            axios.get("http://localhost:8080/api/v1/ceo/salechart", { params: { "date": selectedDate, "address": address } })
                .then(function(resp) {
                    setOrderList(resp.data);
                })
                .catch(function(){
                    console.log("error"); 
                })
        }
    
    }
    useEffect(() => {
        saleschart();
    }, [selectedDate,selectedDistrict, selectedRegion]);

  
    // 카테고리별 매출을 계산하는 함수
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
                label: selectedDate,
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
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        setSelectedDistrict(''); // 광역시가 변경될 때 구 선택 초기화
    };
        
    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    // 페이지로 이동하는 함수들
    function goPo() {
        navigate("/managerpurchaseorder");
    }
    function goContact() {
        navigate("/contactus");
    }
    function goEvent() {
        navigate("/event");
    }
        
    return (
        <>
        <div className="flex-initial">
            <div className="flex-1 p-40">
                <div className="py-[25px] px-[25px] bg-[#ebedf4] rounded-xl ">
                    <div className="flex items-center justify-center">
                        <h1 className="text-[#5a5c69] text-[28px] leanding-[34px] font-normal cursor-pointer">HOME</h1>
                    </div>
                    <select className=" p-1 mt-2 border border-gray-300 rounded-md" value={selectedRegion} onChange={handleRegionChange}>
                                                        <option value="">분류 선택</option>
                                                        <option value="월별 매출현황">월별 매출현황</option>
                                                        <option value="카테고리별 매출현황">카테고리별 매출현황</option>
                    </select>
                    { open &&
                        <div className="grid grid-cols-4 gatp-[30px] mt-[25px] pb-[15px]">
                            {categorycountList.map((item, index) => (
                                <div key={index} className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-yellow-500 flex items-center justify-between px-[30px] cursor-pointer hover:shoadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
                                    <div className="w-full">
                                        <h2 className="text-gray-700 text-[20px] leading-[17px] font-bold">{item.category}</h2>
                                        <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px] text-right">{item.count}개</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
              
                    <div className="flex mt-[20px] w-full gap-[30px] justify-center ">
                            <div className="w-[70%] h-[700px] border bg-white shadow-md cursor-pointer rounded-xl">
                                <div className="bg-[#f8f9fc] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
                                    <p className="text-xl font-bold mb-6">편의점 별 매출현황</p>
                                    {/* 편의점 별 매출 현황 차트의 메뉴 */}
                                    <div className="relative ">
                                        <FaEllipsisV color="gray" className="cursor-pointer"/>
                                        
                                        <div className="absolute top-[35px] right-0 bg-white border border-gray-200 shadow-md rounded-md p-2">
                                            {/* 연도와 월 선택 input */}
                                            <input type="date" className="w-full p-1 border border-gray-300 rounded-md" value={selectedDate} onChange={handleDateChange} />

                                        </div>         
                                    </div>
                                </div>
                                <div className="w-[80%] h-[570px] mx-auto">
                                    <Bar
                                        data={generateBarChartData()}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                            </div>
                    </div>
                </div>
                <br/><br/><br/>
                
                
            </div>
        </div>
    </>
    )
                }

export default SalesChart;

