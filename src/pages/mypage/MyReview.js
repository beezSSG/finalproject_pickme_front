import axios from "axios";
import { useEffect, useState } from "react";

export default function MyReview() {
  const [review, setReview] = useState([]);

  useEffect(() => {
    getInfo();
  }, []); 

  // Axios 호출
  const getInfo = async () => {
    await axios.get("http://localhost:8080/api/v1/mypage/review/getReview", {
      headers : { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    })
    .then((response)=>{
      // console.log(JSON.stringify(response.data));
      setReview(response.data);
    })
    .catch((err)=>{
      alert(err);
    })
  }

  return (
    <div className="ml-16 w-[50%]">

        <div className="text-center text-3xl font-bold">내 후기목록</div>
        <div className="mt-5 flex flex-row text-3xl text-center align-middle">
          <div className="w-[15%]">상품 이미지</div>
          <div className="w-[20%]">상품 이름</div>
          <div className="w-[45%]">내가적은 후기</div>
          <div className="w-[15%]">내 평점</div>
          <div className="w-[15%]">평균 평점</div>
        </div>
        { review &&
          review.map((data, i) => {
            
            // 고민 이미지를 넣을지 말지 만약 이미지를 넣게된다면 이미지를 눌러서 상품상세보기로 이동하고
            // 이미지를 안넣으면 상품이름을 클릭하면 상세보기로 이동하게 만들고 싶음
            // 평점을 내평점 / 평균 평점 이렇게 합쳐야할지 아니면 그냥 이렇게 냅둬야 할지
            return (
              <div key={i} className="flex flex-row mt-3 text-2xl text-center align-middle ">
                <img src={data.url} className="w-[14%]" />
                <span className="w-[20%]">{data.name}</span>
                <span className="w-[45%] pl-5 text-left">{data.content}</span>
                <span className="w-[15%]">
                  {Array.from({ length : data.rating }, (_, index) => (
                    <span key={index}>★</span>
                  ))}
                </span>
                <span className="w-[15%]">
                  {Array.from({ length : data.productRating }, (_, index) => (
                    <span key={index}>★</span>
                  ))}
                </span>
              </div>
            );
          })

        }

    </div>
  );
}