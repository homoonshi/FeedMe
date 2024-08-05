import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationModal from '../Notice/NotificationModal';
import '../Main/Search.css';
import noti from '../../assets/icons/icon-noti-gray.png';
import search from '../../assets/icons/icon-search-gray-24.png';
import mypage from '../../assets/icons/icon-account-gray-24.png';

const mockUsernames = [
  'Alice',
  'Bob',
  'Charlie',
  'Dave',
  'Eve',
  'Frank',
  'Grace',
  'Heidi',
  'Ivan',
  'Judy',
  'Mallory',
  'Oscar',
  'Peggy',
  'Trent',
  'Victor',
  'Walter'
];

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = mockUsernames.filter(username =>
        username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleNotificationClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleProfileClick = () => {
    navigate('/MyPage');
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="전체 사용자 검색"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="search-icon">
        <img src={search} alt="Search Icon" />
      </div>
      <div className="noti-mypage-icons">
        <div onClick={handleNotificationClick}>
          <img src={noti} alt="Noti Icon" />
        </div>
        <div onClick={handleProfileClick}>
          <img src={mypage} alt="Mypage Icon" />
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="suggestions-modal">
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isModalOpen && <NotificationModal onClose={handleNotificationClick} />}
    </div>
  );
};

export default Search;
