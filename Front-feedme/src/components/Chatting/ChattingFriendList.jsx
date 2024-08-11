import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import './ChattingFriendList.css';
import '../../assets/font/Font.css';

const ChattingFriendList = ({ friends, onFriendClick, onChatClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFriendId, setActiveFriendId] = useState(null); 

  const user = useSelector((state) => state.user);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChatButtonClick = (friend) => {
    setActiveFriendId(friend.id); 
    onChatClick(friend);
  };

  const filteredFriends = friends.filter(friend =>
    friend.counterpartNickname.toLowerCase().includes(searchTerm.toLowerCase())
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
          <img src={user.image} alt="내 아바타" className="ChatFriendAvatar" />
          <div className="ChatFriendInfo">
            <span onClick={() => onFriendClick({ id: 'my-avatar', name: user.nickname, avatar: user.image })} className="ChatFriendName">
              {user.nickname}
            </span>
            <button
              onClick={() => handleChatButtonClick({ id: 'my-avatar', name: user.nickname, avatar: user.image })}
              className={`ChatIconButton ${activeFriendId === 'my-avatar' ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faMessage} style={{ fontSize: '1.5rem' }} />
            </button>
          </div>
        </div>
    
        {filteredFriends.map(friend => (
          <div key={friend.friendId} className="ChatFriendItem">
            <img src={friend.avatar} alt={friend.counterpartNickname} className="ChatFriendAvatar" />
            <div className="ChatFriendInfo">
              <span onClick={() => onFriendClick(friend)} className="ChatFriendName">
                {friend.counterpartNickname}
              </span>
              <button
                onClick={() => handleChatButtonClick(friend)}
                className={`ChatIconButton ${activeFriendId === friend.friendId ? 'active' : ''}`}
              >
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