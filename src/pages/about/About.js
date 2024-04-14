
// 아이콘
import RwIcon from "../../assets/imgs/about/rw.gif";
import MgIcon from "../../assets/imgs/about/mg.gif";
import JhIcon from "../../assets/imgs/about/jh.gif";
import JsIcon from "../../assets/imgs/about/js.gif";
import WbIcon from "../../assets/imgs/about/wb.gif";
import KsIcon from "../../assets/imgs/about/ks.gif";

// 말풍선 이미지
import BubbleTail from "../../assets/imgs/about/bubbletail.svg";

import { Link } from "react-router-dom";

const icons = [
  {
    name: "팀장 이록원",
    development: "CI/CD, 메인홈",
    src: RwIcon,
    msg: "",
    githubUrl: "https://github.com/rog-won",
  },
  {
    name: "강민기",
    development: "JWT, PWA구현, 마이페이지, 장바구니",
    src: MgIcon,
    msg: "",
    githubUrl: "https://github.com/KangGuide",
  },
  {
    name: "권지호",
    development: "상품 페이지, ",
    src: JhIcon,
    msg: "",
    githubUrl: "https://github.com/GONZOZO",
  },
  {
    name: "오지수",
    development: "메인홈, 서비스 소개, 매장찾기",
    src: JsIcon,
    msg: "",
    githubUrl: "https://github.com/parangwave",
  },
  {
    name: "정원비",
    development: "점주",
    src: WbIcon,
    msg: "",
    githubUrl: "https://github.com/wonbi-jeong",
  },
  {
    name: "하기성",
    development: "관리자, 픽업/배달, ",
    src: KsIcon,
    msg: "",
    githubUrl: "https://github.com/hakiseong",
  },
];

export default function About() {
  return (
    <>
      <div className="sm:flex-wrap flex justify-around">
        {icons.map((icon) => (
          <div key={icon.name} className="my-14 group">
            {/* 자기소개 말풍선 */}
            <div>
              <div className="bg-slate-50 rounded-xl shadow-md p-1">
                <p className="text-center">
                  안녕하세요 
                  <br />
                  저는 <span className="font-semibold">{icon.name}</span> 입니다
                  <br />
                  <span className="font-medium text-base">✨Full Stack✨</span>
                  개발자로
                  <br />
                  <span className="font-medium text-sm text-wrap">
                    {icon.development }
                  </span>
                  <br />개발을 담당하였습니다
                  <Link to={icon.githubUrl}></Link>
                </p>
              </div>
              <div className="flex justify-center">
                <img src={BubbleTail} alt="bubble-tail" /> 
              </div>

              {/* 아이콘 이미지 */}
              <img src={icon.src} alt={icon.name + " icon"} />
            </div>
            
          </div>
        ))}
      </div>
    </>
  );
}
