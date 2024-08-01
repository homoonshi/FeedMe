import React from "react";
import { createButton } from "react-social-login-buttons";
import naverLogo from "../../assets/images/naver-logo.png";

const config = {
    text: "Continue with Naver",
    icon: (props) => <img src={naverLogo} alt="Naver" style={{ width: "35px", height: "35px" }} {...props} />,
    style: { background: "#2DB400", color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    activeStyle: { background: "#1E7900" },
};

/** My Naver login button. */
const MyNaverLoginButton = createButton(config);

export default MyNaverLoginButton;