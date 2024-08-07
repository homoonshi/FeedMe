package com.todoslave.feedme.DTO;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class CreatureTodoResponseDTO {
    private int id; //이거 왜 필요?
    private String content;
    private LocalDate createdAt;
    private int isCompleted;


}
