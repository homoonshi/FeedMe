package com.todoslave.feedme.repository;

import com.todoslave.feedme.domain.entity.diary.PictureDiary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<PictureDiary, Long> {
}