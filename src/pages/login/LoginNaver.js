import { useEffect } from "react";
import axios from "axios";

const LoginNaver = (props) => {
    const code = new URL(window.location.href).searchParams.get("code");
    useEffect(() => {
        const naverLogin = async () =>{
            await axios
                .get( "http://backend.pickme-ssg.com/login/oauth2/code/naver?code="+code)
                .then((res) => {
                    localStorage.setItem("id", res.data.id);
                    localStorage.setItem("name", res.data.name);
                    localStorage.setItem("email", res.data.email);
                    
                    //네이게이트 사용했을 때 바로 스토리지 값 랜더링 안되서 그냥 window.location.replace 사용
                    //navigate("/");
                    window.location.replace('http://mypickme.pickme-ssg.com/');
                })
                .catch((e) => {
                    alert("error");
                })
        }
        naverLogin();
    }, [props.history, code])

    return(
        <div>
            <p>네이버 로그인 중입니다.</p>
        </div>
    )
}
export default LoginNaver;