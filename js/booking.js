const form = document.getElementById('ticket-form'); //Tìm phần tử HTML có id là 'tick-form'

form.addEventListener('click', (e) => { // Lắng nghe sự kiện submit khi người dùng nhấn vào nút đặt vé
    e.preventDefault(); //Ngăn form gửi yêu cầu truyền thống

    const movie = document.getElementById('movie').value; // Để lấy giá trị từ trường nhập liệu trong form
    const time = document.getElementById('time').value;
    const quantity = document.getElementById('quantity').value;
   
    if (movie && time && quantity) { // Kiểm tra 3 giá trị có được nhập không
        if (!movie || !time || !quantity){
            alert('Vui lòng điền đầy đủ thông tin!');
            return; // Ngừng xử lý nếu thiếu thông tin
        }
    
        fetch('http://localhost:8080/tickets/api/booking', { // Gửi dữ liệu từ FE đến BE thông qua API
            method: "POST",
            headers: { 'Content-Type': application/json }, //Đặt kiểu dữ liệu gửi đi là dạng JSON
            body: JSON.stringify({movie,time,quantity}) // Chuyển dữ liệu object thành chuỗi JSON trước khi gửi đi
        }) 
           .then(response => {
            if (!response.ok){
                throw new Error('Kết nối mạng không ổn định');
            }
            return response.json();
           })
           .then(data => console.log('Respone from server:',data))
           .catch(err => console.error('Error',err));
           alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }    
}); 



