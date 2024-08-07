package com.todoslave.feedme.service;


import com.todoslave.feedme.DTO.CreatureInfoResponseDTO;
import com.todoslave.feedme.domain.entity.avatar.Creature;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;

public interface CreatureService {

    //크리쳐 만들기
    Creature createCreature();
    //크리쳐 만들기2
    Creature createFristCreature(String keyword, String photo, String creatureName);
    //크리쳐 정보 가져오기
    CreatureInfoResponseDTO CreatureInfo();
    //크리쳐 삭제하기
    boolean removeCreature();
    //크리쳐 경험치 올리기
    void expUp(int toDoCnt);
    //크리쳐 레벨업
    void LevelUp();

}
