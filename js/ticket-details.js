document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get('ticketId');

    if (!ticketId) {
        alert('Không tìm thấy ID vé!');
        return;
    }

    fetch(`http://localhost:8080/api/tickets/booking/${ticketId}`)
        .then(response => response.json())
        .then(ticket => {
            if(ticket){
            document.getElementById('ticketId').textContent = ticket.ticketId;
            document.getElementById('name').textContent = ticket.movieName;
            document.getElementById('time').textContent = ticket.time;
            document.getElementById('quantity').textContent = ticket.quantity;
            document.getElementById('imageUrl').src = ticket.imageUrl;
            document.getElementById('duration').textContent = ticket.duration;    
            document.getElementById('description').textContent = ticket.description;
            } else {
                console.error("Không tìm thấy thông tin phim.");
            }
        })
        .catch(err => {
            console.error('Lỗi khi lấy thông tin vé:', err);
        });
});
