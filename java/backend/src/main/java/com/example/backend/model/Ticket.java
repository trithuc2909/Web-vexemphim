package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@Table(name = "Tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // sẽ tự động tạo ra ID và không bao giờ bị trùng
    private String ticketId;

    @Column(name = "time", nullable = false )
    @NotBlank(message = "Thời gian không được để trống")
    private String time;

    @Column(name ="quantity", nullable = false)
    @Min(value = 1, message = "Số lượng vé phải lớn hơn hoặc bằng 1")
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY) // Quan hệ nhiều vé thuộc một bộ phim
    @JoinColumn(name = "movie_id", nullable = false) //tạo cột movie_id trong bảng tickets để lưu khoá ngoại.
    private Movie movie;

    public Ticket( String time, int quantity, Movie movie) {
        this.time = time;
        this.quantity = quantity;
        this.movie = movie;
    }
}