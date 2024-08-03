package com.todoslave.feedme.service;

import com.todoslave.feedme.domain.entity.task.Todo;
import java.util.Date;
import java.util.List;

public interface TodoService {

  // 하루 일정 불러오기
  public List<Todo> getTodoDaily(int memberId, Date createdAt);

  // 일정 추가하기
  public Todo insertTodo(Todo todo);

  //일정 삭제하기
  public void deleteTodo(int todoId);

  //일정 수정하기
  public Todo updateTodoContent(int todoId, String content);

  //일정 완료하기
  public Todo completeTodo(int todo);

  //모든 일정 완료하기

  // 그림일기 생성

}
