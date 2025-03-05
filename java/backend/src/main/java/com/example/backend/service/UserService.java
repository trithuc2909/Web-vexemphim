package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {  // tạo ra 1 User và trả về đối tượng user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email); // Tìm user bằng email
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) { // So sánh mật khẩu
            return user;
        }
        return Optional.empty();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void validateUser(User user) throws Exception {
        Optional<User> existingUserByEmail = userRepository.findByEmail(user.getEmail());
        if (existingUserByEmail.isPresent()){
            throw new Exception("Email này đã tồn tại! ");
        }
    }


    // Phương thức xóa người dùng theo ID
    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("Không tìm thấy người dùng với ID này " + id);
        }
    }
}

