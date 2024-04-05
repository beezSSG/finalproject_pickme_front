import { FaUser, FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="mx-10 my-20">
        <h1 className="text-center text-3xl font-bold mb-10">회원가입</h1>
        <div className="grid grid-cols-2 gap-5">
          <Link
            to="/userregister"
            className="bg-gray-300 rounded-2xl py-10 duration-500 cursor-pointer  hover:bg-sub-orange duration-500"
          >
            <FaUser className="text-[250px] mx-auto mt-10 sm:text-[130px] text-gray-600" />
            <h3 className="text-center my-10 font-bold text-xl">
              고객 회원가입
            </h3>
          </Link>
          <Link
            to="/ceoregister"
            className="bg-gray-300 rounded-2xl py-10 hover:bg-sub-orange duration-500 cursor-pointer"
          >
            <FaStore className="text-[250px] mx-auto mt-10 sm:text-[130px] text-gray-600" />
            <h3 className="text-center my-10 font-bold text-xl">
              점주 회원가입
            </h3>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
