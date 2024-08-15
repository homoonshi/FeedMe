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
      <div className="TodoHeader">
        <FaAngleLeft className="TodoArrow" onClick={handleDecreaseDate} />
        <h3>{currentDate.toISOString().split('T')[0]}</h3>
        <FaAngleRight className="TodoArrow" onClick={handleIncreaseDate} />
      </div>

      <div className="TodoSections">
        {categories.map((category, categoryIndex) => (
          <div className="TodoSection" key={categoryIndex}>
            <div className="TodoSectionHeader">
              <h4>{category.categoryName}</h4>
              {category.categoryName !== '일일 미션' && (
                <FaPlus className="AddTodoButton" onClick={() => handleAddTodo(category.categoryId)} />
              )}
            </div>
            <ul>
              {category.items.map((item, todoIndex) => (
                <li key={todoIndex} className="TodoItem">
                  <div className="TodoItemContent">
                    <input type="checkbox" checked={item.isCompleted} onChange={() => toggleTodoComplete(categoryIndex, item.id)} /> {item.content}
                    <FaEllipsisH className="TodoOptionsButton" onClick={() => toggleOptions(categoryIndex, item.id, item.content)} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="TodoSection">
          <div className="TodoSectionHeader">
            <h4>일일 미션</h4>
          </div>
          <ul>
            {todoMission.map((mission, missionIndex) => (
              <li key={missionIndex} className="missionItem">
                <div className="missionContent">
                  <input type="checkbox" checked={mission.isCompleted} onChange={() => toggleMissionComplete(mission.id, missionIndex)} /> {mission.content}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="TodoActions">
        {(isSameDay(currentDate, today) || isSameDay(currentDate, yesterday)) && diaryButton && (
          <button className="CreateDrawingButton" onClick={() => setDrawingModalIsOpen(true)}>
            <FaPen className="DrawingIcon" />
            그림일기 생성
          </button>
        )}
        <FaEllipsisH className="MoreOptionsButton" onClick={handleAddCategory} />
      </div>

      {/* 카테고리 추가 모달 */}
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

      {/* 할일 추가 모달 */}
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

      {/* 할일 수정/삭제 모달 */}
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

      {/* 그림일기 생성 모달 */}
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
