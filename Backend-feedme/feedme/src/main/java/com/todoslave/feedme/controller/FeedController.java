package com.todoslave.feedme.controller;

import com.todoslave.feedme.DTO.CreatureTodoResponseDTO;
import com.todoslave.feedme.DTO.FeedModifyRequest;
import com.todoslave.feedme.DTO.FeedRequestDTO;
import com.todoslave.feedme.DTO.FeedResponseDTO;
import com.todoslave.feedme.service.FeedService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/feed")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    // 피드 생성
    @Operation(summary = "피드 생성")
    @PostMapping
    public ResponseEntity<FeedResponseDTO> createFeed(@RequestBody FeedRequestDTO feedRequestDTO) {
        FeedResponseDTO dto = feedService.insertFeed(feedRequestDTO);
        return ResponseEntity.ok(dto);
    }

    // 피드 수정
    @Operation(summary = "피드 수정")
    @PatchMapping("/{feedId}")
    public ResponseEntity<FeedResponseDTO> modifyFeed(@PathVariable int feedId, @RequestBody FeedModifyRequest feedModifyRequest) {
        FeedResponseDTO dto = feedService.modifyFeed(feedId ,feedModifyRequest);
        return ResponseEntity.ok(dto);
    }

    // 피드 삭제
    @Operation(summary = "피드 삭제")
    @DeleteMapping("/{feedId}")
    public ResponseEntity<?> delectFeed(@PathVariable int feedId) {
        if(feedService.delectFeed(feedId)){
            return new ResponseEntity<String>("삭제되었습니다.", HttpStatus.OK);
        }else{
            return new ResponseEntity<String>("본인글만 지우세요", HttpStatus.BAD_REQUEST);
        }
    }

    // 피드 보기
    @Operation(summary = "피드 보기")
    @GetMapping
    public ResponseEntity<?> findFeed(@PathVariable int feedId) {
        //친구 찾기

        //


     return null;
    }


//
//    // 크리쳐 투두 생성
//    @Operation(summary = "크리쳐 투두 생성 / 있으면 생성 X")
//    @GetMapping("/{weather}")
//    public ResponseEntity<List<CreatureTodoResponseDTO>> createTodo(@PathVariable String weather) {
//        System.out.println("이거 맞아?");
//        List<CreatureTodoResponseDTO> list = new ArrayList<>();
//        list = creatureTodoService.insertTodo(weather);
//        return ResponseEntity.ok(list);
//    }


}
