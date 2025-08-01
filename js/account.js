
document.getElementById("username").innerText = localStorage.getItem("savedUsername");
document.getElementById("fullname").innerText = localStorage.getItem("savedFullName");
document.getElementById("gender").innerText = localStorage.getItem("savedGender") === "male" ? "Nam" : "Nữ";
document.getElementById("dob").innerText = localStorage.getItem("savedDob");
document.getElementById("address").innerText = localStorage.getItem("savedAddress");
document.getElementById("email").innerText = localStorage.getItem("savedEmail");
document.getElementById("phone").innerText = localStorage.getItem("savedPhone");

function onLogoutButton() {
    window.opener.handleLogout();
    alert("Đã đăng xuất.");
    window.close();
}
