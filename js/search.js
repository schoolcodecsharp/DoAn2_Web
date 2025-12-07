// ============= SEARCH FUNCTIONALITY =============

// Hàm lấy tất cả sản phẩm (tĩnh + admin)
function getAllProductsForSearch() {
    let allProducts = [];
    
    // Lấy sản phẩm tĩnh
    if (typeof productsData !== 'undefined' && Array.isArray(productsData)) {
        allProducts = [...productsData];
    }
    
    // Lấy sản phẩm admin
    const adminProducts = JSON.parse(localStorage.getItem('products')) || [];
    allProducts = [...allProducts, ...adminProducts];
    
    return allProducts;
}

// Hàm tìm kiếm sản phẩm theo name, sport, category - TOÀN DIỆN
function searchProducts(keyword) {
    const lowerKeyword = keyword.toLowerCase().trim();
    const allProducts = getAllProductsForSearch();
    
    // Mapping tên Vietnamese sang English - CHO TẤT CẢ CATEGORIES
    const categoryVieMap = {
        'quần': 'Quần',
        'áo': 'Áo',
        'ao': 'Áo',
        'giày': 'Giày',
        'giay': 'Giày',
        'phụ kiện': 'Phụ Kiện',
        'phukien': 'Phụ Kiện',
        'phụ kiến': 'Phụ Kiện'
    };
    
    // Mapping tên Vietnamese sang English - CHO TẤT CẢ SPORTS
    const sportVieMap = {
        // Chung
        'bóng đá': 'Bóng Đá',
        'bongda': 'Bóng Đá',
        'bóng rổ': 'Bóng Rổ',
        'bongro': 'Bóng Rổ',
        'chạy bộ': 'Chạy Bộ',
        'chaybo': 'Chạy Bộ',
        'tập gym': 'Tập Gym',
        'tapgym': 'Tập Gym',
        'đạp xe': 'Đạp Xe',
        'dapxe': 'Đạp Xe',
        'cầu lông': 'Cầu Lông',
        'caulong': 'Cầu Lông',
        
        // Giày
        'dã ngoài': 'Dã Ngoài',
        'dangoai': 'Dã Ngoài',
        'casual': 'Casual',
        
        // Áo
        'tập luyện': 'Tập Luyện',
        'taplyuen': 'Tập Luyện',
        'đồng phục': 'Đồng Phục',
        'dongphuc': 'Đồng Phục',
        'lifestyle': 'Lifestyle',
        
        // Phụ kiện
        'bóng': 'Bóng & Dụng Cụ',
        'túi': 'Túi & Balo',
        'bảo hộ': 'Bảo Hộ',
        'vớ': 'Vớ & Găng',
        'yoga': 'Yoga & Fitness',
        'khác': 'Khác'
    };
    
    // Tìm kiếm - LOGIC TOÀN DIỆN
    const results = allProducts.filter(product => {
        const name = product.name ? product.name.toLowerCase() : '';
        const category = product.category ? product.category.toLowerCase() : '';
        const sport = product.sport ? product.sport.toLowerCase() : '';
        
        // 1. Tìm kiếm theo TÊN sản phẩm
        if (name.includes(lowerKeyword)) {
            return true;
        }
        
        // 2. Tìm kiếm theo CATEGORY (code hoặc tiếng Việt)
        if (category.includes(lowerKeyword)) {
            return true;
        }
        
        if (categoryVieMap[lowerKeyword] && category.includes(categoryVieMap[lowerKeyword].toLowerCase())) {
            return true;
        }
        
        // 3. Tìm kiếm theo SPORT/LOẠI (code hoặc tiếng Việt)
        if (sport.includes(lowerKeyword)) {
            return true;
        }
        
        if (sportVieMap[lowerKeyword] && sport.includes(sportVieMap[lowerKeyword].toLowerCase())) {
            return true;
        }
        
        // 4. Tìm kiếm từ khóa chứa category hoặc sport
        if (lowerKeyword.includes(category) || category.includes(lowerKeyword)) {
            return true;
        }
        
        if (lowerKeyword.includes(sport) || sport.includes(lowerKeyword)) {
            return true;
        }
        
        // 5. Tìm kiếm theo thương hiệu (Nike, Adidas, Puma, v.v.)
        const brands = ['nike', 'adidas', 'puma', 'reebok', 'asics', 'new balance', 'under armour', 'lululemon', 'vans', 'converse', 'timberland', 'skechers', 'dc shoes', 'lacoste', 'yonex', 'victor', 'lining', 'babolat', 'dunlop', 'spalding', 'peak', 'joma', 'shimano', 'merrell', 'salomon', 'keen', 'columbia', 'the north face'];
        
        for (let brand of brands) {
            if (lowerKeyword === brand && name.includes(brand)) {
                return true;
            }
        }
        
        return false;
    });
    
    return results;
}

