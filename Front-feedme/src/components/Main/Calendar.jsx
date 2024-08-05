// ReactCalendar.js
import React from 'react';
import '../Main/Calendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

function ReactCalendar() {
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜

  // 각 타일에 숫자를 표시하는 함수
  const tileContent = ({ date, view }) => {
    // if (view === 'month') {
    //   return <div className="date-number">{date.getDate()}</div>;
    // }
    // return null;
    return <div className='date-number'>2</div>
  };

  return (
    <div className='Calendar'>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={tileContent}
      />
    </div>
  );
}

export default ReactCalendar;