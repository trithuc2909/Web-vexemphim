package com.example.backend.service;

import com.example.backend.model.Movie;
import com.example.backend.model.Ticket;
import com.example.backend.repository.MovieRepository;
import com.example.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    @Autowired
    private final TicketRepository ticketRepository;

    @Autowired
    private MovieRepository movieRepository;

    public TicketService(TicketRepository ticketRepository, MovieRepository movieRepository) {
        this.ticketRepository = ticketRepository;
        this.movieRepository = movieRepository;
    }

    public Ticket bookTicket(Ticket ticketRequest){
        // Kiểm tra xem phim có tồn tại không?
        Movie movie = movieRepository.findById(ticketRequest.getMovie().getId())
                .orElseThrow(() -> new RuntimeException("Phim không tồn tại!"));

        //Tạo đối tượng ticket mới
        Ticket ticket = new Ticket();
        ticket.setMovie(movie);
        ticket.setTime(ticketRequest.getTime());
        ticket.setQuantity(ticketRequest.getQuantity());

        //Lưu vào database
        return ticketRepository.save(ticket);
    }

    // Lấy danh sách tất cả các vé
    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    // Tìm vé theo ID
    public Ticket getTicketById(String ticketId){
        return ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy vé với ID: " + ticketId));
    }

    // Hàm Lấy thông tin chi tiết vé
    public Ticket getTicketDetails(String ticketId){
        return ticketRepository.findById(ticketId)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy vé với ID:" + ticketId));
    }
}
