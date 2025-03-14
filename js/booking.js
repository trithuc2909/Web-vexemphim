document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('ticket-form');
    const movieDropdown = document.getElementById('movie');
    const quantityInput = document.getElementById('quantity');
    const totalPriceSpan = document.getElementById('total-price');
    
    const ticketPrice = 100000; // Giá vé cố định 100,000 VND

    // Cập nhật tổng tiền khi thay đổi số lượng vé
    quantityInput.addEventListener('input', function () {
        const quantity = parseInt(quantityInput.value) || 0;
        const total = quantity * ticketPrice;
        totalPriceSpan.textContent = `${total.toLocaleString()} VND`;
    });

    // Fetch danh sách phim
    fetch('http://localhost:8080/api/movies')
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                const option = document.createElement('option');
                option.value = movie.movieId;
                option.textContent = movie.name;
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

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const movieId = parseInt(document.getElementById('movie').value);
        const time = document.getElementById('time').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (!movieId || !time || !quantity) {
            Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin!',
                text: 'Vui lòng điền đầy đủ thông tin!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        const ticket = {
            movieId: movieId,
            time: time,
            quantity: quantity
        };

        try {
            const response = await fetch('http://localhost:8080/api/tickets/booking', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ticket)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Đặt vé thành công:', result);

            Swal.fire({
                icon: 'success',
                title: 'Đặt vé thành công!',
                text: 'Nhấn "Xem chi tiết" để xem thông tin chi tiết vé',
                showCancelButton: true,
                confirmButtonText: 'Xem chi tiết',
                cancelButtonText: 'Quay lại',
                confirmButtonColor: '#3085d6'
            }).then((res) => {
                if (res.isConfirmed) {
                    window.location.href = `/pages/ticket-details.html?ticketId=${result.ticketId}`;
                } else {
                    window.location.href = '/pages/index.html';
                }
            });
        } catch (err) {
            console.error('Lỗi trong quá trình đặt vé', err);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Có lỗi trong quá trình đặt vé. Vui lòng thử lại!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d33'
            });
        }
    });
});
