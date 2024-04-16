import React, { useState, useEffect } from "react";
import axios from "axios";

const MyStoreProducts = () => {
  const [stores, setStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestStore, setNearestStore] = useState(null);

  // 편의점 목록 불러오기
  useEffect(() => {
    axios.get("/store/storelist")
      .then(response => {
        setStores(response.data);
        console.log(response.data);
      })
      .catch(e => {
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

  const formatTime = (timeStr) => {
    const hour = timeStr.substring(0, 2);
    const minute = timeStr.substring(2);
    return `${hour}시 ${minute}분`;
  };

  const findNearestStore = () => {
    let closest = null;
    let minDistance = Infinity;

    stores.forEach(store => {
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
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="bg-white rounded-2xl m-auto mb-11 drop-shadow-2xl">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            가장 가까운 편의점을 찾아 봅시다.
          </h2>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            <button>더보기</button>
          </h2>
        </div>
        <br/>
        <div>
          {nearestStore ? (
            <div>
              <p>가장 가까운 편의점: {nearestStore.name}</p>
              <p> 전화번호 : {nearestStore.tel}</p>
              <p> 주소 : {nearestStore.address}</p>
              <p> 운영시작시간 : {formatTime(nearestStore.startHour)}</p>
              <p> 운영종료시간 : {formatTime(nearestStore.endHour)}</p>
            </div>
          ) : (
            <p>편의점을 찾고 있습니다...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStoreProducts;