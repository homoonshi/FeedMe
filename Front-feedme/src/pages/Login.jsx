// src/pages/Login.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import '../assets/font/Font.css';
import MyNaverLoginButton from '../components/Buttons/NaverButton';
import MyKakaoLoginButton from '../components/Buttons/KakaoButton';

const Login = () => {
  return (
    <div className='Login'>
      <div className='LoginRectangle'>
        <div className='LoginImage'></div>
        <div className='LoginRecInLogin'>
          <h1>Login</h1>
          <p>Quickly sign in with your social network</p>
          <hr />
          <div className="LoginButtons">
            <div className='LoginGoogleButton'>
              <MyKakaoLoginButton style={{
                height: "45px",
                fontSize: "17px"
              }}/>
            </div>
            <div className='LoginNaverButton'>
              <MyNaverLoginButton style={{
                height: "45px",
                fontSize: "17px"
              }} />
            </div>
          </div>
          <div>
            <span>New User?</span>
            <Link className='LoginSignup' to='/Signup'>Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
