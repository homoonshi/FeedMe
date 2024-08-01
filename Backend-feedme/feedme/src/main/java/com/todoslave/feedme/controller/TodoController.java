package com.todoslave.feedme.controller;

import com.todoslave.feedme.domain.entity.task.Todo;
import com.todoslave.feedme.service.TodoService;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/todos")
public class TodoController {

  @Autowired
  private final TodoService todoservice;

  @GetMapping("/daily")
  public ResponseEntity<List<Todo>> findTodoDaily(@RequestHeader("Authorization") String token, @RequestBody Todo todo){
    Timestamp timestamp = todo.getCreatedAt();
    Date createdAt = new Date(timestamp.getTime());
    return ResponseEntity.ok(todoservice.getTodoDaily(todo.getMember().getId(), createdAt));
  }

  @PostMapping
  public ResponseEntity<Todo> createTodo(@RequestHeader("Authorization") String token, @RequestBody Todo todo){
    return ResponseEntity.ok(todoservice.insertTodo(todo));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> removeTodo(@RequestHeader("Authorization") String token, @PathVariable int id){
    todoservice.deleteTodo(id);
    return ResponseEntity.noContent().build();
  }

  @PatchMapping()
  public ResponseEntity<Todo> modifyTodo(@RequestHeader("Authorization") String token, @RequestBody Todo todo){
    return ResponseEntity.ok(todoservice.updateTodoContent(todo.getId(), todo.getContent()));
  }

  @PostMapping("/{id}/complete")
  public ResponseEntity<Todo> completeTodo(@RequestHeader("Authorization") String token, @PathVariable int id){
    return ResponseEntity.ok(todoservice.completeTodo(id));
  }

}
