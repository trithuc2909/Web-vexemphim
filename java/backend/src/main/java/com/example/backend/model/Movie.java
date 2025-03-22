package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
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

    @Column( name = "duration",columnDefinition = "TEXT")
    private String duration;

    @Column(name = "page_url", nullable = true)
    private String pageUrl;

    public Movie (String name, String imageUrl, String description, String duration, String pageUrl ){
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.duration = duration;
        this.pageUrl = pageUrl;
    }

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonProperty("categoryId") // Trả về categoryId thay vì object
    private Category category;

    @JsonProperty("categoryName") // Trả về tên danh mục
    public String getCategoryName() {
        return category != null ? category.getName() : "Không có danh mục";
    }

}
