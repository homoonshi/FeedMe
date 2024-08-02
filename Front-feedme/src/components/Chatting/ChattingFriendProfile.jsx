import React from 'react';
import './ChattingFriendProfile.css';
import '../../assets/font/Font.css';

const ChattingFriendProfile = ({ friend }) => {
  return (
    <div className="CFProfile">
      <p className="CFProfileName">{friend.name}</p>
      <p>🤍 305일째 함께하는 중</p>
      <img src={friend.avatar} alt={friend.name} className="CFProfileImage" />
      <div className="CFProfileInfo">
        <p>Lv. 1</p>
        <div className="CFProfileExp">
          <p>EXP</p>
          <progress value="50" max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default ChattingFriendProfile;
