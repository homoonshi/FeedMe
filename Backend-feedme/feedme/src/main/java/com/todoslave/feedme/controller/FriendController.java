//package com.todoslave.feedme.controller;
//
//import com.todoslave.feedme.domain.entity.communication.Friend;
//import com.todoslave.feedme.domain.entity.communication.FriendRequest;
//import com.todoslave.feedme.service.FriendService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.RequestEntity;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/friends")
//public class FriendController {
//
//    static private FriendService friendService;
//
//    // 친구 추가하기
//    @PostMapping
//    public ResponseEntity<Void> addFriend(@RequestParam("token") String token, @RequestParam("counterEmail") String email){
//
//        // token으로부터 memberId를 찾는 로직
//        int memberId;
//
//        friendService.insertFriend(memberId, email);
//
//        return ResponseEntity.noContent().build();
//    }
//
//    // 친구 삭제하기
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> removeFriend(@RequestHeader("Authorization") String token, @RequestParam("id") String friendId){
//
//        // token으로부터 memberId를 찾는 로직
//        int memberId;
//
//        friendService.deleteFriend(friendId);
//
//        return ResponseEntity.noContent().build();
//    }
//
//    // 친구 목록 불러오기
//    @GetMapping
//    public ResponseEntity<List<Friend>> findFriends(@RequestHeader("Authorization")String token){
//        //token으로부터 memberId를 찾는 로직
//        int memberId;
//
//        return ResponseEntity.ok(friendService.getFriends(memberId));
//    }
//
//    // 친구 요청 목록 조회
//    @GetMapping("/request")
//    public ResponseEntity<List<FriendRequest>> findRequestFriend(@RequestHeader("Authorization") String token){
//        //token으로부터 memberId를 찾는 로직
//        int memberId;
//
//        return ResponseEntity.ok(friendService.getRequestFriend(memberId));
//    }
//
//    // 친구 수락하기
//    @PostMapping("/{id}/accept")
//    public ResponseEntity<Void> acceptFriendship(@RequestHeader("Authorization") String token, @PathVariable("id") int requestId){
//        // token 인증
//        if(true) {
//            friendService.insertFriendship(requestId);
//        }
//
//        return ResponseEntity.noContent().build();
//    }
//
//    // 친구 거절하기
//    @PostMapping("/{id}/reject")
//    public ResponseEntity<Void> rejectFriendship(@RequestHeader("Authorization") String token, @PathVariable("id") int requestId){
//        // token 인증
//        if(true){
//            friendService.deleteRequestFriend(requestId);
//        }
//
//        return ResponseEntity.noContent().build();
//    }
//
//    // 친구 활동 피드
//
//    // 친구 일정 공유
//
//
//}
