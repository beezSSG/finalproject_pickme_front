import { Container as MapDiv, NaverMap, Marker, useNavermaps } from "react-naver-maps";
import { useState, useEffect } from "react";

//npm install react-hook-geolocation
//npm install react-naver-maps
const NewProducts = () => {

    const navermaps = useNavermaps();

    const [location, setLocation] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => console.log(error)
        );

    }, []);

    console.log(location.latitude);
    console.log(location.longitude);


    return (

        <div>
            <div className="" >
                <div className="bg-white shadow-2xl rounded-2xl m-auto mb-11 w-3/4" style={{ width: 1400 }}>
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                <span>user</span>님 <span>@매장이름</span>에 신상품이 들어왔어요 !</h2>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900"><button>더보기</button></h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 shadow-2xl rounded-2xl" style={{ padding: 6 }}>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0NzM=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0Njc=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0Njk=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0Njg=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0ODI=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0OTA=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0NzE=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0NDc=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0MTU=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0Mjk=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0MTQ=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0MjA=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0NzM=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0NzM=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0NzM=" alt="..."></img></div>
                            <div className="w-40 h-40 shadow-2xl rounded-2xl"><img src="https://www.emart24.co.kr/image/NTU0NzM=" alt="..."></img></div>
                        </div>
                        <div className="shadow-2xl rounded-2xl">
                            <MapDiv style={{ height: 690 }}>
                                <NaverMap defaultCenter={new navermaps.LatLng(35.1657617, 129.132356)}>
                                    <Marker defaultPosition={{ lat: 35.1657617, lng: 129.132356 }} />

                                    map.setCenter(35.1678779, 129.1231357);
                                </NaverMap>
                            </MapDiv>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
    )
}
export default NewProducts;