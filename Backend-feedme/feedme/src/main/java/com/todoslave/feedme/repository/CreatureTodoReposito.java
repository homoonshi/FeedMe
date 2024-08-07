package com.todoslave.feedme.repository;

import com.todoslave.feedme.domain.entity.task.CreatureTodo;
import com.todoslave.feedme.domain.entity.task.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

public interface CreatureTodoReposito extends JpaRepository<CreatureTodo,Integer> {
    List<CreatureTodo> findByMemberIdAndCreatedAt(int memberId, LocalDate createdAt);
}
