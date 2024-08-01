import React, { useState } from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import TodoMainList from './TodoMainList';
import TodoCreature from './TodoCreature';
import './Todo.css'


const Todo = () => {
  const [drawing, setDrawing] = useState(false);

  const handleDrawClick = () => {
    alert('Drawing created!');
    setDrawing(true);
  };

  return (
    <div className="TodoBack">
      <div className="TodoContainer">
        <Sidebar/>
        <div className="TodoMain">
          <Search />
            <div className="TodoDashboard">
              <div className="TodoList">
                <TodoMainList />
                {/* <button onClick={handleDrawClick}>DRAW</button>
                  {drawing && (
                    <div/>
                  )}  */}
              </div>
              <div className="TodoCreature">
                <TodoCreature />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
