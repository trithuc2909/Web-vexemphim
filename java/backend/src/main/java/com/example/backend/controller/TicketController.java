package com.example.backend.controller;

import com.example.backend.model.Ticket;
import com.example.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tickets") //luôn luôn gọi tới endpoint là tickets
@CrossOrigin(origins = "http://127.0.0.1:5500/pages/datvexemphim.html?") // Thay bằng URL của frontend
public class TicketController {
    @Autowired
    private TicketService ticketService;

    //  Tạo API thêm mới ticket
    @PostMapping("api/booking") // định nghĩa 1 API POST taị đường dẫn /booking. Để gửi yêu cầu đặt vé
    public ResponseEntity<?> bookTicket(@RequestBody Ticket ticketRequest){
        if(ticketRequest.getMovie() == null || ticketRequest.getTime() == null
                || ticketRequest.getQuantity() <0){
            return ResponseEntity.badRequest().body("Thông tin không hợp le!");
        }
        Ticket bookedTicket = ticketService.bookTicket(
                ticketRequest.getMovie(),
                ticketRequest.getTime(),
                ticketRequest.getQuantity()
        );
        return ResponseEntity.ok(bookedTicket);
    }

}
