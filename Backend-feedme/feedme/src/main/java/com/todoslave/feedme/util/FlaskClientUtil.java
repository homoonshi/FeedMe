//package com.todoslave.feedme.util;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.core.io.ByteArrayResource;
//import org.springframework.core.io.Resource;
//
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//
//@Component
//public class FlaskClientUtil {
//
//    private final RestTemplate restTemplate;
//
//    // HTTP 요청을 위해 사용
//    public FlaskClientUtil(RestTemplate restTemplate) {
//        this.restTemplate = restTemplate;
//    }
//
//    /**
//     * Flask 서버로부터 크리쳐 이미지를 가져오는 메서드입니다.
//     *
//     * @param username  사용자의 이름
//     * @param creatureId 크리쳐의 고유 ID
//     * @param level     크리쳐의 현재 레벨
//     * @return Flask 서버로부터 받은 이미지 리소스
//     */
//    public Resource getCreatureImage(String username, int creatureId, int level) {
//        // URL 생성 (레벨은 쿼리 파라미터로 전송)
//        String url = String.format("http://localhost:3333/store/creature_data/%s/%d?level=%d", username, creatureId, level);
//
//        // GET 요청을 통해 Flask 서버로부터 이미지 데이터 받기
//        ResponseEntity<ByteArrayResource> response = restTemplate.getForEntity(url, ByteArrayResource.class);
//
//        // 요청이 성공했는지 확인하고, 성공하지 않았으면 예외를 던짐
//        if (response.getStatusCode().is2xxSuccessful()) {
//            return response.getBody(); // Flask 서버로부터 받은 이미지 데이터 반환
//        } else {
//            throw new RuntimeException("Failed to retrieve image from Flask server.");
//        }
//    }
//
//    /**
//     * Flask 서버로부터 크리쳐 그림일기를 가져오는 메서드입니다.
//     *
//     * @param username 사용자의 이름
//     * @param date     그림일기를 요청하는 날짜 (LocalDate 형식)
//     * @return Flask 서버로부터 받은 그림일기 리소스
//     */
//    public Resource getCreatureDiary(String username, LocalDate date) {
//        // 날짜를 문자열 형식으로 변환 (yyyy-MM-dd)
//        String formattedDate = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
//
//        // URL 생성 (날짜는 쿼리 파라미터로 전송)
//        String url = String.format("http://localhost:3333/store/creature_diary/%s?date=%s", username, formattedDate);
//
//        // GET 요청을 통해 Flask 서버로부터 그림일기 데이터 받기
//        ResponseEntity<ByteArrayResource> response = restTemplate.getForEntity(url, ByteArrayResource.class);
//
//        // 요청이 성공했는지 확인하고, 성공하지 않았으면 예외를 던짐
//        if (response.getStatusCode().is2xxSuccessful()) {
//            return response.getBody(); // Flask 서버로부터 받은 그림일기 데이터 반환
//        } else {
//            throw new RuntimeException("Failed to retrieve diary from Flask server.");
//        }
//    }
//}
package com.todoslave.feedme.util;

