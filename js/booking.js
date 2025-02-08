// Lắng nghe sự kiện DOMContentLoaded để đảm bảo trang đã tải xong
document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById('ticket-form'); //Tìm phần tử HTML có id là 'tick-form'
    const movieDropdown = document.getElementById('movie');

   
    // Gọi api để lấy danh sách phim
    fetch('http://localhost:8080/api/movies')
    .then(response => response.json())
    .then(movie => {
        // Lặp qua danh sách phim và tạo các option cho dropdown
        movie.forEach(movie => {
            const option = document.createElement('option');
            option.value = movie.id; // Dùng tên phim làm giá trị
            option.textContent = movie.name; // Hiển thị tên phim trong dropdown
            movieDropdown.appendChild(option);
        });
    })
    .catch(err => {
        console.error('Lỗi khi tải phim:', err);
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Không thể tải danh sách phim. Vui lòng thử lại!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33'
        });
    });

// Lắng nghe sự kiện submit khi người dùng nhấn vào nút đặt vé
form.addEventListener('submit', async function(e){ 
    e.preventDefault(); //Ngăn form gửi yêu cầu truyền thống

    const movieId = document.getElementById('movie').value// Để lấy giá trị trong dropdown phim
    const time = document.getElementById('time').value;
    const quantity = document.getElementById('quantity').value;

    // Kiểm tra 3 giá trị có được nhập không
    if (!movie || !time || !quantity){
        Swal.fire({
            icon: 'warning',
            title: 'Thiếu  thông tin!',
            text: 'Vui lòng điền đầy đủ thông tin!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
        });
        return; // Ngừng xử lý nếu thiếu thông tin
    }
    // Tạo một đối tượng ticket
    const ticket = {
        movie: {
            id: parseInt(movieId)
        },
        time: time, 
        quantity: parseInt(quantity)
    };

    try {
        const response = await fetch('http://localhost:8080/api/tickets/booking', { // Gửi dữ liệu từ FE đến BE thông qua API
            method: "POST",
            headers: { 'Content-Type': 'application/json' }, //Đặt kiểu dữ liệu gửi đi là dạng JSON
            body: JSON.stringify(ticket) // Chuyển dữ liệu object thành chuỗi JSON trước khi gửi đi
        }) 
            if (!response.ok){
                throw new Error('Kết nối mạng không ổn định');
            }

            const result = await response.json();
            console.log('Đặt vé thành công:', result);
            //Hiển thị thông báo lỗi với SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Đặt vé thành công!',
                text: 'Nhấn "Xem chi tiết" để xem thông tin chi tiết vé',
                showCancelButton: true,
                confirmButtonText: 'Xem chi tiết',
                cancelButtonText: 'Quay lại',
                confirmButtonColor: '#3085d6'
            }).then((result) => {
                if(result.isConfirmed){
                    window.location.href = `/pages/ticket-details.html?ticketId=23`;
                }
        })
    } catch (err) {
        console.error('Lỗi trong quá trình đặt vé', err);
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Có lỗi trong quá trình đặt vé. Vui lòng thử lại!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33'
        })
    }
       
}); 
})


