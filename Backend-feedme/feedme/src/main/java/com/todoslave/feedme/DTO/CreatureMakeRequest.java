package com.todoslave.feedme.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreatureMakeRequest {

    String creatureName;

    String keyword;

    MultipartFile photo;

}
