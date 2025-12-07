// ============================================
// SAN-PHAM.JS - Quản lý trang danh mục sản phẩm
// File: js/san-pham.js
// ============================================

// Lấy sản phẩm từ ID (tĩnh + admin)
function findProductById(id) {
    const numId = parseInt(id);
    
    // 1. Tìm từ products-data.js (tĩnh, ID 1-144)
    if (typeof productsData !== 'undefined' && Array.isArray(productsData)) {
        const found = productsData.find(p => p.id == numId);
        if (found) return found;
    }
    
    // 2. Tìm từ localStorage (admin, ID >= 1000)
    const adminProducts = JSON.parse(localStorage.getItem('products')) || [];
    const adminFound = adminProducts.find(p => p.id == numId);
    if (adminFound) return adminFound;
    
    return null;
}

const categoryMapping = {
    'quan-bong-da-nam': { category: 'Quần', sport: 'Bóng Đá', title: 'Quần Bóng Đá Nam' },
    'quan-bong-ro-nam': { category: 'Quần', sport: 'Bóng Rổ', title: 'Quần Bóng Rổ Nam' },
    'quan-chay-bo': { category: 'Quần', sport: 'Chạy Bộ', title: 'Quần Chạy Bộ' },
    'quan-tap-gym': { category: 'Quần', sport: 'Tập Gym', title: 'Quần Tập Gym' },
    'quan-dap-xe': { category: 'Quần', sport: 'Đạp Xe', title: 'Quần Đạp Xe' },
    'quan-cau-long': { category: 'Quần', sport: 'Cầu Lông', title: 'Quần Cầu Lông' },
    
    'ao-bong-da-nam': { category: 'Áo', sport: 'Bóng Đá', title: 'Áo Bóng Đá Nam' },
    'ao-bong-ro-nam': { category: 'Áo', sport: 'Bóng Rổ', title: 'Áo Bóng Rổ Nam' },
    'ao-tap-luyen': { category: 'Áo', sport: 'Tập Luyện', title: 'Áo Tập Luyện' },
    'ao-dong-phuc': { category: 'Áo', sport: 'Đồng Phục', title: 'Áo Đồng Phục' },
    'ao-thoi-trang-the-thao': { category: 'Áo', sport: 'Thời Trang Thể Thao', title: 'Áo Thời Trang Thể Thao' },
    'ao-lifestyle': { category: 'Áo', sport: 'Lifestyle', title: 'Áo Lifestyle' },
    
    'giay-bong-da-nam': { category: 'Giày', sport: 'Bóng Đá', title: 'Giày Bóng Đá Nam' },
    'giay-bong-ro-nam': { category: 'Giày', sport: 'Bóng Rổ', title: 'Giày Bóng Rổ Nam' },
    'giay-chay-bo': { category: 'Giày', sport: 'Chạy Bộ', title: 'Giày Chạy Bộ' },
    'giay-tap-gym': { category: 'Giày', sport: 'Tập Gym', title: 'Giày Tập Gym' },
    'giay-da-ngoai': { category: 'Giày', sport: 'Dã Ngoài', title: 'Giày Dã Ngoài' },
    'giay-casual': { category: 'Giày', sport: 'Casual', title: 'Giày Casual' },
    
    'phukien-bong-dungcu': { category: 'Phụ Kiện', sport: 'Bóng & Dụng Cụ', title: 'Bóng & Dụng Cụ' },
    'phukien-tui-balo': { category: 'Phụ Kiện', sport: 'Túi & Balo', title: 'Túi & Balo' },
    'phukien-bao-ho': { category: 'Phụ Kiện', sport: 'Bảo Hộ', title: 'Bảo Hộ & Băng' },
    'phukien-vo-gang': { category: 'Phụ Kiện', sport: 'Vớ & Găng', title: 'Vớ & Găng Tay' },
    'phukien-yoga-fitness': { category: 'Phụ Kiện', sport: 'Yoga & Fitness', title: 'Yoga & Fitness' },
    'phukien-khac': { category: 'Phụ Kiện', sport: 'Khác', title: 'Phụ Kiện Khác' }
};

