package com.todoslave.feedme.service;

import com.todoslave.feedme.domain.entity.task.DayOff;
import com.todoslave.feedme.repository.DayOffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class DayOffServiceImpl implements DayOffService {

    private final DayOffRepository dayOffRepository;

    @Autowired
    public DayOffServiceImpl(DayOffRepository dayOffRepository) {
        this.dayOffRepository = dayOffRepository;
    }

    @Override
    public Optional<DayOff> findDayOffByMemberIdAndDate(int memberId, LocalDate date) {
        return dayOffRepository.findByMemberIdAndEndDay(memberId, date);
    }

    @Override
    public DayOff saveDayOff(DayOff dayOff) {
        return dayOffRepository.save(dayOff);
    }

    @Override
    public boolean isActionAllowed(int memberId, LocalDate date) {
        return dayOffRepository.countByMemberIdAndEndDay(memberId, date) == 0;
    }

    @Override
    public void deleteDayOff(int id) {
        dayOffRepository.deleteById(id);
    }
}


//package com.todoslave.feedme.service;
//
//
//import com.todoslave.feedme.domain.entity.task.DayOff;
//import com.todoslave.feedme.repository.DayOffRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class DayOffService {
//
//    private final DayOffRepository dayOffRepository;
//
//
//    @Autowired
//    public DayOffService(DayOffRepository dayOffRepository) {
//        this.dayOffRepository = dayOffRepository;
//    }
//    //맴버 아이디랑 날자로 찾기
//    public Optional<DayOff> findDayOffByMemberIdAndDate(int memberId, LocalDate date) {
//        return dayOffRepository.findByMemberIdAndEndDay(memberId, date);
//    }
//    //데이오프 만들기
//    public DayOff saveDayOff(DayOff dayOff) {
//        return dayOffRepository.save(dayOff);
//    }
//
//    //있는지 검사
//    public boolean isActionAllowed(int memberId, LocalDate date) {
//        // 특정 날짜에 한 개라도 DayOff가 있으면 false 반환
//        return dayOffRepository.countByMemberIdAndEndDay(memberId, date) == 0;
//    }
//    //쓸일 없어
//    public void deleteDayOff(int id) {
//        dayOffRepository.deleteById(id);
//    }
//}