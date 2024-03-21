import { useEffect } from "react";
import axios from "axios";

const LoginKakao = (props) => {
    const code = new URL(window.location.href).searchParams.get("code");
    useEffect(() => {
        const kakaoLogin = async () =>{
            await axios
                .get( "http://localhost:8080/login/oauth2/code/kakao?code="+code)
                .then((res) => {
                    localStorage.setItem("id", res.data.id);
                    localStorage.setItem("name", res.data.name);
                    localStorage.setItem("email", res.data.email);

                    //네이게이트 사용했을 때 바로 스토리지 값 랜더링 안되서 그냥 window.location.replace 사용
                    // navigate("/");
                    window.location.replace('http://localhost:3000/');
                })
                .catch((e) => {
                    alert("error");
                })
        }
        kakaoLogin();
    }, [props.history, code])

    return(
        <div>
            <p>카카오 로그인 중입니다.</p>
        </div>
    )
}
export default LoginKakao;