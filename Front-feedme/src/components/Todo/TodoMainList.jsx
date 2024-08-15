import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH, FaPlus, FaPen } from 'react-icons/fa';
import Modal from 'react-modal';
import './TodoMainList.css';
import '../../assets/font/Font.css';
import diary from '../../assets/images/test2.png';
import axios from 'axios';

const TodoMainList = (date) => {
  const [categories, setCategories] = useState({});

  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedTodo, setSelectedTodo] = useState({ categoryIndex: null, todoIndex: null });
  const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);
  const [todoModalIsOpen, setTodoModalIsOpen] = useState(false);
  const [addTodoModalIsOpen, setAddTodoModalIsOpen] = useState(false);
  const [drawingModalIsOpen, setDrawingModalIsOpen] = useState(false); 
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [editedTodo, setEditedTodo] = useState('');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);

  // 처음 컴포넌트가 열렸을 때 category 불러옴
  useEffect(() => {
    const categoryRequest = async () => {
      const response = await axios.get('https://i11b104.p.ssafy.io/api/category', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('accessToken'),
        }
      });
      if (response.status === 200) {
        
        const datas = response.data;

        datas.forEach(category => {
          
          const { id, name } = category;

          const newCategories = { ...categories };
          newCategories.push({ categoryId : id, categoryName : name, items : [] });

          setCategories(newCategories);

        })

      } else {
        console.log('불러오기 실패', response);
      }
    }

    categoryRequest();

  }, []);

  // 부모 컴포넌트에서 props로 date 받으면 currentDate 다시 설정 
  useEffect(() => {
    // date를 기반으로 currentDate를 설정
    const newDate = new Date(currentDate);
    newDate.setDate(date);
    setCurrentDate(newDate);
  }, [date]);

  // currentDate 날짜가 바뀌면 category 안에 있는 todo를 싹 다 날리고 서버에서 다시 받음
  useEffect(() => {
      
    const clearCategoryItems = () => {
      setCategories(prevCategories => {
        return prevCategories.map(category => ({
          ...category,
          items: [] // 각 category의 items를 빈 배열로 초기화
        }));
      });
    };

    clearCategoryItems();

    const todoRequest = async () => {
      try {
        const response = await axios.get('https://i11b104.p.ssafy.io/api/todos/calendar/daily', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken'),
          },
          params: {
            date: currentDate
          }
        });        
  
        if (response.status === 200) {
          const todosData = response.data;
          const updatedCategories = [...categories];
          
          todosData.forEach(todo => {
            const { id, categoryId, content, createdAt, isCompleted } = todo;

            // categoryId에 해당하는 카테고리를 찾아 items에 todo를 추가
            const categoryIndex = updatedCategories.findIndex(category => category.categoryId === categoryId);
            if (categoryIndex !== -1) {
              updatedCategories[categoryIndex].items.push({
                id,
                content,
                createdAt,
                isCompleted
              });
            }
          });

          setCategories(updatedCategories);
        } else {
          console.log('불러오기 실패', response);
        }
      } catch (error) {
        console.error('서버 요청 중 오류 발생', error);
      }
    };

    todoRequest();

  }, [currentDate])


  const handleIncreaseDate = () => {
    const d = new Date(currentDate.setDate(currentDate.getDate() + 1));
  
    // 오늘 날짜와 비교
    const today = new Date();
  
    // 타임스탬프(숫자)로 비교
    if (d.getTime() <= today.getTime()) {
      setCurrentDate(d);
    }
  };


  // 날짜 감소
  const handleDecreaseDate = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
    handleTodo();
  };

  // 카테고리 추가 창 열림
  const handleAddCategory = () => {
    setCategoryModalIsOpen(true);
  };

  // 할일 추가 창 열림
  const handleAddTodo = (categoryIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    setAddTodoModalIsOpen(true);
  };

  // 할일 추가
  const handleAddTodoSubmit = async () => {
    if (newTodo) {
      try {
        const response = await axios.post(`http://localhost:8080/todos`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken'),
          },
          params: {
            content: newTodo,
            categoryId: currentCategoryIndex,
          },
        });
  
        if (response.status === 200) {
          const todosData = response.data;
          const updatedCategories = [...categories];
  
          todosData.forEach((todo) => {
            const { id, categoryId, content, createdAt, isCompleted } = todo;
  
            // categoryId에 해당하는 카테고리를 찾아 items에 todo를 추가
            const categoryIndex = updatedCategories.findIndex(
              (category) => category.categoryId === categoryId
            );
            if (categoryIndex !== -1) {
              updatedCategories[categoryIndex].items.push({
                id,
                content,
                createdAt,
                isCompleted,
              });
            }
          });
  
          setCategories(updatedCategories);
          setNewTodo('');
          setAddTodoModalIsOpen(false);
        } else {
          console.log('불러오기 실패', response);
        }
      } catch (error) {
        console.error('서버 요청 중 오류 발생', error);
      }
    }
  };
  

    // 할일 수정
    const handleEditTodo = async (categoryIndex, todoIndex) => {
      if (editedTodo) {
        try {
          const response = await axios.patch(`http://localhost:8080/todos`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': sessionStorage.getItem('accessToken'),
            },
            params: {
              id: todoIndex,
              content: editedTodo,
            },
          });
    
          if (response.status === 200) {

            const todoData = response.data;
            const updatedCategories = [...categories];
    
            const { id, categoryId, content, createdAt, isCompleted } = todoData;

            if (categoryIndex !== -1) {
              const items = updatedCategories[categoryIndex].items;
          
              // 해당 id의 todo를 찾기
              const todoIndex = items.findIndex((item) => item.id === id);
          
              if (todoIndex !== -1) {
                // 기존의 todo를 수정
                items[todoIndex] = {
                  id,
                  content,
                  createdAt,
                  isCompleted,
                };
              }
            }
    
            setCategories(newCategories);
            setSelectedTodo({ categoryIndex: null, todoIndex: null });
            setEditedTodo('');
            setTodoModalIsOpen(false);
          } else {
            console.log('불러오기 실패', response);
          }
        } catch (error) {
          console.error('서버 요청 중 오류 발생', error);
        }
      }
    };

    const handleDeleteTodo = async (categoryIndex, todoIndex) => {
      try {
        const response = await axios.delete(`http://localhost:8080/todos/${todoIndex}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('accessToken'),
          },
        });
    
        if (response.status === 200) {
          const updatedCategories = [...categories];
          const items = updatedCategories[categoryIndex].items;
    
          // todoIndex에 해당하는 todo를 찾고 삭제
          const todoToDeleteIndex = items.findIndex((item) => item.id === todoIndex);
    
          if (todoToDeleteIndex !== -1) {
            items.splice(todoToDeleteIndex, 1); // 해당 인덱스에서 1개 요소 삭제
            setCategories(updatedCategories); // 상태 업데이트
          }
          setSelectedTodo({ categoryIndex: null, todoIndex: null });
          setTodoModalIsOpen(false);
        }
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }

  // 할일 수정/삭제 옵션 열림
  const toggleOptions = (categoryIndex, todoIndex, content) => {
    setSelectedTodo({ categoryIndex, todoIndex });
    setEditedTodo(content);
    setTodoModalIsOpen(true);
  };

  // 할일 완료/미완료 버튼
  const toggleTodoComplete = async (categoryIndex, todoIndex) => {
    try {
      // 서버로 POST 요청 보내기
      const response = await axios.post(`https://i11b104.p.ssafy.io/api/category/complete/${todoIndex}`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('accessToken'),
        }
      });
  
      if (response.status === 200) {
        const updatedTodo = response.data;
  
        // 상태 업데이트: categories의 items 안에 있는 todos를 찾아서 상태 변경
        const updatedCategories = [...categories]; // 카테고리 복사
  
        // 카테고리에서 해당 카테고리와 todo를 찾아 업데이트
        const categoryToUpdate = updatedCategories[categoryIndex];
        const todoToUpdate = categoryToUpdate.items.find(todo => todo.id === updatedTodo.id);
  
        if (todoToUpdate) {
          // isCompleted 상태 변경
          todoToUpdate.isCompleted = updatedTodo.isCompleted;
  
          // 새로운 상태로 업데이트
          setCategories(updatedCategories);
        }
      } else {
        console.log('불러오기 실패', response);
      }
    } catch (error) {
      console.error('서버 요청 중 오류 발생', error);
    }
  };

  // 카테고리 생성
  const handleCategoryModalSubmit = async () => {
    if (newCategoryTitle) {
      try {
        const response = await axios.post(`http://localhost:8080/category/${newCategoryTitle}`, {}, {
          headers: {
            'Authorization': sessionStorage.getItem('accessToken'),
          }
        });
  
        if (response.status === 200) {
          const newCategory = response.data; 
          const formattedDate = formatDate(currentDate);
          const newCategories = { ...categories };
          
          if (!newCategories[formattedDate]) {
            newCategories[formattedDate] = [];
          }
          
          newCategories[formattedDate].push(newCategory);
          setCategories(newCategories);
          setNewCategoryTitle('');
          setCategoryModalIsOpen(false);
        } else {
          console.error('카테고리 생성 실패', response);
        }
      } catch (error) {
        console.error('서버 요청 중 오류 발생', error);
      }
    }
  };
  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return (
    <div className="TodoMainListContainer">
      <div className="TodoHeader">
        <FaAngleLeft className="TodoArrow" onClick={handleDecreaseDate} /> 
        <h3>{currentDate}</h3>
        <FaAngleRight className="TodoArrow" onClick={handleIncreaseDate} />
      </div>

      <div className="TodoSections">
      {categories.map((category, categoryIndex) => (
        <div className="TodoSection" key={categoryIndex}>
          <div className="TodoSectionHeader">
            <h4>{category.categoryName}</h4>
            {category.categoryName !== '일일 미션' && (
              <FaPlus className="AddTodoButton" onClick={() => handleAddTodo(categoryIndex)} />
            )}
          </div>
          <ul>
            {category.items.map((item, todoIndex) => (
              <li key={todoIndex} className="TodoItem">
                <div className="TodoItemContent">
                  <input type="checkbox" checked={item.isCompleted} onChange={() => toggleTodoComplete(categoryIndex, todoIndex)} /> {item.content}
                  <FaEllipsisH className="TodoOptionsButton" onClick={() => toggleOptions(categoryIndex, todoIndex, item.content)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

      <div className="TodoActions">
        {(isSameDay(currentDate, today) || isSameDay(currentDate, yesterday)) && (
          <button className="CreateDrawingButton" onClick={() => setDrawingModalIsOpen(true)}>
            <FaPen className="DrawingIcon" />
            그림일기 생성
          </button>
        )}
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
          <button className="TodoMainModalButton" onClick={() => setCategoryModalIsOpen(false)}>취소</button>
          <button className="TodoMainModalButton" onClick={handleCategoryModalSubmit}>추가</button>
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
          <button className="TodoMainModalButton" onClick={() => setAddTodoModalIsOpen(false)}>취소</button>
          <button className="TodoMainModalButton" onClick={handleAddTodoSubmit}>추가</button>
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
          <button className="TodoMainModalButton" onClick={() => handleDeleteTodo(selectedTodo.categoryIndex, selectedTodo.todoIndex)}>삭제</button>
          <button className="TodoMainModalButton" onClick={() => handleEditTodo(selectedTodo.categoryIndex, selectedTodo.todoIndex)}>수정</button>
        </div>
      </Modal>

      <Modal
        isOpen={drawingModalIsOpen}
        onRequestClose={() => setDrawingModalIsOpen(false)}
        contentLabel="그림일기 생성"
        className="TodoMainModalD"
        overlayClassName="TodoMainOverlay"
      >
        <h2 className="TodoMainModalTitle">그림일기 생성</h2>
        <img src={diary} alt="그림일기 이미지" className="TodoMainModalDImage" /> 
        <div className="TodoMainModalButtons">
          <button className="TodoMainModalButton" onClick={() => setDrawingModalIsOpen(false)}>취소</button>
          <button className="TodoMainModalButton">생성</button>
        </div>
      </Modal>

    </div>
  );
};


export default TodoMainList;
