package com.example.backend.dto;

import lombok.Data;

@Data
public class TicketDetailsDTO {
    private Long ticketId;
    private String movieName;
    private String time;
    private int quantity;
    private String imageUrl;
    private String description;
    private String duration;

    public TicketDetailsDTO(){

    }
    public TicketDetailsDTO(Long ticketId, String movieName, String time, int quantity, String imageUrl, String description, String duration) {
        this.ticketId = ticketId;
        this.movieName = movieName;
        this.time = time;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.description = description;
        this.duration = duration;
    }
}
