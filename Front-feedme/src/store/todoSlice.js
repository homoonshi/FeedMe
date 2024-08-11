import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    calendarTodos: [],
    currentMonth: null,

};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setCalendarTodos: (state, action) => {
            // 전체 데이터를 대체합니다.
            state.calendarTodos = action.payload;
        },
        addCalendarTodos: (state, action) => {
            // 데이터를 추가합니다.
            state.calendarTodos.push(...action.payload);
        },
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload;
        }
    }
});

export const {
    setCalendarTodos,
    addCalendarTodos,
    setCurrentMonth,
    
} = todoSlice.actions;

export default todoSlice.reducer;