import {
  NavermapsProvider,
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
// import './Navermap.css';

// import axios from 'axios';

import MapData from "../../assets/data/store/emart24_busan.json";
import MarkerImg from '../../assets/imgs/store/marker.svg';
import { Link } from "react-router-dom";


export default function StoreMap(prop) {
  function MyMap() {
    // instead of window.naver.maps
    const navermaps = useNavermaps();

    return (
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
            content: `<button class="markerBox" style="font-size: 30px">
                        🙋‍♂️
                      </button>`,
            // onAnimationChanged: 
          }}
          // icon={{
          //   url: damgom,
          //   size: new navermaps.Size(40, 40),
          //   origin: new navermaps.Point(0, 0),
          //   anchor: new navermaps.Point(11, 35),
          //   // onAnimationChanged: 
          // }}
        />
        {
          MapData.map(function (mark, i) {
            return (
              <Marker
                position={new navermaps.LatLng(mark.latitude, mark.longtitude)}
                animation={0}
                icon={{
                  url: MarkerImg,  // 아이콘 경로
                  size: new navermaps.Size(30, 40), //아이콘 크기
	        	      origin: new navermaps.Point(0, 0),
	        	      // anchor: new navermaps.Point(11, 35),
                }}
              />
            );
          })
        }
      </NaverMap>
    );
  }

  return (
    <>
      <NavermapsProvider
        ncpClientId="0x88t994ht"
        // or finClientId, govClientId
      >
        <MapDiv
          style={{
            width: "100%",
            height: "70vh",
          }}
        >
          <MyMap />
        </MapDiv>
      </NavermapsProvider>
      <br/><br/>

      근처 매장 리스트
      <br/>
      <Link to={`/storeproductlist/${6}`}>
        id: 6 매장 상품 리스트 바로가기
      </Link>

    </>
  );
}
