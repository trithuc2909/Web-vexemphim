package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "contacts")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "createdAt")
    private LocalDateTime createdAt = LocalDateTime.now();


}

