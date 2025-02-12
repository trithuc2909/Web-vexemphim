package com.example.backend.controller;

import com.example.backend.model.Movie;
import com.example.backend.repository.MovieRepository;
import com.example.backend.service.MovieService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
public class MovieController {

    private final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieService movieService;  // Inject MovieService

    @Autowired
    private MovieRepository movieRepository;
    //API lấy danh sách phim
    @GetMapping("/movies")
    public ResponseEntity<?> getMovies() {
        try {
            List<Movie> movies = movieService.getAllMovies();
            logger.info("Movies List: {}", movies);
            return ResponseEntity.ok(movies);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error" + e.getMessage());
        }
    }

    //Tạo API tìm phim
    @GetMapping("/search")
    public ResponseEntity<?> searchMovie(@RequestParam String name){
        List<Movie> movies = movieService.searchMovies(name);
        if (movies.isEmpty()){
            return ResponseEntity.notFound().build(); // Trả về 404 nếu không tìm thấy phim
        }
        return ResponseEntity.ok(movies); // Trả về danh sách phim
    }
    // API xóa tất cả phim
    @DeleteMapping("/movies")
    public String deleteAllMovies(String confirm) {
        // tạo confirm xác nhận xóa
        if(!"CONFIRM".equals(confirm)){
            return "Vui lòng xác nhận bằng cách gửi 'CONFIRM!'";
        }
        movieRepository.deleteAll();
        return "Toàn bộ dữ liệu đã bị xóa";
    }

    //API xóa movie theo id
    @DeleteMapping("/movies/{movieId}")
    public String deleteMovieById(@PathVariable long movieId){
        movieRepository.deleteById(movieId);
        return "Phim đã xóa !";
    }
}
