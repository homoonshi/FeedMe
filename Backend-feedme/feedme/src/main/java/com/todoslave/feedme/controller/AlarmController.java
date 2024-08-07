package com.todoslave.feedme.controller;

import com.todoslave.feedme.DTO.AlarmCheckRequestDTO;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.service.AlarmService;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarms")
public class AlarmController {

    private final SecurityUtil securityUtil;
    private AlarmService alarmService;

    private final Map<Integer, SseEmitter> emitters = new ConcurrentHashMap<>();

    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(){

            //시큐리티 이상함 유틸 주석
        int memberId = securityUtil.getCurrentUserId();

        SseEmitter emitter = new SseEmitter();
        emitters.put(memberId, emitter);
        emitter.onCompletion(()->emitters.remove(memberId));
        emitter.onTimeout(()->emitters.remove(memberId));
        return emitter;

    }

//    private void sendAlarmToMember(String message) throws Exception{
//
//        int memberId = securityUtil.getId();
//
//        SseEmitter emitter = emitters.get(memberId);
//        if(emitter != null){
//          emitter.send(SseEmitter.event().name("Alarm").data(message));
//        }
//
//    }

    //DTO 없음 주석
//    @RequestMapping("/read")
//    private void checkAlarm(@RequestBody AlarmCheckRequestDTO alarmCheckRequestDTO){
//
//        int memberId = securityUtil.getId();
//
//        LocalDateTime checkTime = LocalDateTime.parse(alarmCheckRequestDTO.getCheckTime(), DateTimeFormatter.ISO_DATE_TIME);
//        AlarmCheckServiceDTO alarmCheckServiceDTO = new AlarmCheckServiceDTO();
//        alarmCheckServiceDTO.setCheckTime(checkTime);
//
//
//    }


}
