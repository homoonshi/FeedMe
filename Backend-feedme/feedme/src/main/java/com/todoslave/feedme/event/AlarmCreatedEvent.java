package com.todoslave.feedme.event;

import com.todoslave.feedme.domain.entity.check.Alarm;
import org.springframework.context.ApplicationEvent;

public class AlarmCreatedEvent extends ApplicationEvent {

  private final Alarm alarm;
  private String alarmType;

  public AlarmCreatedEvent(Object source, Alarm alarm, String type) {
    super(source);
    this.alarm = alarm;
    this.alarmType = type;
  }

  public Alarm getAlarm(){
    return alarm;
  }

  public String getAlarmType(){
    return alarmType;
  }

}
