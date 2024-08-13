package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.DiaryResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DiaryService {
    Page<DiaryResponseDTO> getDiaryList(Pageable pageable);
}
