package com.todoslave.feedme.DTO;

import lombok.Data;

@Data
public class MemberSearchResponseDTO {
    String nickname;
    boolean isFriend;
    String creatureImg;
}
