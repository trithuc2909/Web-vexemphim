// Elements của trang login
const formLogin = document.getElementById("formLogin");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");

// Elements liên quan đến lỗi
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const alertError = document.getElementById("alertError");

    // Lấy dữ liệu từ local về
    // const userLocal = JSON.parse(localStorage.getItem("users")) || [];
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


// Lắng nghe sự kiện submit form đăng nhập tài khoản
formLogin.addEventListener("submit", async function(e) { 
    // Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    const emailInput = emailElement.value;
    const password = passwordElement.value;

    //Validate dữ liệu đầu vào
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
            //Hiển thị lỗi
            passwordError.style.display = "block"
    } else{
            // Ẩn lỗi
            passwordError.style.display = "none";
    }    

     // Gửi yêu cầu đăng nhập tới API
     try {
        const response = await fetch("http://localhost:8080/rg/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ emailInput, password }),
        });

        const result = await response.json()
        console.log("Người dùng đã đăng nhap:", result);
        
        if (response.ok) {
            window.location.href = "index.html";  // Đăng nhập thành công
        } else {
            alertError.style.display = "block";
            // alertError.innerHTML = "Email hoặc mật khẩu không đúng.";
        }
        // if (!findUser){
        //     // nếu không thì thông báo cho người dùng nhập lại dữ liệu
        //     alertError.style.display ="block";
        // } else {
        //     //nếu có thì đăng nhập thành công và chuyển hướng về trang chủ
        //     window.location.href = "indext.html";
        // }
    } catch (error) {
        console.error("Lỗi kết nối:", error);
        alertError.style.display = "block";
        alertError.innerHTML = "Có lỗi xảy ra khi đăng nhập.";
    }
});