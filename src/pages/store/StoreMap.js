import axios from "axios";
import { useEffect, useRef, useState, Fragment } from "react";
import { renderToString } from "react-dom/server";

// 왼쪽 메뉴바
import LeftMenu from "./LeftMenu/LeftMenu";

// 마커이미지
import MarkerImg from "../../assets/imgs/store/marker.svg";
import StartImg from "../../assets/imgs/store/star.PNG";

// icon
import { FaPhone } from "react-icons/fa6";

export default function StoreMap() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [storesInMap, setStoresInMap] = useState([]);

  useEffect(() => {
    if (!window.naver) {
      console.error("Naver Maps API가 로드되지 않았습니다.");
      return;
    }

    const fixedLocation = {
      lat: 35.16591583, // 고정 위치 위도
      lon: 129.1324683  // 고정 위치 경도
    };

    const mapOptions = {
      center: new window.naver.maps.LatLng(fixedLocation.lat, fixedLocation.lon),
      zoom: 16,
    };
    const map = new window.naver.maps.Map("map", mapOptions);
    mapRef.current = map;

    // 고정 위치에 마커 추가
    new window.naver.maps.Marker({
      map: map,
      position: new window.naver.maps.LatLng(fixedLocation.lat, fixedLocation.lon),
      icon: {
        url: StartImg,
        size: new window.naver.maps.Size(25, 25),
        origin: new window.naver.maps.Point(0, 0),
        anchor: new window.naver.maps.Point(11, 35),
      }
    });

    loadStores(map);

    // 바운드 변경 시 마커 업데이트
    window.naver.maps.Event.addListener(map, "bounds_changed", () => {
      loadStores(map);
    });
  }, []);

  // 편의점 데이터를 불러와 마커를 생성하는 함수
  function loadStores(map) {
    const bounds = map.getBounds();
    const sw = bounds.getSW();
    const ne = bounds.getNE();
    const nw = new window.naver.maps.LatLng(ne.lat(), sw.lng());

    axios.get("/store/getstoresinmap", {
      params: {
        swLat: sw._lat,
        nwLat: nw._lat,
        nwLng: nw._lng,
        neLng: ne._lng,
      }
    }).then(resp => {
      const storeData = resp.data;
      // 마커 업데이트
      updateMarkers(map, storeData);  
    }).catch(err => {
      console.error("Error fetching stores in map view:", err);
    });
  }

  function updateMarkers(map, storeData) {
    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // 새로운 데이터로 마커 생성
    storeData.forEach(store => {
      const marker = new window.naver.maps.Marker({
        map: map,
        position: new window.naver.maps.LatLng(store.lat, store.lon),
        icon: MarkerImg
      });

      // 마커 클릭 이벤트
      window.naver.maps.Event.addListener(marker, "click", () => {
        const infoWindow = new window.naver.maps.InfoWindow({
          content: renderToString(
            <div style={{ padding: "10px" }}>
              <strong>{store.name}</strong><br/>
              {store.tel}<br/>
              {store.address}
            </div>
          ),
          maxWidth: 200,
          backgroundColor: "#fff",
          borderColor: "#ccc",
          borderWidth: 1,
          anchorSize: new window.naver.maps.Size(30, 30),
          anchorSkew: true
        });

        infoWindow.open(map, marker);
      });

      markersRef.current.push(marker);
    });
  }


  return (
    <div>
      {storesInMap.length ? <LeftMenu stores={storesInMap} /> : ""}
      <div id="map" className="h-svh"></div>
    </div>
  );
}