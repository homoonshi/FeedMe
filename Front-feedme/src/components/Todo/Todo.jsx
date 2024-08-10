import React, { useState } from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import ToDoList from './TodoList';
import Creature from '../Creature/Creature';
import './Todo.css';
import apiClient from '../../api/userApi'; // 경로 수정

const Todo = () => {
  const [drawing, setDrawing] = useState(false);
  const [memberInfo, setMemberInfo] = useState(null);

  const handleDrawClick = () => {
    alert('Drawing created!');
    setDrawing(true);
  };

  const fetchMemberInfo = async () => {
    try {
      // 백엔드의 보호된 엔드포인트에 접근
      const response = await apiClient.get('http://localhost:8080/users/holder/test');
      setMemberInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch member info', error);
    }
  };

  return (
    <div className="TodoContainer">
      <Sidebar/>
      <div className="TodoMain">
        <Search />
          <div className="TodoDashboard">
            <div className="TodoList">
              <ToDoList />
              <button onClick={handleDrawClick}>DRAW</button>
              <button onClick={fetchMemberInfo}>Fetch Member Info</button> {/* 버튼 추가 */}
              {drawing && (
                <div/>
              )}
              {memberInfo && (
                <div>
                  <h2>Member Information:</h2>
                  <pre>{JSON.stringify(memberInfo, null, 2)}</pre>
                </div>
              )}
            </div>
            <div className="TodoCreature">
              <Creature />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Todo;
