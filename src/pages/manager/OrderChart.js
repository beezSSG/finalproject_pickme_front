import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import ManagerMain from "./ManagerMain";
import { FaEllipsisV } from "react-icons/fa";
import { GoAlertFill,GoCheck } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function OrderChart(){

    let navigate = useNavigate();


    // 초기 화면 오늘날짜로 설정되게
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 달이 한 자리면 앞에 0을 붙입니다.
    const day = String(today.getDate()).padStart(2, '0'); // 날짜가 한 자리면 앞에 0을 붙입니다.
    const todaydate = year + "-" + month + "-" + day;

    const [notanswerCcb, setNotanswerCcb] = useState();
    const [notPo, setNotPo] = useState();

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

   
    // 메인화면 펼치기/접기 버튼
    const showDropDown = () => {
        setOpen(!open);
    }

    // 주문 목록을 받아오는 함수
    function orderchart() {
        const address = selectedRegion && selectedDistrict ? `${selectedRegion} ${selectedDistrict}` : selectedRegion || selectedDistrict;
    
        if (address) { // 광역시 또는 구 중 하나만 선택된 경우에 요청을 보냄
            axios.get("http://localhost:8080/api/v1/manager/orderchart", { params: { "date": selectedDate, "address": address } })
                .then(function(resp) {
                    console.log(resp.data);
                    setOrderList(resp.data);
                })
                .catch(function(){
                    console.log("error");
                });
        }
    }
    
    // 1:1문의 게시글을 카테고리 별로 개수를 세서 가져오기
    function contactusCategory() {
        axios.get("http://localhost:8080/api/v1/manager/ccbcategorycount")
            .then(function (resp) {
                console.log(resp.data);
                // 카테고리를 문의, 칭찬, 불만, 점주로 고정
                const fixedCategories = ["문의", "칭찬", "불만", "점주"];
                // 받아온 데이터 중에서 고정된 카테고리에 해당하는 것만 필터링
                const filteredData = fixedCategories.map(category => {
                    const found = resp.data.find(item => item.category === category);
                    return found ? found : { category: category, count: 0 };
                });
                setCategorycountList(filteredData);
            })
            .catch(function () {
                console.log("error");
            })
    }

    function notanswercount() {
        axios.get("http://localhost:8080/api/v1/manager/notanswercount")
            .then(function (resp) {
                console.log(resp.data);
                setNotanswerCcb(resp.data);
            })
            .catch(function () {
                console.log("error");
            })
    }

    function notpocount() {
        axios.get("http://localhost:8080/api/v1/manager/notpocount")
            .then(function (resp) {
                console.log(resp.data);
                setNotPo(resp.data);
            })
            .catch(function () {
                console.log("error");
            })
    }

    useEffect(() => {
        orderchart();
        contactusCategory();
        notanswercount();
        notpocount();
    }, [selectedDate,selectedDistrict, selectedRegion]);

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
    const generateDoughnutChartData = (topN = 10) => {
        const totalPriceByProductName = calculateTotalPriceByProductName();
    
        // 상품 가격을 기준으로 내림차순으로 정렬
        const sortedProducts = Object.keys(totalPriceByProductName).sort((a, b) => {
            return totalPriceByProductName[b] - totalPriceByProductName[a];
        });
    
        // 상위 N개의 상품 선택
        const topProducts = sortedProducts.slice(0, topN);
    
        const labels = topProducts;
        const data = topProducts.map(product => totalPriceByProductName[product]);
    
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
        
    function goPo() {
        navigate("/managerpurchaseorder");
    }

    function goContact() {
        navigate("/contactus");
    }

    return (
            <>
                <div className="flex">
                <div>
                    <ManagerMain height={open ? "h-[1100px]" : "h-[700px]"} />
                </div>
                    <div className="flex-1 p-10">
                        <div className="py-[25px] px-[25px] bg-[#ebedf4] rounded-xl">
                            <div className="flex items-center justify-between">
                                <h1 className="text-[#5a5c69] text-[28px] leanding-[34px] font-normal cursor-pointer">관리자 홈</h1>
                                <button className="bg-yellow-500 h-[32px] rounded-[3px] text-white flex items-center justify-center px-[30px] cursor-pointer " onClick={showDropDown} >
                                    {open ? "접기" : "펼치기"}
                                </button>
                            </div>
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
                                                        <option value="">광역시 선택</option>
                                                        <option value="서울특별시">서울특별시</option>
                                                        <option value="부산광역시">부산광역시</option>
                                                        {/* 필요한 만큼 옵션 추가 */}
                                                    </select>

                                                    {/* 구 선택 */}
                                                    {selectedRegion && (
                                                        <select className="w-full p-1 mt-2 border border-gray-300 rounded-md" value={selectedDistrict} onChange={handleDistrictChange}>
                                                            <option value="">구 선택</option>
                                                            {districts[selectedRegion].map((district, index) => (
                                                                <option key={index} value={district}>{district}</option>
                                                            ))}
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
                                    <div className="w-[30%] h-[700px] border bg-white shadow-md cursor-pointer rounded-xl">
                                        <div className="bg-[#f8f9fc] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
                                            <p className="text-xl font-bold mb-6">오늘의 인기 top 10 상품</p>
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
                            { !open &&
                                <div className="grid grid-cols-2 gatp-[30px] mt-[25px] pb-[15px]">
                                    <div className={`h-[150px] rounded-[8px] bg-white flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out ${notanswerCcb === 0 ? 'border-l-[6px] border-green-700' : 'border-l-[6px] border-red-700'}`}
                                                onClick={goContact}>
                                        <div className="w-full">
                                            <h2 className={`text-gray-700 text-[30px] leading-[17px] font-bold ${notanswerCcb === 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {notanswerCcb === 0 ? <GoCheck className="text-green-600" /> : <GoAlertFill className="text-red-600" />}
                                            </h2>
                                            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px] text-right">
                                                {notanswerCcb === 0 ? '문의 답변 완료' : `답변하지 않은 글이 ${notanswerCcb}개 있어요`}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className={`h-[150px] rounded-[8px] bg-white flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out ${notPo === 0 ? 'border-l-[6px] border-green-700' : 'border-l-[6px] border-red-700'}`}
                                                onClick={goPo}>
                                        <div className="w-full">
                                            <h2 className={`text-gray-700 text-[30px] leading-[17px] font-bold ${notPo=== 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {notPo === 0 ? <GoCheck className="text-green-600" /> : <GoAlertFill className="text-red-600" />}
                                            </h2>
                                            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px] text-right">
                                                {notPo === 0 ? '발주 승인 완료' : `승인되지 않은 발주가 ${notPo}개 있어요`}
                                            </h1>
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

export default OrderChart;