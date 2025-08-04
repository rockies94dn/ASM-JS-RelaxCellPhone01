let cartWindow = null; //tạo biến để dùng lưu tham chiếu trang giỏ hàng sau khi open nó

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    initializeBannerSlider();
});

//mở trang chi tiết sản phẩm
function openDetails() {
    window.open("Iphone_12ProMax.html", "_blank", "noopener,noreferrer");
}

//Gắn sự kiện cho toàn bộ các nút thêm vào giỏ hàng:
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

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
const searchDropdown = document.getElementById('search-dropdown');

if (searchBox && searchDropdown) {
    const allSuggestions = Array.from(products).map(product =>
        product.querySelector('.product-name').textContent.trim()
    );
    searchBox.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();

        if (searchTerm.length > 0) {
            const filteredSuggestions = allSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(searchTerm)
            ).slice(0, 8);
            if (filteredSuggestions.length > 0) {
                searchDropdown.innerHTML = filteredSuggestions.map(suggestion =>
                    `<div class="search-suggestion" data-value="${suggestion}">${suggestion}</div>`
                ).join('');
                searchDropdown.style.display = 'block';
            } else {
                searchDropdown.style.display = 'none';
            }
        } else {
            searchDropdown.style.display = 'none';
        }
        filterProducts();
    });
    searchDropdown.addEventListener('click', function (e) {
        if (e.target.classList.contains('search-suggestion')) {
            const selectedValue = e.target.getAttribute('data-value');
            searchBox.value = selectedValue;
            searchDropdown.style.display = 'none';
            filterProducts();
        }
    });
    document.addEventListener('click', function (e) {
        if (!searchBox.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.style.display = 'none';
        }
    });

}
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


// updateProductCount();

// Banner Slider functionality
let currentSlideIndex = 0;
let slideInterval;

function initializeBannerSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    // Set initial state
    currentSlideIndex = 0;
    showSlide(currentSlideIndex);

    // Start auto-slide
    startAutoSlide();

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });

    // Pause auto-slide on hover
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }

    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                changeSlide(1);
            } else {
                // Swipe right - previous slide
                changeSlide(-1);
            }
        }
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    // Handle index bounds
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Hide all slides and remove active class from dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide and activate corresponding dot
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
        // Update aria-label for accessibility
        slides[currentSlideIndex].setAttribute('aria-label', `Banner ${currentSlideIndex + 1} của ${slides.length}`);
    }
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].setAttribute('aria-pressed', 'true');
    }

    // Update other dots aria-pressed attribute
    dots.forEach((dot, i) => {
        if (i !== currentSlideIndex) {
            dot.setAttribute('aria-pressed', 'false');
        }
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    const newIndex = currentSlideIndex + direction;
    showSlide(newIndex);

    // Reset auto-slide timer
    stopAutoSlide();
    startAutoSlide();
}

function currentSlide(index) {
    showSlide(index - 1); // Convert to 0-based index

    // Reset auto-slide timer
    stopAutoSlide();
    startAutoSlide();
}

function startAutoSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length <= 1) return;

    // Clear any existing interval first
    stopAutoSlide();

    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}
