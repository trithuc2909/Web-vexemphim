package com.example.backend.service;

import com.example.backend.model.Ticket;
import com.example.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {
    @Autowired
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // Tạo vé và lưu vào Database
    public Ticket createTicket (Ticket ticket){
        return ticketRepository.save(ticket);
    }
    // Lấy danh sách tất cả các vé
    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    // Tìm vé theo ID
    public Ticket getTicketById(Long id){
        return ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
    }
}
