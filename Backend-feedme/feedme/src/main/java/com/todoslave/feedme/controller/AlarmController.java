package com.todoslave.feedme.controller;

import com.todoslave.feedme.DTO.AlarmResponseDTO;
import com.todoslave.feedme.DTO.AlarmSetRequestDTO;
import com.todoslave.feedme.login.util.SecurityUtil;
import com.todoslave.feedme.DTO.PaginationRequestDTO;
import com.todoslave.feedme.domain.entity.alarm.Alarm;
import com.todoslave.feedme.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarms")
public class AlarmController {

    @Autowired
    private final SecurityUtil securityUtil;
    @Autowired
    private AlarmService alarmService;

    @GetMapping(value = "/subscribe/alarm")
    public SseEmitter subscribe(){
        return alarmService.createEmitter();
    }

    @GetMapping(value = "/subscribe/chat")
    public SseEmitter chatSubscribe(){
        return alarmService.renewCreateEmitter();
    }

    @PostMapping("/time")
    public ResponseEntity<Void> alarmTimeSetting(AlarmSetRequestDTO alarmSetRequestDTO){
        alarmService.createAlarmtime(alarmSetRequestDTO);
        return ResponseEntity.noContent().build();
    }

    // 생일, 투두
    @GetMapping()
    private ResponseEntity<Slice<AlarmResponseDTO>> loadAlarms(PaginationRequestDTO paginationRequestDTO) {
        return ResponseEntity.ok(alarmService.loadAlarms(paginationRequestDTO));
    }


}
