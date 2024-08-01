package com.todoslave.feedme.repository;

import com.todoslave.feedme.domain.entity.membership.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository //Component가 들어가있다.
public interface MemberRepository extends JpaRepository<Member, Integer> {

//    @PersistenceContext //여기에 JPA의 em를 자기가 주입을 해줘서 스프링이 알아서 해준다.
//    private EntityManager em; //이 엔티티매니저를 이렇게 해주면 스프링이 엔티티 매니져를 만들어서 주입해준다.

//    //맴버 저장
//    public void save(Member member) {
//        em.persist(member);
//    }
//
//    // ID로 찾기
//    public Member findById(int id) {
//        return em.find(Member.class, id);
//    }
//
//    // 모든 맴버 찾기
//    public List<Member> findAll() {
//        return em.createQuery("select m from Member m", Member.class)
//                .getResultList();
//    }
//
//    // 이름으로 찾기
//    public List<Member> findByName(String nickname) {
//        return em.createQuery("select m from Member m where m.nickname = :nickname", Member.class)
//                .setParameter("nickname", nickname)
//                .getResultList();
//    }

}
