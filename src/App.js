import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { AuthProvider } from './utils/AuthProvider';
import "./firebase-messaging-sw.js";

import MainHome from './pages/main/MainHome.js';
import Manager from './pages/manager/Manager.js';
import Ceo from './pages/ceo/Ceo.js';
import ScrollToTop from './ScrollToTop'; 

function App() {
  
  // 기본 axios url 설정
  //axios.defaults.baseURL = 'http://localhost:8080/api/v1';
  axios.defaults.baseURL = 'https://backend.pickme-ssg.com/api/v1/';
  //xios.defaults.baseURL = 'http://192.168.45.249:8080/api/v1';

  // 토큰값을 인터셉터를 통해 모든 axios에 자동으로 넘겨주기
  axios.interceptors.request.use(
    config => {
      // 저장된 토큰을 가져옵니다.
      const token = sessionStorage.getItem('jwt');
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

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
            <Route path='/*' element={<MainHome />} />
            <Route path='/manager/*' element={<Manager/>} />
            <Route path='/ceo/*' element={<Ceo/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;