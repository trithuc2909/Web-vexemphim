package com.example.backend.service;

import com.example.backend.model.Movie;
import com.example.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @Autowired
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
    public Movie getMovieById(Long movieId){
        return movieRepository.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));
    }

    //Xóa phim theo ID
    public void deleteMovieById(Long movieId){
        movieRepository.deleteById(movieId);
    }

    public List<Movie> searchMovies (String name) {
        List<Movie> movies = movieRepository.findByNameContainingIgnoreCase(name);
        return movies.isEmpty() ? new ArrayList<>() : movies;
    }

}
