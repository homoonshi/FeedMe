import React, { useEffect } from 'react';
import CreatureImage from '../../assets/images/test1.png';
import '../../assets/font/Font.css' 
import './TodoCreature.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/userSlice';
import { setToken } from '../../store/slice';

const TodoCreature = () => {
  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);
  const { image, level, exp, status } = user;
  
  useEffect(() => {
    const storedToken = sessionStorage.getItem('accessToken');
    if (storedToken && !token) {
      dispatch(setToken(storedToken));
    }

    if (status === 'idle' && storedToken) {
      dispatch(fetchUserData(storedToken));
    }
  }, [status, dispatch, token]);

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
  
  const maxExp = getMaxExpForLevel(level);

  return (
    <div className="TodoCreatureA">
      <p className="TodoCreatureAName">Lv. {level}</p> 
      <img src={`data:image/gif;base64,${image}`} alt="creature" />
      <div className="TodoCreatureAInfo">
        <div className="TodoCreatureAExp">
          <p>EXP</p>
          <progress value={exp} max={maxExp}></progress>
        </div>
      </div>
    </div>
  );
};

export default TodoCreature;