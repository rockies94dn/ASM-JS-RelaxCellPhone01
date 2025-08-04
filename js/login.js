let savedUsername = localStorage.getItem("savedUsername");
let savedPassword = localStorage.getItem("savedPassword");

function onLoginHandler() {
    if (isAccountCorrect()) {
        alert("Đăng nhập thành công.");
        //gọi hàm trong main.js để lưu lại currentLoginUsername
        window.opener.handleLoginSuccess(savedUsername);
        window.close();
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
}

//Kiểm tra username và password nhập vào có đúng không
function isAccountCorrect() {
    let inputUsername = document.getElementById("username").value;
    let inputPassword = document.getElementById("password").value;
    return inputUsername === savedUsername && inputPassword === savedPassword;
}

function openRegisterPage() {
    window.location.href = "register.html";
}
