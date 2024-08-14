package com.todoslave.feedme.controller;

import com.todoslave.feedme.DTO.MemberChatResponseDTO;
import com.todoslave.feedme.service.CreatureChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class CreatureChatController {

    private final CreatureChatService creatureChatService;

    @GetMapping("/creature")
    public ResponseEntity<MemberChatResponseDTO> getCreatureChatData() {
        MemberChatResponseDTO chatData = creatureChatService.getCreatureChat();
        return ResponseEntity.ok(chatData);
    }
}