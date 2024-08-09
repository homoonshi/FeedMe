import React, { useEffect, useState } from 'react';
import ToDoList from '../Todo/TodoList';
import '../Main/CreatureInfo.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/userSlice';


const CreatureInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);
  const { creatureName, image, togetherDay, status, error } = user;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserData(token));
    }
  }, [status, dispatch, token]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  const MoveTo = (path) => {
    navigate(path)
  }

  return (
    <div className='CreatureInfo'>
      <h2>{creatureName}</h2>
      <img 
        className='CreatureInfoPhoto' 
        src={image} 
        alt="creature" 
        onClick={() => MoveTo('/MyPage')} 
      />
      <p>❤️ <span id='CreatureInfoDay'>{togetherDay}</span> 일째 함께하는 중</p>
      <div className='CreatureInfoTodo'>
        <ToDoList onClick={() => MoveTo('/Todo')} />
      </div>
    </div>
  );
};

export default CreatureInfo;