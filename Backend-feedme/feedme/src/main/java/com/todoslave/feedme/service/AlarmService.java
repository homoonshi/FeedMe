package com.todoslave.feedme.service;

import com.todoslave.feedme.domain.entity.check.Alarm;
import com.todoslave.feedme.domain.entity.membership.Member;
import java.time.LocalDateTime;

public interface AlarmService {

    void todoCompleted();
    boolean requestFriendship(Member requestor, Member counterpart);
    void congratsBirthday();
    void checkAlarm();

}
