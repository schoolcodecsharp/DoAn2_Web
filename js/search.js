// ============= SEARCH FUNCTIONALITY =============

// Hàm tìm kiếm sản phẩm theo data-name
function searchProducts(keyword) {
    const lowerKeyword = keyword.toLowerCase().trim();
    
    // Lấy tất cả sản phẩm từ productsData
    let allProducts = [];
    if (typeof productsData !== 'undefined') {
        allProducts = productsData;
    }
    
    // Tìm kiếm theo name (case-insensitive)
    const results = allProducts.filter(product => {
        return product.name.toLowerCase().includes(lowerKeyword);
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
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-sport="${product.sport}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
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

// Hàm hiển thị khi không có kết quả
function displayNoResults(resultsContainer) {
    resultsContainer.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>Không tìm thấy sản phẩm</h3>
            <p>Xin lỗi, không có sản phẩm nào phù hợp với yêu cầu của bạn. Hãy thử từ khóa khác.</p>
        </div>
        <div class="search-suggestions">
            <h4>🔍 Gợi ý danh mục:</h4>
            <a href="quan-bong-da-nam.html" class="suggestion-link">👖 Quần Bóng Đá Nam</a>
            <a href="ao-bong-da-nam.html" class="suggestion-link">👕 Áo Bóng Đá Nam</a>
            <a href="giay-bong-da-nam.html" class="suggestion-link">👟 Giày Bóng Đá Nam</a>
            <a href="phukien-bong-dungcu.html" class="suggestion-link">🎒 Phụ Kiện Bóng Đá</a>
            <a href="san-pham.html" class="suggestion-link">🛒 Xem Tất Cả Sản Phẩm</a>
            <a href="../index.html" class="suggestion-link">🏠 Về Trang Chủ</a>
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

// Hàm xem chi tiết sản phẩm
function viewProductDetail(category, productId) {
    // Xác định file theo category
    const categoryFileMap = {
        'ao': 'ao-bong-da-nam.html',
        'quan': 'quan-bong-da-nam.html',
        'giay': 'giay-bong-da-nam.html',
        'phukien': 'phukien-bong-dungcu.html'
    };
    
    const fileName = categoryFileMap[category];
    if (fileName) {
        // Lưu product ID vào sessionStorage để trang chi tiết có thể truy cập
        sessionStorage.setItem('viewProductId', productId);
        window.location.href = fileName;
    }
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
