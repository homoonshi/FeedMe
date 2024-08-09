import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, setToken } from '../../store/slice';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import Creature from './Creature';
import CreatureDel from './CreatureDel';
import './MyPage.css';
import { fetchUserData } from '../../store/userSlice';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 새로고침 시 세션 스토리지에서 토큰 가져오기
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('accessToken');
    if (sessionToken) {
      dispatch(setToken(sessionToken));
    } else {
      navigate('/login'); // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [dispatch, navigate]);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);
  const { nickname, email, brithday, creatureId, creatureName, exp, level, image, togetherDay, status, error } = user;

  useEffect(() => {
    if (status === 'idle' && token) {
      dispatch(fetchUserData(token));
    }
  }, [status, dispatch, token]);

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isReleaseModalOpen, setReleaseModalOpen] = useState(false); 

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleReleaseClick = () => {
    setReleaseModalOpen(true);
  };

  const handleCloseModal = () => {
    setLogoutModalOpen(false);
    setEditModalOpen(false);
    setReleaseModalOpen(false); 
  };

  const handleConfirmLogout = () => {
    dispatch(logout()); 
    sessionStorage.removeItem('accessToken'); 
    navigate('/login'); 
  };

  const handleConfirmEdit = () => {
    console.log("Information edited");
    setEditModalOpen(false);
  };

  const handleConfirmRelease = () => {
    console.log(`Creature with id ${creatureId} released`);
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
                <div className="MyPageInfoBox">{nickname}</div> 
              </label>
              <label>
                이메일:
                <div className="MyPageInfoBox">{email}</div> 
              </label>
              <label>
                생ㅤ일:
                <div className="MyPageInfoBox">{brithday}</div> 
              </label>
              <div className='MyPageButtons'>
                <button className="MyPageButtonLogout" onClick={handleLogoutClick}>로그아웃</button>
                <button className="MyPageButton" onClick={handleEditClick}>정보 수정</button>
              </div>
            </div>
            <div className="MypageCreture">
              <Creature 
                creature={{ id: creatureId, name: creatureName, daysTogether: togetherDay, level: level, exp: exp, image: image }} 
              />
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
