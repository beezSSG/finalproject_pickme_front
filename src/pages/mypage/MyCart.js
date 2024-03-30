import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { Bootpay } from '@bootpay/client-js';

export default function MyCart(prop) {
  const {token} = useAuth();
  const [cart, setCart] = useState([]); // 카트(아이템 목록)
  const [checkItems, setCheckItems] = useState([]); // 전체선택기능
  const [checkPrice, setCheckPrice] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);
  const [fpay, setFpay] = useState(); // 결제 완료시 들어갈것
  const [point, setPoint] = useState(prop.point);

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
      setTotalPoint((money * 0.05));
    }
  }, [checkPrice]);

  // cart 물품 가져오기
  const getMyCart = async () => {
    await axios.get("http://localhost:8080/api/v1/customer/cart/getCart", {
      headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    })
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

    await axios.post("http://localhost:8080/api/v1/customer/cart/changeQuantity",
      null,
      { params : { "quantity" : newQuantity, "sProductId" : sProductId },
        headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      }
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

    await axios.post("http://localhost:8080/api/v1/customer/cart/changeQuantity",
      null,
      { params : { "quantity" : newQuantity, "sProductId" : sProductId },
        headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
    )
    .then(() => {
      getMyCart();
    })
    .catch((err)=>{
      alert(err);
    })
  }

  const deleteItem = async (sProductId) => {
    await axios.delete("http://localhost:8080/api/v1/customer/cart/delcart",
      { data : { "sProductId" : sProductId },
        headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
    )
    .then(() => {
      getMyCart();
    })
    .catch((err)=>{
      alert(err);
    })
  };

  // 결제후 BE 정보전송
  function sendOrder() {
    axios.post("http://localhost:8080/api/v1/customer/order", checkItems)
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
    
    try {
      const response = await Bootpay.requestPayment({
        "application_id": "65efaac4d25985001c6e5e40",
        "price": 100,
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
            "price": 100
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
          /**
           * 1. 클라이언트 승인을 하고자 할때
           * // validationQuantityFromServer(); //예시) 재고확인과 같은 내부 로직을 처리하기 한다.
           */
          const confirmedData = await Bootpay.confirm() //결제를 승인한다
          if(confirmedData.event === 'done') {
              //결제 성공
          }
          /**
           * 2. 서버 승인을 하고자 할때
           * // requestServerConfirm(); //예시) 서버 승인을 할 수 있도록  API를 호출한다. 서버에서는 재고확인과 로직 검증 후 서버승인을 요청한다.
           * Bootpay.destroy(); //결제창을 닫는다.
           */
          break;
      }
    } catch (e) {
      // 결제 진행중 오류 발생
      // e.error_code - 부트페이 오류 코드
      // e.pg_error_code - PG 오류 코드
      // e.message - 오류 내용
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
  }

  if (cart === undefined) {
    return (
      <div>Loding...</div>
    )
  }

  return (
    <div className="flex-col">
      <div className="ml-20 w-[1090px] h-[800px] overflow-y-auto">
        <p className="text-center font-bold text-xl text-yellow-500">장바구니</p>
        <table className="">
          <thead>
            <tr>
              <td colSpan="2">
                <input type="checkbox" onChange={(e) => allCheckHandler(e.target.checked)} checked={checkItems.length === cart.length ? true : false } />&nbsp;전체선택
              </td>
              <td colSpan="3"></td>
              <td colSpan='2' className="text-right"><button>선택삭제</button></td>
              {/* <th colSpan='6' className="text-2xl text-yellow-500">장바구니</th> */}
            </tr>
            <tr className="text-xl">
              <th className="w-[50px]">선택</th>
              <th className="w-[150px]">상품 사진</th>
              <th className="w-[650px]">상품명</th>
              {/* 편의점 이름 추가 */}
              <th className="w-[7%]">가격</th>
              <th className="w-[7%]">총 가격</th>
              <th className="w-[5%]">수량</th>
              <th className="w-[5%]">삭제</th>
            </tr>
          </thead>
          <tbody>
            { cart &&
              cart.map((data, i) => {
                const productTotalPrice = data.productPrice * data.quantity;
                return (
                  <tr key={i} className="h-28 border-b-2">
                    <td className="cartbox text-center ">
                      <input type="checkbox" onChange={(e) => CheckHandler(e.target.checked, data.id, productTotalPrice)} checked={checkItems.includes(data.id) ? true : false} />
                    </td>
                    <td><img src={data.productUrl} className="w-[150px] " /></td>
                    <td className="text-xl font-medium">{data.productName}</td>
                    <td className="text-right text-lg">{data.productPrice.toLocaleString()}원</td>
                    <td className="text-right text-lg">{productTotalPrice.toLocaleString()}원</td>
                    <td className="text-center text-lg">
                      <button onClick={() => {minusQuantity(`${data.quantity}`, `${data.sproductId}`)} }>-</button>
                      &nbsp;{data.quantity}
                      <button onClick={ () => {plusQuantity(`${data.quantity}`, `${data.sproductId}`)} }>+</button>
                    </td>
                    <td className="text-center">
                      <button onClick={ () => {deleteItem(`${data.sproductId}`)} }>X</button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" className="bg-gray-300 text-center">
                <span className="text-xl">선택한 상품 금액: <b>{totalPrice.toLocaleString()}원</b>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;구매시 Pick포인트 적립액: <b>{totalPoint.toLocaleString()}Pick</b></span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* 총금액 및 계산하기 버튼 */}
      <div className="m-auto w-[1090px] h-[200px] overflow-y-auto text-right">
        <p>적립예정 포인트 금액 : </p>
        <p>총금액 : </p>
        <p>포인트 사용금액 : <input type="text" /> {prop.point} </p>
        <p>결제금액 :</p>
        <button onClick={sendOrder}>결제완료 테스트용</button><br/>
        <button onClick={payHandler}>결제하기</button>
      </div>     
    </div>
  );
}
