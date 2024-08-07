package com.todoslave.feedme.repository;
import com.todoslave.feedme.domain.entity.mission.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepository extends JpaRepository<Mission, Long> {

}