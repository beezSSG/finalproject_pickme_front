// 아이콘
import Rwmember from "../../assets/imgs/about/rw.gif";
import Mgmember from "../../assets/imgs/about/mg.gif";
import Jhmember from "../../assets/imgs/about/jh.gif";
import Jsmember from "../../assets/imgs/about/js.gif";
import Wbmember from "../../assets/imgs/about/wb.gif";
import Ksmember from "../../assets/imgs/about/ks.gif";

// 말풍선 이미지
import BubbleTail from "../../assets/imgs/about/bubbletail.svg";
// 깃허브 아이콘
import { FaGithubAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

const members = [
  {
    name: "팀장 이록원",
    role: "PM",
    development: "메인홈, 소셜로그인, 자동화 배포",
    src: Rwmember,
    msg: "비전공자인 우리 팀원들이 정말 잘 따라와줘서 잘 프로젝트를 마무리 할 수 있었음에 감사를 표합니다. 이 프로젝트 시작으로 다들 각자 원하는 자리에서 잘 성장하길 바랍니다.",
    githubUrl: "https://github.com/rog-won",
  },
  {
    name: "강민기",
    role: "Full Stack",
    development: "JWT/PWA구현, 마이페이지, 장바구니",
    src: Mgmember,
    msg: "덕분에 많은 걸 배웠고 매일 행복했습니다 행복하세요",
    githubUrl: "https://github.com/KangGuide",
  },
  {
    name: "권지호",
    role: "Full Stack",
    development: "상품 페이지",
    src: Jhmember,
    msg: "짧은 기간에 열심히 달리시느라 다들 고생하셨습니다!! 좋은 팀원분들 만나서 정말 즐겁게 개발할 수 있었습니다. 교육 끝나고도 연락하고 지내요 :)",
    githubUrl: "https://github.com/GONZOZO",
  },
  {
    name: "오지수",
    role: "Full Stack",
    development: "메인홈, 서비스 소개, 매장찾기",
    src: Jsmember,
    msg: "이번 프로젝트 덕분에 팀원들의 도움을 받아 한 단계 성장하였습니다. 벌의 날개짓으로 프론트 개발자라는 꿈을 향해 나아가겠습니다! ଘ(˵╹-╹)",
    githubUrl: "https://github.com/parangwave",
  },
  {
    name: "정원비",
    role: "Full Stack",
    development: "점주 페이지",
    src: Wbmember,
    msg: "개발 병아리로서 이번 프로젝트 동안 팀원 덕분에 피땀눈물 열심히 닦으면서 진행할 수 있었습니다! 우리팀 화이팅 다들 좋은 개발 회사에 취뽀해요",
    githubUrl: "https://github.com/wonbi-jeong",
  },
  {
    name: "하기성",
    role: "Full Stack",
    development: "관리자 페이지, 픽업/배달 페이지",
    src: Ksmember,
    msg: "이번 프로젝트를 통해서 프론트 & 백엔드 두 영역에서 많은 걸 얻고 갑니다! 돈 많이 버는 개발자가 되어야지!",
    githubUrl: "https://github.com/hakiseong",
  },
];

export default function About() {
  return (
    <>
      <div className="sm:flex-wrap flex justify-around">
        {members.map((member) => (
          <div key={member.name} className="my-14 mx-2.5 lg:w-1/6">
            {/* 자기소개 말풍선 */}
            <div>
              <div className="bg-slate-50 rounded-xl shadow-md p-1">
                <p className="text-center">
                  안녕하세요 <span className="font-semibold">{member.name}</span> 입니다
                  <br />
                  {/* 담당 역할 */}
                  <span className="font-medium text-base">
                    ✨{member.role}✨
                  </span>
                  으로
                  <br />
                  {/* 구현 */}
                  <p>
                    <span className="font-semibold">
                      {member.development}
                    </span>
                    를 담당하였습니다
                  </p>
                  {/* 전하고 싶은 말 */}
                  <p className="whitespace-pre-line">{member.msg}</p>
                  {/* 깃허브  */}
                  <Link to={member.githubUrl} className="text-sm font-medium hover:text-main-orange transition duration-100">
                    {member.name}의 깃허브
                    <FaGithubAlt className="inline text-base ml-0.5" />
                  </Link>
                </p>
              </div>
              
              {/* 말풍선 꼬리 */}
              <div className="flex ml-[20%]">
                <img src={BubbleTail} alt="bubble-tail" />
              </div>

              {/* 아이콘 이미지 */}
              <img src={member.src} alt={member.name + " member"} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
