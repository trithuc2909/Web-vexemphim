package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // sẽ tự động tạo ra ID và không bao giờ bị trùng
    private Long id;
    private String movie;
    private String time;
    private int quantity;

    public Ticket(){} // Khoi tao constructor rong~

    public Ticket(String movie, String time, int quantity){
        this.movie = movie;
        this.time = time;
        this.quantity = quantity;
    }
    //tao getter va setter


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
