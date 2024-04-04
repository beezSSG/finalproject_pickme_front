import {
  NavermapsProvider,
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
// import './Navermap.css';

import axios from "axios";

// import MapData from "../../assets/data/store/emart24_busan.json";  // 프론트에 있던 기존 매장 data
import MarkerImg from "../../assets/imgs/store/marker.svg";
import { useEffect, useRef, useState } from "react";
import LeftMenu from "./LeftMenu/LeftMenu";

export default function StoreMap() {
  // const mapRef = useRef<NaverMap | null>(null);
  const [mapdata, setMapdata] = useState();
  const [loading, setLoading] = useState(false);
  const [createMarkerList, setCreateMarkerList] = useState([]); //마커를 담을 배열
  useEffect(() => {
    getMapData();
    // createMarker();
    console.log(createMarkerList);
  }, []);

  // // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
  // MyMap.Event.addListener(mapRef.current, "zoom_changed", () => {
  //   if (mapRef.current !== null) {
  //     updateMarkers(mapRef.current, Marker);
  //   }
  // });
  // // 지도 드래그 시 마커 업데이트 이벤트 핸들러
  // MyMap.maps.Event.addListener(mapRef.current, "dragend", () => {
  //   if (mapRef.current !== null) {
  //     updateMarkers(mapRef.current, Marker);
  //   }
  // });

  //반복문을 통해 데이터 배열 순회하면서 마커 생성 진행!
  // function createMarker() {
  //   for (let i = 0; i < Object.keys(mapdata).length; i++) {
  //     let newmarker = new window.naver.maps.Marker({
  //       position: new window.naver.maps.LatLng(mapdata[i].lat, mapdata[i].lon),
  //     })

  //     setCreateMarkerList(prev => [...prev, newmarker]);
  //   }
  // }  

  function getMapData() {
    axios
      .get("http://localhost:8080/api/v1/store/storelist")
      .then((resp) => {
        // console.log(resp.data);
        setMapdata(resp.data);
        setLoading(true);
        let abc = [];
        for (let i = 0; i < Object.keys(resp.data).length; i++) {
          let newmarker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(mapdata[i].lat, mapdata[i].lon),
          })

          abc.push(newmarker);
        }
        setCreateMarkerList(prev => [...prev, abc]);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function MyMap() {
    // instead of window.naver.maps
    const navermaps = useNavermaps();

    return (
      <>
        <NaverMap
          // defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
          // defaultCenter={new navermaps.LatLng(prop.location.latitude, prop.location.longitude)}
          defaultCenter={new navermaps.LatLng(35.16591583, 129.1324683)}
          defaultZoom={17}
        >
          <Marker
            position={new navermaps.LatLng(35.16591583, 129.1324683)}
            animation={1}
            icon={{
              content: `<button className="markerBox" style="font-size: 30px">
                        🙋‍♂️
                      </button>`,
            }}
          />
          {/* {mapdata.map(function (mark, i) {
            return (
              <Marker
                position={new navermaps.LatLng(mark.lat, mark.lon)}
                animation={0}
                icon={{
                  url: MarkerImg, // 아이콘 경로
                  size: new navermaps.Size(30, 40), //아이콘 크기
                  origin: new navermaps.Point(0, 0),
                  // anchor: new navermaps.Point(11, 35),
                }}
              />
            );
          })} */}
        </NaverMap>
      </>
    );
  }

  if (loading === false) {
    return <div>loading...</div>;
  }

  return (
    <>
      <NavermapsProvider
        ncpClientId="im12jhyvy5"
        // or finClientId, govClientId
      >
        <MapDiv className="h-svh">
          <LeftMenu props={mapdata} />
          <MyMap />
        </MapDiv>
      </NavermapsProvider>
      <br />
      <br />
    </>
  );
}
