package com.todoslave.feedme.service;

import com.todoslave.feedme.domain.entity.task.Todo;
import com.todoslave.feedme.repository.TodoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {

  private final TodoRepository todoRepository;

  @Override
  public List<Todo> getTodoDaily(int memberId, Date createdAt) {
    return todoRepository.findAllByMemberIdAndCreatedAt(memberId, createdAt);
  }

  @Override
  public Todo insertTodo(Todo todo) {
    return todoRepository.save(todo);
  }

  @Override
  @Transactional
  public void deleteTodo(int todoId) {
    todoRepository.deleteById(todoId);
  }

  @Override
  @Transactional
  public Todo updateTodoContent(int todoId, String content) {
    Todo newTodo = todoRepository.findById(todoId).orElseThrow(() -> new EntityNotFoundException("Todo not found"));
    newTodo.setContent(content);
    return newTodo;
  }

  @Override
  @Transactional
  public Todo completeTodo(int todoId) {
    Todo newTodo = todoRepository.findById(todoId).orElseThrow(() -> new EntityNotFoundException("Todo not found"));
    newTodo.setCompleted(true);
    return newTodo;
  }
}
