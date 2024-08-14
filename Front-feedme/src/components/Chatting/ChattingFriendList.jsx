import React, { useState, useEffect } from 'react';
import { useSelector  } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import './ChattingFriendList.css';
import '../../assets/font/Font.css';

const ChattingFriendList = ({ friends: initialFriends, onFriendClick, onChatClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFriendId, setActiveFriendId] = useState(null);
  const [friends, setFriends] = useState(initialFriends || []); // 로컬 상태로 관리
  const user = useSelector((state) => state.user);

  // 부모 컴포넌트에서 friends props가 변경될 때 로컬 상태를 업데이트
  useEffect(() => {
    console.log("Initial friends updated:", initialFriends);
    setFriends(initialFriends || []);
  }, [initialFriends]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChatButtonClick = (friend) => {
    setActiveFriendId(friend.friendId);
    onChatClick(friend);
  };

  const filteredFriends = (friends || []).filter(friend =>
    friend.counterpartNickname
      ? friend.counterpartNickname.toLowerCase().includes(searchTerm.toLowerCase())
      : false
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
              {user.creatureName}
            </span>
            <button
              onClick={() => handleChatButtonClick({ id: 'my-avatar', name: user.nickname, avatar: user.image })}
              className={`ChatIconButton ${activeFriendId === 'my-avatar' ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faMessage} style={{ fontSize: '1.5rem' }} />
            </button>
          </div>
        </div>

        {filteredFriends
          .sort((a, b) => new Date(b.receiveTime) - new Date(a.receiveTime))
          .map(friend => (
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