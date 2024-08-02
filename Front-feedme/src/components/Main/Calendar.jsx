// ReactCalendar.js
import React from 'react';
import '../Main/Calendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

function ReactCalendar() {
  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜

  return (
    <div className='Calendar'>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default ReactCalendar;
