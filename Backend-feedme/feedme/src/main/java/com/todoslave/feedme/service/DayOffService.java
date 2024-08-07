package com.todoslave.feedme.service;


import com.todoslave.feedme.domain.entity.task.DayOff;
import com.todoslave.feedme.repository.DayOffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DayOffService {

    private final DayOffRepository dayOffRepository;


    @Autowired
    public DayOffService(DayOffRepository dayOffRepository) {
        this.dayOffRepository = dayOffRepository;
    }
    //맴버 아이디랑 날자로 찾기
    public Optional<DayOff> findDayOffByMemberIdAndDate(int memberId, LocalDate date) {
        return dayOffRepository.findByMemberIdAndEndDay(memberId, date);
    }
    //데이오프 만들기
    public DayOff saveDayOff(DayOff dayOff) {
        return dayOffRepository.save(dayOff);
    }

    //쓸일 없어
    public void deleteDayOff(int id) {
        dayOffRepository.deleteById(id);
    }
}