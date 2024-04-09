import { useState } from "react";
import axios from "axios";
import RegisterPost from "./RegisterPost";
import Toast from "../public/Toast";
import { useNavigate } from "react-router-dom";
import OcrModal from "./OcrModal";

function CeoRegister() {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");     // 이메일
    const [isValidEmail, setIsValidEmail] = useState(true); // 이메일 체크
    const [code, setCode] = useState("");   // 인증번호
    const [code2, setCode2] = useState(""); // 인증번호 확인
    const [read, setRead] = useState(false);    // readonly
    const [pw, setPw] = useState("");   // 비밀번호
    const [pw2, setPw2] = useState(""); // 비밀번호 확인
    const [name, setName] = useState("");   // 이름
    const [phoneNumber, setPhoneNumber] = useState(""); // 휴대폰 번호
    const [address, setAddress] = useState({}); // 주소
    const [message, setMessage] = useState(''); // 비밀번호 확인 메세지
    const [messageColor, setMessageColor] = useState('');   // 메세지 색 
    const [modalOpen, setModalOpen] = useState(false); 
    const [checkOcr, setCheckOcr] = useState(0);

    const handleCheckOcrUpdate = (value) => {
        setCheckOcr(value);
    };

     // 모달을 열기 위한 함수
    const openModal = () => {
        setModalOpen(true);
    };

    // 모달을 닫기 위한 함수
    const closeModal = () => {
        setModalOpen(false);
    };


    // 자식에게서 값 받아오기
    function onSetAddress(data) {
        setAddress(data);
    }

    // 전화번호만 가능하게 만들기
    const parsingPhoneNumber = (num) => {
        return (
            num
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                .replace(/(-{1,2})$/g, '')
        )
    }

    // 이메일 체크
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const emailCheck = (email) => {
        const isValid = emailRegEx.test(email);
        setIsValidEmail(isValid);
    }

    const handleInputEmailChange = (e) => {
        setEmail(e.target.value);
        emailCheck(e.target.value);
    }

    // 비밀번호 비교 함수
    const handleInputChange = (e) => {
        const newPassword = e.target.value;
        const confirmPassword = e.target.name === 'password' ? pw2 : pw;
        const currentPassword = e.target.name === 'password' ? pw : pw2;
    
        if (newPassword === confirmPassword) {
          setMessage('비밀번호가 일치합니다.');
          setMessageColor('blue');
        } else {
          setMessage('비밀번호가 일치하지 않습니다.');
          setMessageColor('red');
        }
    
        if (e.target.name === 'password') {
          setPw(newPassword);
        } else {
          setPw2(newPassword);
        }
      };

    // 이메일 확인 및 인증
    function emailSend() {
        axios.get("user/countEmail",{params:{"email":email}})
                .then(function(resp){
                    let checkId = resp.data;
                    console.log(checkId);
                    if(checkId === 0) {
                        axios.post("user/sendCodeToEmail",null,{params:{"email":email}})
                                .then(function(resp){
                                    Toast.fire({
                                        icon: 'success',
                                        title: '인증번호가 전송되었습니다!',
                                    });
                                    console.log(resp.data);
                                    setCode(resp.data);
                                })
                                .catch(function(){
                                    console.log("error");
                                })
                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: '이미 존재하는 이메일입니다!',
                        });
                    }
                })
                .catch(function(){
                    console.log('Error');
                })
    }

    // 코드 일치 확인
    function codeCheck() {
        if(code === code2) {
            Toast.fire({
                icon: 'success',
                title: '인증이 완료되었습니다!',
            });
            setRead(true);
            return;
        }
        else {
            Toast.fire({
                icon: 'error',
                title: '인증번호가 다릅니다!',
            });
              setCode2("");
        }
    }

    // 최종 회원가입
    function regi() {
        if(email === "" || pw === "" || name === "" || phoneNumber === "" || address === "") {
            Toast.fire({
                icon: 'error',
                title: '항목이 모두 입력되지 않았습니다!',
            });
            return;
        }else if(checkOcr === 0){
            Toast.fire({
                icon: 'error',
                title: '사업자 등록을 하지 않았습니다!',
            });
        }
        else {
            axios.post("user/regiCeo", null, 
                        {params:{"email":email, "pw":pw, "name":name, "phone":phoneNumber,"address":address.address}})
                    .then(function(resp){
                        if(resp.data === 1) {
                            Toast.fire({
                                icon:'success',
                                title: '회원가입이 완료되었습니다!',
                            });
                            navigate("/login");
                        }
                    })
                    .catch(function(){
                        console.log("error");
                    });
        }
    }

    return(
        <>
            <div className="max-w-[600px] mx-auto px-2">
                <div className="text-3xl font-bold text-center mb-10">점주 회원가입</div>
                <div className="text-center">
                    <div className="flex items-center my-3">
                    <input 
                        type="text" 
                        placeholder="이메일" 
                        value={email}  
                        onChange={handleInputEmailChange }  
                        className='border-2 border-gray-400 rounded-xl w-full p-3 focus:outline-none focus:border-yellow-400'
                        readOnly={read} 
                    />
                    {!read &&
                        <button className="bg-sub-yellow w-20 py-4 rounded-xl font-bold ml-3 hover:bg-sub-orange" onClick={emailSend}>인증</button>
                    }
                    </div>

                    {(!isValidEmail && email) && <p className="text-red-500">올바른 이메일 형식이 아닙니다.</p>}
                    {!read && 
                        <div className="flex items-center my-3">
                            <input type='text' placeholder="인증번호" value={code2} onChange={(e)=>(setCode2(e.target.value))} className="border-2 border-gray-400 rounded-xl w-full p-3 focus:outline-none focus:border-yellow-400" />
                            <button className="bg-sub-yellow w-20 py-4 rounded-xl font-bold ml-3 hover:bg-sub-orange" onClick={()=>codeCheck()}>확인</button>
                        </div> 
                     } 
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={pw}
                        onChange={handleInputChange}
                        className="border-2 border-gray-400 rounded-xl w-full p-3 my-3 focus:outline-none focus:border-yellow-400"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        value={pw2}
                        onChange={handleInputChange}
                        className="border-2 border-gray-400 rounded-xl w-full p-3 my-3 focus:outline-none focus:border-yellow-400"
                    />
                    {(pw && pw2) && 
                        <p style={{ color: messageColor }}>{message}</p>
                    }
                    <input type="text" placeholder="이름" value={name} onChange={(e)=>setName(e.target.value)}  className="border-2 border-gray-400 rounded-xl w-full p-3 my-3 focus:outline-none focus:border-yellow-400"/>
                    <input type="tel" placeholder="전화번호" maxLength={13} value={phoneNumber} onChange={(e) => setPhoneNumber(parsingPhoneNumber(e.target.value))} 
                      className="border-2 border-gray-400 rounded-xl w-full p-3 my-3 focus:outline-none focus:border-yellow-400"/>
                    <div className="flex items-center my-3">
                        <input type='text' placeholder="주소" readOnly className="border-2 border-gray-400 rounded-xl w-full p-3 focus:outline-none focus:border-yellow-400" value={address.address}/>
                        <RegisterPost updateAddress={onSetAddress} />
                    </div> 
                    {/* 버튼 */}
                    {checkOcr === 0 && (
                        <button className="w-full rounded-xl bg-sub-yellow hover:bg-sub-orange my-3 p-3 font-bold" onClick={openModal}>
                            사업자 등록
                        </button>
                    )}
                    {/* 모달이 열려있을 때만 모달을 렌더링 */}
                    {modalOpen && <OcrModal onClose={closeModal} checkOcr={checkOcr} onCheckOcrUpdate={handleCheckOcrUpdate} />}
                    <button className="w-full rounded-xl bg-sub-yellow hover:bg-sub-orange my-3 p-3 font-bold" onClick={regi}>회원가입</button>                 
                </div>
            </div>
        </>
    );
}

export default CeoRegister;