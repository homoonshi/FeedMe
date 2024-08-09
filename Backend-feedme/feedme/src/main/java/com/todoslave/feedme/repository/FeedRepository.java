package com.todoslave.feedme.repository;

import com.todoslave.feedme.domain.entity.Feed.Feed;
import com.todoslave.feedme.domain.entity.task.DayOff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Integer> {

}
