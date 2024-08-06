import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationModal from '../Notice/NotificationModal';
import '../Main/Search.css';
import noti from '../../assets/icons/icon-noti-gray.png';
import search from '../../assets/icons/icon-search-gray-24.png';
import mypage from '../../assets/icons/icon-account-gray-24.png';

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleProfileClick = () => {
    navigate('/MyPage');
  };

  return (
    // <div className='SearchContainer'>
      <div className="search-bar-container">
        <input type="text" className="search-input" placeholder="전체 사용자 검색" />
        <div className="search-icon">
          <img src={search} alt="Search Icon" />
        </div>
        <div className='noti-mypage-icons'>
          <div onClick={handleNotificationClick}>
            <img src={noti} alt="Noti Icon" />
          </div>
          <div onClick={handleProfileClick}>
            <img src={mypage} alt="Mypage Icon" />
          </div>
        </div>
        {isModalOpen && <NotificationModal onClose={handleNotificationClick} />}
      </div>
    // </div>
  );
};

export default Search;
