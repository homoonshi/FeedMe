package com.todoslave.feedme.controller;

import com.todoslave.feedme.DTO.TodoCategoryRequestDTO;
import com.todoslave.feedme.DTO.TodoCategoryResponseDTO;
import com.todoslave.feedme.domain.entity.task.TodoCategory;
import com.todoslave.feedme.service.TodoCategoryService;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class TodoCategoryController {

  @Autowired
  private TodoCategoryService todoCategoryService;

  @GetMapping
  public ResponseEntity<List<TodoCategoryResponseDTO>> findTodoCategories(){
    return ResponseEntity.ok(todoCategoryService.getCategories());
  }

  @PostMapping("/{name}")
  public ResponseEntity<TodoCategoryResponseDTO> createTodoCategory(@PathVariable("name") String name){
    System.out.println(name+"되어요?");
    return ResponseEntity.ok(todoCategoryService.insertCategory(name));
  }

  @DeleteMapping
  public ResponseEntity<Void> removeTodoCategory(@RequestBody TodoCategoryRequestDTO category){
    todoCategoryService.deleteCategory(category.getId());
    return ResponseEntity.noContent().build();
  }

  @PatchMapping
  public ResponseEntity<TodoCategoryResponseDTO> modifyTodoCategory(@RequestBody
      TodoCategoryRequestDTO category){
    return ResponseEntity.ok(todoCategoryService.updateCategory(category));
  }



}
