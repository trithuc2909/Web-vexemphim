// lấy ra elements của trang
const formRegister = document.getElementById("formRegister");
const userNameElement = document.getElementById("userName");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const rePasswordElement = document.getElementById("rePassword");
const addressElement = document.getElementById("address");

// Elements liên quan đến lỗi
const userNameError = document.getElementById("userNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");
const addressError = document.getElementById("addressError");

// lấy dữ liệu từ localStorage
     // Phải ép kiểu vì dạng JSON không thao tác được với JS 
// const userLocal = JSON.parse(localStorage.getItem("users")) || [];  //getItem là một mảng lưu trữ các users trên local nếu như chưa có user nào thì mặc định cho là mảng rỗng
                                        
/**
 * Validate địa chỉ email
 * @param {*} email: chuỗi email mà user nhập vào 
 * @returns: Dữ liệu nếu email đúng định dạng, Undefined nếu email không đúng định dạng 
 * Author: Trí Thức (10/5/2024)
 */
//Function ràng buộc viết email
function validateEmail (email) {
    return String(email)
      .toLowerCase() // thành chữ thường
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.("..+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};


// lắng nghe sự kiện submit form đăng ký tài khoản
formRegister.addEventListener("submit", async function(e){
    // ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // validate dữ liệu đầu vào
    if (!userNameElement.value){
    //    alert("Tên không được để trống");
        //Hiển thị lỗi
        userNameError.style.display = "block";
    } else{
        // Ẩn lỗi
        userNameError.style.display = "none";
    }
    
    //email
    if (!emailElement.value){
    //    alert("Tên không được để trống");
        // Hiển thị lỗi
        emailError.style.display = "block";
    } else{
        // Ẩn lỗi
        emailError.style.display = "none";
    if(!validateEmail(emailElement.value)){
        //Hiển thị lỗi
        emailError.style.display = "block";
        emailError.innerHTML = "Email không đúng định dạng."; //sửa throw error trực tiếp
    }
    }  

      //password  
    if (!passwordElement.value){
        //    alert("Tên không được để trống");
    
            //Hiển thị lỗi
            passwordError.style.display = "block"
    } else{
            // Ẩn lỗi
            passwordError.style.display = "none";
    }
    if (!rePasswordElement.value){
        //    alert("Tên không được để trống");
    
            //Hiển thị lỗi
            rePasswordError.style.display = "block"
        } else{
            // Ẩn lỗi
            rePasswordError.style.display = "none";
    }

    // Kiểm tra mật khẩu với nhập lại mật khẩu
    if (passwordElement.value !== rePasswordElement.value){
    //    alert("Mật khẩu không trùng nhau")
        rePasswordError.style.display = "block";
        rePasswordError.innerHTML = "Mật khẩu không trùng khớp";
    } else {
        rePasswordError.style.display = "none";
    }


    //Gửi dữ liệu từ form lên LocalStorage
    if (userNameElement.value && 
    emailElement.value && 
    passwordElement.value && 
    rePasswordElement.value &&
    passwordElement.value === rePasswordElement.value &&
    // addressElement.value && 
    validateEmail(emailElement.value)    
    ) {
    //Lấy dữ liệu từ form và gộp thành đối tượng user
    // const user = {
    //     userId: Math.ceil(Math.random() * 100000000000),    // Hàm có sẵn trong JS để làm tròn số  để tạo ra một id ngẫu nhiên
    //     userName: userNameElement.value,
    //     email: emailElement.value,
    //     password: passwordElement.value, 
    //     // address: addressElement.value,
    // };

      //Push user vào trong mảng userLocal vì mảng đang rỗng
    //   userLocal.push(user);

    
    //Lưu trữ dữ liệu lên local
    // localStorage.setItem("users", JSON.stringify(userLocal));
    const user = {
        username: userNameElement.value,
        email: emailElement.value,
        password: passwordElement.value,
    };
// Gửi yêu cầu POST tới API đăng ký
    try {
        const response = await fetch("http://localhost:8080/rg/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Đăng ký không thành công");
        }

        const result = await response.json();
        console.log("Người dùng đã đăng ký:", result);
        // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
        // setTimeout: Giúp chúng ta làm một hành động gì đó sau thời gian mà chúng ta cài đặt
        setTimeout(function () {
                // Chuyẻn hướng về trang đăng nhập sau 1s
                window.location.href = "login.html";
                }, 1000); // 1000 = 1000 m/s
    } 
    catch (err) {
        console.log("Lỗi trong quá trình đăng ký:", err);
    // Hiển thị thông báo lỗi
}


} 

});

