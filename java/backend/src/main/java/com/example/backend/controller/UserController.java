package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import com.example.backend.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController // xác định đây là 1 controller để xử lý yêu cầu HTTP
@RequestMapping("/rg/users") //định dạng đường dẫn API
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register") // định nghĩa 1 API POST taị đường dẫn /register. Để gửi yêu cầu đăng ký
    public ResponseEntity<?>createUser(@RequestBody User user) {
        try {
            userService.validateUser(user);
            User createdUser = userService.createUser(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login") // định nghĩa 1 API POST taị đường dẫn /login. Để gửi yêu cầu đăng nhập
    public ResponseEntity<?> loginUser(@RequestBody UserDTO.LoginRequest loginRequest) {
        try {
            Optional<User> user = userService.loginUser(loginRequest.getEmailInput(), loginRequest.getPassword());
            if (user.isPresent()) {
                return new ResponseEntity<>(user.get(), HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Không tìm thấy người dùng!", HttpStatus.UNAUTHORIZED);
            }
        }
        catch (Exception e) {
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
}
