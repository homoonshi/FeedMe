package com.todoslave.feedme.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DiaryResponseDTO {

    private String content;
    private LocalDateTime createdAt;
    private String diaryImg;

}
