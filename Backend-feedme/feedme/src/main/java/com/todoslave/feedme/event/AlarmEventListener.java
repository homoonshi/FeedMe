package com.todoslave.feedme.event;

import com.todoslave.feedme.domain.entity.check.Alarm;
import com.todoslave.feedme.service.AlarmService;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RequiredArgsConstructor
public class AlarmEventListener {

  private final Map<Integer, SseEmitter> emitters = new ConcurrentHashMap<>();

  private AlarmService alarmService;

  // 투두 알림
  @EventListener(condition = "#event.alarmType == 'Todo'")
  public void handlerAlarmTodoEvent(AlarmCreatedEvent event){

    Alarm alarm = event.getAlarm();

    SseEmitter emitter = emitters.get(alarm.getMember().getId());

    if(emitter != null){

      try{
        emitter.send(SseEmitter.event().name("Todo").data(alarm.getContent()));
      } catch (IOException e){
        emitters.remove(alarm.getMember().getId());
      }

    }

  }

  // 친구 요청
  @EventListener(condition = "#event.alarmType == 'Friend'")
  public void handlerAlarmFriendEvent(AlarmCreatedEvent event){

    Alarm alarm = event.getAlarm();

    SseEmitter emitter = emitters.get(alarm.getMember());

    if(emitter != null){

      try{
        emitter.send(SseEmitter.event().name("Friend").data(alarm.getContent()));
      } catch (IOException e){
        emitters.remove(alarm.getMember().getId());
      }

    }

  }

  // 생일 축하
  @EventListener(condition = "#event.alarmType == 'Birthday'")
  public void handlerAlarmBirthdayEvent(AlarmCreatedEvent event){

    Alarm alarm = event.getAlarm();

    SseEmitter emitter = emitters.get(alarm.getMember().getId());

    if(emitter != null){

      try{
        emitter.send(SseEmitter.event().name("Birthday").data(alarm.getContent()));
      } catch (IOException e){
        emitters.remove(alarm.getMember().getId());
      }

    }

  }

  // 채팅 갱신 알림


  public void addEmitter(int memberId, SseEmitter emitter){
    emitters.put(memberId, emitter);
  }

  public void removeEmitter(int memberId){
    emitters.remove(memberId);
  }

}
