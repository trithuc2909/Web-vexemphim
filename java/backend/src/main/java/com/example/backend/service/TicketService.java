package com.example.backend.service;

import com.example.backend.dto.TicketDetailsDTO;
import com.example.backend.model.Movie;
import com.example.backend.model.Ticket;
import com.example.backend.repository.MovieRepository;
import com.example.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final MovieRepository movieRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository, MovieRepository movieRepository) {
        this.ticketRepository = ticketRepository;
        this.movieRepository = movieRepository;
    }

    public Ticket bookTicket(Ticket ticketRequest) {
        // Kiểm tra phim có tồn tại không
        Movie movie = movieRepository.findById(ticketRequest.getMovie().getMovieId())
                .orElseThrow(() -> new RuntimeException("Phim không tồn tại!"));

        // Đặt movie cho ticket và lưu
        ticketRequest.setMovie(movie);
        return ticketRepository.save(ticketRequest);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long ticketId) {
        return ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy vé với ID: " + ticketId));
    }

    public TicketDetailsDTO getTicketDetails(Long ticketId) {
        return ticketRepository.findTicketDetails(ticketId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin vé."));
    }
    public Ticket save(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    //Update ticket by id
    public Ticket updateTicket(Long ticketId, Ticket updateTicket ){
        Optional<Ticket> existingTicket = ticketRepository.findById(ticketId);
        if (existingTicket.isPresent()){
            Ticket ticket = existingTicket.get();

            ticket.setTime(updateTicket.getTime());
            ticket.setQuantity(updateTicket.getQuantity());

            Movie movie = movieRepository.findById(updateTicket.getMovie().getMovieId())
                    .orElseThrow(() -> new RuntimeException("Phim không tồn tại"));

            ticket.setMovie(movie);
            return ticketRepository.save(ticket);

        } else {
            throw new RuntimeException("Vé này không tồn tại");
        }
    }

    List<Ticket> getAllTicket(){
        return ticketRepository.findAll();
    }
}
