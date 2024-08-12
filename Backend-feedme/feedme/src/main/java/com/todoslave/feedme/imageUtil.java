package com.todoslave.feedme;

import com.todoslave.feedme.domain.entity.avatar.Creature;
import com.todoslave.feedme.domain.entity.membership.Member;
import org.springframework.stereotype.Component;

@Component
public class imageUtil {



    //크리쳐 이미지 주소
    public static String generateCreatureImgPath(Member member) {
        Creature creature = member.getCreature();
        int creatureLevel = creature.getLevel();
        int creatureId = creature.getId();
        return "http://localhost:8080/image/creature/" + creatureId + "_" +creatureLevel;
    }

//    public static String generateDiaryImgPath(Member member){
//        Creature creature = member.getCreature();
//        feedDTO.setImg("http://localhost:8080/image/pictureDiary/"+SecurityUtil.getCurrentUserId()+"_"+feed.getDiaryDay());
//    }

}
