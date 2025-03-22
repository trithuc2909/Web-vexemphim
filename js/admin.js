// === admin user === 

// Tải danh sách user
async function fetchUsers(){
    try {
        const response = await fetch("http://localhost:8080/rg/users/get");
        const user =  await response.json();

        const tableBody = document.querySelector("#userTable tbody");
        tableBody.innerHTML = ""; //Xóa nội dung cũ đi
        user.forEach( user =>  {
            const row = document.createElement("tr");

            row.innerHTML = `<td>${user.id}</td>
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
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu: ", error);
    }
}

// === update user === 

document.addEventListener("DOMContentLoaded", function () {
    (async function(){
        await fetchUsers();
    })();
    // Gửi API cập nhật khi nhấn "Lưu"
    document.getElementById("formUser").addEventListener("submit", async function (event) {
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

        try {
            const response = await fetch(`http://localhost:8080/rg/users/update/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userData)
            });

            const result = await response.json(); // Lấy dữ liệu phản hồi từ API
            if (response.ok) {
                alert("Cập nhật thành công!");
                hideUserForm();
                await fetchUsers(); // Load lại danh sách
            } else {
                throw new Error(result.message || "Có lỗi khi cập nhật");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
        }
    });
});
 
// Hiển thị form sửa user
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
document.addEventListener("DOMContentLoaded", function () {
    const message = document.getElementById("message");
    if (!message) {
        console.error("Không tìm thấy phần tử #message trong DOM!");
        return; // Thoát nếu không tìm thấy phần tử
    }

    // Hàm thêm danh mục
    async function addCategory() {
        const code = document.getElementById("code")?.value.trim();
        const name = document.getElementById("name")?.value.trim();

        if (!code || code.length < 3 || !name || name.length < 3) {
            message.innerHTML = "Mã và tên danh mục phải có ít nhất 3 ký tự!";
            message.style.color = "red";
            return;
        }

        const categoryData = { code, name };
        console.log("Dữ liệu gửi đi:", categoryData);
        try {
            const response = await fetch("http://localhost:8080/api/categories/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(categoryData)
            })
            if (!response.ok){
                const erorText = await response.text();
                throw new Error(erorText);
            }

            const data = await response.json();
            console.log("Phản hồi từ phía API:", data);

            message.innerHTML = "Thêm danh mục thành công!";
            message.style.color = "green";
            document.getElementById("categoryForm").reset(); // Reset form sau khi thêm thành công
        } catch (error) {
            console.error("Lỗi: ", error);
            message.innerHTML = "Lỗi khi thêm danh mục: " + error.message;
            message.style.color = "red";
        }   
    }
    window.addCategory = addCategory; // Đăng ký hàm addCategory vào global scope
});


// === LIST Danh mục phim ===
document.addEventListener("DOMContentLoaded", async function (){
    await fetchCategories();
});

//Hàm gọi API GET ALL Categories
//  Hàm gọi API GET ALL Categories
async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:8080/api/categories/get");
        if (!response.ok) {
            throw new Error("Lỗi khi tải danh mục!");
        }
        const data = await response.json();
        let tableBody = document.getElementById("categoryList");
        tableBody.innerHTML = ""; //Xóa đi dữ liệu cũ

        data.forEach(category => {
            let row = `
                <tr>
                    <td><input type="checkbox" class="categoryCheckbox"></td>
                    <td>${category.id}</td>
                    <td>${category.code}</td>                   
                    <td>${category.name}</td>                   
                    <td>
                        <button onclick="editCategory(${category.id})">Sửa</button>
                        <button onclick="deleteCategory(${category.id})">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Lỗi khi tải danh mục thể loại phim: ", error);
    }
}

//  Chuyển sang trang `update.html?id=ID`
function editCategory(id) {
    window.location.href = `update.html?id=${id}`;
}

// Lấy ID từ URL
function getCategoryIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id"); //Lấy tham số id từ url
}

//  Hiển thị dữ liệu khi vào trang cập nhật
async function loadCategoryData() {
    const id = getCategoryIdFromURL();
    if (!id) {
        alert("Không tìm thấy danh mục!");
        return;
    }
    try {
        const response = await fetch(`http://localhost:8080/api/categories/get/${id}`);
        if (!response.ok) {
            throw new Error("Không thể lấy dữ liệu danh mục!");
        }

        const category = await response.json();
        document.getElementById("code").value = category.code;
        document.getElementById("name").value = category.name;
    } catch (error) {
        console.error("Lỗi khi tải danh mục: ", error);
        alert("Không thể hiển thị danh mục!");
    }
}

// Cập nhật danh mục
async function updateCategory() {
    const id = getCategoryIdFromURL();
    if (!id) {
        alert("Không tìm thấy danh mục!");
        return;
    }
    
    const updatedCategory = {
        code: document.getElementById("code").value,
        name: document.getElementById("name").value
    };

    try {
        const response = await fetch(`http://localhost:8080/api/categories/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCategory)
        });

        if (!response.ok) {
            throw new Error("Cập nhật thất bại!");
        }
        alert("Cập nhật danh mục thành công!");
        window.location.href = "danhsachdm.html"; // Quay về danh sách
    } catch (error) {
        console.error("Lỗi khi cập nhật danh mục: ", error);
        alert("Không thể cập nhật danh mục!");
    }
}

// Xóa danh mục thể loại phim
async function deleteCategory(id) {
    if (confirm("Bạn có chắc muốn xóa danh mục này không?")) {
        try {
            const response = await fetch(`http://localhost:8080/api/categories/delete/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Xóa không thành công!");
            }
            alert("Xóa danh mục thành công!");
            fetchCategories();
        } catch (error) {
            console.error("Lỗi khi xóa danh mục: ", error);
            alert("Không thể xóa danh mục!");
        }
    }
}

// Chọn tất cả
function selectAll() {
    document.querySelectorAll(".categoryCheckbox").forEach(cb => cb.checked = true);
}

// Bỏ chọn tất cả
function deselectAll() {
    document.querySelectorAll(".categoryCheckbox").forEach(cb => cb.checked = false);
}

// Xóa các mục đã chọn
async function deleteSelected() {
    const selectedItems = document.querySelectorAll(".categoryCheckbox:checked");

    if (selectedItems.length === 0) {
        alert("Bạn chưa chọn mục nào để xóa!");
        return;
    }
    if (!confirm("Bạn có chắc muốn xóa các mục đã chọn không?")) return;

    for (let checkbox of selectedItems) {
        const row = checkbox.closest("tr");
        const id = row.children[1].textContent.trim(); // Lấy ID từ cột thứ hai

        try {
            const response = await fetch(`http://localhost:8080/api/categories/delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error(`Xóa không thành công với ID ${id}`);
            }
        } catch (error) {
            console.error("Lỗi khi xóa danh mục: ", error);
            alert("Không thể xóa danh mục!");
        }
    }
    alert("Xóa danh mục thành công!");
    fetchCategories();
}

// Load dữ liệu khi vào `update.html` hoặc `danhsachdm.html`
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("update.html")) {
        loadCategoryData();
    } else if (window.location.pathname.includes("danhsachdm.html")) {
        fetchCategories();
    }
});

// Đăng ký các hàm vào phạm vi toàn cục
window.selectAll = selectAll;
window.deselectAll = deselectAll;
window.deleteSelected = deleteSelected;
window.updateCategory = updateCategory;
window.editCategory = editCategory;




















