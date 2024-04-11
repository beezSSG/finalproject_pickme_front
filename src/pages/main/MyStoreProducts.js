import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import { useState, useEffect } from "react";

//npm install react-hook-geolocation
//npm install react-naver-maps
const MyStoreProducts = () => {
  const navermaps = useNavermaps();

  const [location, setLocation] = useState({});
  const [userName, setUserName] = useState("Bee");
  const [storeName, setStoreName] = useState("1조");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longtitude: position.coords.longitude,
        });
      },
      (error) => console.log(error)
    );
  }, []);

  // console.log(location.latitude);
  // console.log(location.longtitude);

  return (
    <>
      <div className="bg-white rounded-2xl m-auto mb-11 drop-shadow-2xl">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {userName}님&nbsp;
              <span>@{storeName}</span>에 신상품이 들어왔어요 !
            </h2>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              <button>더보기</button>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 rounded-2xl p-2">
          
          {/* 제품 목록 */}
          {/* 추후에 매장 위치(위도, 경도) 일치하는 매장 정보 get → 매장 제품 */}
          <div
            id="MyStoreProducts__ProductList"
            className="grid grid-rows-4 gap-4"
          >
            {/* 상품 목록 1번째 row */}
            <ul className="grid grid-cols-4 gap-4 opacity-95">
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0NzM="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0Njc="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0Njk="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0Njg="
                  alt="..."
                ></img>
              </li>
            </ul>

            {/* 상품 목록 2번째 row */}
            <ul className="grid grid-cols-4 gap-4 opacity-75">
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0ODI="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0OTA="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0NzE="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0NDc="
                  alt="..."
                ></img>
              </li>
            </ul>

            {/* 상품 목록 3번째 row */}
            <ul className="grid grid-cols-4 gap-4 opacity-60">
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0MTU="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0Mjk="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0MTQ="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0MjA="
                  alt="..."
                ></img>
              </li>
            </ul>

            {/* 상품 목록 4번째 row */}
            <ul className="grid grid-cols-4 gap-4 opacity-40">
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0NzM="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0NzM="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0NzM="
                  alt="..."
                ></img>
              </li>
              <li className="w-40 h-40 drop-shadow-xl rounded-2xl">
                <img
                  src="https://www.emart24.co.kr/image/NTU0NzM="
                  alt="..."
                ></img>
              </li>
            </ul>
          </div>

          {/* user 지도 */}
          <div className="rounded-2xl">
            <MapDiv className="h-full">
              <NaverMap
                defaultCenter={new navermaps.LatLng(35.1657617, 129.132356)}
                defaultZoom={17}
              >
                <Marker
                  defaultPosition={{ lat: 35.1657617, lng: 129.132356 }}
                  position={{
                    lat: location.latitude,
                    lng: location.longtitude,
                  }}
                  animation={1}
                  icon={{
                    content: `<button class="markerBox" style="font-size: 30px">
                                🙋‍♂️
                              </button>`,
                  }}
                />
                {/* map.setCenter(35.1678779, 129.1231357); */}
              </NaverMap>
            </MapDiv>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyStoreProducts;
