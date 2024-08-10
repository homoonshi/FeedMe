// // ReactCalendar.js
// import React from 'react';
// import '../Main/Calendar.css';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { useState } from 'react';

// function ReactCalendar() {
//   const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜

//   // 각 타일에 숫자를 표시하는 함수
//   const tileContent = ({ date, view }) => {
//     // if (view === 'month') {
//     //   return <div className="date-number">{date.getDate()}</div>;
//     // }
//     // return null;

//     if (view === 'month') {
//       return <div className='date-number'>2/5</div>;
//     }
//     // return <div className='date-number'>2</div>
//   };

//   return (
//     <div className='Calendar'>
//       <Calendar
//         onChange={onChange}
//         value={value}
//         tileContent={tileContent}
//       />
//     </div>
//   );
// }

// export default ReactCalendar;


// src/components/ReactCalendar.js
import React, { useEffect } from 'react';
import '../Main/Calendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCalendarTodos, setCurrentMonth } from '../../store/todoSlice'; // 할 일 데이터 가져오기 위한 액션 가져오기
import axios from 'axios';


function ReactCalendar() {
  const [value, onChange] = useState(new Date());
  const [tileContent, setTileContent] = useState({}); // 타일에 표시할 데이터
  const dispatch = useDispatch();
  const { calendarTodos, currentMonth } = useSelector((state) => state.todo);

  useEffect(() => {
    const showTodosInCalendar = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/todos/calendar`, {
          params: {
            date: currentMonth
          }
        });
        console.log('Response Data', response.data);

        if (response.state === 200) {
          dispatch(setCalendarTodos(response.data));
        } else {
          console.log('할 일 불러오기 실패', response.data);
        }
      } catch (error) {
        console.log('Response Error', error);
      }
    }

    showTodosInCalendar();
  }, [currentMonth]);

  // 각 타일에 표시할 데이터
  const handleTileContent = ({ date, view }) => {
    if (view === 'month') {
      const todosForDate = tileContent[currentMonth] || [];

      if (todosForDate.length > 0) {
        const completedCount = todosForDate.filter(todo => todo.is_completed).length;
        const totalCount = todosForDate.length;

        return (
          <div className="date-number">
            {completedCount}/{totalCount}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className='Calendar'>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={handleTileContent}
      />
    </div>
  );
}

export default ReactCalendar;
