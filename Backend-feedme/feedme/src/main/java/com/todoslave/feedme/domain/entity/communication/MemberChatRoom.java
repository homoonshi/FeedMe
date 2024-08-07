package com.todoslave.feedme.domain.entity.communication;

import com.todoslave.feedme.domain.entity.membership.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "memberchatroom")
public class MemberChatRoom {

    @Id
    private String id;
    @Field("participant_ids")
    private List<Integer> participantIds;
    @CreatedDate
    @Field("created_at")
    private LocalDate createdAt;

}
