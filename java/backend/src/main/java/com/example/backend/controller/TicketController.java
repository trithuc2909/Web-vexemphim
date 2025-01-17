package com.example.backend.controller;

import com.example.backend.model.Ticket;
import com.example.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/api/tickets") //luôn luôn gọi tới endpoint là tickets
public class TicketController {
    @Autowired
    private TicketService ticketService;

    //  Tạo API thêm mới ticket
    @PostMapping("/booking") // định nghĩa 1 API POST taị đường dẫn /booking. Để gửi yêu cầu đặt vé
    public ResponseEntity<?> bookTicket( @RequestBody Ticket ticketRequest){
        // Kiểm tra dữ liệu đầu vào trong service
//        try {
//            Ticket bookedTicket = ticketService.bookTicket(
//
//            );
//
//        }catch ()

        //gọi service để lưu thông tin vé
        Ticket bookedTicket = ticketService.bookTicket(
                ticketRequest.getMovie(),
                ticketRequest.getTime(),
                ticketRequest.getQuantity(),
                ticketRequest.getMovieImage()
        );
        //trả về thông tin vé đã đặt
        return ResponseEntity.ok(bookedTicket);
    }

    //API lấy thông tin by ticket ID
    @GetMapping("/details/{ticketId}")
    public ResponseEntity<?> getTicketDetails(@PathVariable String ticketId){
        //Gọi service để lấy thông tin chi tiết
        Optional<Ticket> ticket = Optional.ofNullable(ticketService.getTicketDetails(ticketId));
        // Kiểm tra nếu không tìm thấy vé
        if (ticket.isEmpty()){
            return ResponseEntity.status(404).body("Không tìm thấy vé với ID" + ticketId);
        }
        //trả về nếu tìm thấy
        return ResponseEntity.ok(ticket.get());
    }
}
