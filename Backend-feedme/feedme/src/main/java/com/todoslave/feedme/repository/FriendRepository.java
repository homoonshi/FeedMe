package com.todoslave.feedme.repository;

import com.todoslave.feedme.domain.entity.communication.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Integer> {


    List<Friend> findAllByMemberId(int memberId);


}
