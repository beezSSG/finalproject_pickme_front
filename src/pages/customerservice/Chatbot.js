import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TbMessageChatbot } from "react-icons/tb";
import cutechatbot from "../../assets/imgs/chatbot/chatbot1.svg";
import loading from "../../assets/imgs/chatbot/trueloadingss.png";

function Chatbot() {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const chatboxRef = useRef(null); // 대화창의 ref 생성

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
      "px-4 py-2 inline-block bg-slate-200 text-slate-900 rounded-t-lg rounded-bl-lg";
    spanElement.textContent = message;
    const divElement = document.createElement("div");
    divElement.appendChild(spanElement);
    innerDivElement.appendChild(divElement);

    rootElement.appendChild(innerDivElement);

    const chatboxElement = document.getElementsByClassName("chatbox")[0];
    chatboxElement.appendChild(rootElement);
    rootElement.appendChild(document.createElement("br")); // 개행
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
          const buttons = resp.bubbles[0].data.contentTable.flatMap((row) =>
            row.map((buttonData) => ({
              title: buttonData.data.title,
              url: buttonData.data.data.action.data.url,
            }))
          );

          ChatBotLink(resp.bubbles[0].data.cover.data.description, buttons);
        }
      }
    }
  }

  function ChatBotText(str) {
    const rootElement = document.createElement("div");
    rootElement.className = "flex items-end mt-3";

    const innerDivElement = document.createElement("div");
    innerDivElement.className =
      "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start sm:w-40";

    const spanElement = document.createElement("span");
    spanElement.className =
      "bg-slate-200 text-slate-900 font-medium px-4 py-2 inline-block rounded-t-lg rounded-br-lg";
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

  function ChatBotLink(str, buttons) {
    const rootElement = document.createElement("div");
    rootElement.className = "flex items-end mt-3";

    const imgElement = document.createElement("img");
    imgElement.src = cutechatbot;
    imgElement.className = "w-10 h-10 rounded-full order-1 ml-4";
    rootElement.appendChild(imgElement); // 이미지를 rootElement에 추가

    const innerDivElement = document.createElement("div");
    innerDivElement.className =
      "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start sm:w-40";

    const spanElement = document.createElement("span");
    spanElement.className =
      "px-4 py-2  inline-block  bg-slate-200 text-gray-900 font-medium whitespace-pre-line rounded-t-lg rounded-br-lg";
    spanElement.textContent = str;

    const divElement = document.createElement("div");
    divElement.appendChild(spanElement);
    innerDivElement.appendChild(divElement);

    rootElement.appendChild(innerDivElement);

    buttons.forEach((button) => {
      const btn = document.createElement("input");
      btn.setAttribute("type", "button");
      btn.className =
        "bg-main-orange hover:scale-110 transition duration-200 cursor-pointer text-white font-semibold rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-sub-orange";
      btn.value = button.title;
      btn.setAttribute("onClick", `window.open('${button.url}')`);
      innerDivElement.appendChild(btn); // 버튼을 rootElement에 추가
    });

    const chatboxElement = document.getElementsByClassName("chatbox")[0];
    chatboxElement.appendChild(rootElement);
    rootElement.appendChild(document.createElement("br")); // 개행
    rootElement.appendChild(document.createElement("br")); // 개행
  }

  return (
    <>
      <div className="w-full h-[580px] border-2 rounded-xl bg-white z-50">
        <div className="h-full rounded-xl">
          <div className="menu flex items-center justify-between px-4 py-2 bg-black text-white font-semibold rounded-t-lg ">
            <h3 className="font-black text-main-yellow">Welcome Pick ME</h3>
          </div>
          <br />
          <div
            className="chatbox w-full h-[75%] overflow-y-auto"
            ref={chatboxRef}
          >
            {/* chatbox 내용 */}
          </div>
          <br />
          <div className="flex justify-center gap-4 px-4">
            <input
              className="p-2 border border-gray-300 rounded-md w-full font-medium focus:outline-none focus:ring-2 focus:ring-sub-yellow"
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
    </>
  );
}

export default Chatbot;
