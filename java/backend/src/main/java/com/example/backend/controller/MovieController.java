package com.example.backend.controller;

import com.example.backend.model.Movie;
import com.example.backend.repository.MovieRepository;
import com.example.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieController {

    @Autowired
    private MovieService movieService;  // Inject MovieService

    @Autowired
    private MovieRepository movieRepository;
    //API lấy danh sách phim
    @GetMapping("/api/movies")
    public List<Movie> getMovies() {
        return movieService.getAllMovies();  // Lấy danh sách phim từ MovieService
    }

    // API xóa tất cả phim
    @DeleteMapping("/api/movies")
    public String deleteAllMovies(String confirm) {
        // tạo confirm xác nhận xóa
        if(!"CONFIRM".equals(confirm)){
            return "Vui lòng xác nhận bằng cách gửi 'CONFIRM!'";
        }
        movieRepository.deleteAll();
        return "Toàn bộ dữ liệu đã bị xóa";
    }

    //API xóa movie theo id
    @DeleteMapping({"id"})
    public String deleteMovieById(@PathVariable long id){
        movieRepository.deleteById(id);
        return "Phim đã xóa !";
    }
}
