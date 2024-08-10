package com.todoslave.feedme.DTO;

import lombok.Data;

@Data
public class FriendInfoResponseDTO {

  private int friendId;
  private String nickname;
  private String creatureImg;
  private int level;
  private int exp;
  private int join;

}
