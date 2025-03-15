document.addEventListener("DOMContentLoaded", function () {
    fetchUsers();

    // Gửi API cập nhật khi nhấn "Lưu"
    document.getElementById("formUser").addEventListener("submit", function (event) {
        event.preventDefault(); // Chặn reload trang

        const id = document.getElementById("userId").value;
        let username = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        // Lấy dữ liệu cũ từ form nếu input trống
        username = username.trim()!= ""? username : document.getElementById("username").getAttribute("Du-lieu-cu");
        email = email.trim() != "" ? email : document.getElementById("email").getAttribute("du-lieu-cu");
        password = password.trim() !="" ? password : document.getElementById("password").getAttribute("du-lieu-cu");

        fetch(`http://localhost:8080/rg/users/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        })
            .then(response => {
                if (response.ok) {
                    alert("Cập nhật thành công!");
                    hideUserForm();
                    fetchUsers(); // Load lại danh sách
                } else {
                    throw new Error("Có lỗi xảy ra khi cập nhật");
                }
            })
            .catch(error => console.error("Lỗi cập nhật", error));
    });
});

// Tải danh sách user
function fetchUsers() {
    fetch("http://localhost:8080/rg/users/get")
        .then(response => response.json())
        .then(users => {
            const tableBody = document.querySelector("#userTable tbody");
            tableBody.innerHTML = ""; // Xóa nội dung cũ

            users.forEach(user => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>
                        <button onclick="editUser(${user.id}, '${user.username}', '${user.email}', '${user.password}')">Sửa</button>
                        <button onclick="deleteUser(${user.id})">Xóa</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Lỗi khi tải dữ liệu: ", error));
}

// Hiển thị form sửa
function editUser(id, username, email, password) {
    console.log("Edit user:", id, username, email, password); // Debug để kiểm tra giá trị

    // Lấy phần tử input
    const userIdField = document.getElementById("userId");
    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    // Kiểm tra xem các phần tử input có tồn tại không
    if (!userIdField || !usernameField || !emailField || !passwordField) {
        console.error("❌ Lỗi: Không tìm thấy input trong HTML!");
        return;
    }

    // Gán giá trị vào input
    userIdField.value = id;
    usernameField.value = username;
    emailField.value = email;
    passwordField.value = password;

    //Lưu giá trị cũ vào thuộc tính du-lieu-cu
    userIdField.setAttribute("du-lieu-cu", username);
    userIdField.setAttribute("du-lieu-cu", email);
    userIdField.setAttribute("du-lieu-cu",password);

    // Hiển thị form
    document.getElementById("userForm").style.display = "block";
}


// Ẩn form
function hideUserForm() {
    document.getElementById("userForm").style.display = "none";
}
