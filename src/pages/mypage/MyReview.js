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
    await axios
      .get("mypage/review/getReview")
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setReview(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="w-[50%] mx-auto">
      <div className="text-center text-3xl font-bold">내 후기목록</div>
      {review &&
        review.map((data, i) => {
          return (
            <div className="flex justify-center">
              <div
                key={i}
                className="flex justify-center rounded-xl border-2 border-gray-300 mb-3 w-[600px] sm:flex-col"
              >
                <div className="my-2 sm:flex justify-center sm:mt-2">
                  <img src={data.url} className="w-[200px]" />
                </div>
                <div className="content-center w-[300px] sm:text-center">
                  {Array.from({ length: data.rating }, (_, index) => (
                    <span
                      key={index}
                      className="align-middle"
                      style={{ display: "inline-block" }}
                    >
                      <img
                        src={star2}
                        style={{
                          maxWidth: "20px",
                          maxHeight: "20px",
                          margin: "3px",
                        }}
                      />
                    </span>
                  ))}
                  <div className="font-bold">{data.name}</div>
                  <div className="mb-2">{data.content}</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
