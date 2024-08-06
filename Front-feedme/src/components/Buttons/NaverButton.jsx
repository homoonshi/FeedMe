// src/components/Buttons/NaverButton.jsx

import React from "react";
import { createButton } from "react-social-login-buttons";
import naverLogo from "../../assets/images/naver-logo.png";

const handleNaverLogin = () => {
    // window.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=QdiZgbrsCQdA7Zw1pJNN&redirect_uri=http://localhost:8080/login/oauth2/code/naver&state=RANDOM_STATE';
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';



};

const config = {
    text: "Continue with Naver",
    icon: (props) => <img src={naverLogo} alt="Naver" style={{ width: "35px", height: "35px" }} {...props} />,
    style: { background: "#2DB400", color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    activeStyle: { background: "#1E7900" },
    onClick: handleNaverLogin,
};

/** My Naver login button. */
const MyNaverLoginButton = createButton(config);

export default MyNaverLoginButton;

