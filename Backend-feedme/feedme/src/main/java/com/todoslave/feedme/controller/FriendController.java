package com.todoslave.feedme.controller;

import com.todoslave.feedme.DTO.FriendReqRequestDTO;
import com.todoslave.feedme.DTO.FriendReqResponseDTO;
import com.todoslave.feedme.DTO.FriendResponseDTO;
import com.todoslave.feedme.domain.entity.communication.Friend;
import com.todoslave.feedme.domain.entity.communication.FriendRequest;
import com.todoslave.feedme.domain.entity.membership.Member;
import com.todoslave.feedme.service.AlarmService;
import com.todoslave.feedme.service.FriendService;
import com.todoslave.feedme.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/friends")
public class FriendController {

    static private MemberService memberService;
    static private FriendService friendService;
    static private AlarmService alarmService;

    // 친구 요청하기
    @PostMapping
    public ResponseEntity<Void> addFriend(FriendReqRequestDTO friendReqRequestDTO){
        friendService.requestFriend(friendReqRequestDTO);
        return ResponseEntity.noContent().build();
    }

    // 친구 삭제하기
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFriend(@RequestParam("id") int friendId){
        friendService.deleteFriend(friendId);
        return ResponseEntity.noContent().build();
    }

    // 친구 목록 불러오기
    @GetMapping
    public ResponseEntity<List<FriendResponseDTO>> findFriends(){
        return ResponseEntity.ok(friendService.getFriends());
    }

    // 친구 요청 목록 조회
    @GetMapping("/request")
    public ResponseEntity<List<FriendReqResponseDTO>> findRequestFriend(){
        return ResponseEntity.ok(friendService.getRequestFriend());
    }

    // 친구 요청 수락하기
    @PostMapping("/accept/{id}")
    public ResponseEntity<Void> acceptFriendship(@PathVariable("id") int requestId){
        friendService.insertFriendship(requestId);
        return ResponseEntity.noContent().build();
    }

    // 친구 요청 거절하기
    @PostMapping("/reject/{id}")
    public ResponseEntity<Void> rejectFriendship(@PathVariable("id") int requestId){
        friendService.deleteRequestFriend(requestId);
        return ResponseEntity.noContent().build();
    }


}
