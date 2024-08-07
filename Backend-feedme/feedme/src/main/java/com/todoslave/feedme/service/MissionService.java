package com.todoslave.feedme.service;

import com.todoslave.feedme.domain.entity.mission.Mission;
import com.todoslave.feedme.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class MissionService {

    @Autowired
    private MissionRepository missionRepository;

    private Random random = new Random();

    public Mission getRandomMissionByIndices(int startIndex, int endIndex) {
        List<Mission> missions = missionRepository.findAll();
        if (missions.isEmpty() || endIndex > missions.size()) {
            return null;
        }
        return missions.get(startIndex - 1 + random.nextInt(endIndex - startIndex + 1));
    }

    public Mission getRainyMission() {
        return getRandomMissionByIndices(1, 20);
    }

    public Mission getSnowyMission() {
        return getRandomMissionByIndices(21, 40);
    }

    public Mission getSunnyMission() {
        return getRandomMissionByIndices(41, 60);
    }

    public Mission getCloudyMission() {
        return getRandomMissionByIndices(61, 80);
    }

    public Mission getDefaultMission() {
        return getRandomMissionByIndices(81, 100);
    }
}
