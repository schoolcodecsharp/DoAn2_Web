// ===== PRODUCT DATA =====
// This is a shared product database for the entire site
const allProducts = [
    
    { id: 1, category: "ao", sport: "bongda", name: "Quần Áo Bóng Đá Thiết Kế RO-25 Màu Đỏ", price: 119000, image: "img/tk1.jpg", isNew: false },
    { id: 2, category: "ao", sport: "bongro", name: "Áo Bóng Rổ Nike Chính Hãng", price: 259000, image: "img/aobongro.jpeg", isNew: false },
    { id: 3, category: "giay", sport: "bongda", name: "Giày Đá Bóng Kamito Velocidad", price: 499000, image: "img/tk1.webp", isNew: false },
    { id: 4, category: "phukien", sport: "bongchuyen", name: "Phụ Kiện Bóng Chuyền - Băng Cổ Tay", price: 69000, image: "img/bct1.webp", isNew: false },
    { id: 5, category: "quan", sport: "chaybo", name: "Quần Chạy Bộ Adidas Climacool", price: 349000, image: "img/product_5.jpg", isNew: false },
    { id: 6, category: "phukien", sport: "dapxe", name: "Mũ Bảo Hiểm Đạp Xe GVR", price: 189000, image: "img/product_6.jpg", isNew: false },

    { id: 7, category: "ao", sport: "caulong", name: "Áo Cầu Lông Yonex Chính Hãng", price: 399000, image: "img/product_7.jpg", isNew: true },
    { id: 8, category: "giay", sport: "bongro", name: "Giày Bóng Rổ Jordan Air Max", price: 599000, image: "img/product_8.jpg", isNew: true },
    { id: 9, category: "phukien", sport: "yoga", name: "Thảm Yoga PVC Chống Trơn", price: 299000, image: "img/product_9.jpg", isNew: true },
    { id: 10, category: "phukien", sport: "bongban", name: "Vợt Bóng Bàn DHS Chính Hãng", price: 249000, image: "img/product_10.jpg", isNew: true },
    { id: 11, category: "quan", sport: "bongro", name: "Quần Bóng Rổ Nike Dri-FIT", price: 279000, image: "img/product_11.jpg", isNew: true },
    { id: 12, category: "phukien", sport: "bongchuyen", name: "Bóng Chuyền Molten Chính Hãng", price: 449000, image: "img/product_12.jpg", isNew: true }
];

const categoryMapping = {
    'quan-bong-da-nam': { category: 'quan', sport: 'bongda', title: 'Quần Bóng Đá Nam' },
    'quan-bong-ro-nam': { category: 'quan', sport: 'bongro', title: 'Quần Bóng Rổ Nam' },
    'quan-chay-bo': { category: 'quan', sport: 'chaybo', title: 'Quần Chạy Bộ' },
    'quan-tap-gym': { category: 'quan', sport: 'gym', title: 'Quần Tập Gym' },
    'quan-dap-xe': { category: 'quan', sport: 'dapxe', title: 'Quần Đạp Xe' },
    'quan-cau-long': { category: 'quan', sport: 'caulong', title: 'Quần Cầu Lông' },
    
    'ao-bong-da-nam': { category: 'ao', sport: 'bongda', title: 'Áo Bóng Đá Nam' },
    'ao-bong-ro-nam': { category: 'ao', sport: 'bongro', title: 'Áo Bóng Rổ Nam' },
    'ao-tap-luyen': { category: 'ao', sport: 'taplyuen', title: 'Áo Tập Luyện' },
    'ao-dong-phuc': { category: 'ao', sport: 'dongphuc', title: 'Áo Đồng Phục' },
    'ao-thoi-trang': { category: 'ao', sport: 'thoidung', title: 'Áo Thời Trang Thể Thao' },
    'ao-lifestyle': { category: 'ao', sport: 'lifestyle', title: 'Áo Lifestyle' },
    
    'giay-bong-da-nam': { category: 'giay', sport: 'bongda', title: 'Giày Bóng Đá Nam' },
    'giay-bong-ro-nam': { category: 'giay', sport: 'bongro', title: 'Giày Bóng Rổ Nam' },
    'giay-chay-bo': { category: 'giay', sport: 'chaybo', title: 'Giày Chạy Bộ' },
    'giay-tap-gym': { category: 'giay', sport: 'gym', title: 'Giày Tập Gym' },
    'giay-da-ngoai': { category: 'giay', sport: 'dangoai', title: 'Giày Dã Ngoại' },
    'giay-casual': { category: 'giay', sport: 'casual', title: 'Giày Casual' },
    
    'phu-kien-bong-dung-cu': { category: 'phukien', sport: 'bongdungcu', title: 'Bóng & Dụng Cụ' },
    'phu-kien-tui-balo': { category: 'phukien', sport: 'tuibalo', title: 'Túi & Balo' },
    'phu-kien-bao-ho': { category: 'phukien', sport: 'baoho', title: 'Bảo Hộ & Băng' },
    'phu-kien-vo-gang-tay': { category: 'phukien', sport: 'vogangtay', title: 'Vớ & Găng Tay' },
    'phu-kien-yoga': { category: 'phukien', sport: 'yoga', title: 'Yoga & Fitness' },
    'phu-kien-khac': { category: 'phukien', sport: 'khac', title: 'Phụ Kiện Khác' }
};

// Get current page category from filename
function getCurrentPageCategory() {
    const filename = window.location.pathname.split('/').pop().replace('.html', '');
    return categoryMapping[filename] || null;
}

// Filter products by category and sport
function getProductsByCategory(category, sport = null) {
    return allProducts.filter(product => {
        if (sport) {
            return product.category === category && product.sport === sport;
        }
        return product.category === category;
    });
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-sport="${product.sport}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
            <div class="product-image">
                <img src="../${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price.toLocaleString('vi-VN')}₫</div>
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

// Load products on category page
function loadCategoryProducts() {
    const pageCategory = getCurrentPageCategory();
    
    if (!pageCategory) {
        console.log('Generic category page');
        return;
    }
    
    // Update page title and description
    document.getElementById('categoryTitle').textContent = pageCategory.title;
    document.getElementById('categoryDesc').textContent = `Tìm kiếm ${pageCategory.title.toLowerCase()} chất lượng cao, thoải mái và độc đáo`;
    
    // Get products
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
    
    // Apply filters if they exist
    applyFilters(products);
}

// Apply filters and sorting
function applyFilters(allFilteredProducts) {
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (!priceFilter || !sortFilter) return;
    
    function updateDisplay() {
        let filtered = [...allFilteredProducts];
        
        // Price filter
        const priceValue = priceFilter.value;
        if (priceValue) {
            const [min, max] = priceValue.split('-').map(v => v ? parseInt(v) : Infinity);
            filtered = filtered.filter(p => p.price >= min && p.price <= max);
        }
        
        // Sort
        const sortValue = sortFilter.value;
        if (sortValue === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'newest') {
            filtered.sort((a, b) => b.isNew - a.isNew);
        }
        
        // Display
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCategoryProducts);
