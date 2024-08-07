//맴버 채팅 주석

//package com.todoslave.feedme.controller;
//
//import com.todoslave.feedme.DTO.ChatFriendCreateRequestDTO;
//import com.todoslave.feedme.DTO.ChatFriendFindDTO;
//import com.todoslave.feedme.DTO.ChatMessageRequestDTO;
//import com.todoslave.feedme.DTO.PaginationRequestDTO;
//import com.todoslave.feedme.domain.entity.communication.MemberChatMessage;
//import com.todoslave.feedme.domain.entity.communication.MemberChatRoom;
//import com.todoslave.feedme.service.MemberChatService;
//import com.todoslave.feedme.service.MemberService;
//import java.util.ArrayList;
//import java.util.List;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Slice;
//import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.handler.annotation.DestinationVariable;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestHeader;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/friends/chats")
//public class MemberChatController {
//
//  private final MemberChatService chatService;
//  private final MemberService memberService;
//
//  // 이 유저가 누구랑 채팅방을 갖고 있는 지 찾기
//  @GetMapping
//  public ResponseEntity<List<MemberChatRoom>> findChatRoomList(){
//
//    ChatFriendFindDTO chatFriendFindDTO = new ChatFriendFindDTO();
//
//    // jwt 토큰에서 id 얻어오기
//    int memberId = -1;
//
//    List<Integer> members = new ArrayList<>();
//    members.add(memberId);
//
//    chatFriendFindDTO.setMemberId(members);
//
//    return ResponseEntity.ok(chatService.getChatRooms(chatFriendFindDTO));
//  }
//
//  // 채팅방 생성
//  @PostMapping
//  public ResponseEntity<MemberChatRoom> createChatRoom(
//      @RequestBody ChatFriendCreateRequestDTO chatFriendCreateRequestDTO){
//
//    // 토큰으로 받아오기
//    int memberId;
////    int counterpartId = memberService.(대충닉네임으로멤버아이디찾는메서드);
//
//    if(counterpartId == -1){
//      return ResponseEntity.badRequest().build();
//    }
//
//    List<String> members = new ArrayList<>();
//
//    try {
//      members.add(memberId);
//      members.add(counterpartId);
//    } catch (Exception e) {
//      throw new RuntimeException(e);
//    }
//
//
//  }
//
//  // 메세지 불러오기
//  @MessageMapping("/loadMessages/{roomId}")
//  @SendTo("/chatRoom/loadMessages/{roomId}")
//  public Slice<MemberChatMessage> findMessages(@DestinationVariable String roomId,
//                                              @Payload PaginationRequestDTO request){
//    System.out.println("receive message?");
//    Slice<MemberChatMessage> messages = chatService.getChatMessage(roomId, request.getSkip(), request.getLimit());
//
//    for (MemberChatMessage message : messages) {
//      System.out.println(message.toString());
//    }
//
//    return messages;
//  }
//
//  // 메세지 저장
//  @MessageMapping("/messages/{roomId}")
//  @SendTo("/chatRoom/messages/{roomId}")
//  public MemberChatMessage sendMessage(@DestinationVariable String roomId, @Payload ChatMessageRequestDTO chatMessageRequestDTO) {
//    return chatService.insertChatMessage(roomId, chatMessageRequestDTO);
//  }
//}
