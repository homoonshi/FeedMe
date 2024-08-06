package com.todoslave.feedme.service;

import com.todoslave.feedme.domain.entity.communication.Friend;
import com.todoslave.feedme.domain.entity.communication.FriendRequest;

import java.util.List;

public interface FriendService {

    // 친구 추가
    void insertFriend(int memberId, String email);

    // 친구 삭제
    void deleteFriend(int friendId);

    // 친구 목록 조회
    List<Friend> getFriends(Integer memberId);

    // 친구 요청 목록 조회
    List<FriendRequest> getRequestFriend(Integer memberId);

    // 친구 수락
    void insertFriendship(int requestId);

    // 친구 거절
    void deleteRequestFriend(int requestId);

}
