import { FaUser, FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="mx-[10%] my-20">
        <h1 className="text-center text-3xl font-bold mb-10">회원가입</h1>
        <div className="grid grid-cols-2 gap-[3%]">
          <Link
            to="/userregister"
            className="bg-slate-300 rounded-2xl p-[3%] cursor-pointer  hover:bg-sub-orange duration-500 group"
          >
            <FaUser className="lg:text-9xl mx-auto mt-10 sm:text-5xl text-slate-700 group-hover:text-black transition duration-300" />
            <h3 className="text-center my-10 font-bold text-3xl text-slate-700 group-hover:text-black">
              고객<br />회원가입
            </h3>
          </Link>
          <Link
            to="/ceoregister"
            className="bg-slate-300 rounded-2xl p-[3%] hover:bg-sub-orange duration-500 cursor-pointer group"
          >
            <FaStore className="lg:text-9xl mx-auto mt-10 sm:text-5xl text-slate-700 group-hover:text-black transition duration-300" />
            <h3 className="text-center my-10 font-bold text-3xl text-slate-700 group-hover:text-black">
              점주<br />회원가입
            </h3>
          </Link>
        </div>
        <div className="mt-5 text-center font-bold">
          <Link to="/login" className="text-2xl group">
            <span className="font-black text-main-orange">회원</span>
            <span className="text-slate-600 group-hover:text-black transition duration-300">이신경우 이 곳을 클릭해주세요</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
