import React from 'react';

const ChattingFriendList = ({ friends, onFriendClick, onChatClick }) => {
  return (
    <div className="ChatFriend">
      {friends.map(friend => (
        <div key={friend.id} className="ChatFriendItem">
          <img src={friend.avatar} alt={friend.name} />
          <div className="ChatFriendInfo">
            <span>{friend.name}</span>
            <button onClick={() => onFriendClick(friend)}>프로필</button>
            <button onClick={() => onChatClick(friend)}>채팅</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChattingFriendList;
