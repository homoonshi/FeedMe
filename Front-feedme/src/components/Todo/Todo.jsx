import React from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import TodoMainList from './TodoMainList';
import TodoListMain from './TodoListMain';
import TodoCreature from './TodoCreature';
import './Todo.css'
 
const Todo = () => {
  return (
    <div className="TodoBack">
      <div className="TodoContainer">
        <Sidebar />
        <div className="TodoMain">
          <div className="TodoDashboard">
            <div className="TodoList">
              <TodoMainList />
              {/* <TodoListMain /> */}
            </div>
            <div className="TodoCreatures">
              <TodoCreature />
            </div>
          </div>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Todo;
