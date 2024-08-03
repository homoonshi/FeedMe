package com.todoslave.feedme.controller;

import com.todoslave.feedme.DTO.MemberSignup;
import com.todoslave.feedme.config.jwt.JwtProperties;

import com.todoslave.feedme.domain.entity.membership.Member;

import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.MemberRepository;
import com.todoslave.feedme.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.Column;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Tag(name = "회원 CRUD")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MemberController {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberService memberService;

//    @Autowired
//    TokenProvider tokenProvider;

    @Autowired
    JwtProperties jwtProperties;

    @Operation(summary = "맴버 가입")
    @PostMapping
    public ResponseEntity<Member> SignupMember(@RequestBody MemberSignup memberSignup){

        Member member = memberService.registerMember(memberSignup);
        return ResponseEntity.ok(member);
    }

    @Operation(summary = "맴버 가입")
    @PatchMapping
    public ResponseEntity<Member> UpdateMember(@RequestBody MemberSignup memberSignup){

        Member member = memberService.updateMember(memberSignup);

        return ResponseEntity.ok(member);
    }

    @Tag(name = "holder test")
    @GetMapping("/holder")
    public int getCurrentUserId() {
        return SecurityUtil.getCurrentUserId();
    }

//    @Tag(name = "로그아웃 하기", description = "유저 테스트")
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/login";
    }

}
