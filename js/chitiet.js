// ============================================
// PRODUCT DETAIL MANAGER - Quản lý trang chi tiết sản phẩm
// File: js/product-detail.js
// ============================================

// Dữ liệu sản phẩm (có thể lấy từ database sau này)
const productsData = {
    1: {
        id: 1,
        name: "Quần Áo Bóng Đá Thiết Kế RO-25 Màu Đỏ",
        price: 119000,
        oldPrice: 159000,
        discount: 25,
        category: "Áo",
        sport: "Bóng Đá",
        rating: 4.5,
        reviews: 128,
        stock: 50,
        images: ["../img/tk1.jpg", "../img/tk1.jpg", "../img/tk1.jpg", "../img/tk1.jpg"],
        description: "Bộ quần áo bóng đá thiết kế cao cấp, chất liệu vải thể thao chuyên dụng, thấm hút mồ hôi tốt, thoáng mát. Thiết kế trẻ trung, năng động, phù hợp cho cả tập luyện và thi đấu.",
        features: [
            "Chất liệu: 100% Polyester cao cấp",
            "Công nghệ thấm hút mồ hôi Dri-FIT",
            "Thiết kế ôm body tôn dáng",
            "Màu sắc bền đẹp, không phai",
            "Phù hợp mọi điều kiện thời tiết"
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Đỏ", "Xanh", "Vàng", "Đen"]
    },
    2: {
        id: 2,
        name: "Áo Bóng Rổ Nike Chính Hãng",
        price: 259000,
        oldPrice: 329000,
        discount: 21,
        category: "Áo",
        sport: "Bóng Rổ",
        rating: 4.8,
        reviews: 95,
        stock: 35,
        images: ["../img/aobongro.jpeg", "../img/aobongro1.jpeg", "../img/aobongro2.jpeg", "../img/aobongro3.jpeg"],
        description: "Áo bóng rổ Nike chính hãng với chất liệu cao cấp, thiết kế thể thao năng động, thoáng mát và bền đẹp.",
        features: [
            "Thương hiệu: Nike",
            "Chất liệu: Polyester thoáng khí",
            "Công nghệ Dri-FIT",
            "Form áo rộng thoải mái",
            "Chính hãng 100%"
        ],
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Xanh", "Đỏ", "Trắng", "Đen"]
    },
    3: {
        id: 3,
        name: "Giày Đá Bóng Kamito Velocidad",
        price: 499000,
        oldPrice: 699000,
        discount: 29,
        category: "Giày",
        sport: "Bóng Đá",
        rating: 4.7,
        reviews: 156,
        stock: 42,
        images: ["../img/tk1.webp", "../img/tk1.webp", "../img/tk1.jpg", "../img/tk1.webp"],
        description: "Giày đá bóng Kamito Velocidad với thiết kế hiện đại, độ bám sân tốt, mang lại cảm giác thoải mái tối đa khi chơi bóng.",
        features: [
            "Đế giày cao su chống trượt",
            "Thiết kế ôm chân",
            "Trọng lượng nhẹ",
            "Độ bền cao",
            "Phù hợp sân cỏ tự nhiên và nhân tạo"
        ],
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["Đen", "Xanh", "Trắng"]
    },
    4: {
        id: 4,
        name: "Phụ Kiện Bóng Chuyền - Băng Cổ Tay",
        price: 69000,
        oldPrice: 89000,
        discount: 22,
        category: "Phụ Kiện",
        sport: "Bóng Chuyền",
        rating: 4.3,
        reviews: 87,
        stock: 100,
        images: ["../img/bct1.webp", "../img/bct2.webp", "../img/bct3.webp", "../img/bct4.webp"],
        description: "Băng cổ tay thể thao chuyên dụng cho bóng chuyền, thấm hút mồ hôi tốt, co giãn thoải mái.",
        features: [
            "Chất liệu cotton cao cấp",
            "Thấm hút mồ hôi tốt",
            "Co giãn 4 chiều",
            "Nhiều màu sắc",
            "Giặt máy được"
        ],
        sizes: ["Free Size"],
        colors: ["Đỏ", "Xanh", "Vàng", "Trắng", "Đen"]
    },
    5: {
        id: 5,
        name: "Quần Chạy Bộ Adidas Climacool",
        price: 349000,
        oldPrice: 449000,
        discount: 22,
        category: "Quần",
        sport: "Chạy Bộ",
        rating: 4.6,
        reviews: 112,
        stock: 45,
        images: ["../img/product_5.jpg", "../img/product_11.jpg", "../img/tk1.jpg", "../img/product_2.jpg"],
        description: "Quần chạy bộ Adidas với công nghệ Climacool, thoáng mát, co giãn tốt, phù hợp cho việc tập luyện và chạy marathon.",
        features: [
            "Công nghệ Climacool",
            "Chất liệu co giãn 4 chiều",
            "Túi khóa kéo an toàn",
            "Thấm hút mồ hôi",
            "Form dáng thể thao"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Đen", "Xám", "Xanh Navy"]
    }
};

// Load thông tin sản phẩm khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    // Lấy ID sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId && productsData[productId]) {
        loadProductDetail(productId);
    } else {
        // Nếu không có ID hoặc ID không hợp lệ, load sản phẩm mặc định
        loadProductDetail(1);
    }

    // Cập nhật cart badge và user display
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
    if (typeof updateUserDisplay === 'function') {
        updateUserDisplay();
    }
});

// Load chi tiết sản phẩm
function loadProductDetail(productId) {
    const product = productsData[productId];
    
    if (!product) {
        alert('Không tìm thấy sản phẩm!');
        window.location.href = '../index.html';
        return;
    }

    // Cập nhật breadcrumb
    document.querySelector('.breadcrumb span').textContent = product.name;
    
    // Cập nhật tiêu đề trang
    document.title = product.name + ' - Trường Sport';

    // Cập nhật hình ảnh
    const mainImage = document.getElementById('mainImage');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;

    // Cập nhật thumbnail images
    const thumbnailContainer = document.querySelector('.thumbnail-images');
    thumbnailContainer.innerHTML = product.images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage('${img}', ${index})">
            <img src="${img}" alt="Image ${index + 1}">
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
    document.querySelector('.quantity-selector span').textContent = `Còn ${product.stock} sản phẩm`;

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
    const maxStock = window.currentProduct ? window.currentProduct.stock : 50;
    
    if (currentQty < maxStock) {
        input.value = currentQty + 1;
    } else {
        alert(`⚠️ Chỉ còn ${maxStock} sản phẩm trong kho!`);
    }
}

// Giảm số lượng
function decreaseQty() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
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
        quantity: quantity
    };

    // Lấy giỏ hàng hiện tại
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Kiểm tra sản phẩm đã có trong giỏ chưa (cùng id, size, color)
    const existingIndex = cart.findIndex(item => 
        item.id === cartItem.id && 
        item.size === cartItem.size && 
        item.color === cartItem.color
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
        alert(`✅ Đã cập nhật số lượng "${product.name}" trong giỏ hàng!\n\nSize: ${selectedSize}\nMàu: ${selectedColor}\nSố lượng: ${cart[existingIndex].quantity}`);
    } else {
        cart.push(cartItem);
        alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!\n\nSize: ${selectedSize}\nMàu: ${selectedColor}\nSố lượng: ${quantity}`);
    }

    // Lưu giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cập nhật badge
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
}

// Mua ngay
function buyNow() {
    // Thêm vào giỏ hàng trước
    addToCartDetail();
    
    // Chuyển đến trang giỏ hàng
    setTimeout(() => {
        window.location.href = '../html/giohang.html';
    }, 500);
}