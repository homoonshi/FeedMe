import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH, FaPlus } from 'react-icons/fa';
import './TodoMainList.css';

const TodoMainList = () => {
  const [categories, setCategories] = useState([
    { title: '공부', items: ['CS 공부하기', '알고리즘 공부하기', '자격증 공부하기'] },
    { title: '일일 미션', items: ['산책 다녀오기', '우산 챙기기'] }
  ]);

  const [selectedTodo, setSelectedTodo] = useState({ categoryIndex: null, todoIndex: null });

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

  const handleEditTodo = (categoryIndex, todoIndex) => {
    const newTodo = prompt('할 일을 수정하세요:', categories[categoryIndex].items[todoIndex]);
    if (newTodo) {
      const newCategories = [...categories];
      newCategories[categoryIndex].items[todoIndex] = newTodo;
      setCategories(newCategories);
      setSelectedTodo({ categoryIndex: null, todoIndex: null });
    }
  };

  const handleDeleteTodo = (categoryIndex, todoIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items.splice(todoIndex, 1);
    setCategories(newCategories);
    setSelectedTodo({ categoryIndex: null, todoIndex: null });
  };

  const toggleOptions = (categoryIndex, todoIndex) => {
    if (selectedTodo.categoryIndex === categoryIndex && selectedTodo.todoIndex === todoIndex) {
      setSelectedTodo({ categoryIndex: null, todoIndex: null });
    } else {
      setSelectedTodo({ categoryIndex, todoIndex });
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
        {categories.map((category, categoryIndex) => (
          <div className="TodoSection" key={categoryIndex}>
            <div className="TodoSectionHeader">
              <h4>{category.title}</h4>
              {category.title !== '일일 미션' && (
                <FaPlus className="AddTodoButton" onClick={() => handleAddTodo(categoryIndex)} />
              )}
            </div>
            <ul>
              {category.items.map((item, todoIndex) => (
                <li key={todoIndex} className="TodoItem">
                  <div className="TodoItemContent">
                    <input type="checkbox" /> {item}
                    <FaEllipsisH className="TodoOptionsButton" onClick={() => toggleOptions(categoryIndex, todoIndex)} />
                  </div>
                  {selectedTodo.categoryIndex === categoryIndex && selectedTodo.todoIndex === todoIndex && (
                    <div className="TodoOptions">
                      <button onClick={() => handleEditTodo(categoryIndex, todoIndex)}>수정</button>
                      <button onClick={() => handleDeleteTodo(categoryIndex, todoIndex)}>삭제</button>
                    </div>
                  )}
                </li>
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
