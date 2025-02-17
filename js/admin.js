document.addEventListener("DOMContentLoaded", function () {
    loadUsers();

    document.getElementById("formUser").addEventListener("submit", function (e) {
        e.preventDefault();
        const userId = document.getElementById("userId").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (userId) {
            updateUser(userId, { email, password });
        } else {
            addUser({ email, password });
        }
    });
});

async function loadUsers() {
    const response = await fetch("http://localhost:8080/api/users");
    const users = await response.json();
    const userTableBody = document.querySelector("#userTable tbody");
    userTableBody.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>
                <button onclick="showEditUserForm(${user.id}, '${user.email}', '${user.password}')">Sửa</button>
                <button onclick="deleteUser(${user.id})">Xóa</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

function showAddUserForm() {
    document.getElementById("formTitle").innerText = "Thêm Tài Khoản";
    document.getElementById("userId").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("userForm").style.display = "block";
}

function showEditUserForm(id, email, password) {
    document.getElementById("formTitle").innerText = "Sửa Tài Khoản";
    document.getElementById("userId").value = id;
    document.getElementById("email").value = email;
    document.getElementById("password").value = password;
    document.getElementById("userForm").style.display = "block";
}

function hideUserForm() {
    document.getElementById("userForm").style.display = "none";
}

async function addUser(user) {
    const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        loadUsers();
        hideUserForm();
    } else {
        alert("Thêm tài khoản không thành công!");
    }
}

async function updateUser(id, user) {
    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        loadUsers();
        hideUserForm();
    } else {
        alert("Cập nhật tài khoản không thành công!");
    }
}

async function deleteUser(id) {
    const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        loadUsers();
    } else {
        alert("Xóa tài khoản không thành công!");
    }
}