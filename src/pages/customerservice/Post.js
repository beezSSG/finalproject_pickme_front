import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Antdmodal from "./Antdmodal";
import PostModal from "./PostModal";
import Toast from "../public/Toast";

import {homeAlertHandle} from '../../utils/ServiceAlert'

function Post() {
  let navigate = useNavigate();

  const [address, setAddress] = useState({});
  const [toUser, setToUser] = useState("");
  const [toPhone, setToPhone] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [zonecode, setZonecode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [reservationName, setReservationName] = useState("");
  const [reservationPassword, setReservationPassword] = useState("");
  const [importantInfo, setImportantInfo] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirmShippingOption = (option) => {
    setSelectedOption(option);
  };

  function OnSetAddress(data) {
    setAddress(data);
    setZonecode(data.zonecode || "");
    setRoadAddress(data.address || "");
  }

  const handleCategoryChange = (event) => {
    setItemCategory(event.target.value);
  };

  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };

  const onChangePoints = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setItemPrice(str);
  };

  const Radiovalue = [
    "무게 : 350g 이하, 동일한 3,200/제주권:6,200",
    "무게 : 500g 이하, 동일한 3,500/제주권:6,500",
    "무게 : 700g 이하, 동일한 3,900/제주권:6,900",
    "무게 : 1kg 이하, 동일한 4,200/제주권:7,200",
    "무게 : 1.5kg 이하, 동일한 4,700/제주권:7,700",
    "무게 : 2kg 이하, 동일한 4,900/제주권:7,900",
    "무게 : 3kg 이하, 동일한 5,100/제주권:8,100",
    "무게 : 4kg 이하, 동일한 5,400/제주권:8,400",
    "무게 : 5kg 이하, 동일한 5,700/제주권:8,700",
    "무게 : 10kg 이하, 동일한 7,100/제주권:10,100",
    "무게 : 20kg 이하, 동일한 8,800/제주권:11,800",
  ];

  function postReservation() {
    // 모달을 띄워서 사용자에게 정보 입력 확인
    setShowConfirmModal(true);
  }

  function confirmReservation(confirm) {
    setShowConfirmModal(false);
    if (confirm) {
      // 입력된 정보가 정확하다면 예약 요청 보내기
      const toAddress = `${zonecode} ${roadAddress}`;
      axios
        .post("customer/postreservation", null, {
          params: {
            toUser: toUser,
            toPhone: toPhone,
            toAddress: toAddress,
            reservationName: reservationName,
            reservationPassword: reservationPassword,
            itemCategory: itemCategory,
            itemPrice: itemPrice,
            itemWeight: selectedOption,
            importantInfo: importantInfo,
            totalPrice: totalPrice,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(function (resp) {
          console.log(resp);
          Toast.fire({
            icon: "success",
            title: "성공적으로 예약되었습니다!",
          });
          navigate("/");
        })
        .catch(function () {
          console.log("error");
        });
    }
  }

  function calculateTotalPrice(weight) {
    let itemPriceNumber = parseInt(itemPrice);
    let fee = 0;
    let deliveryPrice = 0;

    if (itemPriceNumber > 500000) {
      fee = 2500;
    }

    switch (weight) {
      case "350g 이하":
        deliveryPrice = 3200;
        break;
      case "500g 이하":
        deliveryPrice = 3500;
        break;
      case "700g 이하":
        deliveryPrice = 3900;
        break;
      case "1kg 이하":
        deliveryPrice = 4200;
        break;
      case "1.5kg 이하":
        deliveryPrice = 4700;
        break;
      case "2kg 이하":
        deliveryPrice = 4900;
        break;
      case "3kg 이하":
        deliveryPrice = 5100;
        break;
      case "4kg 이하":
        deliveryPrice = 5400;
        break;
      case "5kg 이하":
        deliveryPrice = 5700;
        break;
      case "10kg 이하":
        deliveryPrice = 7100;
        break;
      case "20kg 이하":
        deliveryPrice = 8800;
        break;
      default:
        deliveryPrice = 0;
        break;
    }

    if (roadAddress.includes("제주")) {
      deliveryPrice += 3000;
    }

    setTotalPrice(fee + deliveryPrice);
  }

  return (
    <>
      <div className="mx-auto px-20 sm:px-3">
        <div className="text-4xl font-bold mt-[70px]">택배 예약</div>
        <div className="text-red-500 font-bold">
          ※최대 3일 이내로 해당 편의점으로 가져다주세요!
        </div>
        <br />
        <hr className="border-gray-500" />
        <br />
        <br />
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-8">
            <div>
              <label htmlFor="toUser" className="font-bold text-2xl">
                받는분
              </label>
              <input
                type="text"
                id="toUser"
                className="rounded-xl border-2 border-gray-400 p-3 w-full cursor-pointer focus:outline-none focus:border-yellow-400 mt-2"
                value={toUser}
                placeholder="이름"
                onChange={(e) => setToUser(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="toPhone" className="font-bold text-2xl">
                전화번호
              </label>
              <input
                type="text"
                id="toPhone"
                className="rounded-xl border-2 border-gray-400 p-3 w-full cursor-pointer focus:outline-none focus:border-yellow-400 mt-2"
                value={toPhone}
                placeholder="전화번호"
                onChange={(e) => setToPhone(e.target.value)}
              />
            </div>
          </div>
          <br />

          <div className="flex flex-col">
            <div>
              <label className="font-bold text-2xl">주소</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="text"
                className="h-1/3 sm:w-full w-1/6 rounded-xl border-2 border-gray-400 p-3 cursor-pointer focus:outline-none focus:border-yellow-400"
                value={zonecode}
                onChange={(e) => setZonecode(e.target.value)}
                placeholder="우편번호"
                readOnly
                />
              {/* 주소 찾기 모달 */}
              <Antdmodal updateAddress={OnSetAddress} height="42px" />
            </div>
          </div>
          <br />
          <input
            type="text"
            className="rounded-xl border-2 border-gray-400 p-3 w-full cursor-pointer focus:outline-none focus:border-yellow-400 "
            value={roadAddress}
            onChange={(e) => setRoadAddress(e.target.value)}
            placeholder="도로명 주소"
            readOnly
          />
          <br />
          <br />
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-8">
            <div>
              <label htmlFor="reservationName" className="font-bold text-2xl">
                예약명
              </label>
              <input
                type="text"
                id="reservationName"
                className="rounded-xl border-2 border-gray-400 p-3 w-full cursor-pointer focus:outline-none focus:border-yellow-400 mt-2"
                value={reservationName}
                onChange={(e) => setReservationName(e.target.value)}
                placeholder="예약명"
              />
            </div>
            <div>
              <label
                htmlFor="reservationPassword"
                className="font-bold text-2xl"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="reservationPassword"
                className="rounded-xl border-2 border-gray-400 p-3 w-full cursor-pointer focus:outline-none focus:border-yellow-400 mt-2"
                value={reservationPassword}
                onChange={(e) => setReservationPassword(e.target.value)}
                placeholder="비밀번호"
              />
            </div>
          </div>
          <br />
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-8">
            <div>
              <label className="font-bold text-2xl">물품 정보</label>
              <select
                className="rounded-xl border-2 border-gray-400 p-3 w-full cursor-pointer focus:outline-none focus:border-yellow-400 mt-2"
                onChange={handleCategoryChange}
              >
                <option>품목선택</option>
                <option value="가전제품류">가전제품류</option>
                <option value="의류">의류</option>
                <option value="과일류">과일류</option>
                <option value="곡물류">곡물류</option>
                <option value="한약류">한약류</option>
                <option value="식품류">식품류</option>
                <option value="잡화/서적류">잡화/서적류</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-2xl">물품 가격</label>
              <div className="focus:border-yellow-400">
                <div className="flex justify-between rounded-xl border-2 border-gray-400 p-3 w-full cursor-pointer focus:outline-none focus:border-yellow-400 mt-2">
                  <input
                    type="text"
                    onChange={(e) => onChangePoints(e)}
                    value={addComma(itemPrice) || ""}
                    placeholder="물품가격"
                    className="focus:outline-none focus:border-none w-full"
                  />
                  <span className="font-bold">원</span>
                </div>
                <p className="text-base text-red-500 text-left">
                  ※50만원 초과시 할증료 2,500원 부과됩니다.
                </p>
              </div>
            </div>
          </div>
          <br />
          <div>
            <label htmlFor="importantInfo" className="font-bold text-2xl">
              요청사항
            </label>
            <input
              type="text"
              id="importantInfo"
              className="rounded-xl border-2 border-gray-400 p-3 w-full cursor-pointer focus:outline-none focus:border-yellow-400 mt-2"
              value={importantInfo}
              onChange={(e) => setImportantInfo(e.target.value)}
              placeholder="요청사항을 입력해주세요."
            />
          </div>
          <br />
          <div>
            <div className="text-center flex flex-col items-center justify-between">
              <span className="font-bold text-2xl mb-4 md:mb-0">
                택배운임을 선택해주세요.
              </span>
              <button
                className="cursor-pointer bg-main-yellow rounded-xl font-bold p-2 w-1/3 hover:bg-sub-orange transition duration-300"
                onClick={() => setShowModal(true)}
              >
                선택하기
              </button>
            </div>
            <PostModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={handleConfirmShippingOption}
              Radiovalue={Radiovalue} // Radiovalue 전달
            />
          </div>
          <br />
          <br />
          <div className="flex justify-between">
            <span className="font-bold text-lg">
              선택한 운임: {selectedOption}
            </span>

            <button
              className="bg-gray-700 rounded-xl p-2 font-bold text-white hover:bg-slate-200 transition duration-300"
              onClick={() => calculateTotalPrice(selectedOption)}
            >
              결제금액 계산
            </button>
          </div>
          <br />
          <hr className=" border-gray-500" />
          <br />
          <br />
          <p className="text-right">최종 결제 금액: {totalPrice}원</p>
          <br />
          <br />
          <div className="text-center">
            <button
              className="bg-main-yellow hover:bg-sub-orange transition duration-300 rounded-xl p-2 font-bold w-1/3"
              onClick={postReservation}
            >
              예약 신청
            </button>
          </div>
        </div>
      </div>

      {/* 입력 정보 확인 모달 */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-65">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
              {/* 모달 헤더 */}
              <div className="relative p-6 flex-auto ">
                <p className="font-bold">입력된 정보가 정확합니까?</p>
              </div>
              {/* 모달 내용 */}
              <div className="flex justify-center p-2 rounded-b">
                <button
                  className="bg-yellow-500 text-white active:bg-yellow-600 font-bold text-sm px-8 py-3 mr-1 mb-1 rounded-xl cursor-pointer"
                  type="button"
                  onClick={() => confirmReservation(true)}
                >
                  네
                </button>
                <button
                  className="bg-gray-700 text-white active:bg-gray-900 font-bold text-sm px-6 py-3  mr-1 mb-1 rounded-xl"
                  type="button"
                  onClick={() => confirmReservation(false)}
                >
                  아니오
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
