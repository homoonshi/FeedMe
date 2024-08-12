import React, {useEffect}from 'react';
import './ChattingFriendProfile.css';
import '../../assets/font/Font.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ChattingFriendProfile = ({ friend, onDelete }) => {
  useEffect(() => {
    // console.log('Selected Friend Info:', friend); // 친구 정보를 콘솔에 출력
  }, [friend]);

  return (
    <div className="CFProfile">
      <FontAwesomeIcon 
        icon={faTrashCan} 
        style={{ color: "#8c8c8c" }} 
        className="CFProfileDeleteIcon" 
        onClick={() => onDelete(friend)}
      />
      
      <p className="CFProfileName">{friend.creatureNickname}</p>
      <p className="CFProfileterm">🤍 {friend.join}일째 함께하는 중</p>
      <img src={friend.creatureImg} alt={friend.nickname} className="CFProfileImage" /> 
      <div className="CFProfileInfo">
        <p className="CFProfileLv">Lv. {friend.level}</p>
        <div className="CFProfileExp">
          <p>EXP</p>
          <progress value={friend.exp}  max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default ChattingFriendProfile;
