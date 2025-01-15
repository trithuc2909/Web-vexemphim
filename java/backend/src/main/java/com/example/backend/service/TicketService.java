package com.example.backend.service;

import com.example.backend.model.Ticket;
import com.example.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public Ticket bookTicket(String movie, String time, int quantity) {
        Ticket ticket = new Ticket(movie, time, quantity);
        return ticketRepository.save(ticket); // Lưu vé vào database
    }
}
