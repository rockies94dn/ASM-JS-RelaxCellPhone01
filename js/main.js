
//Mở trang đăng nhập và đăng ký
function openLoginPage() {
    const width = 550;
    const height = 900;

    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const options = `width=${width},height=${height},top=${top},left=${left},` +
        `resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no`;

    window.open("login.html", "_blank", options);

}

//Mở giỏ hàng
function openCart() {
    alert("Giỏ hàng đang xây dựng");
    //Đang xây dựng
}

document.getElementById("search-box").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        alert("Chức năng tìm kiếm đang phát triển");
    }
});