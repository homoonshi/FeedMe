package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.CreatureTodoResponseDTO;
import com.todoslave.feedme.domain.entity.avatar.Creature;
import com.todoslave.feedme.domain.entity.task.CreatureTodo;
import com.todoslave.feedme.domain.entity.task.Todo;

import java.time.LocalDate;
import java.util.List;

public interface CreatureTodoService {

    //크리쳐 일정 생성 (날씨 영향)
    List<CreatureTodoResponseDTO> insertTodo(String weather);

    //해당 날의 일정 가져오기
    List<CreatureTodo> getCreaturetodo(LocalDate localDate);

    //일정 하나 완료하기


    //일정 전체 완료하기

}
