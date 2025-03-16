// === admin user === 

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
                    <td>
                        <span id="password-${user.id}" data-visible="false">••••••</span>
                        <button onclick="togglePassword(${user.id}, '${user.password}')">👁</button>
                    </td>
                    <td>
                        <button onclick="editUser(${user.id}, '${user.username}', '${user.email}', '******')">Sửa</button>
                        <button onclick="deleteUser(${user.id})">Xóa</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Lỗi khi tải dữ liệu: ", error));
}

// === update user === 

document.addEventListener("DOMContentLoaded", function () {
    fetchUsers();
    // Gửi API cập nhật khi nhấn "Lưu"
    document.getElementById("formUser").addEventListener("submit", function (event) {
        event.preventDefault(); // Chặn reload trang
        
        const id = document.getElementById("userId").value.trim();
        const usernameField = document.getElementById("username");
        const emailField = document.getElementById("email");
        const passwordField = document.getElementById("password");

        let userData = {};

        // Lấy giá trị cũ
        const oldUsername = usernameField.getAttribute("du-lieu-cu");
        const oldEmail = emailField.getAttribute("du-lieu-cu");
        const oldPassword = passwordField.getAttribute("du-lieu-cu");

        // Chỉ thêm vào userData nếu giá trị mới khác giá trị cũ
        if (usernameField.value.trim() !== oldUsername) {
            userData.username = usernameField.value.trim();
        }
        if (emailField.value.trim() !== "") userData.email = emailField.value.trim();
        else userData.email = null; // Gửi null nếu không thay đổi

        if (passwordField.value.trim() !== oldPassword) {
            userData.password = passwordField.value.trim();
        }

        // Nếu không có gì thay đổi thì báo lỗi
        if (Object.keys(userData).length === 0) {
            alert("Bạn chưa thay đổi gì!");
            return;
        }
        
        fetch(`http://localhost:8080/rg/users/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
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
// Hiển thị form sửa
function editUser(id, username, email, password) {
    console.log("Edit user:", id, username, email, password); // Debug để kiểm tra giá trị

    const userIdField = document.getElementById("userId");
    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    if (!userIdField || !usernameField || !emailField || !passwordField) {
        console.error("Lỗi: Không tìm thấy input trong HTML!");
        return;
    }

    userIdField.value = id;
    usernameField.value = username;
    emailField.value = email;
    passwordField.value = password;

    // Lưu giá trị cũ vào thuộc tính du-lieu-cu đúng
    usernameField.setAttribute("du-lieu-cu", username);
    emailField.setAttribute("du-lieu-cu", email);
    passwordField.setAttribute("du-lieu-cu", password);

    document.getElementById("userForm").style.display = "block";
}

// Ẩn form
function hideUserForm() {
    document.getElementById("userForm").style.display = "none";
}

function togglePassword(userId, password) {
    const passwordField = document.getElementById(`password-${userId}`);

    if (passwordField.getAttribute("data-visible") === "false") {
        passwordField.innerText = password; // Hiển thị mật khẩu 
        passwordField.setAttribute("data-visible", "true");
    } else {
        passwordField.innerText = "••••••"; // Ẩn mật khẩu
        passwordField.setAttribute("data-visible", "false");
    }
}


// === delete user === 
function deleteUser(id) {
    if (!confirm("Bạn có chắc muốn xóa user này không ?")) {
        return;
    }
    fetch(`http://localhost:8080/rg/users/delete/${id}`, {
        method: "DELETE",
    })
    .then (response => {
        if (response.ok){
            alert("Xóa người dùng thành công!");
            fetchUsers(); //load lại listUser khi xóa xong
        } else {
            return response.text.then(text => {
                throw new Error(text);
            });
        }
    })
    .catch(error => alert("Lỗi khi xóa: " + error.message));
}


// === Admin Categories ===
// Chờ trang tải xong mới thực hiện
// Chờ trang tải xong mới thực hiện
document.addEventListener("DOMContentLoaded", function () {
    console.log("Admin.js đã load!");
    
    const message = document.getElementById("message");
    if (!message) {
        console.error("Không tìm thấy phần tử #message trong DOM!");
        return; // Thoát nếu không tìm thấy phần tử
    }

    // Hàm thêm danh mục
    function addCategory() {
        const code = document.getElementById("code")?.value.trim();
        const name = document.getElementById("name")?.value.trim();

        if (!code || code.length < 3 || !name || name.length < 3) {
            message.innerHTML = "Mã và tên danh mục phải có ít nhất 3 ký tự!";
            message.style.color = "red";
            return;
        }

        const categoryData = { code, name };
        console.log("Dữ liệu gửi đi:", categoryData);

        fetch("http://localhost:8080/api/categories/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryData),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.json();
        })
        .then(data => {
            console.log("Phản hồi từ API:", data);
            message.innerHTML = "Thêm danh mục thành công!";
            message.style.color = "green";
            document.getElementById("categoryForm").reset(); // Reset form sau khi thêm thành công
        })
        .catch(error => {
            console.error("Lỗi:", error);
            message.innerHTML = "Lỗi khi thêm danh mục: " + error.message;
            message.style.color = "red";
        });
    }

    window.addCategory = addCategory; // Đăng ký hàm addCategory vào global scope
});




