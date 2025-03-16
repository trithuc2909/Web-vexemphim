package com.example.backend.controller;

import com.example.backend.model.Category;
import com.example.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*") // Cho phép mọi domain gọi API này
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //api thêm mới danh mục
    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        try {
            Category newCategory = categoryService.addCategory(category);
            return ResponseEntity.ok(newCategory);
        }catch (IllegalArgumentException e){
            return  ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi hệ thống: "+ e.getMessage());
        }
    }

}
