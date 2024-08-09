package com.todoslave.feedme.DTO;

import lombok.Data;

import java.util.List;

@Data
public class FeedDTO {
        private int id;
        private String name;
        private String img;
        private String caption;
        private String time;
        private int likes;
        private List<FeedCommentDTO> comments;
    }

