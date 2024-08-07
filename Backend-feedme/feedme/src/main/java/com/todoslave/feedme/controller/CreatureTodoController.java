package com.todoslave.feedme.controller;

import com.todoslave.feedme.DTO.CreatureTodoResponseDTO;
import com.todoslave.feedme.DTO.TodoCreateRequestDTO;
import com.todoslave.feedme.DTO.TodoRequestDTO;
import com.todoslave.feedme.DTO.TodoResponseDTO;
import com.todoslave.feedme.service.CreatureTodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/creatureTodo")
@RequiredArgsConstructor
public class CreatureTodoController {

    final private CreatureTodoService creatureTodoService;
    // 투두 생성 -> 자돟으로 2개 생성?
    @GetMapping
    public ResponseEntity<List<CreatureTodoResponseDTO>> createTodo(@RequestBody String weather){
        List<CreatureTodoResponseDTO> list = new ArrayList<>();
        list = creatureTodoService.insertTodo(weather);
        return ResponseEntity.ok(list);
    }
    // 크리쳐 투두 생성




}
