import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH, FaPen } from 'react-icons/fa';
import './TodoListMain.css';
import '../../assets/font/Font.css';

const TodoListMain = () => {
  const [categories, setCategories] = useState([
    { title: '일일 미션', items: ['산책 다녀오기', '우산 챙기기'] },
    { title: '공부', items: ['CS 공부하기', '알고리즘 공부하기', '자격증 공부하기'] },
    { title: '공부', items: ['CS 공부하기', '알고리즘 공부하기', '자격증 공부하기'] },
    { title: '공부', items: ['CS 공부하기', '알고리즘 공부하기', '자격증 공부하기'] },
    { title: '공부', items: ['CS 공부하기', '알고리즘 공부하기', '자격증 공부하기'] },
    { title: '공부', items: ['CS 공부하기', '알고리즘 공부하기', '자격증 공부하기'] },
  ]);

  return (
    <div className="TodoListMainContainer">
      <div className="TodoListMainHeader">
        <FaAngleLeft className="TodoArrow" />
        <p className="TodoListMainHeaderDate">8월 3일 토요일</p>
        <FaAngleRight className="TodoArrow" />
      </div>

      <div className="TodoListMainContent">
        <div className="TodoListMainSections">
          {categories.map((category, categoryIndex) => (
            <div className="TodoListMainSection" key={categoryIndex}>
              <div className="TodoListMainSectionHeader">
                <p>{category.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="TodoListMainActions">
        <button className="TodoListMainActionsDrawing">
          <FaPen className="TodoListMainActionsDrawingIcon" /> 그림일기 생성
        </button>
        <FaEllipsisH className="TodoListMainActionsOption" />
      </div>
    </div>
  );
};

export default TodoListMain;
