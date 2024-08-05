import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import './ChattingFriendList.css';
import '../../assets/font/Font.css';
import myAvatar from '../../assets/images/test1.png';

const ChattingFriendList = ({ friends, onFriendClick, onChatClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ChatFriendListContainer">
      <input 
        type="text" 
        placeholder="친구 검색" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        className="ChatFriendSearch"
      />
      <div className="ChatFriendList">
        <div key="my-avatar" className="ChatFriendItem">
          <img src={myAvatar} alt="내 아바타" className="ChatFriendAvatar" />
          <div className="ChatFriendInfo">
            <span onClick={() => onFriendClick({ id: 'my-avatar', name: '내 아바타', avatar: myAvatar })} className="ChatFriendName">내 아바타</span>
            <button onClick={() => onChatClick({ id: 'my-avatar', name: '내 아바타', avatar: myAvatar })} className="ChatIconButton">
              <FontAwesomeIcon icon={faMessage} style={{ fontSize: '1.5rem' }} />
            </button>
          </div>
        </div>
        {filteredFriends.map(friend => (
          <div key={friend.id} className="ChatFriendItem">
            <img src={friend.avatar} alt={friend.name} className="ChatFriendAvatar" />
            <div className="ChatFriendInfo">
              <span onClick={() => onFriendClick(friend)} className="ChatFriendName">{friend.name}</span>
              <button onClick={() => onChatClick(friend)} className="ChatIconButton">
                <FontAwesomeIcon icon={faMessage} style={{ fontSize: '1.5rem' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChattingFriendList;
