package com.todoslave.feedme.repository;

import com.todoslave.feedme.domain.entity.communication.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Integer> {

    FriendRequest findById(int id);
    List<FriendRequest> findAllByMemberId(int memberId);

}
