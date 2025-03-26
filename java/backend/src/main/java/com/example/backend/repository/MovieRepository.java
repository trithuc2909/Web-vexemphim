package com.example.backend.repository;

import com.example.backend.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
//    Optional<Movie> findByName(String name);
      List<Movie> findByNameContainingIgnoreCase(String name); // Tìm theo từ khóa, không phân biệt chữ hoa/thường
      List<Movie> findByCategory_Id(Long categoryId);

}

