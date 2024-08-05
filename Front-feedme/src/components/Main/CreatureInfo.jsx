import React from 'react';
import ToDoList from '../Todo/TodoList';
import creature from '../../assets/images/img-cat.png';
import '../Main/CreatureInfo.css';
import { useNavigate } from 'react-router-dom';

const CreatureInfo = () => {
  const navigate = useNavigate();

  const MoveTo = (path) => {
    navigate(path)
  }

  return (
    <div className='CreatureInfo'>
      <h2>냐옹이</h2>
      <img className='CreatureInfoPhoto' src={creature} alt="creature" onClick={() => MoveTo('/MyPage')} />
      <p>❤️ <span id='CreatureInfoDay'>247</span> 일째 함께하는 중</p>
      <div className='CreatureInfoTodo'>
        <ToDoList onClick={() => MoveTo('/Todo')} />
      </div>
    </div>
  );
};

export default CreatureInfo;