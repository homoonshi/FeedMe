package com.todoslave.feedme.DTO;

import lombok.Data;

import java.util.List;

@Data
public class FeedCommentDTO {
    private String name;
    private String comment;
    private String time;
    private List<FeedReplyDTO> replies;
}
