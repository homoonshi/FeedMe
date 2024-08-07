package com.todoslave.feedme.controller;

import com.todoslave.feedme.DTO.MemberSearchResponseDTO;
import com.todoslave.feedme.DTO.MemberSignupRequestDTO;
import com.todoslave.feedme.config.jwt.JwtProperties;

import com.todoslave.feedme.domain.entity.membership.Member;

import com.todoslave.feedme.login.dto.TokenResponseStatus;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.MemberRepository;
import com.todoslave.feedme.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "회원 CRUD")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "맴버 검색 (for 친구추가)")
    @GetMapping("/{searchvalue}")
    public ResponseEntity<List<MemberSearchResponseDTO>> getUsers(@PathVariable String searchvalue) {
        List<MemberSearchResponseDTO> list = memberService.getMemberList(searchvalue);
        return new ResponseEntity<List<MemberSearchResponseDTO>>(list, HttpStatus.OK);
    }




    @Operation(summary = "맴버 가입")
    @PostMapping
    public ResponseEntity<Member> SignupMember(@RequestBody MemberSignupRequestDTO memberSignupRequestDTO){

        Member member = memberService.registerMember(memberSignupRequestDTO);
        return ResponseEntity.ok(member);
    }

    @Operation(summary = "맴버 수정")
    @PatchMapping
    public ResponseEntity<Member> UpdateMember(@RequestBody MemberSignupRequestDTO memberSignupRequestDTO){

        Member member = memberService.updateMember(memberSignupRequestDTO);

        return ResponseEntity.ok(member);
    }

    @Tag(name = "holder test")
    @GetMapping("/holder")
    public int getCurrentUserId() {
        return SecurityUtil.getCurrentUserId();

    }

    @Tag(name = "holder test2")
    @GetMapping("/holder/test")
    public Member getCurrentMember() {
        return SecurityUtil.getCurrentMember();
    }



//    @Tag(name = "로그아웃 하기", description = "유저 테스트")
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/login";
    }

    @Operation(summary = "맴버 탈퇴")
    @DeleteMapping
    public ResponseEntity<?> deleteMember(@RequestHeader("Authorization") final String accessToken) {
        int id = SecurityUtil.getCurrentUserId();

        if (id == -1) {
            return ResponseEntity.badRequest().body("로그인 상태를 확인해주세요.");
        }

        boolean isDeleted = memberService.removeMember(); // id를 인자로 전달하도록 수정

        if (isDeleted) {
            return ResponseEntity.ok("정상적으로 삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 삭제된 회원이거나, 로그인 상태를 확인해주세요.");
        }
    }





}
