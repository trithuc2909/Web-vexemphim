package com.example.backend.dto;

public class TicketDetailsDTO {
    private Long ticketId;
    private String movieName;
    private String time;
    private int quantity;
    private String imageUrl;

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public TicketDetailsDTO(Long ticketId, String movieName, String time, int quantity, String imageUrl) {
        this.ticketId = ticketId;
        this.movieName = movieName;
        this.time = time;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }
}
