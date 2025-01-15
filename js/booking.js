const form = document.getElementById('ticket-form'); //Tìm phần tử HTML có id là 'tick-form'


form.addEventListener('submit', async function(e){ // Lắng nghe sự kiện submit khi người dùng nhấn vào nút đặt vé
    e.preventDefault(); //Ngăn form gửi yêu cầu truyền thống

    const movie = document.getElementById('movie').value; // Để lấy giá trị từ trường nhập liệu trong form
    const time = document.getElementById('time').value;
    const quantity = document.getElementById('quantity').value;


    // Kiểm tra 3 giá trị có được nhập không
    if (!movie || !time || !quantity){
        alert('Vui lòng điền đầy đủ thông tin!');
        return; // Ngừng xử lý nếu thiếu thông tin
    }
    const ticket = {movie, time, quantity};
    try {
        const response = await  fetch('http://localhost:8080/tickets/api/booking', { // Gửi dữ liệu từ FE đến BE thông qua API
            method: "POST",
            headers: { 'Content-Type': 'application/json' }, //Đặt kiểu dữ liệu gửi đi là dạng JSON
            body: JSON.stringify(ticket) // Chuyển dữ liệu object thành chuỗi JSON trước khi gửi đi
        }) 
            if (!response.ok){
                throw new Error('Kết nối mạng không ổn định');
            }

            const result = await response.json();
            console.log('Đặt vé thành công:', result);
            alert('Đặt vé thành công!');
    } catch (err) {
        console.error('Lỗi trong quá trình đặt vé', err);
        alert('Có lỗi trong quá trình đặt vé. Vui lòng thử lại!');
    }
       
}); 



