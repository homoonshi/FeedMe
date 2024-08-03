//package com.todoslave.feedme.config.jwt;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@RequiredArgsConstructor
//public class TokenAuthenticationFilter extends OncePerRequestFilter {
//    private final TokenProvider tokenProvider;
//
//    private final static String HEADER_AUTHORIZATION = "Authorization"; //JWT 토큰을 찾기위한 헤더 이름
//    private final static String TOKEN_PREFIX = "Bearer "; //JWT에 붙는 일반적인 접두사
//
//    @Override
//    protected void doFilterInternal(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain filterChain)  throws ServletException, IOException {
//
//        String authorizationHeader = request.getHeader(HEADER_AUTHORIZATION); //헤더에서 Authorization 헤더 값을 가져온다
//        String token = getAccessToken(authorizationHeader); //메서드를 이용해 Bearer 접두사를 제거한 JWT 토큰 얻기
//
//        if (tokenProvider.validToken(token)) { //토큰 유효성 체크
//            Authentication authentication = tokenProvider.getAuthentication(token);// 토큰을 기반으로 인증 객체 생성
//            SecurityContextHolder.getContext().setAuthentication(authentication); //SecurityContextHolder에 넣어버림
//        }
//
//        filterChain.doFilter(request, response); //다음 필터 요청
//    }
//
//    private String getAccessToken(String authorizationHeader) { //JWT 토큰을 추출하는 메서드
//        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) { //헤더가 null이 아니고, Bearer로 시작하는지 ㅌ케스트
//            return authorizationHeader.substring(TOKEN_PREFIX.length());// "Bearer " 접두사를 제거하고 실제 토큰 값을 반환합니다.
//        }
//
//        return null;
//    }
//}
//
