package com.todoslave.feedme.DTO;

import java.time.LocalDate;
import lombok.Getter;

@Getter
public class TodoDailyRequestDTO {

  private LocalDate date;
  private int next;

}
