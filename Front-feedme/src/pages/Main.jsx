import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Main/Sidebar';
import SearchBar from '../components/Main/Search';
import CreatureInfo from '../components/Main/CreatureInfo';
import Calendar from '../components/Main/Calendar';
import '../pages/Main.css';
import apiClient from '../api/userApi'; // axios 인스턴스 가져오기

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const params = new URLSearchParams(location.search);
    const token = params.get('accessToken');

    // JWT가 URL에 포함되어 있는지 확인
    if (token) {
      // JWT를 세션 스토리지에 저장
      sessionStorage.setItem('accessToken', token);
      console.log('JWT Token:', token);
    } else {
      console.error('Token not found in URL');
      navigate('/login'); // 토큰이 없는 경우 로그인 페이지로 리디렉션
    }
  }, [location, navigate]);

  return (
    <div className="Main">
      <div className="MainRectangle">
        <Sidebar />
        <div className='MainRight'>
          <SearchBar />
          <div className='MainRightContents'>
            <CreatureInfo />
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
