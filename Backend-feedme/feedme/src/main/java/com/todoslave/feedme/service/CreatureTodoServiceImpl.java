package com.todoslave.feedme.service;

import com.todoslave.feedme.DTO.CreatureTodoDailyRequestDTO;
import com.todoslave.feedme.DTO.CreatureTodoResponseDTO;
import com.todoslave.feedme.DTO.CretureTodoRequestDTO;
import com.todoslave.feedme.DTO.TodoRequestDTO;
import com.todoslave.feedme.domain.entity.mission.Mission;
import com.todoslave.feedme.domain.entity.task.CreatureTodo;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.repository.CreatureTodoReposito;
import com.todoslave.feedme.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CreatureTodoServiceImpl implements CreatureTodoService{

    final private MissionRepository missionRepository;
    final private CreatureTodoReposito creatureTodoRepository;
    private Random random = new Random();
    // 로그인시에 없으면 생성

    @Override
    public List<CreatureTodoResponseDTO> insertTodo(String weather) {

        int memberId = SecurityUtil.getCurrentMember().getId();
        LocalDate today = LocalDate.now();
        List<CreatureTodo> todayTodos = creatureTodoRepository.findByMemberIdAndCreatedAt(memberId, today);

        if (!todayTodos.isEmpty()) {
            return null; // 오늘의 미션이 이미 생성되었으면 null 반환
        }


        List<Mission> missions = missionRepository.findByWeatherCondition(weather);

        if (missions.isEmpty()) {
            missions = missionRepository.findByWeatherCondition("default");
        }

        System.out.println(missions.size()+"감자테");
        Mission selectedMission = missions.get(random.nextInt(missions.size()));

        List<Mission> Dmissions= missionRepository.findByWeatherCondition("default");
        Mission selectedDMission = Dmissions.get(random.nextInt(Dmissions.size()));

        CreatureTodo creatureTodo1 = new CreatureTodo();
        creatureTodo1.setContent(selectedMission.getMission());
        creatureTodo1.setMember(SecurityUtil.getCurrentMember());

        CreatureTodo creatureTodo2 = new CreatureTodo();
        creatureTodo2.setContent(selectedDMission.getMission());
        creatureTodo2.setMember(SecurityUtil.getCurrentMember());

        creatureTodoRepository.save(creatureTodo1);
        creatureTodoRepository.save(creatureTodo2);

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

    //해당일 정보 가져오기
    @Override
    public List<CreatureTodoResponseDTO> getCreatureTodoCalendarDaily(CretureTodoRequestDTO cretureTodoRequestDTO) {

        int memberId = SecurityUtil.getCurrentMember().getId();
        List<CreatureTodo> todayTodos = creatureTodoRepository.findByMemberIdAndCreatedAt(memberId, cretureTodoRequestDTO.getDate());

        List<CreatureTodoResponseDTO> responseDTOList = new ArrayList<>();
        for (CreatureTodo creatureTodo : todayTodos) {
            responseDTOList.add(toResponseDTO(creatureTodo));
        }
        return responseDTOList;
    }


    //일 하나 완료하기
    @Override
    public CreatureTodoResponseDTO completeTodo(int CreaturetoId) {
        // 나중가서 ㅇㅋ 취소는 할 수 있음 단 경험치는 안줌
        CreatureTodo creatureTodo = creatureTodoRepository.findById(CreaturetoId).orElse(null);

        if (creatureTodo.getIsCompleted()==1) {
            creatureTodo.setIsCompleted(0);
        }else{
            creatureTodo.setIsCompleted(1);
        }
        creatureTodoRepository.save(creatureTodo);
        return toResponseDTO(creatureTodo);
    }

    //오늘 안한것만 당겨오게
    @Override
    public List<CreatureTodoResponseDTO> getCreatureTodoMainDaily() {
        LocalDate today = LocalDate.now();
        int memberId = SecurityUtil.getCurrentMember().getId();
        List<CreatureTodo> todayTodos = creatureTodoRepository.findByMemberIdAndCreatedAt(memberId, today);

        List<CreatureTodoResponseDTO> responseDTOList = new ArrayList<>();

        for (CreatureTodo creatureTodo : todayTodos) {
            if (creatureTodo.getIsCompleted()==0) {
                responseDTOList.add(toResponseDTO(creatureTodo));
            }
        }

        return responseDTOList;
    }

    //매서드 이름 바꿨네
    @Override
    public List<CreatureTodoResponseDTO> getCreatureTodoListDaily(CreatureTodoDailyRequestDTO creatureTodoDailyRequestDTO) {

        //현재 날자
        LocalDate date = creatureTodoDailyRequestDTO.getDate();
        //멤버
        int memberId = SecurityUtil.getCurrentUserId();
        //누른 버튼
        if(creatureTodoDailyRequestDTO.getNext() < 0 ){ //-1 일때
            date.minusDays(1);
        }else{
            date.plusDays(1);
        }


        //크리쳐 투두 내가 만들거 싹 가져와!!
        List<CreatureTodo> todayTodos = creatureTodoRepository.findByMemberIdAndCreatedAt(memberId, date);
        List<CreatureTodoResponseDTO> responseDTOList = new ArrayList<>();

        //바꿔서 보내줘!
        for (CreatureTodo creatureTodo : todayTodos) {
        responseDTOList.add(toResponseDTO(creatureTodo));
        }

        return responseDTOList;
    }
}
