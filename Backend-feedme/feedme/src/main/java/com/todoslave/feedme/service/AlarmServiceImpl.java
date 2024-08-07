package com.todoslave.feedme.service;


import com.todoslave.feedme.domain.entity.check.Alarm;
import com.todoslave.feedme.domain.entity.membership.Member;
import com.todoslave.feedme.domain.entity.membership.MemberAlarm;
import com.todoslave.feedme.domain.entity.task.Todo;
import com.todoslave.feedme.event.AlarmCreatedEvent;
import com.todoslave.feedme.repository.AlarmRepository;
import com.todoslave.feedme.repository.MemberAlarmRepository;
import com.todoslave.feedme.repository.MemberRepository;
import com.todoslave.feedme.repository.TodoRepository;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;

@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService{

  private AlarmRepository alarmRepository;
  private MemberAlarmRepository memberAlarmRepository;
  private TodoRepository todoRepository;

  private MemberRepository memberRepository;

  private ApplicationEventPublisher eventPublisher;

  //1시간 마다 확인, 일정 완료 했는지 여부
  @Scheduled(cron = "0 0 * * * ?")
  public void todoCompleted(){

    LocalDate currentDay = LocalDate.now();
    List<Integer> members = todoRepository.findMemberIdAllByCreatedAtAndIsCompleted(currentDay);

    for(int memberId : members){

      LocalTime currentTime = LocalTime.now();
      int time = currentTime.getHour();

      if(memberAlarmRepository.existsByMemberIdAndAlarmTime(memberId,time)) {

        Alarm alarm = new Alarm();

        Member member = new Member();
        member.setId(memberId);

        alarm.setMember(member);
        alarm.setContent("(크리쳐 이름)"+"이 기다리고 있어요!");
        alarmRepository.save(alarm);

        eventPublisher.publishEvent(new AlarmCreatedEvent(this, alarm,"Todo"));
      }
    }
  }

  //친구 요청 알림
  public boolean requestFriendship(Member requestor,Member counterpart){

    Alarm alarm = new Alarm();

    alarm.setMember(counterpart);
    alarm.setContent(requestor.getNickname()+"님이 친구 요청을 보내셨습니다.");

    Alarm a = alarmRepository.save(alarm);

    if(a==null){
      return false;
    }

    eventPublisher.publishEvent(new AlarmCreatedEvent(this, alarm,"Friend"));

    return true;
  }

  //생일 알림
  @Scheduled(cron = "0 0 0 * * *")
  public void congratsBirthday(){

    LocalDate date = LocalDate.now();
    List<Member> birthdayPerson = memberRepository.findAllByBirthday(date);

    Alarm alarm = new Alarm();

    for(Member member : birthdayPerson){

      alarm.setMember(member);
      alarm.setContent(member.getNickname()+"님! 생일 축하합니다!");

      alarmRepository.save(alarm);

      eventPublisher.publishEvent(new AlarmCreatedEvent(this, alarm,"Birthday"));

    }

  }

  @Override
  public void checkAlarm() {

  }

}
