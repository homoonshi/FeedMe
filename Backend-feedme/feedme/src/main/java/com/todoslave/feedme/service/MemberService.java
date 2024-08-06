package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.MemberSearchResponseDTO;
import com.todoslave.feedme.DTO.MemberSignupRequestDTO;
import com.todoslave.feedme.domain.entity.membership.Member;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Member registerMember(MemberSignupRequestDTO memberSignupRequestDTO) {
//        memberRepository.findByEmail(memberSignup.getEmail()).orElseThrow(() -> new RuntimeException("Member not found by email: " + memberSignup.getEmail()));

        Member member = new Member();
        member.setEmail(memberSignupRequestDTO.getEmail());
        member.setBirthday(memberSignupRequestDTO.getBirthday());
        member.setNickname(memberSignupRequestDTO.getNickname());
        member.setUserRole(memberSignupRequestDTO.getUserRole());

        memberRepository.save(member);
        return member;
    }

    public Member updateMember(MemberSignupRequestDTO memberSignupRequestDTO) {
        int id = SecurityUtil.getCurrentUserId();

        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        member.setNickname(memberSignupRequestDTO.getNickname());
        member.setBirthday(memberSignupRequestDTO.getBirthday());
        member.setUserRole(memberSignupRequestDTO.getUserRole());

        return memberRepository.save(member);
    }

    public boolean removeMember() {
        Member member = SecurityUtil.getCurrentMember();

        if (member == null) {
            return false;
        }
        memberRepository.delete(member);
        return true;
    }

//    public List<MemberSearchResponseDTO> getMemberList(String searchvalue) {
//
//        List<Member> members = memberRepository.findByNicknameContaining(searchvalue);
//        List<MemberSearchResponseDTO> memberSerachResponse = new ArrayList<>();
//
//        for (Member member : members) {
//            MemberSearchResponseDTO mem = new MemberSearchResponseDTO();
//            mem.setNickname(member.getNickname());
//
//        }
//
//        members
//    }
}
