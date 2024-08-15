import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/Intro.css';
import '../assets/font/Font.css';

const Intro = () => {
  const [redirectPath, setRedirectPath] = useState('/Login');

  const handleClick = () => {
    const token = sessionStorage.getItem('accessToken');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (payload.exp < currentTime) {
          // 토큰이 만료됨
          sessionStorage.removeItem('accessToken');
          setRedirectPath('/Login');
        } else {
          // 토큰이 유효함
          setRedirectPath('/Main');
        }
      } catch (e) {
        console.error('토큰 파싱 중 오류 발생:', e);
        sessionStorage.removeItem('accessToken');
        setRedirectPath('/Login');
      }
    } else {
      // 토큰이 없을 때
      setRedirectPath('/Login');
    }
  };

  return (
    <div className="Intro">
      <div className="IntroChild">
        <h1 className="IntroLogo">Feed Me</h1>
        <div className="IntroClickWrapper">
          <Link to={redirectPath}>
            <button className="w-btn w-btn-gra1" onClick={handleClick}>
              Click
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
