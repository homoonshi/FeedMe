package com.todoslave.feedme.domain.entity.communication;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "memberchatmessage")
public class MemberChatMessage {

    @Id
    private String id;
    private String memberChatRoomId;
    private String sendId;
    private String content;

    @CreatedDate
    private LocalDateTime transmitAt;

    @Override
    public String toString() {
        return "MemberChatMessage{" +
            "id='" + id + '\'' +
            ", memberChatRoomId='" + memberChatRoomId + '\'' +
            ", sendId='" + sendId + '\'' +
            ", content='" + content + '\'' +
            ", transmitAt=" + transmitAt +
            '}';
    }

}