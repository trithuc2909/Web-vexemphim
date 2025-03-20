package com.example.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MovieRequest {
    private String name;
    private String duration;
    private MultipartFile image;  // Nhận file ảnh từ form
    private String description;
    private String pageUrl;
}
