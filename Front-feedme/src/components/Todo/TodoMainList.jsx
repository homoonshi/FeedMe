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
    const fetchData = async () => {
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
      await categoryRequest();
    };

    fetchData();
  }, []);

  const categoryRequest = async () => {
    console.log('categoryRequest');
    console.log('currentDate3 : ', currentDate);
    try {
      const response = await axios.get(`https://i11b104.p.ssafy.io/api/category`, {
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
    todoRequest();
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

  const todoRequest = async () => {
    console.log('todoRequest');
    console.log("현재 날짜:", currentDate);

    if (isLoading) return; 
    setIsLoading(true);

    try {
      const diaryPossible = await axios.get(`https://i11b104.p.ssafy.io/api/dayoff/${currentDate}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('accessToken'),
        },
      });

      if (diaryPossible.status === 200) {
        const diary = diaryPossible.data;
        setDiaryButton(diary);
      }

      clearCategoryItems();
      const response = await axios.get(`https://i11b104.p.ssafy.io/api/todos/calendar/daily`, {
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleTodoRequest = async (newDate) => {
    try {
      // 비동기 함수가 완료될 때까지 대기
      await todoRequest();

      // todoRequest가 완료된 후에 상태를 업데이트
      console.log('todoRequest 완료');
      // 여기에서 날짜 변경에 따른 추가 작업을 수행
      setCurrentDate(newDate);  // 상태를 업데이트하여 화면에 반영
    } catch (error) {
      console.error('Error in todoRequest:', error);
    }
  };

  // Increase date
  const handleIncreaseDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    handleTodoRequest(newDate);
  };

  // Decrease date
  const handleDecreaseDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    handleTodoRequest(newDate);
  };

  return (
    <div className="todo-main-list">
      {/* TodoMainList rendering logic */}
      <div className="date-navigation">
        <button onClick={handleDecreaseDate}>
          <FaAngleLeft />
        </button>
        <span>{currentDate.toDateString()}</span>
        <button onClick={handleIncreaseDate}>
          <FaAngleRight />
        </button>
      </div>
      {/* Other parts of the component */}
    </div>
  );
};

export default TodoMainList;
