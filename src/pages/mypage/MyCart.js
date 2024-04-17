import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { Bootpay } from '@bootpay/client-js';
import { Link } from "react-router-dom";

import { VscArrowCircleUp, VscArrowCircleDown } from "react-icons/vsc";
import { TiDelete } from "react-icons/ti";
import { PiHandbagBold  } from "react-icons/pi";

import { TbTruckDelivery } from "react-icons/tb";
import { PiPlusBold } from "react-icons/pi";
import { PiMinusBold } from "react-icons/pi";


export default function MyCart(prop) {
  const [cart, setCart] = useState([]); // 카트(아이템 목록)

  const [checkItems, setCheckItems] = useState([]); // 전체선택기능
  const [checkPrice, setCheckPrice] = useState([]);  // 체크한 상품 금액

  const [totalPrice, setTotalPrice] = useState(0);  // 선택한 상품금액
  const [totalPoint, setTotalPoint] = useState(0); // 구매시 포인트 적립

  // 버튼
  const [pOrd, setPOrd] = useState(); // 0 픽업, 1 배달
  const [buttonCol, setbuttonCol] = useState(2);

  // 포인트 사용
  const [point, setPoint] = useState(0);
  const [read, setRead] = useState(false);

  const [payPrice, setPayPrice] = useState(0); // 할인 까지 전부 한 총금액
  const [resultPoint, setResultPoint] = useState(0); // 기존 포인트 + 적립 포인트
  const [fpay, setFpay] = useState(); // 결제 완료시 들어갈것
  

  // 처음실행시
  useEffect(() => {
    getMyCart();
  }, []);

  // 추후 수정이 필요 물품을 삭제 했을경우 다시 전체선택이 되어버림
  useEffect(() => {
    allCheckHandler(true);
  }, [cart]);

  useEffect(() => {
    if (checkPrice.length !== undefined || checkPrice.length !== 0) {
      let money = 0;
      // console.log(checkPrice);
      for (let i = 0; i < checkPrice.length; i++) {
        money = money + checkPrice[i];
      }
      setTotalPrice(money);
      setPayPrice(money);
      setTotalPoint((money * 0.05));
    }
  }, [checkPrice]);

  // cart 물품 가져오기
  const getMyCart = async () => {
    await axios.get("customer/cart/getCart")
    .then((response)=>{
      console.log(response.data);
      setCart(response.data);
    })
    .catch((err)=>{
      alert(err);
    })
  }

  // 체크박스
  function allCheckHandler(checked) {
    if (checked) {
      const itemIds = [];
      const itemPrice = [];
      cart.forEach((data) => itemIds.push(data.id));
      cart.forEach((data) => itemPrice.push(Number(data.productPrice) * Number(data.quantity)));
      // console.log(itemPrice);
      setCheckItems(itemIds);
      setCheckPrice(itemPrice);
    }
    else {
      setCheckItems([]);
      setCheckPrice([]);
    }
  }

  // 상품체크
  function CheckHandler(checked, id, productTotalPrice) {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
      setCheckPrice(prev => [...prev, productTotalPrice]);
    } else {
      let wnumber = checkItems.indexOf(id, 0);
      checkPrice.splice(wnumber, 1);
      // console.log(checkPrice);
      setCheckPrice(checkPrice.filter(() => checkPrice));
      setCheckItems(checkItems.filter((data) => data !== id));
      // setCheckPrice(checkPrice.filter((data) => data !== productTotalPrice)); // 같은 가격의 상품이 있을때 문제가 생긴다.
    }
  }

  const plusQuantity = async (quantity, sProductId) => {
    const newQuantity = Number(quantity) + 1;

    await axios.post("customer/cart/changeQuantity",
      null,
      { params : { "quantity" : newQuantity, "sProductId" : sProductId } }
    )
    .then(() => {
      getMyCart();
    })
    .catch((err)=>{
      alert(err);
    })
  }

  const minusQuantity = async (quantity, sProductId) => {
    if (quantity === "1") {
      alert('물건의 최소수량은 1개입니다.');
      return;
    }
    const newQuantity = Number(quantity) - 1;

    await axios.post("customer/cart/changeQuantity",
      null,
      { params : { "quantity" : newQuantity, "sProductId" : sProductId } }
    )
    .then(() => {
      getMyCart();
    })
    .catch((err)=>{
      alert(err);
    })
  }

  const deleteItem = async (sProductId) => {
    try {
      await axios.delete(`customer/cart/delCart/${sProductId}`);
      getMyCart();
    } catch (err) {
      alert(err);
    }
  };

  // 픽업 배달 함수
  function pickOrDelivery(num) {
    console.log(num);
    setPOrd(num);
    setbuttonCol(num);
  }

  // 포인트 숫자만 입력함수
  const writePoint = (e) => {
    let inputValue = e.target.value;

    // 입력값에서 숫자가 아닌 부분만 제거합니다.
    inputValue = inputValue.replace(/\D/g, '');
    // console.log(inputValue);

    // 최종금액 초과 X
    if (parseInt(inputValue) > totalPrice) {
      inputValue = Number(totalPrice);
    }
    // 최대값초과 X
    if (parseInt(inputValue) > prop.point) {
      inputValue = Number(prop.point);
    }

    let newPrice = Number(totalPrice)-Number(inputValue);
    let newPoint = Number(prop.point)-Number(inputValue)+Number(totalPoint);
    // console.log(newPoint);
    setPoint(inputValue);    
    setPayPrice(newPrice);
    setResultPoint(newPoint);
  };

  // 결제후 BE 정보전송
  function sendOrder() {
    axios.post("customer/order", checkItems)
    .then((response)=>{
      // console.log(JSON.stringify(response.data));
      getMyCart();
    })
    .catch((err)=>{
      alert(err);
    })
  }

  // 결제 핸들러
  const payHandler = async () => {
    if (pOrd === 0 || pOrd === 1) {
      try {
        const response = await Bootpay.requestPayment({
          "application_id": "65efaac4d25985001c6e5e40",
          "price": payPrice,
          "order_name": "Pick ME 상품결제",
          "order_id": "TEST_ORDER_ID",
          "tax_free": 0,
          "user": {
            "id": "회원아이디",
            "username": "회원이름",
            "phone": "01000000000",
            "email": "test@test.com"
          },
          "items": [
            {
              "id": "item_id",
              "name": "테스트아이템",
              "qty": 1,
              "price": payPrice
            }
          ],
          "extra": {
            "open_type": "iframe",
            "card_quota": "0,2,3",
            "escrow": false
          }
        })
        switch (response.event) {
          case 'issued':
            // 가상계좌 입금 완료 처리
            break
          case 'done':
            console.log(response)
            sendOrder();
            // 결제 완료 처리
            break
          case 'confirm': //payload.extra.separately_confirmed = true; 일 경우 승인 전 해당 이벤트가 호출됨
            console.log(response.receipt_id);
            const confirmedData = await Bootpay.confirm() //결제를 승인한다
            if(confirmedData.event === 'done') {
                //결제 성공
            }
          break;
        }
      } catch (e) {
        console.log(e.message)
        switch (e.event) {
          case 'cancel':
            // 사용자가 결제창을 닫을때 호출
            console.log(e.message);
            break;
          case 'error':
            // 결제 승인 중 오류 발생시 호출
            console.log(e.error_code);
          break;
        }
      }
    } else {
      alert('픽업 또는 배달을 선택해주세요!');
    }
  }

  if (cart === undefined) {
    return (
      <div>Loding...</div>
    )
  }

  return (
    <div className="flex-col mx-auto lg:w-[60%] px-[2%]">
      <div className="overflow-y-auto">
        <h1 className="text-center font-bold text-3xl">장바구니</h1>
        <table className="sm:text-xs">
          <thead>
            <tr>
              <td colSpan="2">
                <input type="checkbox" onChange={(e) => allCheckHandler(e.target.checked)} checked={checkItems.length === cart.length ? true : false } />
                <span>&nbsp;전체선택</span>
              </td>
              <td colSpan="3"></td>
              <td colSpan="2" className="group text-right">
                <button className="rounded-lg p-1">
                  <span className="group-hover:font-semibold transition duration-100">선택삭제</span>
                  <TiDelete className="inline group-hover:text-rose-600 transition duration-100 mb-1" />
                </button>
              </td>
            </tr>
            <br />
            <tr className="lg:text-xl md:text-xl">
              <th className="w-[4%]">선택</th>
              <th className="lg:w-[5%] md:w-[10%] sm:w-[15%]">상품 사진</th>
              <th className="w-[18%]">상품명</th>
              {/* 편의점 이름 추가 */}
              <th className="w-[4%] text-right">가격</th>
              <th className="w-[4%] text-right">총 가격</th>
              <th className="w-[4%]">수량</th>
              <th className="w-[2%]">삭제</th>
            </tr>
          </thead>
          <tbody>
            { cart &&
              cart.map((data, i) => {
                const productTotalPrice = data.productPrice * data.quantity;
                return (
                  <tr key={i} className="h-28 border-b-2">
                    {/* 선택 체크박스 */}
                    <td className="cartbox text-center ">
                      <input type="checkbox" onChange={(e) => CheckHandler(e.target.checked, data.id, productTotalPrice)} checked={checkItems.includes(data.id) ? true : false} />
                    </td>

                    {/* 상품 사진 */}
                    <td>
                      <img src={data.productUrl} className="mx-auto lg:w-[80%]" alt="data's productUrl" />
                    </td>

                    {/* 상품명 */}
                    <td className="lg:text-lg md:text-lg sm:text-sm font-medium ">{data.productName}</td>

                    {/* 가격 */}
                    <td className="text-right lg:text-lg md:text-lg sm:text-base">{data.productPrice.toLocaleString()}</td>

                    {/* 총 가격 */}
                    <td className="text-right lg:text-lg md:text-lg sm:text-base">{productTotalPrice.toLocaleString()}</td>
                    
                    {/* 수향 버튼 */}
                    <td className="py-auto text-center">
                      <div className="flex justify-center lg:text-xl md:text-lg sm:text-base">
                        <button onClick={() => {minusQuantity(`${data.quantity}`, `${data.sproductId}`)} } className="p-1 rounded-full text-slate-500 hover:bg-rose-600 hover:text-white transition duration-100">
                          <PiMinusBold />
                        </button>
                        <span className="mx-0.5">
                          {data.quantity}
                        </span>
                        <button onClick={ () => {plusQuantity(`${data.quantity}`, `${data.sproductId}`)} } className="p-1 rounded-full text-slate-500 hover:bg-rose-600 hover:text-white transition duration-100">
                          <PiPlusBold />
                        </button>
                      </div>
                    </td>
                    <td className="text-center group">
                      <div className="text-3xl group-hover:text-rose-600 transition duration-100 flex justify-center items-center">
                        <button onClick={ () => {deleteItem(`${data.sproductId}`)} }> 
                          <TiDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" className="bg-gray-300 text-center">
                <span className="text-base">
                  선택한 상품 금액&nbsp;&nbsp;
                  <b className="text-lg">{totalPrice.toLocaleString()}원</b>
                </span>
                <span className="font-bold mx-5 text-slate-700 sm:hidden">|</span>
                <span className="sm:block text-base">
                  구매시 Pick포인트 적립액&nbsp;&nbsp;
                  <b className="text-lg">{totalPoint.toLocaleString()}Pick</b>
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* 총금액 및 계산하기 버튼 */}
      <div className="flex justify-center gap-4 mt-5 h-24 w-[40%] mx-auto sm:w-[80%]">
        {/* 픽업 = 0 배달 = 1 */}
        <button
          className={`${
            buttonCol === 0 ? 'bg-sub-orange text-white' : 'bg-gray-300'
          } w-[50%] h-24 rounded-2xl py-1 cursor-pointer hover:bg-sub-orange duration-400 group`}
          onClick={()=>{pickOrDelivery(0)}}
        >
          <PiHandbagBold  className="text-[40px] mx-auto mt-1 sm:text-[20px] text-gray-700 group-over:text-white " />
          
          <h3 className="text-center mt-2 font-bold text-lg text-slate-700">
            픽업
          </h3>
        </button>
        <button
          className={`${
            buttonCol === 1 ? 'bg-sub-orange text-white' : 'bg-gray-300'
          } w-[50%] h-24 rounded-2xl py-1 cursor-pointer hover:bg-sub-orange trasition duration-400 group`}
          onClick={()=>{pickOrDelivery(1)}}
        >
          <TbTruckDelivery className="text-[40px] mx-auto mt-1 sm:text-[20px] text-gray-700 group-over:text-white"/>
          <h3 className="text-center mt-2 font-bold text-lg text-slate-700">
            배달
          </h3>
        </button>
      </div>

      <div className="mx-auto mt-5 text-3xl">
        <div className="my-4 flex sm:flex-col justify-center items-center">
          <span className="mb-1 text-xl font-medium mx-2 p-1 px-2.5 rounded-lg bg-main-yellow">Pick 포인트</span>
          <p>
            <b>{prop.point.toLocaleString()}</b>
            <span className="text-2xl">P</span>
          </p>
        </div>
        <div className="my-4 flex sm:flex-col justify-center lg:items-center">
          <span className="mb-1 text-xl font-medium mx-2 p-1 px-2.5 rounded-lg bg-main-yellow">사용할 포인트</span>
          <input type="text" value={point.toLocaleString()} onChange={writePoint} placeholder={`0 ~ ${prop.point}`} readOnly={read} className="sm:w-1/2 text-2xl my-1.5 text-center" />
        </div>
        <div className="flex items-center justify-center">
          <button onClick={payHandler} className="w-auto bg-main-orange text-white rounded-xl p-2 font-semibold hover:bg-main-orange transition duration-200">
            {payPrice.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
      
      {/* <div className="m-auto overflow-y-auto text-right">
        <button onClick={sendOrder}>결제완료 테스트용</button><br/>
      </div> */}

    </div>
  );
}
