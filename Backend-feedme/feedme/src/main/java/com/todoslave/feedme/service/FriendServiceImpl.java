package com.todoslave.feedme.service;
//맴버 채팅 주석

import com.todoslave.feedme.domain.entity.communication.Friend;
import com.todoslave.feedme.domain.entity.communication.FriendRequest;
import com.todoslave.feedme.domain.entity.membership.Member;
import com.todoslave.feedme.repository.FriendRepository;
import com.todoslave.feedme.repository.FriendRequestRepository;
import com.todoslave.feedme.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import com.todoslave.feedme.DTO.FriendReqRequestDTO;
import com.todoslave.feedme.DTO.FriendReqResponseDTO;
import com.todoslave.feedme.DTO.FriendResponseDTO;
import com.todoslave.feedme.domain.entity.communication.Friend;
import com.todoslave.feedme.domain.entity.communication.FriendRequest;
import com.todoslave.feedme.domain.entity.membership.Member;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.FriendRepository;
import com.todoslave.feedme.repository.FriendRequestRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FriendServiceImpl implements FriendService{

    MemberService memberService;
    @Autowired
    FriendRepository friendRepository;
    @Autowired
    FriendRequestRepository friendRequestRepository;
//    MemberChatService memberChatService;

    // 친구 요청
    @Override
    public void requestFriend(FriendReqRequestDTO friendReqRequestDTO) {

        Member member = SecurityUtil.getCurrentMember();
        Member counterpart = memberService.findByNickname(friendReqRequestDTO.getCounterpartNickname());

        FriendRequest friendRequest = new FriendRequest();

        friendRequest.setMember(member);
        friendRequest.setCounterpartId(counterpart);

        friendRequestRepository.save(friendRequest);

    }

    // 친구 삭제
    @Override
    @Transactional
    public void deleteFriend(int friendId) {

        friendRequestRepository.deleteById(friendId);

    }


//     @Override
//     public List<Friend> getFriends(Integer memberId) {
//         return friendRepository.findAllByMemberId(memberId);
//     }

  
//     @Override
//     public List<FriendRequest> getRequestFriend(Integer memberId) {
//         return friendRequestRepository.findAllByMemberId(memberId);
//     }
  

    // 친구 인지 확인하기
    public boolean isFriend(int memberId, int friendId) {
        return friendRepository.existsByMemberIdAndCounterpartId(memberId, friendId) ||
                friendRepository.existsByCounterpartIdAndMemberId(friendId, memberId);
    }

    // 친구 목록 불러오기
    @Override
    public List<FriendResponseDTO> getFriends() {

        int memberId = SecurityUtil.getCurrentUserId();

        List<Friend> f = friendRepository.findAllByMemberId(memberId);
        List<FriendResponseDTO> friends = new ArrayList<>();

        for(Friend friend : f){

            Member counterpart = friend.getCounterpart();
            FriendResponseDTO friendResponseDTO = new FriendResponseDTO();
            friendResponseDTO.setFriendId(friend.getId());
            friendResponseDTO.setCounterpartNickname(counterpart.getNickname());
            friends.add(friendResponseDTO);

        }

        return friends;
    }

    // 친구 요청 불러오기
    @Override
    public List<FriendReqResponseDTO> getRequestFriend() {

        int memberId = SecurityUtil.getCurrentUserId();

        List<FriendRequest> friendRequests = friendRequestRepository.findAllByMemberId(memberId);
        List<FriendReqResponseDTO> friendReqResponseDTOList = new ArrayList<>();

        for(FriendRequest friendRequest : friendRequests){

            FriendReqResponseDTO friendReqResponseDTO = new FriendReqResponseDTO();
            friendReqResponseDTO.setId(friendRequest.getId());
            friendReqResponseDTO.setCounterpartNickname(friendRequest.getCounterpartId().getNickname());
            friendReqResponseDTOList.add(friendReqResponseDTO);

        }

        return friendReqResponseDTOList;
    }

    // 친구 수락
    @Override
    public void insertFriendship(int requestId) {

        FriendRequest friendRequest = friendRequestRepository.findById(requestId);

        Friend friend = new Friend();
        friend.setMember(SecurityUtil.getCurrentMember());
        friend.setCounterpart(friendRequest.getCounterpartId());

        friendRequestRepository.deleteById(requestId);

        List<Integer> members = new ArrayList<>();
        int memberId = SecurityUtil.getCurrentUserId();
        members.add(memberId);
        int counterpartId = friendRequest.getCounterpartId().getId();
        members.add(counterpartId);

//        memberChatService.insertChatRoom(members);
        friendRepository.save(friend);

    }

    // 친구 거절
    @Override
    public void deleteRequestFriend(int requestId) {

        friendRequestRepository.deleteById(requestId);

    }

}
