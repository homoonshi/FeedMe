package com.todoslave.feedme.service;


import com.todoslave.feedme.domain.entity.avatar.Creature;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;

public interface CreatureService {


    Creature createCreature();


    Creature createFristCreature(String keyword, MultipartFile photo, String creatureName);
}
