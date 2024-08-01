import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationModal from '../Notice/NotificationModal';
import '../Main/Search.css';

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
    <div className='SearchBar'>
      <input type="text" placeholder="search" />
      <button onClick={handleNotificationClick}>
        <img src="path_to_notification_icon" alt="notifications" />
      </button>
      <button onClick={handleProfileClick}>
        <img src="path_to_profile_icon" alt="profile" />
      </button>
      {isModalOpen && <NotificationModal onClose={handleNotificationClick} />}
    </div>
  );
};

export default Search;
