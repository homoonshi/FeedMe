package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.FeedModifyRequest;
import com.todoslave.feedme.DTO.FeedRequestDTO;
import com.todoslave.feedme.DTO.FeedResponseDTO;

public interface FeedService {

    FeedResponseDTO insertFeed(FeedRequestDTO feedRequestDTO);

    FeedResponseDTO modifyFeed(int feedId, FeedModifyRequest feedModifyRequest);

    boolean delectFeed(int feedId);


}
