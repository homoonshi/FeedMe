package com.todoslave.feedme.domain.entity.avatar;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.todoslave.feedme.domain.entity.membership.Member;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "creature")
public class Creature {

    // 크리쳐 ID
    @Id  @GeneratedValue
    private int id;

    //회원 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    //진화단계
    @Column(nullable = false)
    private int level = 1 ; //레벨 1로 초기화 한다는 뜻

    //==연관관계 메서드==//
    public void setMember(Member member) {
        this.member = member;
        member.getCreatures().add(this);
    }

}