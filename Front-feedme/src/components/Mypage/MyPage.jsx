import React from 'react';
import Creature from '../Creature/Creature';
import './MyPage.css';

const MyPage = () => {
  return (
    <div className="MyPage">
      <div className="MyPageInfo">
        <h2>마이페이지</h2>
        <label>
          닉네임:
          <input type="text" defaultValue="soo" />
        </label>
        <label>
          이메일:
          <input type="email" defaultValue="eee@gmail.com" />
        </label>
        <label>
          생년월일:
          <input type="date" defaultValue="2000-00-00" />
        </label>
        <button>정보 수정</button>
      </div>
      <div className="MyPageCreature">
        <Creature />
      </div>
    </div>
  );
};

export default MyPage;
