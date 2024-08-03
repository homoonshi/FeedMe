package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.MemberSignup;
import com.todoslave.feedme.domain.entity.membership.Member;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
//@Transactional(readOnly = true) //조회에선
@RequiredArgsConstructor // 생성자 만들어 주는 얘
public class MemberService {

    @Autowired
    MemberRepository memberRepository;


    //그냥 가입 시켜주는 얘
    public Member insertMember (Member member) {
        return memberRepository.save(member);
    }

    // 회원 전체 조회
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    //아이디로 맴버 찾기
    public Member findById(int userId) {
        return memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Member not found by id: " + userId));
    }

    //이메일로 찾기
    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    //토큰으로 맴버 찾기
    public Member findByToken(String token) {
        return memberRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Member not found by token" + token));
    }

    public boolean authenticate(String email) {
        return memberRepository.findByEmail(email).isPresent();
    }


    public void settoken(String email, String refreshToken) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Member not found by email: " + email));
        member.setToken(refreshToken);
        memberRepository.save(member);
    }

    public Member registerMember(MemberSignup memberSignup) {
//        memberRepository.findByEmail(memberSignup.getEmail()).orElseThrow(() -> new RuntimeException("Member not found by email: " + memberSignup.getEmail()));

        Member member = new Member();
        member.setEmail(memberSignup.getEmail());
        member.setBirthday(memberSignup.getBirthday());
        member.setNickname(memberSignup.getNickname());
        member.setUserRole(memberSignup.getUserRole());

        memberRepository.save(member);
        return member;
    }

    public Member updateMember(MemberSignup memberSignup) {
        int id = SecurityUtil.getCurrentUserId();

        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        member.setNickname(memberSignup.getNickname());
        member.setBirthday(memberSignup.getBirthday());
        member.setUserRole(memberSignup.getUserRole());

        return memberRepository.save(member);
    }
}
