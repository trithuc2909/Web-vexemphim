package com.example.backend.controller;

import com.example.backend.model.Contact;
import com.example.backend.repository.ContactRepository;
import com.example.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin("*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ContactService contactService;

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/send")
    public ResponseEntity<String> sendContact(@RequestBody Contact contact){
        //Lưu vào database
        contactRepository.save(contact);
        //Gửi email
        String subject = "Liên hệ mới từ: " + contact.getEmail();
        String body = "Tên: " + contact.getName() + "\nEmail: " + contact.getEmail()
                                + "\nNội dung: " + contact.getMessage();
        contactService.sendEmail("thucad123@gmail.com",subject, body);

        return ResponseEntity.ok("Email đã được gửi");
    }
}
