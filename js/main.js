let cartWindow = null; //tạo biến để dùng lưu tham chiếu trang giỏ hàng sau khi open nó

//Gắn sự kiện cho toàn bộ các nút thêm vào giỏ hàng:
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const productElement = this.closest(".product");
            const name = productElement.querySelector(".product-name").innerText;
            const img = productElement.querySelector("img").getAttribute("src");
            const price = productElement.dataset.price;

            //Lưu các chỉ số lấy được dưới dạng mảng
            const product = { name, img, price };
            //Lưu vào LocalStorage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            //Sửa số lượng hiển thị trên nút giỏ hàng
            updateCartCount();

            //Reload cửa sổ cửa hàng
            if (cartWindow && cartWindow.closed) {
                cartWindow.location.reload();
            } 
            
            //Hiện thông báo thêm thành công vào giỏ hàng
            showPopup();
        });
    });
});

//Sửa số lượng hiển thị trên nút giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countElement = document.querySelector("#cart-count");
    if (countElement) {
        countElement.textContent = "(" + cart.length + ")";
    }
}

//thông báo khi thêm vào giỏ hàng thành công
function showPopup() {
    const popup = document.getElementById('added-popup');
    popup.style.opacity = 1;

    setTimeout(() => {
        popup.style.opacity = 0;
    }, 2000); // 2 giây sau tự ẩn
}

//Khi nhấn nút User
function onUserButton() {
    if (isLogin()) {
        openInformationPage();
    } else {
        openLoginPage();
    }
}

//Kiểm tra xem có hiện đang đăng nhập không
function isLogin() {
    //Nếu không đăng nhập thì dòng này trả về null, vì currentLoginUsername chưa được gán
    return sessionStorage.getItem("currentLoginUsername") !== null;
}

//Gán currentLoginUsername theo tham số truyền vào để lưu thông tin đăng nhập
function handleLoginSuccess(username) {
    sessionStorage.setItem("currentLoginUsername", username);
}

function handleLogout() {
    sessionStorage.removeItem("currentLoginUsername");
}

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

function openInformationPage() {
    const width = 550;
    const height = 900;

    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const options = `width=${width},height=${height},top=${top},left=${left},` +
        `resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no`;

    window.open("account.html", "_blank", options);
}



//Mở giỏ hàng
function openCart() {
    const width = 650;
    const height = 900;

    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const options = `width=${width},height=${height},top=${top},left=${left},` +
        `resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no`;

    cartWindow = window.open("cart.html", "_blank", options);
}


//Filter và search: --------------------

const filterCheckboxes = document.querySelectorAll('.filter-box input[type="checkbox"]');
const products = document.querySelectorAll('.product');
const sortSelect = document.querySelector('.sort-box select');

filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});

if (sortSelect) {
    sortSelect.addEventListener('change', sortProducts);
}
function getSelectedValues(filterName) {
    const selectedCheckboxes = document.querySelectorAll(`input[name="${filterName}"]:checked`);
    return Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
}
function filterProducts() {
    const selectedBrands = getSelectedValues('brand');
    const selectedOS = getSelectedValues('os');
    const selectedStorage = getSelectedValues('storage');
    const selectedRAM = getSelectedValues('ram');
    const searchTerm = document.getElementById('search-box').value.toLowerCase().trim();
    products.forEach(product => {
        const productBrand = product.dataset.brand;
        const productOS = product.dataset.os;
        const productStorage = product.dataset.storage;
        const productRAM = product.dataset.ram;
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        let showProduct = true;

        if (selectedBrands.length > 0 && productBrand) {
            showProduct = showProduct && selectedBrands.includes(productBrand);
        }
        if (selectedOS.length > 0 && productOS) {
            showProduct = showProduct && selectedOS.includes(productOS);
        }
        if (selectedStorage.length > 0 && productStorage) {
            showProduct = showProduct && selectedStorage.includes(productStorage);
        }
        if (selectedRAM.length > 0 && productRAM) {
            showProduct = showProduct && selectedRAM.includes(productRAM);
        }
        if (searchTerm !== '') {
            showProduct = showProduct && productName.includes(searchTerm);
        }
        if (showProduct) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    updateProductCount();
}
const searchBox = document.getElementById('search-box');
if (searchBox) {
    searchBox.addEventListener('input', filterProducts);
}

function updateProductCount() {
    const visibleProducts = document.querySelectorAll('.product[style*="block"], .product:not([style*="none"])');
    const productCountElement = document.querySelector('.product-count');

    if (productCountElement) {
        productCountElement.textContent = `Hiển thị ${visibleProducts.length} sản phẩm`;
    }
}
function clearAllFilters() {
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    products.forEach(product => {
        product.style.display = 'block';
    });

    updateProductCount();
}
function extractPrice(priceText) {
    return parseInt(priceText.replace(/[^\d]/g, ''));
}
function sortProducts() {
    const sortValue = sortSelect.value;
    const productsContainer = document.querySelector('.products-container');
    const productsArray = Array.from(products);

    if (sortValue === 'Giá Thấp Đến Cao') {
        productsArray.sort((a, b) => {
            const priceA = extractPrice(a.querySelector('.price').textContent);
            const priceB = extractPrice(b.querySelector('.price').textContent);
            return priceA - priceB;
        });
    } else if (sortValue === 'Giá Cao Đến Thấp') {
        productsArray.sort((a, b) => {
            const priceA = extractPrice(a.querySelector('.price').textContent);
            const priceB = extractPrice(b.querySelector('.price').textContent);
            return priceB - priceA;
        });
    }
    productsArray.forEach(product => {
        productsContainer.appendChild(product);
    });
}


updateProductCount();