// Lấy category hiện tại từ tên file
function getCurrentPageCategory() {
    const filename = window.location.pathname.split('/').pop().replace('.html', '');
    return categoryMapping[filename] || null;
}

// Filter sản phẩm theo category và sport
function getProductsByCategory(category, sport = null) {
    // Kết hợp sản phẩm tĩnh + admin
    let allProducts = Array.isArray(productsData) ? [...productsData] : [];
    const adminProducts = JSON.parse(localStorage.getItem('products')) || [];
    allProducts = [...allProducts, ...adminProducts];
    
    return allProducts.filter(product => {
        if (sport) {
            return product.category === category && product.sport === sport;
        }
        return product.category === category;
    });
}

// Xem chi tiết sản phẩm
function viewDetails(productId) {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/html/')) {
        window.location.href = `chitiet.html?id=${productId}`;
    } else {
        window.location.href = `html/chitiet.html?id=${productId}`;
    }
}

// Tạo HTML thẻ sản phẩm
function createProductCard(product) {
    // Xử lý đường dẫn ảnh
    let imagePath = product.image || '../img/logo2.png';
    if (!imagePath.startsWith('../') && !imagePath.startsWith('http')) {
        imagePath = '../' + imagePath;
    }
    
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-sport="${product.sport}" data-name="${product.name}" data-price="${product.price}" data-image="${imagePath}">
            <div class="product-image">
                <img src="${imagePath}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${(product.price || 0).toLocaleString('vi-VN')}₫</div>
                <div class="product-actions">
                    <button class="btn-details" onclick="viewDetails(${product.id})">
                        <i class="fas fa-eye"></i> Chi Tiết
                    </button>
                    <button class="btn-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Thêm
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Load sản phẩm trang danh mục
function loadCategoryProducts() {
    const pageCategory = getCurrentPageCategory();
    
    if (!pageCategory) {
        console.log('Generic category page');
        return;
    }
    
    // Cập nhật tiêu đề trang
    document.getElementById('categoryTitle').textContent = pageCategory.title;
    document.getElementById('categoryDesc').textContent = `Tìm kiếm ${pageCategory.title.toLowerCase()} chất lượng cao, thoải mái và độc đáo`;
    
    // Lấy sản phẩm
    const products = getProductsByCategory(pageCategory.category, pageCategory.sport);
    const container = document.getElementById('categoryProducts');
    const noProducts = document.getElementById('noProducts');
    
    if (products.length === 0) {
        noProducts.style.display = 'block';
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'grid';
    noProducts.style.display = 'none';
    container.innerHTML = products.map(createProductCard).join('');
    
    // Áp dụng bộ lọc
    applyFilters(products);
}

// Áp dụng bộ lọc và sắp xếp
function applyFilters(allFilteredProducts) {
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (!priceFilter || !sortFilter) return;
    
    function updateDisplay() {
        let filtered = [...allFilteredProducts];
        
        // Bộ lọc giá
        const priceValue = priceFilter.value;
        if (priceValue) {
            const [min, max] = priceValue.split('-').map(v => v ? parseInt(v) : Infinity);
            filtered = filtered.filter(p => p.price >= min && p.price <= max);
        }
        
        // Sắp xếp
        const sortValue = sortFilter.value;
        if (sortValue === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        }
        
        // Hiển thị
        const container = document.getElementById('categoryProducts');
        const noProducts = document.getElementById('noProducts');
        
        if (filtered.length === 0) {
            container.style.display = 'none';
            noProducts.style.display = 'block';
        } else {
            container.style.display = 'grid';
            noProducts.style.display = 'none';
            container.innerHTML = filtered.map(createProductCard).join('');
        }
    }
    
    priceFilter.addEventListener('change', updateDisplay);
    sortFilter.addEventListener('change', updateDisplay);
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    loadCategoryProducts();
    
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
    if (typeof updateUserDisplay === 'function') {
        updateUserDisplay();
    }
});

