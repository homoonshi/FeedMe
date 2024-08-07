//맴버 채팅 주석

//package com.todoslave.feedme.service;
//
//import com.todoslave.feedme.DTO.ChatFriendCreateDTO;
//import com.todoslave.feedme.DTO.ChatFriendFindDTO;
//import com.todoslave.feedme.DTO.ChatMessageRequestDTO;
//import com.todoslave.feedme.DTO.ChatMessageResponseDTO;
//import com.todoslave.feedme.domain.entity.communication.MemberChatMessage;
//import com.todoslave.feedme.domain.entity.communication.MemberChatRoom;
//import com.todoslave.feedme.domain.entity.membership.Member;
//import com.todoslave.feedme.repository.MemberChatMessageRepository;
//import com.todoslave.feedme.repository.MemberChatRoomRepository;
//import com.todoslave.feedme.repository.MemberRepository;
//import java.util.ArrayList;
//import java.util.List;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Slice;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class MemberChatServiceImpl implements MemberChatService{
//
//  private final MemberChatMessageRepository messageRepository;
//  private final MemberChatRoomRepository roomRepository;
//  private final MemberRepository memberRepository;









//  @Override
//  public List<MemberChatRoom> getChatRooms(ChatFriendFindDTO chatFriendFindDTO) {
//    List<MemberChatRoom> rooms = roomRepository.findAllByParticipantIdsContaining(chatFriendFindDTO.getMemberId());
//
//    int counterpartId = -1;
//
//    for(MemberChatRoom room : rooms){
//
//      List<Integer> members = room.getParticipantIds();
//
//      for(Integer member : members){
//        if(chatFriendFindDTO.getMemberId().get(0)==member){
//          continue;
//        }
//        counterpartId = member;
//      }
//
////      Member member = memberRepository.findById(counterpartId);
//
//
//
//    }
//
//  }
//
//  public MemberChatRoom getChatRoom(ChatFriendCreateDTO chatFriendCreateDTO){
//
//    result = roomRepository.save(chatFriendCreateDTO.getMembers());
//
//    return result;
//  }

//import com.todoslave.feedme.domain.entity.communication.MemberChatMessage;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Slice;
//
//public Slice<MemberChatMessage> getChatMessage(String roomId, int skip, int limit){
//
//    System.out.println("receive message? service");
//    Pageable pageable = PageRequest.of(skip / limit, limit);
//
//    Slice<MemberChatMessage> messages = messageRepository.findByMemberChatRoomIdOrderByTransmitAtDesc(roomId, pageable);
//
//    return messages;
//  }
//
//  public ChatMessageResponseDTO insertChatMessage(String roomId, ChatMessageRequestDTO chatMessageRequestDTO) {
//    MemberChatMessage memberChatMessage = new MemberChatMessage();
//
//    int memberId = -1;
//
//    memberChatMessage.setMemberChatRoomId(roomId);
//    memberChatMessage.setContent(chatMessageRequestDTO.getMessage());
//    memberChatMessage.setSendId(memberId);
//
//    memberChatMessage = messageRepository.save(memberChatMessage);
//    ChatMessageResponseDTO response = new ChatMessageResponseDTO();
//
//    response.setMessage(memberChatMessage.getContent());
//    response.setTransmitAt(memberChatMessage.getTransmitAt());
////    response.getSendNickname() = (대충 시큐리티에서 닉네임 받아오는 메서드);
//
//    return response;
//  }
//
//}
