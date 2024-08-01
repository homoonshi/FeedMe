import React from 'react';

const ChattingFriendProfile = ({ friend }) => {
  
  // 이미지 사이즈 조정 삭제해도 됨
  const sample = {
    width:"100px",
    height:'100px',
    objectFit:"cover"
  }

  return (
    <div>
      <h2>{friend.name}</h2>
      <img src={friend.avatar} alt={friend.name} style={sample} />
      <p>Level: 1</p>
      <p>EXP: 305</p>
    </div>
  );
};

export default ChattingFriendProfile;
