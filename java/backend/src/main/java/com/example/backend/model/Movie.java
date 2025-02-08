package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",nullable = false, length = 255) // Không cho phép null và giới hạn độ dài
    private String name;


    @Column( name = "imageUrl",length = 500) //ảnh có thể null
    private String imageUrl;

    @Column( name = "description",length = 1000)
    private String description;

    @Column( name = "duration",nullable = false)
    private String duration;

    @Column(name = "created_at", updatable = false) // Ngày tạo và không được cập nhật
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt = java.time.LocalDateTime.now();


     @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now(); // Tự động cập nhật khi có thay đổi
    }

    public Movie (String name, String imageUrl, String description, String duration ){
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.duration = duration;
    }
}
