// ============================================
// CART MANAGER - Quản lý giỏ hàng
// File: js/giohang.js
// ============================================

// Lấy giỏ hàng từ localStorage
function getCart() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return [];
    
    const user = JSON.parse(currentUser);
    const cartKey = `cart_${user.username}`;
    const cartData = localStorage.getItem(cartKey);
    return cartData ? JSON.parse(cartData) : [];
}

// Lưu giỏ hàng vào localStorage
function saveCart(cart) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const user = JSON.parse(currentUser);
    const cartKey = `cart_${user.username}`;
    localStorage.setItem(cartKey, JSON.stringify(cart));
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

    // Kiểm tra đã login chưa
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fa fa-user"></i>
                <h2>Vui lòng đăng nhập</h2>
                <p>Bạn cần đăng nhập để xem giỏ hàng</p>
                <a href="../html/login.html" class="shop-now-btn">Đăng nhập ngay</a>
            </div>
        `;
        return;
    }

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
    
    // Get applied voucher
    let discount = 0;
    const appliedVoucher = JSON.parse(sessionStorage.getItem('appliedVoucher'));
    if (appliedVoucher) {
        discount = appliedVoucher.discount;
    }
    
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

                <div class="voucher-section">
                    <div class="voucher-input">
                        <input type="text" id="voucherCode" placeholder="Nhập mã giảm giá" class="voucher-code-input">
                        <button onclick="applyVoucher()" class="voucher-apply-btn">
                            <i class="fas fa-ticket-alt"></i> Áp dụng
                        </button>
                    </div>
                    <div id="voucherMessage"></div>
                </div>
                
                ${appliedVoucher ? `
                <div class="summary-row discount-row">
                    <span class="summary-label">Giảm giá (${appliedVoucher.code}):</span>
                    <span class="summary-value discount-value">-${formatMoney(discount)}</span>
                </div>
                ` : ''}
                
                <div class="summary-row total-row">
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
function applyVoucher() {
    const voucherInput = document.getElementById('voucherCode');
    const code = voucherInput.value.trim().toUpperCase();
    const voucherMessage = document.getElementById('voucherMessage');
    
    if (code === '') {
        showVoucherMessage('⚠️ Vui lòng nhập mã giảm giá!', 'error');
        return;
    }

    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
    
    // Convert to uppercase to match stored codes
    const codeUpper = code.toUpperCase();
    const voucher = vouchers.find(v => v.code.toUpperCase() === codeUpper);

    if (!voucher) {
        showVoucherMessage('❌ Mã giảm giá không tồn tại!', 'error');
        return;
    }

    const now = new Date();
    const expiry = new Date(voucher.expiry);
    
    if (expiry < now) {
        showVoucherMessage('❌ Mã giảm giá đã hết hạn!', 'error');
        return;
    }

    if (voucher.quantity <= 0) {
        showVoucherMessage('❌ Mã giảm giá đã hết lượt sử dụng!', 'error');
        return;
    }

    if (voucher.minOrder > 0 && subtotal < voucher.minOrder) {
        showVoucherMessage(`❌ Đơn hàng tối thiểu ${formatMoney(voucher.minOrder)} để sử dụng mã này!`, 'error');
        return;
    }

    // Calculate discount
    let discountAmount;
    if (voucher.type === 'percent') {
        discountAmount = Math.floor(subtotal * (voucher.value / 100));
    } else {
        discountAmount = voucher.value;
    }

    // Save applied voucher to cart session
    sessionStorage.setItem('appliedVoucher', JSON.stringify({
        code: voucher.code,
        discount: discountAmount
    }));

    // Update voucher quantity - find the right index and update
    const voucherIndex = vouchers.findIndex(v => v.code.toUpperCase() === codeUpper);
    if (voucherIndex >= 0) {
        vouchers[voucherIndex].quantity--;
        localStorage.setItem('vouchers', JSON.stringify(vouchers));
    }

    showVoucherMessage(`✅ Áp dụng mã giảm giá thành công! Giảm ${formatMoney(discountAmount)}`, 'success');
    renderCart(); // Re-render cart to show updated prices
}

function showVoucherMessage(message, type) {
    const voucherMessage = document.getElementById('voucherMessage');
    voucherMessage.textContent = message;
    voucherMessage.className = type;
    setTimeout(() => {
        voucherMessage.textContent = '';
        voucherMessage.className = '';
    }, 5000);
}

// Thanh toán - Hiển thị Modal
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

    // Kiểm tra thông tin cá nhân
    const currentUserObj = JSON.parse(currentUser);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === currentUserObj.username);
    
    if (!user) {
        alert('❌ Không tìm thấy thông tin người dùng!');
        return;
    }
    
    // Kiểm tra từng trường thông tin
    const missingFields = [];
    if (!user.fullName || user.fullName.trim() === '') missingFields.push('Họ tên');
    if (!user.email || user.email.trim() === '') missingFields.push('Email');
    if (!user.phone || user.phone.trim() === '') missingFields.push('Số điện thoại');
    if (!user.address || user.address.trim() === '') missingFields.push('Địa chỉ');
    
    if (missingFields.length > 0) {
        const message = `❌ Bạn cần cập nhật đầy đủ thông tin cá nhân:\n\n✗ ${missingFields.join('\n✗ ')}\n\nBấm OK để chuyển đến trang cập nhật thông tin.`;
        if (confirm(message)) {
            window.location.href = '../html/profile.html';
        }
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 500000 ? 0 : 30000;
    
    // Get applied voucher
    let discount = 0;
    let appliedVoucher = null;
    const savedVoucher = JSON.parse(sessionStorage.getItem('appliedVoucher'));
    if (savedVoucher) {
        discount = savedVoucher.discount;
        appliedVoucher = savedVoucher;
    }
    
    const total = subtotal + shipping - discount;

    // Populate modal with data
    document.getElementById('checkoutFullName').value = user.fullName;
    document.getElementById('checkoutEmail').value = user.email;
    document.getElementById('checkoutPhone').value = user.phone;
    document.getElementById('checkoutCity').value = user.city || 'Chưa cập nhật';
    document.getElementById('checkoutAddress').value = user.address;
    
    document.getElementById('checkoutSubtotal').textContent = formatMoney(subtotal);
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'Miễn phí' : formatMoney(shipping);
    document.getElementById('checkoutTotal').textContent = formatMoney(total);
    
    if (appliedVoucher) {
        document.getElementById('checkoutDiscountRow').style.display = 'flex';
        document.getElementById('checkoutDiscount').textContent = '-' + formatMoney(discount);
    } else {
        document.getElementById('checkoutDiscountRow').style.display = 'none';
    }

    // Store checkout data for confirmation
    window.checkoutData = {
        user: user,
        cart: cart,
        subtotal: subtotal,
        shipping: shipping,
        discount: discount,
        appliedVoucher: appliedVoucher,
        total: total
    };

    // Show modal
    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function confirmCheckout() {
    const data = window.checkoutData;
    
    // Lưu đơn hàng vào localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderId = 'OD' + Date.now();
    const newOrder = {
        id: orderId,
        user: { 
            fullName: data.user.fullName, 
            email: data.user.email, 
            username: data.user.username, 
            phone: data.user.phone, 
            address: data.user.address 
        },
        items: data.cart.map(i => ({ 
            id: i.id, 
            name: i.name, 
            price: i.price, 
            quantity: i.quantity, 
            size: i.size, 
            image: i.image 
        })),
        subtotal: data.subtotal,
        shipping: data.shipping,
        discount: data.discount,
        voucher: data.appliedVoucher,
        total: data.total,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear the applied voucher
    sessionStorage.removeItem('appliedVoucher');

    // Close modal
    closeCheckoutModal();
    
    alert('✅ Đặt hàng thành công!\n\nMã đơn hàng: ' + orderId + '\n\nCảm ơn bạn đã mua hàng tại TRƯỜNG SPORT.');
    
    // Clear cart for current user
    const currentUserObj = JSON.parse(localStorage.getItem('currentUser'));
    const cartKey = `cart_${currentUserObj.username}`;
    localStorage.removeItem(cartKey);
    updateCartBadge();
    
    if (document.getElementById('cartContent')) {
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
