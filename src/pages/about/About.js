
// 아이콘
import RwIcon from "../../assets/imgs/about/rw.gif";
import MgIcon from "../../assets/imgs/about/mg.gif";
import JhIcon from "../../assets/imgs/about/jh.gif";
import JsIcon from "../../assets/imgs/about/js.gif";
import WbIcon from "../../assets/imgs/about/wb.gif";
import KsIcon from "../../assets/imgs/about/ks.gif";


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
      <div className="flex items-center justify-center px-auto">
        <div className="lg:flex flex-wrap space-x-28">
          {
            icons.map((icon)=>(
                <img key={ icon } src={ icon.src } alt={ icon.name } />
            ))
          }
        </div>tr
      </div>
    </>
  );
}
