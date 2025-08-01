
function goBackToLoginPage() {
    window.location.href = "login.html";
}

function confirmRegister() {
    let inputUsername = document.getElementById("username").value;
    let inputPassword = document.getElementById("password").value;
    let inputPasswordConfirm = document.getElementById("password-confirm").value;
    let inputFullName = document.getElementById("fullname").value;

    //Duyệt để lấy giá trị gender
    let genderRadios = document.getElementsByName("gender");
    let inputGender = "";
    for (let i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            inputGender = genderRadios[i].value;
            break;
        }
    }

    let inputDob = document.getElementById("dob").value;
    let inputAddress = document.getElementById("city").value;
    let inputEmail = document.getElementById("email").value;
    let inputPhone = document.getElementById("phone").value;

    if (inputPassword !== inputPasswordConfirm) {
        alert("Xác nhận mật khẩu không trùng khớp.");
        return;
    }

    localStorage.setItem("savedUsername", inputUsername);
    localStorage.setItem("savedPassword", inputPassword);
    localStorage.setItem("savedFullName", inputFullName);
    localStorage.setItem("savedGender", inputGender);
    localStorage.setItem("savedDob", inputDob);
    localStorage.setItem("savedAddress", inputAddress);
    localStorage.setItem("savedEmail", inputEmail);
    localStorage.setItem("savedPhone", inputPhone);

    alert("Đăng ký thành công!");
    goBackToLoginPage();
}

