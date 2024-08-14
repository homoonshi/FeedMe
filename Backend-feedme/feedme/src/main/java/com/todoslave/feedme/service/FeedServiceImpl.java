package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.FeedModifyRequest;
import com.todoslave.feedme.DTO.FeedRequestDTO;
import com.todoslave.feedme.DTO.FeedResponseDTO;
import com.todoslave.feedme.domain.entity.Feed.Feed;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService{

    private final FeedRepository feedRepository;

    @Override
    public FeedResponseDTO insertFeed(FeedRequestDTO feedRequestDTO) {
        Feed feed = new Feed();
        feed.setContent(feedRequestDTO.getContent());
        feed.setMember(SecurityUtil.getCurrentMember());
        feed.setDiaryDay(feedRequestDTO.getDiaryDate());
        feed.setNickname(SecurityUtil.getCurrentMember().getNickname());

        feedRepository.save(feed);
        return convertToDTO(feed);
    }

    @Override
    public FeedResponseDTO modifyFeed(int feedId, FeedModifyRequest feedModifyRequest) {
        Feed feed = feedRepository.findById(feedId).orElse(null);
        if (feed == null) {return null;}

        feed.setContent(feedModifyRequest.getContent());
        feed.setUpdatedAt(LocalDateTime.now());
        feedRepository.save(feed);
        return convertToDTO(feed);
    }

    @Override
    public boolean delectFeed(int feedId) {
        Feed feed = feedRepository.findById(feedId).orElse(null);
        if (feed == null) {return false;}
        if(SecurityUtil.getCurrentMember().equals(feed.getMember())) {
            feedRepository.delete(feed);
            return true;
        }
        return false;
    }

    public FeedResponseDTO convertToDTO(Feed feed) {
        FeedResponseDTO dto = new FeedResponseDTO();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        dto.setCreatedAt(timestamp);
        dto.setId(feed.getId());
        dto.setImg(diaryImgPath(feed)); // 이미지 URL이 엔티티에 없다면 필요에 따라 설정
        dto.setContent(feed.getContent());
        dto.setAuthor(feed.getNickname());
        dto.setLikeCnt(String.valueOf(feed.getLikeCount()));
        return dto;
    }

    private String diaryImgPath(Feed feed) {
        int id = feed.getMember().getId();
        String day = String.valueOf(feed.getDiaryDay());
        return "http://localhost:8080/image/pictureDiary/" + id + "_" + day;
    }

//    // Feed 엔티티를 FeedResponseDTO로 변환하는 메서드
//    public FeedResponseDTO convertToDTO(Feed feed) {
//        FeedResponseDTO dto = new FeedResponseDTO();
//        dto.setId(feed.getId());
//        dto.setImg("image_url_placeholder"); // 이미지 URL이 엔티티에 없다면 필요에 따라 설정
//        dto.setContent(feed.getContent());
//        dto.setAuthor(feed.getNickname());
//        dto.setLikeCnt(String.valueOf(feed.getLikeCount()));
//        return dto;
//    }
//
//    // 모든 피드를 가져와서 DTO 리스트로 반환하는 메서드
//    public List<FeedResponseDTO> getAllFeeds() {
//        List<Feed> feeds = feedRepository.findAll();
//        return feeds.stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    // 특정 ID의 피드를 가져와서 DTO로 반환하는 메서드
//    public FeedResponseDTO getFeedById(int id) {
//        Feed feed = feedRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid feed ID: " + id));
//        return convertToDTO(feed);
//    }



}


