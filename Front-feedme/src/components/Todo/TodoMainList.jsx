import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH, FaPlus, FaPen } from 'react-icons/fa';
import Modal from 'react-modal';
import './TodoMainList.css';
import '../../assets/font/Font.css';
import diary from '../../assets/images/test2.png';
import axios from 'axios';

const TodoMainList = ({ date }) => {
  const [categories, setCategories] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [diaryButton, setDiaryButton] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      console.log('input date : ', date);
      
      if (date) {
        const newDate = new Date(date);
        if (newDate !== new Date()) {
          console.log('newDate : ', newDate);
          setCurrentDate(newDate);
          console.log('currentDate1 : ', currentDate);
        } else {
          console.warn('유효하지 않은 날짜입니다:', date);
        }
      } else {
        setCurrentDate(new Date());
      }
  
      console.log('currentDate2 :', currentDate);

      categoryRequest();
    };
  
    fetchData();
  }, []);

  const categoryRequest = () => {
    console.log('categoryRequest');
    console.log('currentDate3 : ', currentDate);
    try {
      const response = axios.get(`https://i11b104.p.ssafy.io/api/category`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('accessToken'),
        }
      });

      if (response.status === 200) {
        console.log('카테고리 불러오기 성공:', response.data);
        const datas = response.data.map(category => ({
          categoryId: category.id,
          categoryName: category.name,
          items: []
        }));

        setCategories(datas);
      } else {
        console.log('카테고리 불러오기 실패:', response);
      }
    } catch (error) {
      console.error('카테고리 요청 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    handleTodoRequest();
  }, [currentDate]);

  const clearCategoryItems = () => {
    console.log('clearCategoryItems');

    setCategories(prevCategories => {
      return prevCategories.map(category => ({
        ...category,
        items: []
      }));
    });
  };

  const handleTodoRequest = () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const diaryPossible = axios.get(`https://i11b104.p.ssafy.io/api/dayoff/${currentDate}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('accessToken'),
        },
      });

      if (diaryPossible.status === 200) {
        setDiaryButton(diaryPossible.data);
      }

      clearCategoryItems();
      todoRequest(); 
    } catch (error) {
      console.error('Error in todoRequest:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const todoRequest = () => {
    console.log('todoRequest');
    console.log("현재 날짜:", currentDate);

    try {
      const response = axios.get(`https://i11b104.p.ssafy.io/api/todos/calendar/daily`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('accessToken'),
        },
        params: {
          date: currentDate.toISOString().split('T')[0]
        }
      });

      if (response.status === 200) {
        console.log('할일 불러오기 성공:', response.data);
        const todosData = response.data;

        setCategories(prevCategories => {
          const updatedCategories = [...prevCategories];
          todosData.forEach(todo => {
            const { id, categoryId, content, createdAt, isCompleted } = todo;

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

          return updatedCategories;
        });
      } else {
        console.log('할일 불러오기 실패:', response);
      }
    } catch (error) {
      console.error('할일 요청 중 오류 발생:', error);
    }
  };

  const handleIncreaseDate = () => {
    const increaseDate = new Date(currentDate);
    increaseDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(increaseDate);
    handleTodoRequest();
    console.log('날짜 증가:', increaseDate);
  };

  const handleDecreaseDate = () => {
    const decreaseDate = new Date(currentDate);
    decreaseDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(decreaseDate);
    handleTodoRequest();
    console.log('날짜 감소:', decreaseDate);
  };

  const handleAddCategory = () => {
    setCategoryModalIsOpen(true);
  };

  const handleAddTodo = (categoryIndex) => {
    setCurrentCategoryIndex(categoryIndex);
    setAddTodoModalIsOpen(true);
  };

  const handleAddTodoSubmit = () => {
    if (newTodo) {
      try {
        console.log("현재 카테고리 아이디", currentCategoryIndex);
        const response = axios.post(
          `https://i11b104.p.ssafy.io/api/todos`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': sessionStorage.getItem('accessToken'),
            },
            params: {
              content: newTodo,
              categoryId: currentCategoryIndex,
              todoDay: currentDate.toISOString().split('T')[0]
            },
          }
        );

        if (response.status === 200) {
          console.log('할일 추가 성공:', response.data);
          const newTodoItem = response.data;
          const updatedCategories = [...categories];

          const categoryIndex = updatedCategories.findIndex(category => category.categoryId === newTodoItem.categoryId);
          if (categoryIndex !== -1) {
            updatedCategories[categoryIndex].items.push(newTodoItem);
          }

          setCategories(updatedCategories);
          setNewTodo('');
          setAddTodoModalIsOpen(false);
        } else {
          console.log('할일 추가 실패:', response);
        }
      } catch (error) {
        console.error('할일 추가 중 오류 발생:', error);
      }
    }
  };

  const handleEditTodo = (categoryIndex, todoIndex) => {
    if (editedTodo) {
      try {
        const response = axios.patch(`https://i11b104.p.ssafy.io/api/todos`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': sessionStorage.getItem('accessToken'),
            },
            params: {
              id: todoIndex,
              content: editedTodo,
            },
          }
        );

        if (response.status === 200) {
          console.log('할일 수정 성공:', response.data);
          const updatedCategories = [...categories];
          const todoData = response.data;

          const items = updatedCategories[categoryIndex].items;
          const todoIdx = items.findIndex(item => item.id === todoData.id);

          if (todoIdx !== -1) {
            items[todoIdx] = todoData;
          }

          setCategories(updatedCategories);
          setSelectedTodo({ categoryIndex: null, todoIndex: null });
          setEditedTodo('');
          setTodoModalIsOpen(false);
        } else {
          console.log('할일 수정 실패:', response);
        }
      } catch (error) {
        console.error('할일 수정 중 오류 발생:', error);
      }
    }
  };

  const handleAddCategorySubmit = async () => {
    if (newCategoryTitle) {
      try {
        const response = await axios.post(`https://i11b104.p.ssafy.io/api/category/${newCategoryTitle}`, null, {
          headers: {
            'Authorization': sessionStorage.getItem('accessToken'),
          }
        });
  
        if (response.status === 200) {
          console.log('카테고리 생성 성공:', response.data);
          const newCategory = response.data;
          const newCategories = [...categories];
  
          newCategories.push({ categoryId: newCategory.id, categoryName: newCategory.name, items: [] });
          setCategories(newCategories);
          setNewCategoryTitle('');
          setCategoryModalIsOpen(false);
        } else {
          console.error('카테고리 생성 실패:', response);
        }
      } catch (error) {
        console.error('카테고리 생성 중 오류 발생:', error);
      }
    }
  };
  
  
  
    const handleOpenDrawingModal = () => {
      setDrawingModalIsOpen(true);
    };
  
    const handleCloseDrawingModal = () => {
      setDrawingModalIsOpen(false);
    };
  
    return (
      <div className="todo-main-list">
        <div className="date-navigation">
          <button onClick={handleDecreaseDate}>
            <FaAngleLeft />
          </button>
          <span>{currentDate.toISOString().split('T')[0]}</span>
          <button onClick={handleIncreaseDate}>
            <FaAngleRight />
          </button>
        </div>
        
        <div className="category-list">
          {categories.map((category, categoryIndex) => (
            <div key={category.categoryId} className="category-item">
              <h3>{category.categoryName}</h3>
              <button onClick={() => handleAddTodo(categoryIndex)}>Add Todo</button>
              <ul>
                {category.items.map((todo, todoIndex) => (
                  <li key={todo.id} className="todo-item">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleEditTodo(categoryIndex, todo.id)}
                    />
                    {todo.content}
                    <button onClick={() => setSelectedTodo({ categoryIndex, todoIndex })}>
                      <FaPen />
                    </button>
                    <button onClick={() => handleDeleteTodo(categoryIndex, todo.id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <button onClick={handleAddCategory}>
          <FaPlus /> Add Category
        </button>
        <button onClick={handleOpenDrawingModal}>Open Drawing</button>
        
        <Modal
          isOpen={categoryModalIsOpen}
          onRequestClose={() => setCategoryModalIsOpen(false)}
          contentLabel="Add Category"
        >
          <h2>Add Category</h2>
          <input
            type="text"
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
          />
          <button onClick={() => handleAddCategorySubmit()}>Submit</button>
          <button onClick={() => setCategoryModalIsOpen(false)}>Close</button>
        </Modal>
        
        <Modal
          isOpen={addTodoModalIsOpen}
          onRequestClose={() => setAddTodoModalIsOpen(false)}
          contentLabel="Add Todo"
        >
          <h2>Add Todo</h2>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={handleAddTodoSubmit}>Submit</button>
          <button onClick={() => setAddTodoModalIsOpen(false)}>Close</button>
        </Modal>
        
        <Modal
          isOpen={todoModalIsOpen}
          onRequestClose={() => setTodoModalIsOpen(false)}
          contentLabel="Edit Todo"
        >
          <h2>Edit Todo</h2>
          <input
            type="text"
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
          />
          <button
            onClick={() => handleEditTodo(selectedTodo.categoryIndex, categories[selectedTodo.categoryIndex].items[selectedTodo.todoIndex].id)}
          >
            Submit
          </button>
          <button onClick={() => setTodoModalIsOpen(false)}>Close</button>
        </Modal>
        
        <Modal
          isOpen={drawingModalIsOpen}
          onRequestClose={handleCloseDrawingModal}
          contentLabel="Drawing"
        >
          <h2>Drawing</h2>
          <img src={diary} alt="Diary" />
          <button onClick={handleCloseDrawingModal}>Close</button>
        </Modal>
      </div>
    );
  };
  
  export default TodoMainList;
  