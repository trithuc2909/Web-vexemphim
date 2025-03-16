package com.example.backend.service;

import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    //Thêm danh mục mới
    public Category addCategory(Category category){
        if (category.getCode() == null || category.getCode().trim().length() < 3) {
            throw new IllegalArgumentException("Mã danh mục phải có ít nhất 3 ký tự và không được để trống.");
        }
        if (category.getName() == null || category.getName().trim().length() < 3){
            throw  new IllegalArgumentException("Tên danh mục phải có ít nhất 3 ký tự và không được để trống.");
        }
        if (categoryRepository.existsByCode(category.getCode())){
            throw new IllegalArgumentException("Mã danh mục đã tồn tại!");
        }
    return categoryRepository.save(category);
    }

}
