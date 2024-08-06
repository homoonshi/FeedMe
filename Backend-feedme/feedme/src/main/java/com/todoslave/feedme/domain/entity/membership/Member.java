package com.todoslave.feedme.domain.entity.membership;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.todoslave.feedme.domain.entity.avatar.Creature;
import com.todoslave.feedme.domain.entity.Feed.Feed;
import com.todoslave.feedme.domain.entity.Feed.FeedComment;
import com.todoslave.feedme.domain.entity.Feed.FeedLike;
import com.todoslave.feedme.domain.entity.Feed.FeedRecomment;
import com.todoslave.feedme.domain.entity.check.Alarm;
import com.todoslave.feedme.domain.entity.communication.Friend;
import com.todoslave.feedme.domain.entity.communication.FriendRequest;
import com.todoslave.feedme.domain.entity.diary.PictureDiary;
import com.todoslave.feedme.domain.entity.task.CreatureTodo;
import com.todoslave.feedme.domain.entity.task.Todo;
import com.todoslave.feedme.domain.entity.task.TodoCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "member")
public class Member {

    //회원 ID
    @Id
    @GeneratedValue
    private int id;

    //GeneratedValue에 관하여 설명
    /**
    DB마다 다른데 어떤 DB는 seq를 만들기도 하고(MYSQL) 어떤 애들은 테이블을 만드는데, 이러면 항상 ID값이 보장이 된다.
     persist 할때 필요 => 영속성 컨텍스트에 값을 딱 넣어야 하는데, 그때 이제 키/밸류가 되는데

     **/


    //이메일
    @Column(nullable = false)
    private String email;

    //닉네임
    @Column(nullable = false)
    private String nickname;

    //생일
    private Timestamp birthday;

    //토큰
    @Column(nullable = false)
    private String token;

    //유저를 하나로 합침

    // 경험치
    @Column(name = "exp", nullable = false, updatable = false)
    private int exp;

    // 상태
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private Emotion status; // BASIC, JOY, SAD

    //위도
    @Column(name = "latitude")
    private Double latitude;

    //경도
    @Column(name = "longitude")
    private Double longitude;

    //가입일
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime joinDate;


    //



    //여기부터 1대1
    
//    //회원 상세와 매핑
//    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
//    private MemberDetail memberDetail;
//
//    //회원 갱신 정보와 매핑
//    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
//    private MemberRenewInfo memberRenewInfo;
//
//    //회원 위치와 매핑
//    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
//    private MemberSpace memberSpace;

    //여기부터 1대 N

    //친구와 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Friend> friends = new ArrayList<>();

    //친구요청과 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FriendRequest> friendRequests = new ArrayList<>();

    // 투두와 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Todo> todos = new ArrayList<>();

    // 투두 카테고리와 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TodoCategory> todoCategories = new ArrayList<>();

    // 크리쳐 숙제와 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CreatureTodo> creatureTodos = new ArrayList<>();

    //크리쳐와 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Creature> creatures = new ArrayList<>();

    // 그림일기와 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PictureDiary> pictureDiary = new ArrayList<>();

    // 피드와 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Feed> feeds = new ArrayList<>();

    //좋아요 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private  List<FeedLike> feedLikes = new ArrayList<>();

    //피드 댓글과 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<FeedComment> feedComments = new ArrayList<>();

    //피드 대댓글과 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<FeedRecomment> feedRecomments = new ArrayList<>();

    //알람과 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Alarm> alarms = new ArrayList<>();


}
