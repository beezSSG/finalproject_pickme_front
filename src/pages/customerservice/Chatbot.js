import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TbMessageChatbot } from "react-icons/tb";
import cutechatbot from "../../assets/imgs/chatbot/cutechatbot.png";
import loading from "../../assets/imgs/chatbot/trueloadingss.png";

function Chatbot() {
  let navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");
  const chatboxRef = useRef(null); // 대화창의 ref 생성

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight; // 대화창의 스크롤을 항상 아래로 이동
  }, [message]); // message 상태가 변경될 때마다 실행

  function sendBtn() {
    const rootElement = document.createElement("div");
    rootElement.className = "flex items-end justify-end";

    const innerDivElement = document.createElement("div");
    innerDivElement.className =
      "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start";

    const spanElement = document.createElement("span");
    spanElement.className =
      "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600";
    spanElement.textContent = message;
    const divElement = document.createElement("div");
    divElement.appendChild(spanElement);
    innerDivElement.appendChild(divElement);

    rootElement.appendChild(innerDivElement);

    const chatboxElement = document.getElementsByClassName("chatbox")[0];
    chatboxElement.appendChild(rootElement);
    rootElement.appendChild(document.createElement("br")); // 개행
    // 로딩 표시를 위한 요소 생성
    const loadingElement = document.createElement("img");
    loadingElement.src = loading;
    loadingElement.classList.add("animate-spin", "h-21", "w-21", "ml-4");

    // 로딩 표시를 챗박스에 추가
    chatboxElement.appendChild(loadingElement);

    // axios 호출 전에 0.5초 지연
    setTimeout(function () {
      axios
        .post("mypage/chatbot", null, {
          params: { voiceMessage: message },
        })
        .then(function (resp) {
          console.log(JSON.stringify(resp.data));
          ChatBotAnswer(resp.data);
          // 로딩 표시 숨기기
          loadingElement.remove();
        })
        .catch(function (err) {
          alert("error");
          // 에러 발생 시에도 로딩 표시 숨기기
          loadingElement.remove();
        });
    }, 1000); // 1초를 밀리초로 표기
    setMessage("");
  }

  useEffect(function () {
    axios
      .post("mypage/chatbot", null, {
        params: { voiceMessage: "" },
      })
      .then(function (resp) {
        console.log(JSON.stringify(resp.data));
        ChatBotAnswer(resp.data);
      })
      .catch(function (err) {
        alert("error");
      });
  }, []);

  function ChatBotAnswer(resp) {
    if (resp.bubbles[0].type === "text") {
      ChatBotText(resp.bubbles[0].data.description);
    } else if (resp.bubbles[0].type === "template") {
      if (resp.bubbles[0].data.cover.type === "image") {
        ChatBotImage(resp.bubbles[0].data.cover.data.imageUrl);
      } else if (resp.bubbles[0].data.cover.type === "text") {
        if (
          resp.bubbles[0].data.contentTable[0][0].data.data.action.type ===
          "link"
        ) {
          ChatBotLink(
            resp.bubbles[0].data.cover.data.description,
            resp.bubbles[0].data.contentTable[0][0].data.title,
            resp.bubbles[0].data.contentTable[0][0].data.data.action.data.url
          );
        }
      }
    }
  }

  function ChatBotText(str) {
    const rootElement = document.createElement("div");
    rootElement.className = "flex items-end";

    const innerDivElement = document.createElement("div");
    innerDivElement.className =
      "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start sm:w-40";

    const spanElement = document.createElement("span");
    spanElement.className =
      "bg-gray-200 text-gray-600 px-4 py-2 rounded-lg inline-block rounded-bl-none";
    spanElement.textContent = str;

    const imgElement = document.createElement("img");
    imgElement.src = cutechatbot;
    imgElement.className = "w-10 h-10 rounded-full order-1 ml-4";

    const divElement = document.createElement("div");
    divElement.appendChild(spanElement);
    innerDivElement.appendChild(divElement);
    rootElement.appendChild(imgElement);

    rootElement.appendChild(innerDivElement);

    const chatboxElement = document.getElementsByClassName("chatbox")[0];
    chatboxElement.appendChild(rootElement);
    rootElement.appendChild(document.createElement("br")); // 개행
  }

  function ChatBotImage(url) {
    const rootElement = document.getElementsByClassName("chatbox")[0];
    let img = document.createElement("img");
    img.setAttribute("src", url);
    img.className = "w-40 h-28";
    rootElement.appendChild(img);
    rootElement.appendChild(document.createElement("br"));
  }

  function ChatBotLink(str, str2, url) {
    const rootElement = document.createElement("div");
    rootElement.className = "flex items-end";

    const imgElement = document.createElement("img");
    imgElement.src = cutechatbot;
    imgElement.className = "w-10 h-10 rounded-full order-1 ml-4";
    rootElement.appendChild(imgElement); // 이미지를 rootElement에 추가

    const innerDivElement = document.createElement("div");
    innerDivElement.className =
      "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start sm:w-40";

    const spanElement = document.createElement("span");
    spanElement.className =
      "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600";
    spanElement.textContent = str;

    const divElement = document.createElement("div");
    divElement.appendChild(spanElement);
    innerDivElement.appendChild(divElement);

    rootElement.appendChild(innerDivElement);

    const btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.className =
      "bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-white font-medium rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400";
    btn.value = str2;
    btn.setAttribute("onClick", `window.open('${url}')`);
    innerDivElement.appendChild(btn); // 버튼을 rootElement에 추가

    const chatboxElement = document.getElementsByClassName("chatbox")[0];
    chatboxElement.appendChild(rootElement);
    rootElement.appendChild(document.createElement("br")); // 개행
  }

  return (
    <>
      <ul
        className={`flex justify-end bg-gray-700 p-7 transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <li>
          <Link
            to="/contactus"
            className="text-white text-[20px] hover:text-yellow-500 mr-[100px]"
          >
            1:1 문의하기
          </Link>
        </li>
        <li>
          <Link
            to="/faq"
            className="text-white text-[20px] hover:text-yellow-500 mr-[100px]"
          >
            자주 묻는 질문
          </Link>
        </li>
        <li>
          <Link
            to="/chatbot"
            className="text-white text-[20px] hover:text-yellow-500 mr-[200px]"
          >
            챗봇
          </Link>
        </li>
      </ul>
      <div className="mx-auto px-3 max-w-[800px] ">
        <div className="flex justify-center mt-14">
          <img src={cutechatbot} className="w-10 h-10 mr-3" />
          <div className="text-4xl font-bold">Pickme 챗봇</div>
        </div>
        <p className="text-center text-md font-bold text-gray-500 mb-10">
          무엇이든 질문하세요!
        </p>
        <div className="w-full h-screen border-2 border-gray-600 rounded-xl">
          <div className="h-full rounded-xl">
            <div className="menu flex items-center justify-between px-4 py-2 bg-gray-800 text-white rounded-t-lg">
              <h3 className="welcome">Welcome Pickme</h3>
            </div>
            <br />
            <div
              className="chatbox w-full h-[80%] overflow-y-auto"
              ref={chatboxRef}
            >
              {/* chatbox 내용 */}
            </div>
            <br />
            <div className="flex justify-center gap-4 px-4">
              <input
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-sub-yellow"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지기입"
              />
              <button
                className=" bg-gray-800 text-white font-bold rounded-md px-4 py-2 hover:scale-95 "
                onClick={sendBtn}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
