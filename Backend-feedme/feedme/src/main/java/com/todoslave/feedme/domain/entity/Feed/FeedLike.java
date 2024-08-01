package com.todoslave.feedme.domain.entity.Feed;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.todoslave.feedme.domain.entity.membership.Member;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Entity
@Data
public class FeedLike {

    @EmbeddedId
    private LikeId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("feedId")
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @Data
    @EqualsAndHashCode
    @Embeddable
    public static class LikeId implements Serializable {  //왜 빨간줄이 뜰까?
        private int memberId;
        private int feedId;
    }

    //==연관관계 메서드==//
    public void setMember(Member member) {
        this.member = member;
        member.getFeedLikes().add(this);
    }

    public void setFeed(Feed feed) {
        this.feed = feed;
        feed.getFeedLikes().add(this);
    }


}
