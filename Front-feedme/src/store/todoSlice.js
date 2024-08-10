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
            state.calendarTodos = action.payload;
        },
        setCurrentMonth: (state, action) => {
            state.currentMonth = action.payload;
        }
    }
});

export const {
    setCalendarTodos,
    setCurrentMonth,
    
} = todoSlice.actions;

export default todoSlice.reducer;