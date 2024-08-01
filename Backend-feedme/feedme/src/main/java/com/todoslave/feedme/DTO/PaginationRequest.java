package com.todoslave.feedme.DTO;

import lombok.Data;

@Data
public class PaginationRequest {

  private int skip;
  private int limit;

}
