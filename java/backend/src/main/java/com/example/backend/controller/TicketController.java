package com.example.backend.controller;

import com.example.backend.dto.TicketDetailsDTO;
import com.example.backend.dto.TicketRequest;
import com.example.backend.model.Movie;
import com.example.backend.model.Ticket;
import com.example.backend.repository.MovieRepository;
import com.example.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private MovieRepository movieRepository;

    @PostMapping("/booking")
    public ResponseEntity<?> bookTicket(@RequestBody TicketRequest ticketRequest) {
        if (ticketRequest.getMovieId() == null || ticketRequest.getTime() == null ||
                ticketRequest.getTime().isEmpty() || ticketRequest.getQuantity() < 1) {
            return ResponseEntity.badRequest().body("Thông tin không hợp lệ! Vui lòng kiểm tra lại.");
        }

        Optional<Movie> movieOptional = movieRepository.findById(ticketRequest.getMovieId());
        if (movieOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy phim.");
        }

        Ticket ticket = new Ticket(ticketRequest.getTime(), ticketRequest.getQuantity(), movieOptional.get());
        Ticket savedTicket = ticketService.save(ticket);

        return ResponseEntity.ok(savedTicket);
    }

    @GetMapping("/booking/{ticketId}")
    public ResponseEntity<?> getTicket(@PathVariable Long ticketId) {
        TicketDetailsDTO ticket = ticketService.getTicketDetails(ticketId);
        return ResponseEntity.ok(ticket);
    }

}
