
// Chuyển ảnh lớn khi nhấn vào ảnh nhỏ
document.addEventListener('DOMContentLoaded', function () {
    const mainImg = document.querySelector('.product-gallery .main-img');
    const thumbs = document.querySelectorAll('.product-gallery .thumbs img');
    thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
            mainImg.src = thumb.src;
            mainImg.alt = thumb.alt;
        });
    });
});