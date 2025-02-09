package com.example.backend.repository;

import com.example.backend.dto.TicketDetailsDTO;
import com.example.backend.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Ticket;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByTicketId(Long ticketId);
    List<Ticket> findByMovie(Movie movie); // Lấy tất cả vé theo bộ phim

    @Query("SELECT new com.example.backend.dto.TicketDetailsDTO(t.ticketId, m.name, t.time, t.quantity, m.imageUrl, m.description, m.duration) " +
            "from Ticket t JOIN t.movie m Where t.ticketId = :ticketId")
    Optional<TicketDetailsDTO> findTicketDetails(@Param("ticketId") Long ticketId);
}
