// ReactCalendar.js
import React, { useEffect } from 'react';
import '../Main/Calendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendarTodos, addCalendarTodos, setDailyTodos } from '../../store/todoSlice';
import { useNavigate } from 'react-router-dom';

function ReactCalendar() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜
  const { token } = useSelector((state) => state.auth);
  const { calendarTodos, dailyTodos } = useSelector((state) => state.todo);


  useEffect(() => {
    const date = value.toISOString().split('T')[0];
    console.log('value : ', date);

    axios.get(`http://localhost:8080/todos/calendar?date=${date}`,
      {
        headers: { Authorization: sessionStorage.getItem('accessToken'), },
      }
    )
      .then(response => {
        if (Array.isArray(response.data)) {
          dispatch(setCalendarTodos(response.data));
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, [value]);

  // console.log('Calendar Todos:', calendarTodos);

  // 각 타일에 숫자를 표시하는 함수
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const todoForDate = calendarTodos.find(calendarTodo => {
        const todoDate = new Date(calendarTodo.date);

        return (
          todoDate.getDate() === date.getDate() &&
          todoDate.getMonth() === date.getMonth() &&
          todoDate.getFullYear() === date.getFullYear()
        );
      });

      if (todoForDate) {
        return (
          <div className='date-number'>
            {todoForDate.completed}/{todoForDate.total}
          </div>
        );
      }
    }

    return null;
  };

  // 날짜 클릭 시 다른 페이지로 이동하는 함수
  const handleDateClick = async (date) => {

    // console.log('data : ', date);
    // console.log('calendarTodos : ', calendarTodos);
    // console.log('dailyTodos : ', dailyTodos);

    try {
      const response = await axios.get('http://localhost:8080/todos/calendar/daily', {
        params: { date: date },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('accessToken'), // 필요한 경우 토큰 포함
        },
      });

      if (response.status === 200) {
        console.log('dailyTodos : ', response.data);
        setDailyTodos(response.data); // 받은 데이터로 상태 업데이트
        navigate('/Todo');
      } else {
        console.error('할 일 목록을 가져오는 데 실패했습니다:', response.data);
      }
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
    }
    
    // const formattedDate = date.toISOString().split('T')[0];

  };

  return (
    <div className='Calendar'>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={tileContent}
        onClickDay={handleDateClick}
      />
    </div>
  );
}

export default ReactCalendar;