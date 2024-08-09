package com.todoslave.feedme.DTO;

import lombok.Data;

import java.time.LocalDate;
@Data
public class MypageResponseDTO {
    private String nickname;
    private String email;
    private LocalDate brithday;

    private String creatureName;
    private int exp;
    private int level;
    private String image;
    private int togetherDay;
}
