// ============================================
// PRODUCT DETAIL MANAGER - Quản lý trang chi tiết sản phẩm
// File: js/chitiet.js
// ============================================

// Hàm lấy tên danh mục từ ID
function getCategoryName(category) {
    const categories = {
        'ao': 'Áo Thể Thao',
        'quan': 'Quần',
        'giay': 'Giày',
        'phukien': 'Phụ Kiện'
    };
    return categories[category] || 'Sản Phẩm';
}

// Hàm lấy link danh mục từ category
function getCategoryLink(category) {
    const links = {
        'ao': 'san-pham.html?category=ao',
        'quan': 'san-pham.html?category=quan',
        'giay': 'san-pham.html?category=giay',
        'phukien': 'san-pham.html?category=phukien'
    };
    return links[category] || 'san-pham.html';
}

// Hàm lấy sản phẩm từ ID (tĩnh hoặc admin)
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

// Chuyển đổi sản phẩm tĩnh thành chi tiết đầy đủ
function normalizeProduct(product) {
    if (!product) return null;
    
    // Lấy ảnh từ product.image
    let images = [];
    if (product.images && Array.isArray(product.images)) {
        images = product.images;
    } else if (product.image) {
        // Lấy ảnh chính từ product.image
        images = [product.image];
    } else {
        // Fallback: dùng ảnh mặc định
        images = ['../img/tk1.jpg'];
    }
    
    return {
        id: product.id,
        name: product.name || 'Sản phẩm',
        price: product.price || 0,
        oldPrice: product.oldPrice || null,
        discount: product.discount || null,
        category: product.category || '-',
        sport: product.sport || '-',
        rating: product.rating || 4.5,
        reviews: product.reviews || 0,
        stock: product.stock ?? 50,
        images: images,
        description: product.description || 'Sản phẩm chất lượng cao từ Trường Sport',
        features: product.features || [
            'Chất lượng đảm bảo',
            'Thiết kế thể thao năng động',
            'Giá tốt, dễ tiếp cận'
        ],
        sizes: product.sizes || ['S','M','L','XL'],
        colors: product.colors || ['Đen','Trắng','Đỏ']
    };
}

// Load thông tin sản phẩm khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    // Lấy ID từ URL parameter hoặc sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');
    
    if (!productId) {
        productId = sessionStorage.getItem('selectedProductId');
    }

    let product = null;
    
    if (productId) {
        // Tìm sản phẩm từ hàm chung
        product = findProductById(productId);
        if (product) {
            product = normalizeProduct(product);
        }
    }

    // Load chi tiết nếu tìm thấy
    if (product) {
        loadProductDetail(product);
    } else {
        alert('Không tìm thấy sản phẩm!');
        window.location.href = '../index.html';
    }

    // Cập nhật UI khác
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
    if (typeof updateUserDisplay === 'function') {
        updateUserDisplay();
    }
});

