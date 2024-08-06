package com.todoslave.feedme.service;

import com.todoslave.feedme.domain.entity.communication.MemberChatMessage;
import com.todoslave.feedme.domain.entity.communication.MemberChatRoom;
import java.util.List;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
public interface MemberChatService {

  public List<MemberChatRoom> getChatRooms(MemberChatRoom room);

  // 채팅방 생성 or 불러오기
  public MemberChatRoom getChatRoom(MemberChatRoom room);

  // 채팅방 메세지 불러오기
  public Slice<MemberChatMessage> getChatMessage(String roomId, int page, int size);

  // 채팅방 메세지 저장
  public MemberChatMessage insertChatMessage(MemberChatMessage message);

}