
import { Link } from 'react-router-dom';
import teamLogo from "../../assets/imgs/logo/teamlogo.svg";

// 깃허브 아이콘
import { FaGithubAlt } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <div className="mx-auto w-full">
        <div className="border-t-4 pb-16 pt-10">
          <div className="px-4 sm:px-8 lg:px-12">
            <div className="mx-auto">
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xl font-medium text-slate-800">
                  <img src={teamLogo} alt="team logo" className='lg:w-[8%] md:w-[8%] sm:w-[15%]' />
                  <Link to="/about" className='hover:text-main-orange transition duration-100'>About</Link>
                  <Link to="https://github.com/beezSSG" className="hover:text-main-orange transition duration-100">
                    Team Beez의 깃허브
                    <FaGithubAlt className="inline text-lg ml-0.5 mb-0.5" />
                  </Link>
                </div>
                <p className="text-sm text-slate-700">© 2024 Beez. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;