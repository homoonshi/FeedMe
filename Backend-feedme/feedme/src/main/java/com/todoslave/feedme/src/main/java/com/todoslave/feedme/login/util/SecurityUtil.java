package com.todoslave.feedme.login.util;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

public class SecurityUtil {

    public static SecurityUserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof SecurityUserDto) {
            return (SecurityUserDto) authentication.getPrincipal();
        }

        return null; // 인증 정보가 없는 경우 처리
    }

    public static int getCurrentUserId() {
        SecurityUserDto userDto = getCurrentUser();
        return (userDto != null) ? userDto.getId() : null;
    }
}
