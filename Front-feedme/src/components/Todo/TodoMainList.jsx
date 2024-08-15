import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoMainList = ({ date }) => {
  const [categories, setCategories] = useState([]);
  const [todoMission, setTodoMission] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [diaryButton, setDiaryButton] = useState(false); // 여기서 diaryButton과 setDiaryButton을 정의합니다.

  useEffect(() => {
    const updateDateAndFetchCategories = async () => {
      console.log('input date : ', date);

      let newDate = new Date();
      if (date) {
        newDate = new Date(date);
      }

      if (newDate.getTime() !== new Date().getTime()) {
        setCurrentDate(newDate);
      } else {
        console.warn('유효하지 않은 날짜입니다:', date);
        return;
      }

      await categoryRequest(newDate);
    };

    updateDateAndFetchCategories();
  }, [date]);

  const categoryRequest = async (newDate) => {
    console.log('categoryRequest');
    console.log('currentDate3 : ', newDate);
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

  const todoRequest = async () => {
    console.log('todoRequest');
    console.log("현재 날짜:", currentDate);

    if (isLoading) return;
    setIsLoading(true);

    try {
      const diaryPossible = await axios.get(`https://i11b104.p.ssafy.io/api/dayoff/${currentDate.toISOString().split('T')[0]}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('accessToken'),
        },
      });

      if (diaryPossible.status === 200) {
        const diary = diaryPossible.data;
        setDiaryButton(diary); // setDiaryButton을 여기서 사용
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

    // 크리쳐 미션 종료
    try {
      const mission = await axios.get(`https://i11b104.p.ssafy.io/api/creatureTodo/calendar/daily`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('accessToken'),
        },
        params: {
          date: currentDate.toISOString().split('T')[0]
        }
      });

      if (mission.status === 200) {
        console.log('할일 불러오기 성공:', mission.data);
        const missionData = mission.data;
        const updateMission = [];
        missionData.forEach(mission => {
          const { id, content, createdAt, isCompleted } = mission;
          updateMission.push({
            id,
            content,
            createdAt,
            isCompleted
          });
        });
        setTodoMission(updateMission);
      } else {
        console.log('할일 불러오기 실패:', mission);
      }
    } catch (error) {
      console.error('할일 요청 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCategoryItems = () => {
    setCategories(prevCategories => {
      return prevCategories.map(category => ({
        ...category,
        items: []
      }));
    });

    setTodoMission([]);
  };

  return (
    <div className="TodoMainListContainer">
      {/* UI 요소들 */}
    </div>
  );
};

export default TodoMainList;
