package com.example.backend.controller;

import com.example.backend.model.Movie;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class MovieController {

    //API lấy danh sách phim
    @GetMapping("/api/movies")
    public List<Movie> getMovies() {
        return Arrays.asList(
                new Movie("MỘ ĐOM ĐÓM","/Image/mo-dom-dom.jpg" ),
                new Movie("ROBOT HOANG DÃ","/Image/wild-robot-sneakshow.jpg"),
                new Movie("TRÒ CHƠI NHÂN TÍNH", "/Image/trochoinhantinh.webp"),
                new Movie("ELLI VÀ BÍ ẨN CHIẾC TÀU MA", "/image/elli.jpg"),
                new Movie("VENOM :KÈO CUỐI","/Image/venom.jpg"),
                new Movie("QUỶ ĂN TẠNG 2", "/Image/tee-yod-sneakshow.jpg"),
                new Movie("FUBAO:BẢO BỐI CỦA ÔNG","/Image/fubao.jpg"),
                new Movie("BIỆT ĐỘI HOT GIRL", "/Image/Biet-doi-hot-girl.JPG"),
                new Movie("AN LẠC","/Image/an-lac.JPG"),
                new Movie("TÍN HIỆU CẦU CỨU", "/Image/tin-hieu-cau-cuu.JPG"),
                new Movie("BOCCHI THE ROCK! Recap Part 2", "/Image/bocchi-2.JPG"),
                new Movie("NHẤT QUỶ NHÌ MA, THỨ BA TAKAGI","/Image/takagi.JPG"),
                new Movie("VÂY HÃM TẠI ĐÀI BẮC","/Image/vay-ham-tai-dai-bac.JPG"),
                new Movie("VÙNG ĐẤT BỊ NGUYỀN RỦA", "/Image/vung-dat-bi-nguyen-rua.JPG"),
                new Movie("TIẾNG GỌI CỦA OÁN HỒN","/Image/sana.JPG"),
                new Movie("THẦN DƯỢC", "/Image/than-duoc.jpg")
        );
    }
}
