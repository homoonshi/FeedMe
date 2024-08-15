import React, {useEffect}from 'react';
import './ChattingFriendProfile.css';
import '../../assets/font/Font.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFriend } from '../../store/friendInfoSlice';

const ChattingFriendProfile = ({ friend, onDelete }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleDeleteClick = () => {
    dispatch(deleteFriend({ token, counterpartNickname: friend.nickname }))
      .then(() => {
        onDelete(friend); // 성공 시 onDelete 콜백 호출
        window.location.reload();
      });
  };

  const getMaxExpForLevel = (level) => {
    switch (level) {
      case 0:
        return 10;
      case 1:
        return 30;
      case 2:
        return 100;
      case 3:
        return 3000;
      default:
        return 3000;
    }
  };
  
  const maxExp = getMaxExpForLevel(friend.level);
  console.log(friend)
  return (
    <div className="CFProfile">
      <FontAwesomeIcon 
        icon={faTrashCan} 
        style={{ color: "#8c8c8c" }} 
        className="CFProfileDeleteIcon" 
        onClick={handleDeleteClick}
      />
      
      <p className="CFProfileName">{friend.creatureNickname}</p>
      <p className="CFProfileterm">🤍 {friend.join}일째 함께하는 중</p>
      
      <img src={`data:image/gif;base64,${friend.creatureImg}`} alt={friend.nickname} className="CFProfileImage" /> 
      <div className="CFProfileInfo">
        <p className="CFProfileLv">Lv. {friend.level}</p>
        <div className="CFProfileExp">
          <p>EXP</p>
          <progress value={friend.exp}  max={maxExp}></progress>
        </div>
      </div>
    </div>
  );
};

export default ChattingFriendProfile;
