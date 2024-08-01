package com.todoslave.feedme.repository;

import com.todoslave.feedme.domain.entity.task.Todo;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {

  @Query("SELECT t FROM Todo t WHERE t.member.id = :memberId AND FUNCTION('DATE', t.createdAt) = :createdAt")
  List<Todo> findAllByMemberIdAndCreatedAt(@Param("memberId") int memberId, @Param("createdAt") Date createdAt);

}
