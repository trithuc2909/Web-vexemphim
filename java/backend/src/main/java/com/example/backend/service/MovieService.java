package com.example.backend.service;

import com.example.backend.model.Movie;
import com.example.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    private static final String UPLOAD_DIR = "D:/CODE_WEB/CODE_WEB/Web_xem_phim/Image";

    // Thêm mới phim
    public String saveImage(MultipartFile file) {
        if (file.isEmpty()) {
            System.out.println("Lỗi: File ảnh bị rỗng!");
            return null;
        }

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            System.out.println("Tạo thư mục lưu ảnh: " + (created ? "Thành công" : "Thất bại"));
        }

        try {
            String fileName = file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);
            file.transferTo(path.toFile());

            System.out.println("Ảnh đã lưu: " + path);
            return "uploads/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Lỗi khi lưu file: " + e.getMessage());
            return null;
        }
    }


    // Thêm mới phim
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
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
    public Optional<Movie> getMovie(Long movieId) {
        return movieRepository.findById(movieId);
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