// Hàm hiển thị kết quả tìm kiếm
function displayResults(products, keyword) {
    const resultsContainer = document.getElementById('resultsContainer');
    const searchTerm = document.getElementById('searchTerm');
    
    searchTerm.textContent = `"${keyword}"`;
    
    if (products.length === 0) {
        displayNoResults(resultsContainer);
        return;
    }
    
    let html = '';
    
    products.forEach(product => {
        html += createProductCard(product);
    });
    
    resultsContainer.innerHTML = html;
}

// Hàm tạo card sản phẩm (giống index.html)
function createProductCard(product) {
    // Xử lý đường dẫn ảnh
    let imagePath = product.image || 'img/logo2.png';
    if (!imagePath.startsWith('http')) {
        // Nếu là ảnh admin (đã chứa ../)
        if (imagePath.startsWith('../')) {
            // Đã ở trang search.html trong html/ -> không cần thêm ../
            imagePath = imagePath;
        } else if (imagePath.startsWith('img/')) {
            // Ảnh tĩnh từ homepage cần thêm ../
            imagePath = imagePath;
        } else {
            // Fallback
            imagePath = 'img/' + imagePath;
        }
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

// Hàm hiển thị khi không có kết quả
function displayNoResults(resultsContainer) {
    resultsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px;">
            <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
            <h3 style="color: #666; margin: 20px 0;">Không tìm thấy sản phẩm</h3>
            <p style="color: #999; margin-bottom: 30px;">Xin lỗi, không có sản phẩm nào phù hợp với yêu cầu của bạn. Hãy thử từ khóa khác.</p>
            <div style="margin-top: 20px;">
                <a href="san-pham.html" style="background: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 5px;">Xem Tất Cả Sản Phẩm</a>
                <a href="../index.html" style="background: #6c757d; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin: 5px;">Về Trang Chủ</a>
            </div>
        </div>
    `;
}

// Hàm xử lý form submit
function handleSearch(event) {
    event.preventDefault();
    const keyword = document.getElementById('searchInput').value;
    
    if (keyword.trim() === '') {
        alert('Vui lòng nhập từ khóa tìm kiếm');
        return;
    }
    
    const results = searchProducts(keyword);
    displayResults(results, keyword);
}

// Hàm xử lý chuyển hướng tìm kiếm từ các trang khác
function handleSearchRedirect(event) {
    event.preventDefault();
    const keyword = document.getElementById('searchInput').value.trim();
    
    if (keyword === '') {
        alert('Vui lòng nhập từ khóa tìm kiếm');
        return;
    }
    
    // Chuyển hướng đến trang tìm kiếm
    window.location.href = 'search.html?q=' + encodeURIComponent(keyword);
}

// Initialize on page load
window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('q');
    
    if (keyword) {
        document.getElementById('searchInput').value = keyword;
        const results = searchProducts(keyword);
        displayResults(results, keyword);
    }
});

// Menu dropdown
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.has-submenu').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const submenu = this.querySelector('.submenu');
            if (submenu) submenu.style.display = 'block';
        });
        item.addEventListener('mouseleave', function() {
            const submenu = this.querySelector('.submenu');
            if (submenu) submenu.style.display = 'none';
        });
    });
});
