import React from "react";
import { createButton } from "react-social-login-buttons";
import kakaoLogo from "../../assets/images/kakao-logo.png";

const config = {
    text: "Continue with Kakao",
    icon: (props) => <img src={kakaoLogo} alt="Kakao" style={{ width: "25px", height: "25px" }} {...props} />,
    style: { background: "#F7E600", color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    activeStyle: { background: "#E1D100" },
};

/** My Naver login button. */
const MyKakaoLoginButton = createButton(config);

export default MyKakaoLoginButton;