package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

}
