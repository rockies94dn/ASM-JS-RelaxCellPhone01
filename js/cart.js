function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const table = document.getElementById("products-table");
    const totalAmountElement = document.getElementById("total-amount");

    let totalAmount = 0;

    // Hiển thị sản phẩm từ localStorage
    cart.forEach(product => {
        const row = document.createElement("tr");

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
            const name = row.querySelector(".product-name").innerText;
            const priceText = row.querySelector(".product-price").innerText;

            // Chuyển đổi giá thành số (nếu có định dạng dấu , hoặc VND)
            const numericPrice = parseFloat(priceText.replace(/[^\d.-]/g, ""));

            // Cập nhật mảng cart
            cart = cart.filter(item => item.name !== name);
            localStorage.setItem("cart", JSON.stringify(cart));

            //Sửa số lượng hiển thị trên nút giỏ hàng
            window.opener.updateCartCount();

            // Cập nhật tổng tiền
            totalAmount -= numericPrice;
            totalAmountElement.textContent = totalAmount.toLocaleString() + " VND";

            // Xoá dòng khỏi bảng
            row.remove();
        }
    });

}

window.addEventListener("DOMContentLoaded", function () {
    displayCart(); // hoặc renderCart();
});