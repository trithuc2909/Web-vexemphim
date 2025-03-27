// === LIST Danh sách phim ===
document.addEventListener("DOMContentLoaded", async function (){
    await fetchCategories();
     fetchMovies();
     loadCategories();
     document.getElementById("categoryFilter").addEventListener("change", filterMovies);
});

// Lấy danh mục phim từ API
async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:8080/api/categories/get");
        if (!response.ok) {
            throw new Error("Lỗi khi tải danh mục!");
        }
        const categories = await response.json();
        let categorySelect = document.getElementById("category");
        categorySelect.innerHTML = `<option value="">Tất cả</option>`;
        categories.forEach(category => {
            categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
        });
    } catch (error) {
        console.error("Lỗi khi tải danh mục: ", error);
    }
}

// Lấy Codes danh mục phim từ api (Filter)
async function loadCategories() {
    const response = await fetch("http://localhost:8080/api/categories/getCodes");
    const categories = await response.json();
    let categorySelect = document.getElementById("categoryFilter");

    categories.forEach(code => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = code;
        categorySelect.appendChild(option);
    });
}
async function filterMovies() {
    const categoryCode = document.getElementById("categoryFilter").value;
    const moviesList = document.getElementById("movieList");
    moviesList.innerHTML = ""; 

    let url = "http://localhost:8080/api/movies/get"; // API lấy tất cả phim

    if (categoryCode !== "") { // Nếu không chọn "Tất cả", thì mới filter
        url = `http://localhost:8080/api/movies/filter?categoryCode=${categoryCode}`;
    }

    const response = await fetch(url);
    const movies = await response.json();

    if (movies.length === 0) {
        moviesList.innerHTML = "<tr><td colspan='7'>Không có phim nào!</td></tr>";
        return;
    }

    movies.forEach(movie => {
        let row = `
            <tr>
                <td><input type="checkbox" class="movieCheckbox"></td>
                <td>${movie.movieId}</td>
                <td>${movie.categoryId ? movie.categoryId.code : "Không có"}</td>
                <td>${movie.name}</td>
                <td><img src="${movie.imageUrl}" alt="Hình ảnh phim" width="50"></td>
                <td>${movie.duration}</td>
                <td>
                    <button onclick="editMovie(${movie.movieId})">Sửa</button>
                    <button onclick="deleteMovie(${movie.movieId})">Xóa</button>
                </td>
            </tr>
        `;
        moviesList.innerHTML += row;
    });
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
        console.log(data);

        let tableBody = document.getElementById("movieList");
        tableBody.innerHTML = "";

        data.forEach(movie => {
            let row = `
                <tr>
                    <td><input type="checkbox" class="movieCheckbox"></td>
                    <td>${movie.movieId}</td>
                    <td>${movie.categoryId && movie.categoryId.code ? movie.categoryId.code : "Không có"}</td>
                    <td>${movie.name}</td>
                    <td><img src="${movie.imageUrl}" alt="Hình ảnh phim" width="50"></td>
                    <td>${movie.duration}</td>
                    <td>
                        <button onclick="editMovie(${movie.movieId})">Sửa</button>
                        <button onclick="deleteMovie(${movie.movieId})">Xóa</button>
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


// === KHU VỰC PHIM === 

// Lấy danh sách danh mục từ API 
function createMovieFormData(name, duration, categoryId, imageFile, description) {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("category", categoryId);
    formData.append("image", imageFile);
    formData.append("description", description);
    return formData;
}


async function addMovie(name, duration, categoryId, imageFile, description) {
    if (!name || !duration || !categoryId || !imageFile || !description) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("category", categoryId);  // Đảm bảo gửi đúng key
    formData.append("image", imageFile);
    formData.append("description", description);

    // Kiểm tra FormData
    console.log("Dữ liệu gửi đi:", [...formData.entries()]);

    try {
        let response = await fetch("http://localhost:8080/api/movies/add", {
            method: "POST",
            body: formData
        });

        let data = await response.text();
        console.log("Response:", data);
    } catch (error) {
        console.error("Lỗi khi thêm phim: ", error);
    }
}


function handleSubmit() {
    let name = document.getElementById("name").value;
    let duration = document.getElementById("duration").value;
    
    // Lấy giá trị (ID) của category từ option được chọn
    let categorySelect = document.getElementById("category");
    let categoryId = categorySelect.value; 

    let imageFile = document.getElementById("image").files[0];
    let description = document.getElementById("description").value;

    // Kiểm tra giá trị lấy được
    console.log("Category ID:", categoryId);

    addMovie(name, duration, categoryId, imageFile, description);
}


// UPDATE PHIM
function getMovieIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function loadMovieData() {
    const movieId = getMovieIdFromUrl();
    if (!movieId) {
        document.getElementById("message").innerText = "Không tìm thấy ID phim!";
        return;
    }

    try {
        // Load categories first
        const categoriesResponse = await fetch("http://localhost:8080/api/categories/get");
        if (!categoriesResponse.ok) {
            throw new Error("Không thể tải danh mục!");
        }
        const categories = await categoriesResponse.json();
        
        const categorySelect = document.getElementById("category");
        categorySelect.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });

        // Then load movie data
        const response = await fetch(`http://localhost:8080/api/movies/get/${movieId}`);
        if (!response.ok) {
            throw new Error("Không thể tải dữ liệu phim!");
        }
        const movie = await response.json();

        // Fill the form
        document.getElementById("name").value = movie.name;
        document.getElementById("duration").value = movie.duration;
        document.getElementById("description").value = movie.description;
        document.getElementById("category").value = movie.category.id;

        if (movie.imageUrl) {
            document.getElementById("imagePreview").src = movie.imageUrl;
            document.getElementById("imagePreview").style.width = '200px';
        }
    } catch (error) {
        document.getElementById("message").innerText = error.message;
    }
}

// Call this when the page loads
document.addEventListener("DOMContentLoaded", loadMovieData);

async function handleMovieSubmit() {
    const movieId = getMovieIdFromUrl();
    if (!movieId) {
        document.getElementById("message").innerText = "Không tìm thấy ID phim!";
        return;
    }

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("duration", document.getElementById("duration").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("category", document.getElementById("category").value);
    
    const imageFile = document.getElementById("image").files[0];
    if (imageFile) {
        formData.append("image", imageFile);
    }

    try {
        const response = await fetch(`http://localhost:8080/api/movies/update/${movieId}`, {
            method: "PUT",
            body: formData
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const message = await response.text();
        document.getElementById("message").innerText = message;
        setTimeout(() => {
            window.location.href = '../movies/listmovies.html';
        }, 1500);
    } catch (error) {
        document.getElementById("message").innerText = error.message;
    }
}
