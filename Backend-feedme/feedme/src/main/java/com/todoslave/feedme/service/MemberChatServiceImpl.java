package com.todoslave.feedme.service;

import com.todoslave.feedme.domain.entity.communication.MemberChatMessage;
import com.todoslave.feedme.domain.entity.communication.MemberChatRoom;
import com.todoslave.feedme.repository.MemberChatMessageRepository;
import com.todoslave.feedme.repository.MemberChatRoomRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
public class MemberChatServiceImpl implements MemberChatService{

  @Autowired
  private MemberChatMessageRepository messageRepository;

  @Autowired
  private MemberChatRoomRepository roomRepository;

  @Override
  public List<MemberChatRoom> getChatRooms(MemberChatRoom room) {
    List<MemberChatRoom> rooms = roomRepository.findAllByParticipantIdsContaining(room.getParticipantIds());
    System.out.println(rooms);
    return rooms;
  }

  public MemberChatRoom getChatRoom(MemberChatRoom room){

    MemberChatRoom result = roomRepository.findByParticipantIdsContainingAll(room.getParticipantIds());

    System.out.println(room);

    if(result==null){
      result = roomRepository.save(room);
    }

    System.out.println(result);

    return result;
  }

  public Slice<MemberChatMessage> getChatMessage(String roomId, int skip, int limit){

    System.out.println("receive message? service");
    Pageable pageable = PageRequest.of(skip / limit, limit);

    Slice<MemberChatMessage> messages = messageRepository.findByMemberChatRoomIdOrderByTransmitAtDesc(roomId, pageable);

    return messages;
  }

  public MemberChatMessage insertChatMessage(MemberChatMessage message) {
    System.out.println(message);
    return messageRepository.save(message);
  }

}
