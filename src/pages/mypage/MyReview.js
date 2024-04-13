import axios from "axios";
import { useEffect, useState } from "react";
import star2 from "../../assets/imgs/product/star2.png";

export default function MyReview() {
  const [review, setReview] = useState([]);

  useEffect(() => {
    getInfo();
  }, []); 

  // Axios 호출
  const getInfo = async () => {
    await axios.get("mypage/review/getReview")
    .then((response)=>{
      // console.log(JSON.stringify(response.data));
      setReview(response.data);
    })
    .catch((err)=>{
      alert(err);
    })
  }

  return (
    <div className="w-[50%] mx-auto">
        <div className="text-center text-3xl font-bold">내 후기목록</div>
        { review &&
          review.map((data, i) => {
            return (
              <div key={i} className="flex flex-col w-full">
                <div className="flex mt-5 mx-auto p-5 w-[70%] sm:w-[80%]  border-2 rounded-xl text-xl text-center align-middle">
                  <img src={data.url} className="w-[30%]" />
                  <div className="flex flex-col text-left ml-4 my-auto">
                    <div className="">
                      {Array.from({ length : data.rating }, (_, index) => (
                        <span key={index} className="align-middle" style={{ display: 'inline-block' }}>
                          <img src={star2} style={{ maxWidth: '20px', maxHeight: '20px', margin: '3px' }} />
                        </span>
                        ))}
                    </div>
                    <span className="font-bold">{data.name}</span>
                    <span className="">{data.content}</span>
                  </div>
                </div>
              </div>
            );
          })

        }

    </div>
  );
}