import org.apache.commons.io.IOUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import java.util.Base64;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class FlaskClientUtil {

    private final RestTemplate restTemplate;

    // HTTP 요청을 위해 사용
    public FlaskClientUtil(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Flask 서버로부터 크리쳐 이미지를 가져와 byte[] 형태로 반환하는 메서드입니다.
     *
     * @param username  사용자의 이름
     * @param creatureId 크리쳐의 고유 ID (nullable)
     * @param level     크리쳐의 현재 레벨 (nullable)
     * @return Flask 서버로부터 받은 이미지 데이터 (byte[])
     */



    public byte[] getCreatureImageAsByteArray(String username, Integer creatureId, Integer level) {
        String url;

        // 조건에 따라 URL 결정
        if (creatureId == null || creatureId == 0 || level == null || level == 0) {
            url = String.format("http://flask:33333/store/default_creature_image/%s", username);
        } else {
            url = String.format("http://flask:33333/store/creature_data/%s/%d/%d", username, creatureId, level);
        }

        // GET 요청을 통해 Flask 서버로부터 이미지 데이터 받기
        ResponseEntity<ByteArrayResource> response = restTemplate.getForEntity(url, ByteArrayResource.class);

        // 응답 확인을 위한 로그 출력
        System.out.println("Response Status Code: " + response.getStatusCode());
        System.out.println("Response Headers: " + response.getHeaders());
        System.out.println("Response Body Length: " + (response.getBody() != null ? response.getBody().contentLength() : "No Body"));

        // 요청이 성공했는지 확인하고, 성공하지 않았으면 예외를 던짐
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            byte[] byteArray = toByteArray(response.getBody());

            // 바이트 배열의 길이 출력
            System.out.println("Received Byte Array Length: " + byteArray.length);

            // 바이트 배열의 첫 번째 몇 바이트만 출력 (예: 10바이트)
            int previewLength = Math.min(byteArray.length, 10);
            System.out.print("Byte Array Preview: ");
            for (int i = 0; i < previewLength; i++) {
                System.out.printf("%02X ", byteArray[i]); // 16진수 형식으로 출력
            }
            System.out.println();

            return byteArray;
        } else {
            throw new RuntimeException("Failed to retrieve image from Flask server.");
        }
    }

    // Helper method to convert ByteArrayResource to byte[]
    private byte[] toByteArray(ByteArrayResource resource) {
        try {
            return resource.getInputStream().readAllBytes();
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert ByteArrayResource to byte array", e);
        }
    }


//    //크리쳐 이미지 당겨오기
//    public byte[] getCreatureImageAsByteArray(String username, Integer creatureId, Integer level) {
//        String url;
//
//        // 조건에 따라 URL 결정
//        if (creatureId == null || creatureId == 0 || level == null || level == 0) {
//            // creatureId나 level이 null 또는 0인 경우
//            url = String.format("http://flask:33333/store/default_creature_image/%s", username);
//        } else {
//            // 일반적인 경우
//            url = String.format("http://flask:33333/store/creature_data/%s/%d/%d", username, creatureId, level);
//        }
//
//
//        // GET 요청을 통해 Flask 서버로부터 이미지 데이터 받기
//        ResponseEntity<ByteArrayResource> response = restTemplate.getForEntity(url, ByteArrayResource.class);
//
//        System.out.println(response);
//
//
//        // 요청이 성공했는지 확인하고, 성공하지 않았으면 예외를 던짐
//        if (response.getStatusCode().is2xxSuccessful()) {
//            return toByteArray(response.getBody()); // byte[] 형태로 변환하여 반환
//        } else {
//            throw new RuntimeException("Failed to retrieve image from Flask server.");
//        }
//    }

    /**
     * Flask 서버로부터 크리쳐 그림일기를 가져와 byte[] 형태로 반환하는 메서드입니다.
     *
     * @param username 사용자의 이름
     * @param date     그림일기를 요청하는 날짜 (LocalDate 형식)
     * @return Flask 서버로부터 받은 그림일기 데이터 (byte[])
     */
    //크리쳐 다이어리 가져오기
    public byte[] getCreatureDiaryAsByteArray(String username, LocalDate date) {
        // 날짜를 문자열 형식으로 변환 (yyyy-MM-dd)
        String formattedDate = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // URL 생성 (날짜는 쿼리 파라미터로 전송)
        String url = String.format("http://flask:33333/store/creature_diary/%s/%s", username, formattedDate);

        // GET 요청을 통해 Flask 서버로부터 그림일기 데이터 받기
        ResponseEntity<ByteArrayResource> response = restTemplate.getForEntity(url, ByteArrayResource.class);

        // 요청이 성공했는지 확인하고, 성공하지 않았으면 예외를 던짐
        if (response.getStatusCode().is2xxSuccessful()) {
            return toByteArray(response.getBody()); // byte[] 형태로 변환하여 반환
        } else {
            throw new RuntimeException("Failed to retrieve diary from Flask server.");
        }
    }

    /**
     * Resource 객체를 byte[]로 변환하는 헬퍼 메서드입니다.
     *
     * @param resource 변환할 Resource 객체
     * @return byte[] 형태로 변환된 데이터
     */
    private byte[] toByteArray(Resource resource) {
        try (InputStream inputStream = resource.getInputStream()) {
            return IOUtils.toByteArray(inputStream);
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert resource to byte array", e);
        }
    }
}

