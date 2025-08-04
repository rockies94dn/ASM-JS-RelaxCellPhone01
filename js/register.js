
function goBackToLoginPage() {
    window.location.href = "login.html";
}

//Hàm kiểm tra xem có input nào chưa được nhập không
function isFormComplete(fields) {
    for (const [key, value] of Object.entries(fields)) {
        if (value.trim() === "") {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return false;
        }
    }
    return true;
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

    //Lấy thành phố nguyên văn text
    let citySelect = document.getElementById("city");
    let inputAddress = citySelect.options[citySelect.selectedIndex].text;

    let inputEmail = document.getElementById("email").value;
    let inputPhone = document.getElementById("phone").value;

    //Gọi hàm kiểm tra đã điền đủ thông tin chưa
    if (!isFormComplete({
        inputUsername,
        inputPassword,
        inputPasswordConfirm,
        inputFullName,
        inputGender,
        inputDob,
        inputAddress,
        inputEmail,
        inputPhone
    })) {
        return;
    }

    //mật khẩu và xác nhận mật khẩu có trùng không
    if (inputPassword !== inputPasswordConfirm) {
        alert("Xác nhận mật khẩu không trùng khớp.");
        return;
    }

    //lưu thông tin vào local storage
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

