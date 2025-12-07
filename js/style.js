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


    setInterval(nextSlide, 4000);
}

// Xem chi tiết sản phẩm
function viewDetails(productId) {
    // Lấy data-image từ product card
    const productCard = document.querySelector(`[data-id="${productId}"]`);
    let productImage = '../img/tk1.jpg';
    
    if (productCard && productCard.getAttribute('data-image')) {
        productImage = productCard.getAttribute('data-image');
    }
    
    // Lưu vào sessionStorage để trang chi tiết có thể lấy
    sessionStorage.setItem('selectedProductImage', productImage);
    sessionStorage.setItem('selectedProductId', productId);
    
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

// Lấy sản phẩm từ localStorage (do Admin tạo)
function getStoredProducts() {
    try { return JSON.parse(localStorage.getItem('products')) || []; } catch (e) { return []; }
}

function normalizeImageForIndex(path) {
    if (!path) return 'img/logo2.png';
    if (path.startsWith('../')) return path.replace('../', '');
    return path;
}

function renderNewProductsFromStorage() {
    const container = document.getElementById('newProducts');
    if (!container) return;
    const stored = getStoredProducts();
    if (!stored || stored.length === 0) return; // giữ nguyên danh sách tĩnh nếu chưa có sản phẩm admin

    // Sắp xếp mới nhất trước
    stored.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    const cards = stored.map(p => {
        const img = normalizeImageForIndex(p.image);
        const price = (p.price || 0).toLocaleString('vi-VN') + '₫';
        const id = p.id;
        const name = p.name || 'Sản phẩm mới';
        const category = (p.category || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, '');
        const sport = (p.sport || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, '');
        return `
            <div class="product-card" data-id="${id}" data-category="${category}" data-sport="${sport}" data-name="${name}" data-price="${p.price || 0}" data-image="${img}">
                <div class="product-image">
                    <img src="${img}" alt="${name}">
                </div>
                <div class="product-info">
                    <h3>${name}</h3>
                    <div class="product-price">${price}</div>
                    <div class="product-actions">
                        <button class="btn-details" onclick="viewDetails(${id})">
                            <i class="fas fa-eye"></i> Chi Tiết
                        </button>
                        <button class="btn-cart" onclick="addToCart(${id})">
                            <i class="fas fa-shopping-cart"></i> Thêm
                        </button>
                    </div>
                </div>
            </div>`;
    }).join('');

    // Ghép sản phẩm admin + danh sách tĩnh hiện có
    const defaultHTML = container.getAttribute('data-default') || container.innerHTML;
    container.setAttribute('data-default', defaultHTML);
    container.innerHTML = cards + defaultHTML;
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

    // Render sản phẩm mới từ Admin
    renderNewProductsFromStorage();
});
