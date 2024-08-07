import React, { useState } from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import Creature from './Creature';
import CreatureDel from './CreatureDel';
import './MyPage.css';

const LogoutModal = ({ onClose, onConfirm }) => {
  return (
    <div className="MyPageLogoutModal">
      <div className="MyPageLogoutModalContent">
        <p>로그아웃 하시겠습니까?</p>
        <button className="MyPageLogoutModalCancel" onClick={onClose}>취 소</button>
        <button className="MyPageLogoutModalLogout" onClick={onConfirm}>로그아웃</button>
      </div>
    </div>
  );
};

const EditModal = ({ onClose, onConfirm }) => {
  return (
    <div className="MyPageLogoutModal">
      <div className="MyPageLogoutModalContent">
        <p>회원 정보 수정하시겠습니까?</p>
        <button className="MyPageLogoutModalCancel" onClick={onClose}>취 소</button>
        <button className="MyPageLogoutModalcorrection" onClick={onConfirm}>수 정</button>
      </div>
    </div>
  );
};

const ReleaseModal = ({ onClose, onConfirm }) => {
  return (
    <div className="MyPageLogoutModal">
      <div className="MyPageLogoutModalContent">
        <p>이렇게 귀여운 크리처를 정말로 방생하시겠습니까?</p>
        <button className="MyPageLogoutModalCancel" onClick={onClose}>취 소</button>
        <button className="MyPageLogoutModalLogout" onClick={onConfirm}>방생</button>
      </div>
    </div>
  );
};

const MyPage = () => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isReleaseModalOpen, setReleaseModalOpen] = useState(false); 
  const [creatures, setCreatures] = useState([
    { id: 1, name: '불사조', daysTogether: 247, level: 1, exp: 50 }
  ]);
  const [selectedCreatureId, setSelectedCreatureId] = useState(null);

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleReleaseClick = (id) => {
    setSelectedCreatureId(id);
    setReleaseModalOpen(true);
  };

  const handleCloseModal = () => {
    setLogoutModalOpen(false);
    setEditModalOpen(false);
    setReleaseModalOpen(false); 
  };

  const handleConfirmLogout = () => {
    console.log("Logged out");
    setLogoutModalOpen(false);
  };

  const handleConfirmEdit = () => {
    console.log("Information edited");
    setEditModalOpen(false);
  };

  const handleConfirmRelease = () => {
    setCreatures(creatures.filter(creature => creature.id !== selectedCreatureId));
    console.log(`Creature with id ${selectedCreatureId} released`);
    setReleaseModalOpen(false);
  };

  return (
    <div className="MyPageBack">
      <div className="MyPageMain">
        <Sidebar />
        <div className="MyPageRight">
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
              <div className='MyPageButtons'>
                <button className="MyPageButtonLogout" onClick={handleLogoutClick}>로그아웃</button>
                <button className="MyPageButton" onClick={handleEditClick}>정보 수정</button>
              </div>
            </div>
            <div className="MypageCreture">
              {creatures.map(creature => (
                <Creature key={creature.id} creature={creature} />
              ))}
              <CreatureDel onRelease={handleReleaseClick} /> 
            </div>
          </div>
          <Search />
        </div>
      </div>
      {isLogoutModalOpen && <LogoutModal onClose={handleCloseModal} onConfirm={handleConfirmLogout} />}
      {isEditModalOpen && <EditModal onClose={handleCloseModal} onConfirm={handleConfirmEdit} />}
      {isReleaseModalOpen && <ReleaseModal onClose={handleCloseModal} onConfirm={handleConfirmRelease} />} 
    </div>
  );
};

export default MyPage;
