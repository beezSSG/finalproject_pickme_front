import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import "./firebase-messaging-sw.js";
import { AuthProvider } from './utils/AuthProvider';
import { homeAlertHandle } from './utils/ServiceAlert.js'

import MainHome from './pages/main/MainHome.js';
import Manager from './pages/manager/Manager.js';
import axios from 'axios';

function App() {
  
  // 기본 axios url 설정
  // axios.defaults.baseURL = 'http://localhost:8080/api/v1';
  axios.defaults.baseURL = 'http://backend.pickme-ssg.com/api/v1/';
  

  // 토큰값을 인터셉터를 통해 모든 axios에 자동으로 넘겨주기
  axios.interceptors.request.use(
    config => {
      // 저장된 토큰을 가져옵니다.
      const token = localStorage.getItem('jwt');
      if (token) {
        // 요청 헤더에 토큰을 추가합니다.
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // homeAlertHandle();
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<MainHome />} />
            <Route path='/manager/*' element={<Manager/>} />
            {/* <Route path='/ceo/*' element={</>} /> */}

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;