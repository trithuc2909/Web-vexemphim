document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const searchResults = document.getElementById("search-results");

    if (!searchBar || !searchResults) {
        console.error("Search bar or search results element not found in the DOM.");
        return;
    }

    searchBar.addEventListener("input", function () {
        let query = this.value.trim();
        console.log("Query:", query);

        if (query.length < 1) {
            searchResults.style.display = "none";
            return;
        }

        fetch(`http://localhost:8080/api/search?name=${encodeURIComponent(query)}`)
            .then(response => {
                console.log("Response:", response);
                return response.ok ? response.json() : Promise.resolve([]);
            })
            .then(movies => {
                console.log("Movies: ", movies);
                if (!Array.isArray(movies)) {
                    movies = [movies];
                }
                searchResults.innerHTML = "";
                if (movies.length === 0) {
                    searchResults.style.display = "none";
                    return;
                }
                movies.forEach(movie => {
                    let div = document.createElement("div");
                    div.textContent = movie.name;
                    div.classList.add("search-item");
                    div.addEventListener("click", function () {
                        window.location.href = movie.pageUrl; // Chuyển đến trang phim
                    });
                    searchResults.appendChild(div);
                });
                searchResults.style.display = "block";
                searchResults.classList.add("show"); // Hiển thị danh sách kết quả
            })
            .catch(error => {
                console.error("Error:", error);
                searchResults.classList.remove("show");
                searchResults.style.display = "none";
            });
    });

    document.addEventListener("click", function (event) {
        console.log("Clicked element:", event.target);
        console.log("Search bar contains target:", searchBar.contains(event.target));
        console.log("Search results contains target:", searchResults.contains(event.target));
        if (!searchBar.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.classList.remove("show"); // Ẩn khi click ra ngoài
        }
    });
});