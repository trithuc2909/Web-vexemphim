const ticketDetails = document.getElementById('ticket-details');

// Lấy ticketId từ phần path của url
const params = new URLSearchParams(window.location.search);
const ticketId = params.get('ticketId');
console.log("ticket Id: " , ticketId
);


if (ticketId) {
    fetch(`http://localhost:8080/api/tickets/booking/${ticketId}`)
    .then(response => {
        if(!response.ok){
            throw new Error('Không tìm thấy thông tin vé!');
        }
        return response.json();
    })
    .then(data => {
        ticketDetails.innerHTML = `
            <h2>Thông tin vé</h2>
            <p>Phim: ${data.movieName}</p>
            <p>Giờ chiếu: ${data.time}</p>
            <p>Số lượng vé: ${data.quantity}</p>
            <img src="${data.imageUrl}" alt="Poster Phim ${data.movieName}">
        `;
        console.log( data );
    })
    .catch(err => {
        console.error(err);
        ticketDetails.innerHTML = `<p>Có lỗi xảy ra. không thể hiển thị thông tin vé!</p>`;
    });
} else {
    ticketDetails.innerHTML = `<p>Không tìm thấy thông tin vé!</p>`;
}