package com.todoslave.feedme.repository;

import com.todoslave.feedme.domain.entity.check.Alarm;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

  List<Alarm> findByMemberIdAndIsChecked(int memberId, int isChecked);

}

