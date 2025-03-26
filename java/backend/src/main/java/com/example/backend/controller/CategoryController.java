package com.example.backend.controller;

import com.example.backend.model.Category;
import com.example.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    //api Get all thể loại phim
    @GetMapping("/getCodes")
    public List<String> getAllCategoryCodes(){
        return categoryService.getAllCategoryCodes();
    }

    // api Get Category by id
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getCategory(@PathVariable Long id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        if (category.isPresent()) {
            return new ResponseEntity<>(category.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Không tìm thấy danh mục!", HttpStatus.NOT_FOUND);
        }
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
    
    // Update category api
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Category updateCategory){
        return categoryService.updateCategory(id, updateCategory);
    }
}
