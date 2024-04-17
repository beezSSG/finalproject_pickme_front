import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { FaEllipsisV } from "react-icons/fa";
import { GoAlertFill,GoCheck } from "react-icons/go";
import PoMainpage from "./PoMainpage";
import { useNavigate } from "react-router-dom";

function SalesChart(){

    let navigate = useNavigate();

    // 초기 화면 오늘날짜로 설정되게
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 달이 한 자리면 앞에 0을 붙임
    const day = String(today.getDate()).padStart(2, '0'); // 날짜가 한 자리면 앞에 0을 붙임
    const todaydate = year + "-" + month + "-" + day;

    // 종료날짜 이벤트 개수 처리
    const [endDateStrings, setEndDateStrings] = useState([]);
    const [threeCount, setThreeCount] = useState(0);

    const [notanswerCcb, setNotanswerCcb] = useState();
    const [notPo, setNotPo] = useState();
    const [notocr , setNotocr] = useState();

    // 차트를 위한 useState들
    const [orderList, setOrderList] = useState([]);
    const [categorycountList, setCategorycountList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(todaydate);
    const [selectedRegion, setSelectedRegion] = useState('부산광역시');
    const [selectedDistrict, setSelectedDistrict] = useState('해운대구');
    // const [info, setInfo] = useState();

    // 메인화면 펼치기/접기 버튼
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
        let count = 0;
    
        endDateStrings.forEach((item) => {
          const endDate = parseDateString(item.endDate);
          if (endDate <= threeDaysLater) {
            count++;
          }
        });  
        setThreeCount(count);
      },[endDateStrings]); 

    // 주문 목록을 받아오는 함수
    function saleschart() {
        const address = selectedRegion && selectedDistrict ? `${selectedRegion} ${selectedDistrict}` : selectedRegion || selectedDistrict;
    
        if (address) { // 광역시 또는 구 중 하나만 선택된 경우에 요청을 보냄
            axios.get("ceo/saleschart", { params: { "date": selectedDate, "address": address } })
                .then(function(resp) {
                    setOrderList(resp.data);
                })
                .catch(function(){
                    console.log("error");
                });
        }
    }

    useEffect(() => {
        saleschart();
    }, [selectedDate, selectedDistrict, selectedRegion]);

    
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

    // 도넛 차트 차트 데이터 생성 함수
    
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
    function goOcrlist() {
        navigate("/manager/ocrlist");
    }

    return (
            <>
                <div className="flex">
                {/* Pomainpage가 주축이므로 하위 컴포넌트는 그곳과 연결되면 안된다. */}
                {/* 
                <div>
                    <PoMainpage height={open ? "h-[1100px]" : "h-[920px]"} />
                </div>
                 */}
                    <div className="flex-1 p-10">
                        <div className="py-[25px] px-[25px] bg-[#ebedf4] rounded-xl">
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
                            { open &&
                            <div className="flex mt-[22px] w-full gap-[30px]">
                                    <div className="w-[70%] h-[700px] border bg-white shadow-md cursor-pointer rounded-xl">
                                        <div className="bg-[#f8f9fc] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
                                            <p className="text-xl font-bold mb-6">편의점 별 매출현황</p>
                                            {/* 편의점 별 매출 현황 차트의 메뉴 */}
                                            <div className="relative">
                                                <FaEllipsisV color="gray" className="cursor-pointer"/>
                                                
                                                <div className="absolute top-[35px] right-0 bg-white border border-gray-200 shadow-md rounded-md p-2">
                                                    {/* 연도와 월 선택 input */}
                                                    <input type="date" className="w-full p-1 border border-gray-300 rounded-md" value={selectedDate} onChange={handleDateChange} />
                                                    {/* 광역시 선택 */}
                                                    <select className="w-full p-1 mt-2 border border-gray-300 rounded-md" value={selectedRegion} onChange={handleRegionChange}>
                                                        <option value="">도시 선택</option>
                                                        <option value="서울특별시">서울특별시</option>
                                                        <option value="부산광역시">부산광역시</option>
                                                        {/* 필요한 만큼 옵션 추가 */}
                                                    </select>

                                                    {/* 구 선택 */}
                                                    {selectedRegion && (
                                                        <select className="w-full p-1 mt-2 border border-gray-300 rounded-md" value={selectedDistrict} onChange={handleDistrictChange}>
                                                            <option value="">구 선택</option>
                                                        </select>
                                                    )}
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
                            }
                        </div>
                    </div>
                </div>
            </>
    );
}

export default SalesChart;
