package com.todoslave.feedme.DTO;

import lombok.Data;

import java.sql.Timestamp;


@Data
public class FeedResponseDTO {

    private int id;
    private String img;
    private String content;
    private String author;
    private String likeCnt;

    private Timestamp createdAt;

}
