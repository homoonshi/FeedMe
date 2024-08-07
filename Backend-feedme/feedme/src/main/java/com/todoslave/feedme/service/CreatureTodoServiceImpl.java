package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.CreatureTodoResponseDTO;
import com.todoslave.feedme.domain.entity.task.CreatureTodo;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.CreatureTodoReposito;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CreatureTodoServiceImpl implements CreatureTodoService{

    final private MissionService missionService;
    final private CreatureTodoReposito creatureTodoReposito;

    // 로그인시에 없으면 생성
    @Override
    public List<CreatureTodoResponseDTO> insertTodo(String weather) {

        CreatureTodo creatureTodo1 = new CreatureTodo();

        if (weather.equals("rainy")) { //맑을때
            creatureTodo1.setContent(missionService.getRainyMission().getMission());
        } else if (weather.equals("snowy")) {
            creatureTodo1.setContent(missionService.getSnowyMission().getMission());
        } else if (weather.equals("cloudy")) {
            creatureTodo1.setContent(missionService.getCloudyMission().getMission());
        } else if (weather.equals("sunny")) {
            creatureTodo1.setContent(missionService.getSunnyMission().getMission());
        } else{
            creatureTodo1.setContent(missionService.getDefaultMission().getMission());
        }

        CreatureTodo creatureTodo2 = new CreatureTodo();
        creatureTodo2.setContent(missionService.getDefaultMission().getMission());

        creatureTodo1.setMember(SecurityUtil.getCurrentMember());
        creatureTodo1.setMember(SecurityUtil.getCurrentMember());

        creatureTodoReposito.save(creatureTodo1);
        creatureTodoReposito.save(creatureTodo2);

        // ResponseDTO 리스트 생성
        List<CreatureTodoResponseDTO> responseDTOList = new ArrayList<>();
        responseDTOList.add(toResponseDTO(creatureTodo1));
        responseDTOList.add(toResponseDTO(creatureTodo2));

        return responseDTOList;
    }

    //DTO 변환
    private CreatureTodoResponseDTO toResponseDTO(CreatureTodo creatureTodo) {
        return CreatureTodoResponseDTO.builder()
                .id(creatureTodo.getId())
                .content(creatureTodo.getContent())
                .createdAt(creatureTodo.getCreatedAt())
                .isCompleted(creatureTodo.getIsCompleted())
                .build();
    }


    @Override
    public List<CreatureTodo> getCreaturetodo(LocalDate localDate) {
        return List.of();
    }







}
