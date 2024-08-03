//package com.todoslave.feedme.config.jwt;
//
//import com.todoslave.feedme.domain.entity.membership.Member;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Header;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.stereotype.Service;
//
//import java.time.Duration;
//import java.util.Collections;
//import java.util.Date;
//import java.util.Set;
//
//@RequiredArgsConstructor
//@Service
//public class TokenProvider {
//
//    private final JwtProperties jwtProperties;
//
//    //토큰 만들기
//    public String generateToken(Member member, Duration expiredAt) {
//        Date now = new Date();
//        return makeToken(new Date(now.getTime() + expiredAt.toMillis()), member);
//    }
//
//    private String makeToken(Date expiry, Member member) {
//        Date now = new Date();
//
//        return Jwts.builder()
//                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
//                .setIssuer(jwtProperties.getIssuer()) //내용 이슈
//                .setIssuedAt(now) //현재시간
//                .setExpiration(expiry)
//                .setSubject(member.getEmail()) // 내용 sub : 이메일
//                .claim("id", member.getId()) //클레임 id : 유저 ID
//                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey()) //서명 : 비밀값과 함께 암호화
//                .compact();
//    }
//
//    //유효성 검증
//    public boolean validToken(String token) {
//        try {
//            Jwts.parser()
//                    .setSigningKey(jwtProperties.getSecretKey()) //복호화하여서
//                    .parseClaimsJws(token); //토큰과 비교
//
//            return true;
//        } catch (Exception e) {
//            return false; //에러면 유효성 X
//        }
//    }
//
//
//    public Authentication getAuthentication(String token) { //토큰 기반 인증 정보 가져오기
//        Claims claims = getClaims(token);
//        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
//
//        return new UsernamePasswordAuthenticationToken(new org.springframework.security.core.userdetails.User(claims.getSubject
//                (), "", authorities), token, authorities);
//    }
//
//    public int getUserId(String token) { //토큰에 아이디 가져오기
//        Claims claims = getClaims(token);
//        return claims.get("id", Integer.class);
//    }
//
//    private Claims getClaims(String token) { // 클레임 조회
//        return Jwts.parser()
//                .setSigningKey(jwtProperties.getSecretKey())
//                .parseClaimsJws(token)
//                .getBody();
//    }
//}
