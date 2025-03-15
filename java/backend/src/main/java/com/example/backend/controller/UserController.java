package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import com.example.backend.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // xác định đây là 1 controller để xử lý yêu cầu HTTP
@RequestMapping("/rg/users") //định dạng đường dẫn API
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            userService.validateUser(user);
            User createdUser = userService.createUser(user);

            // Trả về JSON thay vì chuỗi thuần
            return ResponseEntity.ok("{\"message\": \"Đăng ký tài khoản thành công\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO.LoginRequest loginRequest) {
        try {
            Optional<User> user = userService.loginUser(loginRequest.getEmailInput(), loginRequest.getPassword());
            if (user.isPresent()) {
                return new ResponseEntity<>(user.get(), HttpStatus.OK); // Trả về thông tin người dùng
            } else {
                return new ResponseEntity<>("Không tìm thấy người dùng!", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/{id}") //định nghĩa 1 API GET tại đường dẫn /users/{id}. Để lấy TT user thông qua ID
    public ResponseEntity<?> getUser(@PathVariable long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Không tìm thấy người dùng", HttpStatus.NOT_FOUND);
        }
    }

    // Phương thức delete xóa người dùng theo ID
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            // Gọi service để xóa người dùng
            userService.deleteUser(id);
            return ResponseEntity.ok("Xóa người dùng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Lỗi khi xóa người dùng: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updateUser){
        try {
            User user = userService.updateUser(id, updateUser);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/get")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
