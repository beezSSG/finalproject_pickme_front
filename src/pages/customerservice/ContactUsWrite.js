import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toast from "../public/Toast";
import SelectedDropdown from "./SelectedDropdown";

function ContactUsWrite() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      Toast.fire({
        icon: "error",
        title: "로그인 해주세요!!",
      });
      navigate("/contactus");
    }
    getid();
  }, []);

  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  function addCcbList() {
    if (category === "") {
      Toast.fire({
        icon: "error",
        title: "카테고리를  선택해주세요!",
      });
      return;
    } else if (title === "") {
      Toast.fire({
        icon: "error",
        title: "제목을 입력해주세요!",
      });
      return;
    } else if (content === "") {
      Toast.fire({
        icon: "error",
        title: "내용을 입력해주세요!",
      });
      return;
    }
    axios
      .post("mypage/addCcbList", null, {
        params: {
          category: category,
          customerId: id,
          title: title,
          content: content,
        },
      })
      .then(function (resp) {
        Toast.fire({
          icon: "success",
          title: "성공적으로 작성되었습니다!!",
        });
        navigate("/contactus");
      })
      .catch(function () {
        alert("문의 작성 실패!");
      });
  }

  function getid() {
    axios.get("customer/getid").then(function (resp) {
      console.log(resp.data);
      setId(resp.data);
    });
  }

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-4xl font-bold mt-[70px]">1:1 문의하기</div>
        <br />
        <hr className="border-gray-500" />
        <br />
        <br />
        <div className="flex">
          <label htmlFor="category" className="font-bold text-2xl mr-10 mt-2">
            문의유형 :
          </label>
          <SelectedDropdown
            options={["문의", "칭찬", "불만", "점주"]}
            onSelect={handleCategorySelect}
          />
        </div>{" "}
        <br />
        <div>
          <label htmlFor="customerId" className="font-bold text-2xl mr-10">
            아이디 :
          </label>
          <input
            type="text"
            id="customerId"
            value={id}
            readOnly
            className="border-2 border-gray-400 p-3 w-[500px] cursor-pointer ml-6 focus:outline-none focus:border-yellow-400"
          />
        </div>
        <br />
        <div>
          <label htmlFor="title" className="font-bold text-2xl mr-10">
            제목 :
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            className="border-2 border-gray-400 p-3 w-[500px] cursor-pointer ml-12 focus:outline-none focus:border-yellow-400"
          />
        </div>
        <br />
        <div className="flex flex-col">
          <label htmlFor="content" className="font-bold text-2xl mr-10 mb-3">
            내용 :
          </label>
          <textarea
            id="content"
            rows={15}
            cols={50}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            className="resize-none border-2 border-gray-400 p-3 focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div className="text-center my-[70px]">
          <button
            onClick={addCcbList}
            className="focus:outline-none  bg-yellow-400 hover:bg-yellow-500 
                    focus:ring-4 focus:ring-yellow-300 font-medium text-lg px-[15px] py-3 me-2 mb-2 w-[300px]
                    dark:focus:ring-yellow-900"
          >
            작성완료
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactUsWrite;
