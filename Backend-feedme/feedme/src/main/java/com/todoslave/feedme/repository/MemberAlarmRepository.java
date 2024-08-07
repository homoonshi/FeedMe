package com.todoslave.feedme.repository;

import com.todoslave.feedme.domain.entity.membership.MemberAlarm;
import java.sql.Time;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface MemberAlarmRepository extends JpaRepository<MemberAlarm, Integer> {

  boolean existsByMemberIdAndAlarmTime(@Param("memberId") int memberId, @Param("alarmTime") int alarmTime);

}
