package com.todoslave.feedme.service;

import com.todoslave.feedme.domain.entity.avatar.Creature;
import com.todoslave.feedme.domain.entity.membership.Member;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.CreatureRepository;
import com.todoslave.feedme.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;

@Service
public class CreatureServiceImpl implements CreatureService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    CreatureRepository creatureRepository;

    @Override
    public Creature createCreature() {
        return null;
    }

    @Override
    public Creature createFristCreature(String keyword, MultipartFile photo, String creatureName) {
        Member member = SecurityUtil.getCurrentMember();
        member.setCreatureName(creatureName);

        //
        //키워드와 사진을 보내서 만들어서 저장한다.
        //

        memberRepository.save(member);

        Creature creature = new Creature();
        creature.setMember(member);
        creature.setLevel(0);
        creatureRepository.save(creature);

        return creature;
    }

}
