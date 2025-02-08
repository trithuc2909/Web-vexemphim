package com.example.backend.service;

import com.example.backend.model.Movie;
import com.example.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    //Lưu phim vào Database
    public Movie createMovie(Movie movie){
        return movieRepository.save(movie);
    }

    //Lấy danh sách tất cả các phim
    public List<Movie> getAllMovies(){
        return movieRepository.findAll(); // Lấy tất cả các phim từ cơ sở dữ liệu
    }

    //Tìm phim theo ID
    @DeleteMapping("/delete")
    public Movie getMovieById(Long id){
        return movieRepository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
    }

}
