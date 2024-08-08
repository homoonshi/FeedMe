import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Main/Sidebar';
import SearchBar from '../components/Main/Search';
import CreatureInfo from '../components/Main/CreatureInfo';
import Calendar from '../components/Main/Calendar';
import '../pages/Main.css';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../store/slice';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('accessToken');

    if (!token && !storedToken) {
      navigate('/login');
    } else if (storedToken) {
      // 세션 스토리지에 저장된 토큰을 Redux 상태에 설정
      dispatch(setToken(storedToken));
    }
  }, [token, navigate]);

  return (
    <div className="Main">
      <div className="MainRectangle">
        <Sidebar />
        <div className='MainRight'>
          <SearchBar/>
          <div className='MainRightContents'>
            <CreatureInfo />
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
