package com.example.backend.controller;

import com.example.backend.dto.MovieDTO;
import com.example.backend.model.Category;
import com.example.backend.model.Movie;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.MovieRepository;
import com.example.backend.service.MovieService;
import org.hibernate.sql.ast.tree.expression.Collation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("/api/movies")
@RestController
public class MovieController {

    private final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieService movieService;  // Inject MovieService

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<?> addMovie(
            @RequestParam("name") String name,
            @RequestParam("duration") String duration,
            @RequestParam("image") MultipartFile file,
            @RequestParam("description") String description,
            @RequestParam("category") Long categoryId) {

        System.out.print("Category ID" + categoryId);
        System.out.println("Nhận file: " + file.getOriginalFilename());
        System.out.println("Kích thước file: " + file.getSize());

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File ảnh rỗng!");
        }
        // Kiểm tra categoryId có null không
        if (categoryId == null) {
            return ResponseEntity.badRequest().body("Category ID is missing");
        }

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy category với ID: " + categoryId));
        try {
            String image1 = movieService.saveImage(file);
            if (image1 == null) {
                return ResponseEntity.badRequest().body("Không thể lưu ảnh!");
            }

            Movie movie = new Movie();
            movie.setName(name);
            movie.setDuration(duration);
            movie.setDescription(description);
            movie.setImageUrl(image1);
            movie.setCategory(category);

            Movie newMovie = movieService.addMovie(movie);
            return ResponseEntity.ok(newMovie);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Lỗi hệ thống: " + e.getMessage());
        }
    }

    //API lấy danh sách phim
    @GetMapping("/get")
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

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMovie(@PathVariable Long id){
        Optional<Movie> movie = movieService.getMovie(id);
        if (movie.isPresent()){
            return new ResponseEntity<>(movie.get(),HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Không tìm thấy phim!",HttpStatus.NOT_FOUND );
        }
    }

    //API lọc phim theo danh mục
    @GetMapping("/filter")
    public ResponseEntity<List<Movie>> getMoviesByCategory(@RequestParam String categoryCode) {
        Category category = categoryRepository.findByCode(categoryCode);
        if (category == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        List<Movie> movies = movieRepository.findByCategory_Id(category.getId());
        return ResponseEntity.ok(movies);
    }

    // API xóa tất cả phim
    @DeleteMapping("/delete")
    public String deleteAllMovies(String confirm) {
        // tạo confirm xác nhận xóa
        if(!"CONFIRM".equals(confirm)){
            return "Vui lòng xác nhận bằng cách gửi 'CONFIRM!'";
        }
        movieRepository.deleteAll();
        return "Toàn bộ dữ liệu đã bị xóa";
    }

    //API xóa movie theo id
    @DeleteMapping("/delete/{movieId}")
    public String deleteMovieById(@PathVariable long movieId){
        movieRepository.deleteById(movieId);
        return "Phim đã xóa !";
    }
}
