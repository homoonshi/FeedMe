package com.todoslave.feedme.DTO;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class MemberSignupRequestDTO {

    String email;

    String nickname;

    String userRole = "ROLE_USER";

    Timestamp birthday;

}
