//맴버 채팅 주석

//package com.todoslave.feedme.service;
//
//import com.todoslave.feedme.DTO.ChatFriendCreateDTO;
//import com.todoslave.feedme.DTO.ChatFriendFindDTO;
//import com.todoslave.feedme.DTO.ChatMessageRequestDTO;
//import com.todoslave.feedme.DTO.ChatMessageResponseDTO;
//import com.todoslave.feedme.domain.entity.communication.MemberChatMessage;
//import com.todoslave.feedme.domain.entity.communication.MemberChatRoom;
//import java.util.List;
//import org.springframework.data.domain.Slice;
//import org.springframework.stereotype.Service;
//
//@Service
//public interface MemberChatService {
//
//  public List<MemberChatRoom> getChatRooms(ChatFriendFindDTO chatFriendFindDTO);
//
//  // 채팅방 생성 or 불러오기
//  public MemberChatRoom getChatRoom(ChatFriendCreateDTO chatFriendCreateDTO);
//
//  // 채팅방 메세지 불러오기
//  public Slice<MemberChatMessage> getChatMessage(String roomId, int page, int size);
//
//  // 채팅방 메세지 저장
//  public ChatMessageResponseDTO insertChatMessage(String roomId, ChatMessageRequestDTO chatMessageRequestDTO);
//
//}