package com.example.backend.controller;

import com.example.backend.model.Category;
import com.example.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    //api Get all thể loại phim
    @GetMapping("/get")
    public List<Category> getAllCatogories(){
        return categoryService.getAllCategories();
    }

    // api Delete Category by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        try {
            //gọi service để xóa danh mục
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Xóa danh mục thành công!");
        }catch(Exception e){
            return ResponseEntity.status(400).body("Lỗi khi xóa danh mục: " + e.getMessage());
        }
    }

}
