package com.todoslave.feedme.DTO;

import lombok.Data;

@Data
public class MemberChatListResponseDTO {

  // 방 번호
  private String id;
  // 상대방 닉네임
  private String nickname;
  // 상대방 크리쳐 이미지
  private String creatureImage;
  // 최근에 채팅방 읽었는 지 확인
  private int isChecked;

}
