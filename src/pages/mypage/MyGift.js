import axios from "axios";
import { useEffect } from "react";

export default function MyGift() {

  useEffect(() => {
    getMyInfo();
  }, []);

  const getMyInfo = async () => {
    await axios.get("product/getMyGift"
    )
    .then((response)=>{
      console.log(JSON.stringify(response.data));
      // console.log(Object.values(response.data));
    })
    .catch((err)=>{
      alert(err);
    })
  }


  return(
    <div>
      <h1>선물함입니다.</h1>  
    </div>
  );
}