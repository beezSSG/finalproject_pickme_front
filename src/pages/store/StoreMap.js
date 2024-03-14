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

export default function StoreMap(prop) {
  function MyMap() {
    // instead of window.naver.maps
    const navermaps = useNavermaps();
    let name = "ssg";

    return (
      <NaverMap
        // defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        // defaultCenter={new navermaps.LatLng(prop.location.latitude, prop.location.longitude)}
        defaultCenter={new navermaps.LatLng(35.16591583, 129.1324683)}
        defaultZoom={8}
      >
        <Marker
          position={new navermaps.LatLng(35.16591583, 129.1324683)}
          animation={0}
          icon={{
            content: `<button class="markerBox" style="background-color: yellow;" >
                <div class="totalOrder">1</div>
                ${name}</button>`,
          }}
        />
        {MapData.map(function(mark, i) {
            return (
            <Marker
              position={new navermaps.LatLng(MapData[i].위도, MapData[i].경도)}
              animation={0}
              icon={{
                content: `<button class="markerBox" style="background-color: red;" >
                  <div class="totalOrder">1</div>
                  ${MapData[i].지점명}</button>`,
              }}
            />
            )
          }
        )
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
    </>
  );
}
