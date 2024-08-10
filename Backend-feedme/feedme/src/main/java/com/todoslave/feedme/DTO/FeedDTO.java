package com.todoslave.feedme.DTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class FeedDTO {
        private int feedId;
        private String nickname;
        private String img;
        private String caption;
        private LocalDateTime lastCreateTime;
        private int likes;
        private List<FeedCommentDTO> comments;
    }

