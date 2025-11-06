// ============================================
// STYLE.JS - Slideshow và các chức năng trang chủ
// File: js/style.js
// ============================================

// Slideshow
let currentSlide = 0;

function initSlideshow() {
    const slideTrack = document.getElementById('slideTrack');
    if (!slideTrack) return;
    
    const slides = slideTrack.querySelectorAll('img');
    const totalSlides = slides.length;

    function updateSlide() {
        slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
    }

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Tự động chuyển slide mỗi 4 giây
    setInterval(nextSlide, 4000);
}

// Xem chi tiết sản phẩm
function viewDetails(productId) {
    // Kiểm tra xem đang ở trang nào
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/html/')) {
        // Đang ở trong thư mục html (giohang.html, login.html...)
        window.location.href = `chitiet.html?id=${productId}`;
    } else {
        // Đang ở trang chủ (index.html)
        window.location.href = `html/chitiet.html?id=${productId}`;
    }
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo slideshow
    initSlideshow();
    
    // Cập nhật badge giỏ hàng (nếu có hàm updateCartBadge từ giohang.js)
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
    
    // Cập nhật hiển thị user (nếu có hàm updateUserDisplay từ login.js)
    if (typeof updateUserDisplay === 'function') {
        updateUserDisplay();
    }
});