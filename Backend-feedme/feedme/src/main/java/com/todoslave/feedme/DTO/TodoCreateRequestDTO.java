package com.todoslave.feedme.DTO;

import lombok.Data;
import lombok.Getter;

@Data
public class TodoCreateRequestDTO {

  private String content;
  private int categoryId;

}
