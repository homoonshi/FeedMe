import React from 'react';
import './ChattingFriendProfile.css';
import '../../assets/font/Font.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ChattingFriendProfile = ({ friend, onDelete }) => {
  return (
    <div className="CFProfile">
      <FontAwesomeIcon 
        icon={faTrashCan} 
        style={{ color: "#8c8c8c" }} 
        className="CFProfileDeleteIcon" 
        onClick={() => onDelete(friend)}
      />
      <p className="CFProfileName">{friend.name}</p>
      <p className="CFProfileterm">🤍 305일째 함께하는 중</p>
      <img src={friend.avatar} alt={friend.name} className="CFProfileImage" />
      <div className="CFProfileInfo">
        <p className="CFProfileLv">Lv. 1</p>
        <div className="CFProfileExp">
          <p>EXP</p>
          <progress value="50" max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default ChattingFriendProfile;
