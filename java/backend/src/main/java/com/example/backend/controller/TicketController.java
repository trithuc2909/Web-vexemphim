package com.example.backend.controller;

import com.example.backend.model.Ticket;
import com.example.backend.repository.TicketRepository;
import com.example.backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets") //luôn luôn gọi tới endpoint là tickets
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketRepository ticketRepository;

    //  Tạo API thêm mới ticket
    @PostMapping("/booking") // định nghĩa 1 API POST taị đường dẫn /booking. Để gửi yêu cầu đặt vé
    public ResponseEntity<?> bookTicket( @RequestBody Ticket ticketRequest){
        // Validate dữ liệu đầu vào
        if (ticketRequest.getMovie() == null || ticketRequest.getMovie().getId() == null ||
                ticketRequest.getTime() == null || ticketRequest.getTime().isEmpty() ||
                ticketRequest.getQuantity() < 1) {
            return ResponseEntity.badRequest().body("Thông tin không hợp lệ! Vui lòng kiểm tra lại.");
        }
        try {
            //Gọi tới service để xử lý nghiệp vụ
            Ticket bookedTicket = ticketService.bookTicket(ticketRequest);
            return ResponseEntity.ok(bookedTicket);
        }catch (Exception e){
            return ResponseEntity.status(500).body("Đã xảy ra lỗi trong quá trình đặt vé.");
        }
    }

    //API lấy thông tin by ticket ID
    @GetMapping("/booking/{ticketId}")
    public ResponseEntity<?> getTicketDetails(@PathVariable String ticketId){
        try {
            //Gọi service để lấy thông tin chi tiết
            Ticket ticket = ticketService.getTicketDetails(ticketId);
            if (ticket == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("status", "error", "message", "Không tìm thấy vé với ID: " + ticketId));
            }

            // Trả về nếu tìm thấy vé
            return ResponseEntity.ok(ticket);

        } catch (RuntimeException e){
            // Trường hợp không tìm thấy vé, trả về lỗi với thông báo
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
            //Trường hợp lỗi, trả về lỗi JSON
                    .body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    // Tạo api xóa vé xem phim
    @DeleteMapping("/delete")
    public String deleteTickets(String confirm) {
        if(!"CONFIRM".equals(confirm)){
            return "Vui lòng xác nhận bằng cách gửi 'CONFIRM'";
        }
        ticketRepository.deleteAll();
        return "Toàn bộ dữ liệu đã được xóa!";
    }
}
