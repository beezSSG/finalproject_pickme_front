import axios from "axios";

// import MapData from "../../assets/data/store/emart24_busan.json";  // 프론트에 있던 기존 매장 data
import { useEffect, useRef, useState } from "react";
import LeftMenu from "./LeftMenu/LeftMenu";

export default function Map() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapdata, setMapdata] = useState();
  const [open , setOpen] = useState(false);

  // 이벤트 발생에 딜레이를 걸어서 발동하게하는 함수
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  useEffect(() => {
    // index.html에 script연결이 되어있는지 확인
    if (!window.naver) {
      console.error('Naver Maps API가 로드되지 않았습니다.');
      return;
    }

    // 맵 생성조건 여기서 위치, 줌, 등등 건드리시면됩니다.
    const mapOptions = {
      center: new window.naver.maps.LatLng(35.16591583, 129.1324683),
      zoom: 16,
    };

    // 지도 초기화
    const map = new window.naver.maps.Map('map', mapOptions);
    mapRef.current = map;

    // axios로 매장의값을 받아와야함
    axios
      .get("/store/storelist")
      .then((resp) => {
        // console.log(resp.data);
        setMapdata(resp.data);
        const storeData = resp.data;
        // console.log(storeData);
        markersRef.current = storeData.map((store) => new window.naver.maps.Marker({
          map: map,
          position: new window.naver.maps.LatLng(store.lat, store.lon),
        }));
      })
      .catch((err) => {
        alert(err);
      });
    setOpen(true);

    // 마커 생성 및 마커 참조에 저장
    // markersRef.current = sampleData.map((store) => new window.naver.maps.Marker({
    //   map: map,
    //   position: new window.naver.maps.LatLng(store.lat, store.lng),
    // }));

    // 지도 영역 변경 시 마커 표시 업데이트 및 이벤트 딜레이주기
    const debouncedUpdateVisibleMarkers = 
    debounce(() => updateVisibleMarkers(map, markersRef.current), 1000); // 1초 지연
    window.naver.maps.Event.addListener(map, 'bounds_changed', () => debouncedUpdateVisibleMarkers);

    return () => {
      // 컴포넌트가 언마운트(제거) 될 때 이벤트 리스너 제거 [최적화]
      window.naver.maps.Event.removeListener(debouncedUpdateVisibleMarkers);
    };
  }, []);

  // 보이는 영역에 따라 마커 표시 업데이트
  const updateVisibleMarkers = (map, markers) => {
    const mapBounds = map.getBounds();
    markers.forEach(marker => {
      const isVisible = mapBounds.hasLatLng(marker.getPosition());
      marker.setMap(isVisible ? map : null);
    });
  };

  return (
    <div className="flex">
      {/* LeftMenu에 prop로 값 넘겨주세요 */}
      { open && <LeftMenu props={ markersRef } />}
      <div id="map" className="w-full"></div>
    </div>
  );
}