// Load chi tiết sản phẩm
function loadProductDetail(product) {
    if (!product) {
        alert('Không tìm thấy sản phẩm!');
        window.location.href = '../index.html';
        return;
    }

    // Cập nhật breadcrumb động dựa trên category
    const categoryName = getCategoryName(product.category);
    const categoryLink = getCategoryLink(product.category);
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = `
        <a href="../index.html">Trang chủ</a> / 
        <a href="../html/${categoryLink}">${categoryName}</a> / 
        <span>${product.name}</span>
    `;
    
    // Cập nhật tiêu đề trang
    document.title = product.name + ' - Trường Sport';

    // Cập nhật hình ảnh
    const mainImage = document.getElementById('mainImage');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;
    // Fallback nếu ảnh không tồn tại
    mainImage.onerror = function() {
        this.src = '../img/tk1.jpg';
    };

    // Cập nhật thumbnail images
    const thumbnailContainer = document.querySelector('.thumbnail-images');
    thumbnailContainer.innerHTML = product.images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage('${img}', ${index})">
            <img src="${img}" alt="Image ${index + 1}" onerror="this.src='../img/tk1.jpg'">
        </div>
    `).join('');

    // Cập nhật thông tin sản phẩm
    document.querySelector('.product-title').textContent = product.name;
    
    // Rating
    const stars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 !== 0;
    let starsHTML = '';
    for (let i = 0; i < stars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalf) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = Math.ceil(product.rating); i < 5; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    document.querySelector('.stars').innerHTML = starsHTML;
    document.querySelector('.rating-text').textContent = `(${product.rating}/5 - ${product.reviews} đánh giá)`;

    // Giá
    document.querySelector('.product-price').textContent = formatMoney(product.price);
    if (product.oldPrice) {
        document.querySelector('.old-price').textContent = formatMoney(product.oldPrice);
        document.querySelector('.discount-badge').textContent = `-${product.discount}%`;
    } else {
        document.querySelector('.old-price').style.display = 'none';
        document.querySelector('.discount-badge').style.display = 'none';
    }

    // Mô tả
    document.querySelector('.product-description').textContent = product.description;

    // Sizes
    const sizeContainer = document.querySelector('.size-options');
    sizeContainer.innerHTML = product.sizes.map((size, index) => 
        `<button class="option-btn ${index === 1 ? 'active' : ''}" onclick="selectSize(this)">${size}</button>`
    ).join('');

    // Colors
    const colorContainer = document.querySelector('.color-options');
    colorContainer.innerHTML = product.colors.map((color, index) => 
        `<button class="option-btn ${index === 0 ? 'active' : ''}" onclick="selectColor(this)">${color}</button>`
    ).join('');

    // Stock
    const stockText = document.querySelector('.quantity-selector span');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    if (product.stock <= 0) {
        stockText.textContent = '❌ Hết hàng';
        stockText.style.color = '#dc3545';
        document.getElementById('quantity').disabled = true;
        document.querySelectorAll('.qty-btn').forEach(btn => btn.disabled = true);
        
        // Disable buttons
        addToCartBtn.disabled = true;
        buyNowBtn.disabled = true;
        addToCartBtn.style.opacity = '0.5';
        buyNowBtn.style.opacity = '0.5';
        addToCartBtn.style.cursor = 'not-allowed';
        buyNowBtn.style.cursor = 'not-allowed';
    } else {
        stockText.textContent = `✅ Còn ${product.stock} sản phẩm`;
        stockText.style.color = '#28a745';
        document.getElementById('quantity').disabled = false;
        document.getElementById('quantity').max = product.stock;
        document.querySelectorAll('.qty-btn').forEach(btn => btn.disabled = false);
        
        // Enable buttons
        addToCartBtn.disabled = false;
        buyNowBtn.disabled = false;
        addToCartBtn.style.opacity = '1';
        buyNowBtn.style.opacity = '1';
        addToCartBtn.style.cursor = 'pointer';
        buyNowBtn.style.cursor = 'pointer';
    }

    // Tab Description
    const descTab = document.getElementById('description');
    let featuresHTML = '<h3 style="margin-bottom: 15px;">Chi Tiết Sản Phẩm</h3>';
    featuresHTML += `<p style="line-height: 1.8; color: #666;">${product.description}</p><br>`;
    featuresHTML += '<p style="line-height: 1.8; color: #666;"><strong>Đặc điểm nổi bật:</strong><br>';
    product.features.forEach(feature => {
        featuresHTML += `• ${feature}<br>`;
    });
    featuresHTML += '</p>';
    descTab.innerHTML = featuresHTML;

    // Lưu thông tin sản phẩm hiện tại vào biến toàn cục
    window.currentProduct = product;
}

// Format tiền VND
function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + '₫';
}

// Thay đổi hình ảnh chính
function changeImage(src, index) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Chọn size
function selectSize(btn) {
    document.querySelectorAll('.size-options .option-btn').forEach(b => {
        b.classList.remove('active');
    });
    btn.classList.add('active');
}

// Chọn màu
function selectColor(btn) {
    document.querySelectorAll('.color-options .option-btn').forEach(b => {
        b.classList.remove('active');
    });
    btn.classList.add('active');
}

// Tăng số lượng
function increaseQty() {
    const input = document.getElementById('quantity');
    const currentQty = parseInt(input.value);
    const maxStock = window.currentProduct ? window.currentProduct.stock : 1;
    
    if (maxStock <= 0) {
        alert('❌ Sản phẩm đã hết hàng!');
        return;
    }
    
    if (currentQty < maxStock) {
        input.value = currentQty + 1;
    } else {
        alert(`❌ Chỉ còn ${maxStock} sản phẩm trong kho!`);
    }
}

// Giảm số lượng
function decreaseQty() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Kiểm tra và điều chỉnh số lượng nhập vào
function validateQuantity() {
    const input = document.getElementById('quantity');
    let qty = parseInt(input.value);
    const maxStock = window.currentProduct ? window.currentProduct.stock : 1;
    
    if (isNaN(qty) || qty < 1) {
        input.value = 1;
    } else if (qty > maxStock) {
        alert(`❌ Số lượng không được vượt quá tồn kho (${maxStock} sản phẩm)!`);
        input.value = maxStock;
    }
}

// Hiển thị tab
function showTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// Thêm vào giỏ hàng từ trang chi tiết
function addToCartDetail() {
    if (!window.currentProduct) {
        alert('Lỗi: Không tìm thấy thông tin sản phẩm!');
        return;
    }

    const product = window.currentProduct;
    const quantity = parseInt(document.getElementById('quantity').value);
    const selectedSize = document.querySelector('.size-options .option-btn.active').textContent;
    const selectedColor = document.querySelector('.color-options .option-btn.active').textContent;

    // ✅ Kiểm tra tồn kho
    if (!product.stock || product.stock <= 0) {
        alert('❌ Sản phẩm này hiện đã hết hàng. Vui lòng quay lại sau!');
        return;
    }

    if (quantity > product.stock) {
        alert(`❌ Số lượng yêu cầu (${quantity}) vượt quá tồn kho (${product.stock} sản phẩm). Vui lòng giảm số lượng!`);
        return;
    }

    // Tạo object sản phẩm để thêm vào giỏ
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
        sport: product.sport,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        stock: product.stock
    };

    // Lấy giỏ hàng từ localStorage
    let cart = [];
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        // Nếu đã đăng nhập, lấy giỏ hàng cá nhân
        const user = JSON.parse(currentUser);
        const cartKey = `cart_${user.username}`;
        const cartData = localStorage.getItem(cartKey);
        cart = cartData ? JSON.parse(cartData) : [];
    } else {
        // Nếu chưa đăng nhập, lấy giỏ hàng chung
        const cartData = localStorage.getItem('cart');
        cart = cartData ? JSON.parse(cartData) : [];
    }
    
    // Kiểm tra sản phẩm đã có trong giỏ chưa (cùng id, size, color)
    const existingIndex = cart.findIndex(item => 
        item.id === cartItem.id && 
        item.size === cartItem.size && 
        item.color === cartItem.color
    );

    if (existingIndex > -1) {
        const newQty = cart[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
            alert(`❌ Tổng số lượng (${newQty}) vượt quá tồn kho (${product.stock} sản phẩm)!`);
            return;
        }
        cart[existingIndex].quantity = newQty;
        alert(`✅ Đã cập nhật số lượng "${product.name}" trong giỏ hàng!\n\nSize: ${selectedSize}\nMàu: ${selectedColor}\nSố lượng: ${cart[existingIndex].quantity}`);
    } else {
        cart.push(cartItem);
        alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!\n\nSize: ${selectedSize}\nMàu: ${selectedColor}\nSố lượng: ${quantity}`);
    }

    // Lưu giỏ hàng
    if (currentUser) {
        // Lưu giỏ hàng cá nhân
        const user = JSON.parse(currentUser);
        const cartKey = `cart_${user.username}`;
        localStorage.setItem(cartKey, JSON.stringify(cart));
    } else {
        // Lưu giỏ hàng chung
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Cập nhật badge
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
}

