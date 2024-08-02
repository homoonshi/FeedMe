import React from 'react';
import ToDoList from '../Todo/TodoList';
import creature from '../../assets/images/img-cat.png';
import '../Main/CreatureInfo.css';

const CreatureInfo = () => {

  // 이미지 사이즈 조정 삭제해도 됨
  const sample = {
    width: "150px",
    height: '150px',
    objectFit: "cover"
  }

  return (
    <div className='CreatureInfo'>
      <h2>냐옹이</h2>
      <img src={creature} alt="creature" style={sample} />
      <p>❤️ <span id='CreatureInfoDay'>247</span> 일째 함께하는 중</p>
      <ToDoList />
    </div>
  );
};

export default CreatureInfo;
