// ============================================
// CART MANAGER - Quản lý giỏ hàng
// File: js/giohang.js
// ============================================

// Lấy giỏ hàng từ localStorage
function getCart() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}

// Lưu giỏ hàng vào localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Cập nhật badge số lượng giỏ hàng
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = totalItems;
    });
}

// Format tiền VND
function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + '₫';
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    const product = document.querySelector(`[data-id="${productId}"]`);
    if (!product) {
        alert('Không tìm thấy sản phẩm!');
        return;
    }

    const productData = {
        id: product.getAttribute('data-id'),
        name: product.getAttribute('data-name'),
        price: parseInt(product.getAttribute('data-price')),
        image: product.getAttribute('data-image'),
        category: product.getAttribute('data-category'),
        sport: product.getAttribute('data-sport'),
        size: 'M', // Mặc định size M
        quantity: 1
    };

    let cart = getCart();
    
    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingIndex = cart.findIndex(item => 
        item.id === productData.id && item.size === productData.size
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
        alert(`✅ Đã tăng số lượng "${productData.name}" trong giỏ hàng!`);
    } else {
        cart.push(productData);
        alert(`✅ Đã thêm "${productData.name}" vào giỏ hàng!`);
    }

    saveCart(cart);
}

// Xem chi tiết sản phẩm - HÀM MỚI
function viewDetails(productId) {
    // Kiểm tra xem đang ở trang nào
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/html/')) {
        // Đang ở trong thư mục html (giohang.html, login.html...)
        window.location.href = `product-detail.html?id=${productId}`;
    } else {
        // Đang ở trang chủ (index.html)
        window.location.href = `html/product-detail.html?id=${productId}`;
    }
}

// Render giỏ hàng
function renderCart() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;

    let cart = getCart();
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fa fa-shopping-cart"></i>
                <h2>Giỏ hàng của bạn đang trống</h2>
                <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                <a href="../index.html" class="shop-now-btn">Mua sắm ngay</a>
            </div>
        `;
        return;
    }

    // Tính toán
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 500000 ? 0 : 30000;
    const discount = 0;
    const total = subtotal + shipping - discount;

    // Render sản phẩm
    let cartItemsHTML = '';
    cart.forEach((item, index) => {
        cartItemsHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-details">Size: ${item.size}</div>
                    <div class="item-price">${formatMoney(item.price)}</div>
                </div>
                <div class="item-actions">
                    <button class="remove-btn" onclick="removeItem(${index})" title="Xóa sản phẩm">
                        <i class="fa fa-trash"></i>
                    </button>
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" readonly>
                        <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartContent.innerHTML = `
        <div class="cart-content">
            <div class="cart-items">
                ${cartItemsHTML}
            </div>
            
            <div class="cart-summary">
                <div class="summary-title">Tóm tắt đơn hàng</div>
                
                <div class="summary-row">
                    <span class="summary-label">Tạm tính:</span>
                    <span class="summary-value">${formatMoney(subtotal)}</span>
                </div>
                
                <div class="summary-row">
                    <span class="summary-label">Phí vận chuyển:</span>
                    <span class="summary-value">${shipping === 0 ? 'Miễn phí' : formatMoney(shipping)}</span>
                </div>
                
                <div class="coupon-section">
                    <label class="summary-label">Mã giảm giá:</label>
                    <div class="coupon-input">
                        <input type="text" placeholder="Nhập mã giảm giá" id="couponInput">
                        <button class="coupon-btn" onclick="applyCoupon()">Áp dụng</button>
                    </div>
                </div>
                
                <div class="summary-row">
                    <span class="summary-label">Tổng cộng:</span>
                    <span class="summary-value summary-total">${formatMoney(total)}</span>
                </div>
                
                <button class="checkout-btn" onclick="checkout()">
                    <i class="fa fa-credit-card"></i> Tiến hành thanh toán
                </button>
                
                <div class="continue-shopping">
                    <a href="../index.html"><i class="fa fa-arrow-left"></i> Tiếp tục mua sắm</a>
                </div>
            </div>
        </div>
    `;
}

// Cập nhật số lượng sản phẩm
function updateQuantity(index, change) {
    let cart = getCart();
    cart[index].quantity += change;
    
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    
    saveCart(cart);
    renderCart();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        let cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    }
}

// Áp dụng mã giảm giá
function applyCoupon() {
    const couponInput = document.getElementById('couponInput');
    const couponCode = couponInput ? couponInput.value.trim().toUpperCase() : '';
    
    if (couponCode === '') {
        alert('⚠️ Vui lòng nhập mã giảm giá!');
        return;
    }

    const validCoupons = {
        'GIAM10': 'Giảm 10%',
        'GIAM50K': 'Giảm 50.000₫',
        'FREESHIP': 'Miễn phí vận chuyển'
    };

    if (validCoupons[couponCode]) {
        alert(`✅ Áp dụng mã "${couponCode}" thành công!\n${validCoupons[couponCode]}`);
        couponInput.value = '';
    } else {
        alert('❌ Mã giảm giá không hợp lệ!');
    }
}

// Thanh toán - Yêu cầu đăng nhập
function checkout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        alert('⚠️ Giỏ hàng của bạn đang trống!');
        return;
    }

    // Kiểm tra đăng nhập
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        if (confirm('❌ Bạn cần đăng nhập để thanh toán!\n\nBấm OK để chuyển đến trang đăng nhập.')) {
            window.location.href = '../html/login.html';
        }
        return;
    }

    const user = JSON.parse(currentUser);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 500000 ? 0 : 30000;
    const total = subtotal + shipping;

    const orderSummary = `
✅ XÁC NHẬN ĐẶT HÀNG

Khách hàng: ${user.fullName}
Email: ${user.email}

Số lượng: ${cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm
Tạm tính: ${formatMoney(subtotal)}
Vận chuyển: ${shipping === 0 ? 'Miễn phí' : formatMoney(shipping)}
━━━━━━━━━━━━━━━━━━━━
TỔNG: ${formatMoney(total)}

Xác nhận đặt hàng?
    `;

    if (confirm(orderSummary)) {
        // Lưu đơn hàng vào localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderId = 'OD' + Date.now();
        const newOrder = {
            id: orderId,
            user: { fullName: user.fullName, email: user.email, username: user.username },
            items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, size: i.size, image: i.image })),
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));

        alert('✅ Đặt hàng thành công!\nCảm ơn bạn đã mua hàng tại TRƯỜNG SPORT.');
        localStorage.removeItem('cart');
        updateCartBadge();
        renderCart();
    }
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    
    if (document.getElementById('cartContent')) {
        renderCart();
    }
});
