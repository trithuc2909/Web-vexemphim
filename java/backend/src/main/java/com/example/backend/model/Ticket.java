package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@Entity
@Table(name = "Tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // sẽ tự động tạo ra ID và không bao giờ bị trùng
    private Long id;

    @Column(nullable = false)
    private String time;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY) // Quan hệ nhiều vé thuộc một bộ phim
    @JoinColumn(name = "movie_id", nullable = false) //tạo cột movie_id trong bảng tickets để lưu khoá ngoại.
    private Movie movie;

    public Ticket( String time, int quantity, Movie movie) {
        this.movie = movie;
        this.time = time;
        this.quantity = quantity;
    }
}