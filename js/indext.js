

// Lấy dữ liệu trên Local về
const userLogin = JSON.parse(localStorage.getItem("userLogin"));

const userLoginElement = document.getElementById("userLogin");

if (userLogin){
    //Hiển thị tên của user đang đăng nhập lên Header
    userLoginElement.innerHTML =  userLogin.userName;
}
else {
    userLoginElement.innerHTML =  "";
    
}