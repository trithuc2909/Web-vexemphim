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
    private Long movieId;

    @Column(name = "name",nullable = false, length = 255) // Không cho phép null và giới hạn độ dài
    private String name;

    @Column( name = "imageUrl",length = 500) //ảnh có thể null
    private String imageUrl;

    @Column( name = "description",length = 1000)
    private String description;

    @Column( name = "duration",nullable = false)
    private String duration;

    public Movie (String name, String imageUrl, String description, String duration ){
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.duration = duration;
    }
}
