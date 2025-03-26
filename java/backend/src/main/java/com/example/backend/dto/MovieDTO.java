package com.example.backend.dto;

import com.example.backend.model.Movie;
import lombok.Data;

@Data
public class MovieDTO {
    private Long movieId;
    private String name;
    private String imageUrl;
    private String description;
    private String duration;
    private String categoryCode;

    public MovieDTO(Movie movie){
        this.movieId = movie.getMovieId();  // ✅ Đúng, lấy từ `movie`
        this.name = movie.getName();
        this.imageUrl = movie.getImageUrl();
        this.description = movie.getDescription();
        this.duration = movie.getDuration();
        this.categoryCode = movie.getCategory().getCode(); // ✅ Lấy categoryCode từ `Category`
    }
}
