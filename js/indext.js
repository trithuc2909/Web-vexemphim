// === form Đăng nhập ===
document.addEventListener("DOMContentLoaded", function () {
    const userLoginContainer = document.getElementById("userLogin");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

    const user = JSON.parse(localStorage.getItem("userLogin"));

    if (user) {
        userLoginContainer.innerHTML = `
            <div class="user-info">
                <span>👤 ${user.username}</span>
                <button class="btn-logout" id="logoutButton">Đăng xuất</button>
            </div>
        `;
        loginButton.style.display = "none";
        registerButton.style.display = "none";

        document.getElementById("logoutButton").addEventListener("click", function () {
            localStorage.removeItem("userLogin");
            location.reload(); 
        });
    }
});



// === Contact ===
document.getElementById("contact-form").addEventListener("submit", async function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("contact-message").value;

    // Tạo đối tượng chứa dữ liệu contact
    const contact = {
        name: name,
        email: email,
        message: message
    }

    // Gửi dữ liệu contact lên server
    const respone = await fetch("http://localhost:8080/api/contacts", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(contact)
    });

    try {
        if (!respone.ok) {
            throw new Error("Gửi thông tin liên hệ không thành công!");
        }
    
        // Thông báo gửi thành công
        const result = await respone.json();
        console.log("Thông tin liên hệ đã được gửi thành công!", result);
        alert("Thông tin liên hệ đã được gửi thành công!");
    } catch (error) {
        console.error("Lỗi trong quá trình gửi thông tin liên hệ:", error);
        alert("Lỗi trong quá trình gửi thông tin liên hệ!");
    }

});