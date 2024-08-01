import React from 'react';
import Creature from './Creature'
import './MyPage.css';
import '../../assets/font/Font.css'

const MyPage = () => {
  return (
    <div className="MyPage">
      <div className="MyPageInfo">
        <div className="MyPageContent">
          <span className="MyPageContentSide"></span>
          <div className="MyPageTitle">
            <h2>마이페이지</h2>
          </div>
          
          <div className="MyPageLeft">
            <label>
              닉네임:
              <input type="text" defaultValue="HENZEE" />
            </label>
            <label>
              이메일:
              <input type="email" defaultValue="jinhyunji520@gmail.com" />
            </label>
            <label>
              생ㅤ일:
              <input type="text" defaultValue="1999.05.20" />
            </label>
            <button className="MyPageButton">정보 수정</button>
          </div>

          <div className="MyPageCreature">
            <Creature />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
