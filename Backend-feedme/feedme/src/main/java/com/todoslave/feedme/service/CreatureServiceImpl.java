package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.CreatureInfoResponseDTO;
import com.todoslave.feedme.domain.entity.avatar.Creature;
import com.todoslave.feedme.domain.entity.membership.Emotion;
import com.todoslave.feedme.domain.entity.membership.Member;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.CreatureRepository;
import com.todoslave.feedme.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.time.LocalDate;
import java.time.Period;

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


    //크리쳐 만들기
    @Override
    public Creature createFristCreature(String keyword, String photo, String creatureName) {
        //멤버 가져오고
        Member member = SecurityUtil.getCurrentMember();

        System.out.println("바봉 ㅎㅎ");
        System.out.println(member.getId());

        //크리쳐 만들고
        Creature creature = new Creature();
        //이름 설정하고
        creature.setCreatureName(creatureName);
        //멤버와 매핑 시켜주고
        creature.setMember(member);
        //경험치와 레벨은 자동 0으로 설정

//        memberRepository.save(member); //저장
        creatureRepository.save(creature); //저장

        //여기서 사진 만들라고 명령 내리시고!!!!!!!!!!!!!!!!!!!!!!

        return creature;
    }

    // 크리쳐 보기
    @Override
    public CreatureInfoResponseDTO CreatureInfo() {
        CreatureInfoResponseDTO creatureInfoResponseDTO = new CreatureInfoResponseDTO();
        Member member = SecurityUtil.getCurrentMember();
        creatureInfoResponseDTO.setName(member.getCreature().getCreatureName());
        creatureInfoResponseDTO.setExp(member.getCreature().getExp());
        creatureInfoResponseDTO.setImg(generateCreatureImgPath(member));

        // 현재 날짜 가져오기
        LocalDate currentDate = LocalDate.now();
        // 가입 날짜 가져오기 (Timestamp를 LocalDate로 변환)
        LocalDate joinDate = member.getJoinDate().toLocalDate();
        // 가입한 날로부터 며칠째인지 계산
        int daysSinceJoin = Period.between(joinDate, currentDate).getDays();

        // day 설정
        creatureInfoResponseDTO.setDay(daysSinceJoin);

        return creatureInfoResponseDTO;
    }

    //크리쳐 삭제(재발급을 위한)
    @Override
    public boolean removeCreature() {
        Member member = SecurityUtil.getCurrentMember();
        Creature creature = member.getCreature();
        creatureRepository.delete(creature);
        member.setCreature(null);
        memberRepository.save(member);
        return true;
    }

    //크리쳐 성장
    @Override
    public void expUp(int toDoCnt) {
        Creature creature = SecurityUtil.getCurrentMember().getCreature();

        int nowExp = creature.getExp()+toDoCnt;
        if(nowExp>7){nowExp=7;} // 하루 오를 수 있는 최대한의 경험치

        if (creature.getLevel()==0) { // 알

            if( nowExp >= 10) { //레벨업 한다면
                creature.setLevel(1);
                creature.setExp(nowExp % 10);
            }else{
                creature.setExp(nowExp);
            }

        } else if (creature.getLevel()==1) { // 1렙

            if( nowExp >= 30) { //레벨업 한다면
                creature.setLevel(2);
                creature.setExp(nowExp % 30);
            }else{
                creature.setExp(nowExp);
            }
        } else if (creature.getLevel()==2) { // 2렙

            if( nowExp >= 100) { //레벨업 한다면
                creature.setLevel(3);
                creature.setExp(nowExp % 100);
            }else{
                creature.setExp(nowExp);
            }

        } else { //3렙
            creature.setExp(nowExp);
        }

    }

    //크리쳐 레벨업
    @Override
    public void LevelUp() {
        Creature creature = SecurityUtil.getCurrentMember().getCreature();
        creature.setLevel(creature.getLevel()+1);
    }

    //크리쳐 이미지 주소
    private String generateCreatureImgPath(Member member) {
        Emotion state = member.getStatus();
        Creature creature = member.getCreature();
        int creatureLevel = creature.getLevel();
        int creatureId = creature.getId();
        return "http://localhost:8080/image/creature/" + creatureId + "_" +creatureLevel + "_" + state;
    }



}
