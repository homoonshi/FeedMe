import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
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
      // 콘솔에 JWT 출력
      console.log('JWT Token:', token);
      // JWT 저장 후 메인 페이지로 리디렉션
      navigate('/main');
    } else {
      console.error('Token not found in URL');
      // 에러가 발생한 경우 로그인 페이지로 리디렉션
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>Processing...</h1>
    </div>
  );
};

export default RedirectHandler;
