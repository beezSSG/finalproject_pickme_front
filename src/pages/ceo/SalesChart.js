import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { FaEllipsisV } from "react-icons/fa";
import { GoAlertFill,GoCheck } from "react-icons/go";
import PoMainpage from "./PoMainpage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";

function SalesChart(){

    let navigate = useNavigate();

    // 초기 화면 오늘날짜로 설정되게
    const today = new Date();
    const year = today.getFullYear();
    

    // 현재 점포 불러오기
    const [info, setInfo] = useState([]);
    const [topInfo, setTopInfo] = useState([]);
 
    const [id, setId] = useState(0);

    // 차트를 위한 useState들
    const [orderList, setOrderList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(year);

    // 주문 목록을 받아오는 함수
    function saleschart() {

            axios.get("/ceo/saleschart", { params: { "id" : id ,"date": selectedDate} })
                .then(function(resp) {
                    console.log(resp.data);
                    setOrderList(resp.data);
                })
                .catch(function(){
                    console.log("error");
                });

    }
    useEffect(() => {
        if (token === null || token === undefined) {
          alert('로그인이 필요한 서비스 입니다.');
          navigate('/login');
        }
        getCeoInfo();
        saleschart();
      }, [selectedDate]);


    // 매장 이름 가져오기
    const {token} = useAuth();


    const getCeoInfo = async () => {
        await axios.get("ceo/getCeoInfo")
        .then((response)=>{
          console.log(response.data);
          console.log(JSON.stringify(response.data));
          console.log(Object.values(response.data));
          setInfo(response.data);
          setTopInfo(Object.values(response.data));
          setId(response.data.id);
          console.log(id);
        })
        .catch((err)=>{
           alert(err);
        })
      }
    
      const generateBarChartData = (orderList) => {
        // 1월부터 12월까지의 매출을 저장할 배열 초기화
        const monthlySales = new Array(12).fill(0);
    
        // orderList에서 각 월별 매출을 추출하여 monthlySales 배열에 저장
        orderList.forEach(order => {
            const monthIndex = parseInt(order.orderMonth) - 1; // 월을 인덱스로 변환
            monthlySales[monthIndex] = order.totalMonthlySales; // 해당 월의 매출을 저장
        });
    
        // 라벨 및 데이터 추출
        const labels = Array.from({ length: 12 }, (_, i) => i + 1); // 1부터 12까지의 라벨
        const data = monthlySales;
    
        // 랜덤 색상 할당
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
                label: `${year}년 월별 매출`,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            }],
            options: {
                responsive: false,
            }
        };
    };
    

    return (
            <>
                <div className="flex">
                    <div className="flex-1 p-10">
                        <div className="py-[25px] px-[25px] bg-[#ebedf4] rounded-xl">
                            <div className="flex mt-[22px] w-full gap-[30px]">
                                    <div className="w-[100%] h-[700px] border bg-white shadow-md cursor-pointer rounded-xl">
                                        <div className="bg-[#f8f9fc] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
                                            <p className="text-xl font-bold mb-6">{topInfo[1]} 매출현황</p>
                                            {/* 편의점 별 매출 현황 차트의 메뉴 */}
                                            <div className="relative">
                                                <FaEllipsisV color="gray" className="cursor-pointer"/>                               
                                            </div>
                                        </div>
                                        <div className="w-[80%] h-[570px] mx-auto">
                                            <Bar
                                                data={generateBarChartData(orderList)}
                                                options={{ maintainAspectRatio: false }}
                                            />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}

export default SalesChart;
