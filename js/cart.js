function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const table = document.getElementById("products-table");
    const totalAmountElement = document.getElementById("total-amount");

    let totalAmount = 0;

    // Hiển thị sản phẩm từ localStorage
    cart.forEach((product, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-index", index); // Thêm index vào row

        row.innerHTML = `
        <td class="product-img"><img src="${product.img}" alt="" width="60"></td>
        <td class="product-name">${product.name}</td>
        <td class="product-price">${product.price.toLocaleString("vi-VN")}</td>
        <td class="product-remove"><button class="btn-remove">Xoá</button></td>
    `;

        table.appendChild(row);

        totalAmount += parseFloat(product.price);
    });

    totalAmountElement.textContent = totalAmount.toLocaleString() + " VND";

    // Xoá sản phẩm khi click nút
    table.addEventListener('click', function (e) {
        if (e.target.classList.contains("btn-remove")) {
            const row = e.target.closest("tr");
            const index = parseInt(row.getAttribute("data-index")); // Lấy index

            // Xoá đúng sản phẩm theo index
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));

            //Sửa số lượng hiển thị trên nút giỏ hàng
            window.opener.updateCartCount();

            // Tính lại tổng tiền từ mảng cart mới
            let newTotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
            totalAmountElement.textContent = newTotal.toLocaleString() + " VND";

            // Xoá dòng khỏi bảng
            row.remove();
        }
    });

}

window.addEventListener("DOMContentLoaded", function () {
    displayCart(); // hoặc renderCart();
});