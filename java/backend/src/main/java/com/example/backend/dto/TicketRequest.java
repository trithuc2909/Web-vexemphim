package com.example.backend.dto;

import lombok.Data;

@Data
public class TicketRequest {
    private Long movieId;
    private String time;
    private int quantity;
}
