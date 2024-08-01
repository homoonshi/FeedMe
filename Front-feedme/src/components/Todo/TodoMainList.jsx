import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH, FaPlus, FaPen } from 'react-icons/fa';
import Modal from 'react-modal'; 
import './TodoMainList.css';
import '../../assets/font/Font.css';

const TodoMainList = () => {
  const [categories, setCategories] = useState([
    { title: '공부', items: ['CS 공부하기', '알고리즘 공부하기', '자격증 공부하기'] },
    { title: '일일 미션', items: ['산책 다녀오기', '우산 챙기기'] }
  ]);

  const [selectedTodo, setSelectedTodo] = useState({ categoryIndex: null, todoIndex: null });
  const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);
  const [todoModalIsOpen, setTodoModalIsOpen] = useState(false);
  const [addTodoModalIsOpen, setAddTodoModalIsOpen] = useState(false); 
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newTodo, setNewTodo] = useState(''); 
  const [editedTodo, setEditedTodo] = useState('');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null); 

  const handleAddCategory = () => {
    setCategoryModalIsOpen(true);
  };

  const handleAddTodo = (categoryIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    setAddTodoModalIsOpen(true); 
  };

  const handleAddTodoSubmit = () => {
    if (newTodo) {
      const newCategories = [...categories];
      newCategories[currentCategoryIndex].items.push(newTodo);
      setCategories(newCategories);
      setNewTodo('');
      setAddTodoModalIsOpen(false); 
    }
  };

  const handleEditTodo = (categoryIndex, todoIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items[todoIndex] = editedTodo;
    setCategories(newCategories);
    setSelectedTodo({ categoryIndex: null, todoIndex: null });
    setTodoModalIsOpen(false); 
  };

  const handleDeleteTodo = (categoryIndex, todoIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items.splice(todoIndex, 1);
    setCategories(newCategories);
    setSelectedTodo({ categoryIndex: null, todoIndex: null });
    setTodoModalIsOpen(false); 
  };

  const toggleOptions = (categoryIndex, todoIndex) => {
    setSelectedTodo({ categoryIndex, todoIndex });
    setEditedTodo(categories[categoryIndex].items[todoIndex]);
    setTodoModalIsOpen(true); 
  };

  const handleCategoryModalSubmit = () => {
    if (newCategoryTitle) {
      setCategories([...categories, { title: newCategoryTitle, items: [] }]);
      setNewCategoryTitle('');
      setCategoryModalIsOpen(false);
    }
  };

  const today = new Date().toLocaleDateString('ko-KR', {
    // year: 'numeric',
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
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="TodoActions">
        <button className="CreateDrawingButton">
          <FaPen className="DrawingIcon" />
          그림일기 생성
        </button>
        <FaEllipsisH className="MoreOptionsButton" onClick={handleAddCategory} />
      </div>
      <Modal
        isOpen={categoryModalIsOpen}
        onRequestClose={() => setCategoryModalIsOpen(false)}
        contentLabel="새로운 카테고리 추가"
        className="TodoMainModal"
        overlayClassName="TodoMainOverlay"
      >
        <h2 className="TodoMainModalTitle">새로운 카테고리 추가</h2>
        <input
          type="text"
          value={newCategoryTitle}
          onChange={(e) => setNewCategoryTitle(e.target.value)}
          placeholder="카테고리를 입력하세요"
          className="TodoMainModalInput"
        />
        <div className="TodoMainModalButtons">
          <button className="TodoMainModalButton" onClick={handleCategoryModalSubmit}>추가</button>
          <button className="TodoMainModalButton" onClick={() => setCategoryModalIsOpen(false)}>취소</button>
        </div>
      </Modal>
      <Modal
        isOpen={addTodoModalIsOpen} 
        onRequestClose={() => setAddTodoModalIsOpen(false)}
        contentLabel="새로운 할 일 추가"
        className="TodoMainModal"
        overlayClassName="TodoMainOverlay"
      >
        <h2 className="TodoMainModalTitle">Todo 추가</h2>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="TodoMainModalInput"
        />
        <div className="TodoMainModalButtons">
          <button className="TodoMainModalButton" onClick={handleAddTodoSubmit}>추가</button>
          <button className="TodoMainModalButton" onClick={() => setAddTodoModalIsOpen(false)}>취소</button>
        </div>
      </Modal>
      <Modal
        isOpen={todoModalIsOpen}
        onRequestClose={() => setTodoModalIsOpen(false)}
        contentLabel="Todo 옵션"
        className="TodoMainModal"
        overlayClassName="TodoMainOverlay"
      >
        <h2 className="TodoMainModalTitle">Todo 옵션</h2>
        <input
          type="text"
          value={editedTodo}
          onChange={(e) => setEditedTodo(e.target.value)}
          placeholder="할 일을 수정하세요"
          className="TodoMainModalInput"
        />
        <div className="TodoMainModalButtons">
          <button className="TodoMainModalButton" onClick={() => handleEditTodo(selectedTodo.categoryIndex, selectedTodo.todoIndex)}>수정</button>
          <button className="TodoMainModalButton" onClick={() => handleDeleteTodo(selectedTodo.categoryIndex, selectedTodo.todoIndex)}>삭제</button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoMainList;
