// === LIST Danh sách phim ===
document.addEventListener("DOMContentLoaded", async function (){
    await fetchCategories();
    await fetchMovies();
});

// Lấy danh mục phim từ API
async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:8080/api/categories/get");
        if (!response.ok) {
            throw new Error("Lỗi khi tải danh mục!");
        }
        const categories = await response.json();
        let categorySelect = document.getElementById("categoryFilter");
        categorySelect.innerHTML = `<option value="">Tất cả</option>`;
        categories.forEach(category => {
            categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
        });
    } catch (error) {
        console.error("Lỗi khi tải danh mục: ", error);
    }
}

// Lấy danh sách phim từ API
async function fetchMovies(categoryId = "") {
    try {
        let url = "http://localhost:8080/api/movies/get";
        if (categoryId) {
            url += `?category=${categoryId}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Lỗi khi tải phim!");
        }
        const data = await response.json();
        let tableBody = document.getElementById("movieList");
        tableBody.innerHTML = "";

        data.forEach(movie => {
            let row = `
                <tr>
                    <td><input type="checkbox" class="movieCheckbox"></td>
                    <td>${movie.movieId}</td>
                    <td>${movie.category ? movie.category.name : "Không có"}</td>
                    <td>${movie.name}</td>
                    <td><img src="${movie.imageUrl}" alt="Hình ảnh phim" width="50"></td>
                    <td>${movie.duration}</td>
                    <td>
                        <button onclick="editMovie(${movie.id})">Sửa</button>
                        <button onclick="deleteMovie(${movie.id})">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Lỗi khi tải phim: ", error);
    }
}

// Tìm kiếm theo danh mục
function filterMoviesByCategory() {
    const categoryId = document.getElementById("categoryFilter").value;
    fetchMovies(categoryId);
}

// Chọn tất cả
function selectAll() {
    document.querySelectorAll(".movieCheckbox").forEach(cb => cb.checked = true);
}

// Bỏ chọn tất cả
function deselectAll() {
    document.querySelectorAll(".movieCheckbox").forEach(cb => cb.checked = false);
}

// Xóa phim theo ID
async function deleteMovie(id) {
    if (confirm("Bạn có chắc muốn xóa phim này không?")) {
        try {
            const response = await fetch(`http://localhost:8080/api/movies/delete/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Xóa không thành công!");
            }
            alert("Xóa phim thành công!");
            fetchMovies();
        } catch (error) {
            console.error("Lỗi khi xóa phim: ", error);
            alert("Không thể xóa phim!");
        }
    }
}

// Xóa các phim đã chọn
async function deleteSelected() {
    const selectedItems = document.querySelectorAll(".movieCheckbox:checked");
    if (selectedItems.length === 0) {
        alert("Bạn chưa chọn phim nào để xóa!");
        return;
    }
    if (!confirm("Bạn có chắc muốn xóa các phim đã chọn không?")) return;
    for (let checkbox of selectedItems) {
        const row = checkbox.closest("tr");
        const id = row.children[1].textContent.trim();
        await deleteMovie(id);
    }
}

// Chỉnh sửa phim
function editMovie(id) {
    window.location.href = `updatemovies.html?id=${id}`;
}

