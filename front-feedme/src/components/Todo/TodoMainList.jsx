import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH, FaPlus } from 'react-icons/fa';
import './TodoMainList.css';

const TodoMainList = () => {
  const [categories, setCategories] = useState([
    { title: '공부', items: ['CS 공부하기', '알고리즘 공부하기', '자격증 공부하기'] },
    { title: '일일 미션', items: ['산책 다녀오기', '우산 챙기기'] }
  ]);

  const handleAddCategory = () => {
    const newCategoryTitle = prompt('새로운 카테고리 제목을 입력하세요:');
    if (newCategoryTitle) {
      setCategories([...categories, { title: newCategoryTitle, items: [] }]);
    }
  };

  const handleAddTodo = (categoryIndex) => {
    const newTodo = prompt('새로운 할 일을 입력하세요:');
    if (newTodo) {
      const newCategories = [...categories];
      newCategories[categoryIndex].items.push(newTodo);
      setCategories(newCategories);
    }
  };

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="TodoMainListContainer">
      <div className="TodoHeader">
        <FaAngleLeft className="TodoArrow" />
        <h3>{today}</h3>
        <FaAngleRight className="TodoArrow" />
      </div>
      <div className="TodoSections">
        {categories.map((category, index) => (
          <div className="TodoSection" key={index}>
            <div className="TodoSectionHeader">
              <h4>{category.title}</h4>
              {category.title !== '일일 미션' && (
                <FaPlus className="AddTodoButton" onClick={() => handleAddTodo(index)} />
              )}
            </div>
            <ul>
              {category.items.map((item, idx) => (
                <li key={idx}><input type="checkbox" /> {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="TodoActions">
        <button className="CreateDrawingButton">그림일기 생성</button>
        <FaEllipsisH className="MoreOptionsButton" onClick={handleAddCategory} />
      </div>
    </div>
  );
};

export default TodoMainList;
