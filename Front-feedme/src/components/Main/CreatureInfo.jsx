import React from 'react';
import ToDoList from '../Todo/TodoList';
import Louvre from '../../assets/images/Louvre.JPG';
import '../Main/CreatureInfo.css';

const CreatureInfo = () => {
  
  // 이미지 사이즈 조정 삭제해도 됨
  const sample = {
    width:"100px",
    height:'100px',
    objectFit:"cover"
  }

  return (
    <div className='CreatureInfo'>
      <h2>NYAONG</h2>
      <img src={Louvre} alt="creature" style={sample}/>
      <p>❤️ 247 일째 함께하는 중</p>
      <div>
        <ToDoList />
      </div>
    </div>
  );
};

export default CreatureInfo;
