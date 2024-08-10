package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.TodoCalendarResponseDTO;
import com.todoslave.feedme.DTO.TodoCreateRequestDTO;
import com.todoslave.feedme.DTO.TodoDailyRequestDTO;
import com.todoslave.feedme.DTO.TodoResponseDTO;
import com.todoslave.feedme.DTO.TodoMainResponseDTO;
import com.todoslave.feedme.DTO.TodoModifyRequestDTO;
import com.todoslave.feedme.DTO.TodoRequestDTO;
import com.todoslave.feedme.domain.entity.task.CreatureTodo;
import com.todoslave.feedme.domain.entity.task.DayOff;
import com.todoslave.feedme.domain.entity.task.Todo;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.CreatureTodoReposito;
import com.todoslave.feedme.repository.TodoCategoryRepository;
import com.todoslave.feedme.repository.TodoRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {

  @Autowired
  private final TodoRepository todoRepository;
  @Autowired
  private final TodoCategoryRepository todoCategoryRepository;
  @Autowired
  private final CreatureTodoReposito creatureTodoReposito;
  @Autowired
  private final DayOffService dayOffService;
  @Autowired
  private final CreatureService creatureService;

  // 할일 목록에서 일정(일) 불러오기
  @Override
  public List<TodoResponseDTO> getTodoListDaily(TodoDailyRequestDTO todoDailyRequestDTO) {

    LocalDate date = todoDailyRequestDTO.getDate();

    if(todoDailyRequestDTO.getNext()<0){
      date.minusDays(1);
    }else{
      date.plusDays(1);
    }

    int memberId = SecurityUtil.getCurrentUserId();

    List<Todo> query = todoRepository.findAllByMemberIdAndCreatedAt(memberId, date);
    List<TodoResponseDTO> todos = new ArrayList<>();

    for(Todo todo : query){

      TodoResponseDTO responseDto = new TodoResponseDTO();
      responseDto.setId(todo.getId());
      responseDto.setCategoryId(todo.getTodoCategory().getId());
      responseDto.setCategoryName(todo.getTodoCategory().getName());
      responseDto.setContent(todo.getContent());
      responseDto.setCreatedAt(todo.getCreatedAt());
      responseDto.setIsCompleted(todo.getIsCompleted());

      todos.add(responseDto);

    }

    return todos;
  }

  // 메인 달력에서 일정 불러오기
  @Override
  public List<TodoResponseDTO> getTodoCalendarDaily(TodoRequestDTO todoRequestDTO) {

    LocalDate date = todoRequestDTO.getDate();

    int memberId = SecurityUtil.getCurrentUserId();
    List<Todo> query = todoRepository.findAllByMemberIdAndCreatedAt(memberId, date);
    List<TodoResponseDTO> todos = new ArrayList<>();

    for(Todo todo : query){

      TodoResponseDTO responseDto = new TodoResponseDTO();
      responseDto.setId(todo.getId());
      responseDto.setCategoryId(todo.getTodoCategory().getId());
      responseDto.setCategoryName(todo.getTodoCategory().getName());
      responseDto.setContent(todo.getContent());
      responseDto.setCreatedAt(todo.getCreatedAt());
      responseDto.setIsCompleted(todo.getIsCompleted());

      todos.add(responseDto);

    }

    return todos;

  }

  // 메인화면에서 당일 안한 일정들 불러오기
  @Override
  public List<TodoMainResponseDTO> getTodoMainDaily() {

    LocalDate date = LocalDate.now();

    int memberId = SecurityUtil.getCurrentUserId();
    List<Todo> query = todoRepository.findAllByMemberIdAndCreatedAtIsCompleted(memberId, date, 0);

    List<TodoMainResponseDTO> todos = new ArrayList<>();

    for(Todo todo : query){

      TodoMainResponseDTO responseDto = new TodoMainResponseDTO();
      responseDto.setId(todo.getId());
      responseDto.setContent(todo.getContent());
      responseDto.setIsCompleted(todo.getIsCompleted());

      todos.add(responseDto);

    }

    return todos;

  }

  // 월별 일정 완/미완 불러오기
  @Override
  public List<TodoCalendarResponseDTO> getTodoCalendarCompleted(TodoRequestDTO todoRequestDTO) {

    int year = todoRequestDTO.getDate().getYear();
    int month = todoRequestDTO.getDate().getMonthValue();

    YearMonth yearMonth = YearMonth.of(year, month);
    LocalDate firstDay = yearMonth.atDay(1);
    LocalDate lastDay = yearMonth.atEndOfMonth();

    List<TodoCalendarResponseDTO> todoCounts = new ArrayList<>();

    for (LocalDate date = firstDay; !date.isAfter(lastDay); date = date.plusDays(1)) {

      TodoCalendarResponseDTO todoCalendarResponseDTO = new TodoCalendarResponseDTO();

      long inCompleted = todoRepository.countTodoByDateAndIsCompleted(date, 0)+creatureTodoReposito.countByCreatedAtAndIsCompleted(date,0);

      todoCalendarResponseDTO.setInCompleted((int)inCompleted);

      long completed = todoRepository.countTodoByDateAndIsCompleted(date, 1)+creatureTodoReposito.countByCreatedAtAndIsCompleted(date,1);

      todoCalendarResponseDTO.setCompleted((int)completed);

      todoCalendarResponseDTO.setTotal((int)(inCompleted+completed));
      todoCalendarResponseDTO.setDate(date);

      todoCounts.add(todoCalendarResponseDTO);

    }


    return todoCounts;
  }

  // 일정 추가하기
  @Override
  public TodoResponseDTO insertTodo(TodoCreateRequestDTO todoCreateRequestDTO) {

    Todo todo = new Todo();
    todo.setMember(SecurityUtil.getCurrentMember());
    todo.setTodoCategory(todoCategoryRepository.findById(todoCreateRequestDTO.getCategoryId()).orElseThrow());
    todo.setContent(todoCreateRequestDTO.getContent());
    todo = todoRepository.save(todo);

    TodoResponseDTO todoResponseDTO = new TodoResponseDTO();
    todoResponseDTO.setId(todo.getId());
    todoResponseDTO.setContent(todo.getContent());
    todoResponseDTO.setCategoryId(todo.getTodoCategory().getId());
    todoResponseDTO.setCategoryName(todo.getTodoCategory().getName());
    todoResponseDTO.setCreatedAt(todo.getCreatedAt());
    todoResponseDTO.setIsCompleted(todo.getIsCompleted());

    return todoResponseDTO;
  }

  //일정 삭제하기
  @Override
  public void deleteTodo(int todoId) {
    todoRepository.deleteById(todoId);
  }

  //일정 수정하기
  @Override
  @Transactional
  public TodoResponseDTO updateTodo(TodoModifyRequestDTO todoModifyRequestDTO) {
    Todo todo = todoRepository.findById(todoModifyRequestDTO.getId()).orElseThrow();
    todo.setContent(todoModifyRequestDTO.getContent());

    TodoResponseDTO todoResponseDTO = new TodoResponseDTO();
    todoResponseDTO.setId(todo.getId());
    todoResponseDTO.setContent(todo.getContent());
    todoResponseDTO.setCategoryId(todo.getTodoCategory().getId());
    todoResponseDTO.setCategoryName(todo.getTodoCategory().getName());
    todoResponseDTO.setCreatedAt(todo.getCreatedAt());
    todoResponseDTO.setIsCompleted(todo.getIsCompleted());

    return todoResponseDTO;
  }

  //일정 완료하기
  @Override
  @Transactional
  public TodoResponseDTO completeTodo(int todoId) {

    Todo todo = todoRepository.findById(todoId).orElseThrow();
    todo.setIsCompleted(1);

    TodoResponseDTO todoResponseDTO = new TodoResponseDTO();
    todoResponseDTO.setId(todo.getId());
    todoResponseDTO.setContent(todo.getContent());
    todoResponseDTO.setCategoryId(todo.getTodoCategory().getId());
    todoResponseDTO.setCategoryName(todo.getTodoCategory().getName());
    todoResponseDTO.setCreatedAt(todo.getCreatedAt());
    todoResponseDTO.setIsCompleted(todo.getIsCompleted());

    return todoResponseDTO;
  }

  @Override
  public boolean AllcompleteTodo(TodoRequestDTO todoRequestDTO) {
    LocalDate date = todoRequestDTO.getDate();
    System.out.println("일");

    //만약에 완료를 이미 했다면
    if(!dayOffService.isActionAllowed(SecurityUtil.getCurrentUserId(),date)){
      return false;
    }

    System.out.println("이");
    //완료처리
    DayOff dayOff = new DayOff();
    dayOff.setEndDay(date);
    dayOff.setMember(SecurityUtil.getCurrentMember());
    dayOffService.saveDayOff(dayOff);
    System.out.println("삼");
    //일정 끝내기
    List<Todo> todoList = todoRepository.findByMemberIdAndCreatedAt(SecurityUtil.getCurrentUserId(),date);
    //크리쳐 일정 끝내기
    List<CreatureTodo> creatureTodoList = creatureTodoReposito.findByMemberIdAndCreatedAt(SecurityUtil.getCurrentUserId(),date);


    //일기 써달라고 하기
    // AI 요청!!!!!!!!!!!!!!!!!!!!!


    int completedTodos = (int) todoList.stream().filter(todo -> todo.getIsCompleted() == 1).count();
    int completedCreatureTodos = (int) creatureTodoList.stream().filter(creatureTodo -> creatureTodo.getIsCompleted() == 1).count();

    //경험치 올리기
    creatureService.expUp(completedTodos+completedCreatureTodos);

    //예본 해
      return true;
    }
}
