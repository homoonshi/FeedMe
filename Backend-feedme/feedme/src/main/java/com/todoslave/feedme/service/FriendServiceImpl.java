//package com.todoslave.feedme.service;
//
//import com.todoslave.feedme.domain.entity.communication.Friend;
//import com.todoslave.feedme.domain.entity.communication.FriendRequest;
//import com.todoslave.feedme.domain.entity.membership.Member;
//import com.todoslave.feedme.repository.FriendRepository;
//import com.todoslave.feedme.repository.FriendRequestRepository;
//import com.todoslave.feedme.repository.MemberRepository;
//import jakarta.persistence.EntityNotFoundException;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//
//import java.util.List;
//
//@RequiredArgsConstructor
//public class FriendServiceImpl implements FriendService{
//
//    MemberRepository memberRepository;
//    FriendRepository friendRepository;
//    FriendRequestRepository friendRequestRepository;
//
//    @Override
//    public void insertFriend(int memberId, String email) {
//
//        int counterId;
//
//        FriendRequest friendRequest = new FriendRequest();
//        friendRequest.setMember(memberId);
//        friendRequest.setCounterpart_id(counterId);
//
//        friendRequestRepository.save(friendRequest);
//
//    }
//
//    @Override
//    @Transactional
//    public void deleteFriend(int friendId) {
//
//        friendRequestRepository.deleteById(friendId);
//
//    }
//
//    @Override
//    public List<Friend> getFriends(Integer memberId) {
//        return friendRepository.findAllByMemberId(memberId);
//    }
//
//    @Override
//    public List<FriendRequest> getRequestFriend(Integer memberId) {
//        return friendRequestRepository.findAllByMemberId(memberId);
//    }
//
//    @Override
//    public void insertFriendship(int id) {
//
//        FriendRequest friendRequest = friendRequestRepository.findById(id);
//
//        Friend friend = new Friend();
//        Member member = friendRequest.getMember();
//        friend.setMember(member);
//        friend.setCounterpart_id(friendRequest.getCounterpart_id());
//
//        friendRepository.save(friend);
//
//    }
//
//    @Override
//    public void deleteRequestFriend(int requestId) {
//
//        friendRequestRepository.deleteById(requestId);
//
//    }
//}
