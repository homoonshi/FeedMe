import React from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import Creature from './Creature'
import './MyPage.css';

const MyPage = () => {
  return (
    <div className="MyPageBack">
      <div className="MyPageMain">
        <Sidebar />
        <div className="MyPageRight">
          <Search />
          <div className="MyPageRightContents">

            <span className="MyPageContentSide"></span>
            <div className="MyPageTitle">
              <h2>마이페이지</h2>
            </div>

            <div className="MyPageInformation">
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
            
            <div className="MypageCreture">
              <Creature />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
