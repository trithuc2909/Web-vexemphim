package com.example.backend.controller;

import com.example.backend.dto.TicketDetailsDTO;
import com.example.backend.dto.TicketRequest;
import com.example.backend.model.Movie;
import com.example.backend.model.Ticket;
import com.example.backend.repository.MovieRepository;
import com.example.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    //Get ALL Tickets
    @GetMapping("/get")
    public ResponseEntity<?> getAllTickets(){
        try {
            List<Ticket> tickets = ticketService.getAllTickets();
            return ResponseEntity.ok(tickets);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/booking/{ticketId}")
    public ResponseEntity<?> getTicket(@PathVariable Long ticketId) {
        TicketDetailsDTO ticket = ticketService.getTicketDetails(ticketId);
        return ResponseEntity.ok(ticket);
    }

    @PutMapping("/update/{ticketId}")
    public ResponseEntity<?> updateTicket(@PathVariable Long ticketId, @RequestBody Ticket updateTicket){
        try {
            Ticket ticket = ticketService.updateTicket(ticketId, updateTicket);
            return  ResponseEntity.ok(ticket);
        } catch (Exception e) {
           return
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
