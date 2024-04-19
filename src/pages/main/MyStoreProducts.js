import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../store/Categories";

// 매장 이미지
import storeicon1 from "../../assets/imgs/main/mystoreproduct/store1.svg";
import shortlogo from "../../assets/imgs/logo/logo.svg";

import { FaPhone } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

import { Link } from "react-router-dom";

const MyStoreProducts = () => {
  const [stores, setStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestStore, setNearestStore] = useState(null);

  // 편의점 목록 불러오기
  useEffect(() => {
    axios
      .get("/store/storelist")
      .then((response) => {
        setStores(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.error("error:", e);
      });
  }, []);

  // 사용자의 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setUserLocation(userLoc);
        },
        (e) => {
          console.error("Geolocation error: ", e);
          const userLoc = {
            lat: 35.16591583,
            lon: 129.1324683,
          };
          setUserLocation(userLoc);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // 가장 가까운 편의점 찾기
  useEffect(() => {
    if (userLocation && stores.length > 0) {
      findNearestStore();
    }
  }, [userLocation, stores]); // userLocation과 stores 상태가 변경될 때 실행

  const findNearestStore = () => {
    let closest = null;
    let minDistance = Infinity;

    stores.forEach((store) => {
      let distance = getDistanceFromLatLonInKm(
        userLocation.lat,
        userLocation.lon,
        store.lat,
        store.lon
      );
      if (distance < minDistance) {
        minDistance = distance;
        closest = store;
      }
    });

    setNearestStore(closest);
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  function formatPhoneNumber(phoneNumber) {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const regex = /^(\d{3})(\d{3})(\d{4,5})$/;
    return cleaned.replace(regex, "$1-$2-$3");
  }


  return (
    <div className="bg-white rounded-2xl m-auto mb-11 drop-shadow-2xl">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <article>
            <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-bold tracking-tight text-slate-900">
              가까운 Pick ME 매장
            </h1>
            <p className="lg:text-lg md:text-base sm:text-xs font-medium text-slate-500 whitespace-pre-wrap py-[2.5%]">현재 위치에서 가장 가까운 pick ME 매장을 찾아보세요!</p>
          </article>
          <Link className="text-slate-500 lg:text-xl md:text-lg sm:text-lg font-bold tracking-tight hover:text-slate-800 transition duration-300"
                to="/store">
            더보기
          </Link>
        </div>
        <br />
        <div className="flex gap-5">
          {/* 매장 이미지 */}
          <div className="w-3/5 relative">
            <img src={shortlogo} alt="short logo" className="absolute w-[10%] top-[8%] left-[45%] animate-bounce"/>
            <img src={storeicon1} alt="가까운 매장 이미지" className="" />
          </div>
          {/* 매장 설명 */}
          <div className="flex items-center justify-center">
            {
              userLocation !== undefined && nearestStore && (
              <div className="flex flex-col gap-2.5">
                <h1 className="font-bold lg:text-4xl md:text-3xl sm:text-xl ">
                  {nearestStore.name}
                </h1>
                <p className="lg:text-xl md:text-xl sm:text-sm font-medium text-slate-600 whitespace-pre-wrap">{nearestStore.address}</p>
                <p className="lg:text-xl md:text-xl sm:text-sm font-medium text-slate-600">
                  <FaPhone className="inline mr-1.5" />
                  {nearestStore.tel !== "None"
                    ? formatPhoneNumber(nearestStore.tel)
                    : "전화 ✖"}
                </p>
                <p className="lg:text-xl md:text-xl sm:text-sm font-medium text-slate-600 flex items-center">
                  <FaRegClock className="inline mr-2.5" />
                  {nearestStore.startHour}
                  ~
                  {nearestStore.endHour}
                </p>
                <Categories storeInfo={nearestStore} />
                <Link to={`/storeproductlist/${nearestStore.id}/${nearestStore.name}`} 
                      className="lg:text-2xl md:text-xl sm:text-sm font-semibold text-slate-600 flex items-center hover:text-main-orange transition duration-200">
                  <FaStore className="inline lg:text-2xl md:text-xl sm:text-sm" />&nbsp;매장 재고 보러가기
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStoreProducts;
