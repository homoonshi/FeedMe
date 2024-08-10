package com.todoslave.feedme.DTO;

import lombok.Getter;

@Getter
public class TodoCreateRequestDTO {

  private String content;
  private int categoryId;

}