// Mua ngay - Thêm vào giỏ và chuyển đến giỏ hàng
function buyNow() {
    if (!window.currentProduct) {
        alert('Lỗi: Không tìm thấy thông tin sản phẩm!');
        return;
    }

    const product = window.currentProduct;
    const quantity = parseInt(document.getElementById('quantity').value);
    const selectedSize = document.querySelector('.size-options .option-btn.active').textContent;
    const selectedColor = document.querySelector('.color-options .option-btn.active').textContent;

    // ✅ Kiểm tra tồn kho
    if (!product.stock || product.stock <= 0) {
        alert('❌ Sản phẩm này hiện đã hết hàng. Vui lòng quay lại sau!');
        return;
    }

    if (quantity > product.stock) {
        alert(`❌ Số lượng yêu cầu (${quantity}) vượt quá tồn kho (${product.stock} sản phẩm). Vui lòng giảm số lượng!`);
        return;
    }

    // Tạo object sản phẩm để thêm vào giỏ
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
        sport: product.sport,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        stock: product.stock
    };

    // Lấy giỏ hàng từ localStorage
    let cart = [];
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        // Nếu đã đăng nhập, lấy giỏ hàng cá nhân
        const user = JSON.parse(currentUser);
        const cartKey = `cart_${user.username}`;
        const cartData = localStorage.getItem(cartKey);
        cart = cartData ? JSON.parse(cartData) : [];
    } else {
        // Nếu chưa đăng nhập, lấy giỏ hàng chung
        const cartData = localStorage.getItem('cart');
        cart = cartData ? JSON.parse(cartData) : [];
    }
    
    // Kiểm tra sản phẩm đã có trong giỏ chưa (cùng id, size, color)
    const existingIndex = cart.findIndex(item => 
        item.id === cartItem.id && 
        item.size === cartItem.size && 
        item.color === cartItem.color
    );

    if (existingIndex > -1) {
        const newQty = cart[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
            alert(`❌ Tổng số lượng (${newQty}) vượt quá tồn kho (${product.stock} sản phẩm)!`);
            return;
        }
        cart[existingIndex].quantity = newQty;
    } else {
        cart.push(cartItem);
    }

    // Lưu giỏ hàng
    if (currentUser) {
        // Lưu giỏ hàng cá nhân
        const user = JSON.parse(currentUser);
        const cartKey = `cart_${user.username}`;
        localStorage.setItem(cartKey, JSON.stringify(cart));
    } else {
        // Lưu giỏ hàng chung
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Cập nhật badge
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }

    // Chuyển đến giỏ hàng ngay lập tức
    window.location.href = '../html/giohang.html';
}
