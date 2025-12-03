// ============================================
// ORDER MANAGEMENT - Quản lý đơn hàng khách hàng
// File: js/donhang.js
// ============================================

let currentFilter = 'all';

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
    renderOrders();
});

// Kiểm tra đăng nhập
function checkLogin() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Vui lòng đăng nhập để xem đơn hàng!');
        window.location.href = 'login.html';
        return;
    }
}

// Lấy danh sách đơn hàng của khách hàng
function getUserOrders() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return [];
    
    const user = JSON.parse(currentUser);
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Lọc đơn hàng của khách hàng hiện tại
    return allOrders.filter(order => order.customerEmail === user.email);
}

// Render danh sách đơn hàng
function renderOrders() {
    const orders = getUserOrders();
    const ordersContent = document.getElementById('ordersContent');
    const emptyState = document.getElementById('emptyState');

    // Lọc theo trạng thái
    let filteredOrders = orders;
    if (currentFilter !== 'all') {
        filteredOrders = orders.filter(order => order.status === currentFilter);
    }

    // Sắp xếp theo ngày giảm dần
    filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredOrders.length === 0) {
        ordersContent.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    ordersContent.style.display = 'flex';
    emptyState.style.display = 'none';

    ordersContent.innerHTML = filteredOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-id">Đơn hàng #${order.id}</div>
                    <div style="font-size: 12px; color: #999; margin-top: 4px;">
                        ${formatDate(order.date)}
                    </div>
                </div>
                <span class="order-status status-${order.status}">
                    ${getStatusLabel(order.status)}
                </span>
            </div>

            <div class="order-info">
                <div class="info-item">
                    <div class="info-label">Giao đến</div>
                    <div class="info-value">${order.customerName}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Địa chỉ</div>
                    <div class="info-value">${order.customerAddress}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Điện thoại</div>
                    <div class="info-value">${order.customerPhone}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Số lượng sản phẩm</div>
                    <div class="info-value">${order.items.length} sản phẩm</div>
                </div>
            </div>

            <div class="order-items-preview">
                <div class="items-preview-title">Sản phẩm (${order.items.length})</div>
                <div class="items-preview-list">
                    ${order.items.slice(0, 3).map(item => `
                        <div class="item-preview">
                            ${item.name} x${item.quantity}
                        </div>
                    `).join('')}
                    ${order.items.length > 3 ? `<div class="item-preview">+${order.items.length - 3} sản phẩm khác</div>` : ''}
                </div>
            </div>

            <div class="order-total">
                <div class="total-label">Tổng tiền</div>
                <div class="total-amount">${formatMoney(order.total)}</div>
            </div>

            <div class="order-actions">
                <button class="order-btn btn-detail" onclick="showOrderDetail('${order.id}')">
                    <i class="fas fa-eye"></i> Chi Tiết
                </button>
                ${order.status === 'pending' ? `
                    <button class="order-btn btn-cancel" onclick="cancelOrder('${order.id}')">
                        <i class="fas fa-times"></i> Hủy đơn
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Lọc đơn hàng theo trạng thái
function filterOrders(status) {
    currentFilter = status;
    
    // Cập nhật active class
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderOrders();
}

// Hiển thị chi tiết đơn hàng
function showOrderDetail(orderId) {
    const orders = getUserOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Không tìm thấy đơn hàng!');
        return;
    }

    const modal = document.getElementById('orderDetailModal');
    const modalBody = document.getElementById('orderDetailBody');

    // Tạo timeline status
    const statusTimeline = `
        <div class="status-timeline">
            <div class="timeline-item ${order.status !== 'pending' ? 'completed' : ''}">
                <div class="timeline-icon">⏳</div>
                <div class="timeline-content">
                    <div class="timeline-title">Đơn hàng được tạo</div>
                    <div class="timeline-time">${formatDate(order.date)}</div>
                </div>
            </div>
            <div class="timeline-item ${order.status !== 'pending' && order.status !== 'processing' ? 'completed' : ''}">
                <div class="timeline-icon">⚙️</div>
                <div class="timeline-content">
                    <div class="timeline-title">Đang xử lý</div>
                    <div class="timeline-time">Thời gian dự kiến: 1-2 giờ</div>
                </div>
            </div>
            <div class="timeline-item ${order.status === 'shipping' || order.status === 'completed' ? 'completed' : ''}">
                <div class="timeline-icon">📦</div>
                <div class="timeline-content">
                    <div class="timeline-title">Gửi hàng</div>
                    <div class="timeline-time">Thời gian dự kiến: 1-3 ngày</div>
                </div>
            </div>
            <div class="timeline-item ${order.status === 'completed' ? 'completed' : ''}">
                <div class="timeline-icon">✅</div>
                <div class="timeline-content">
                    <div class="timeline-title">Giao hàng thành công</div>
                    <div class="timeline-time">Chủ Nhật</div>
                </div>
            </div>
        </div>
    `;

    // Tạo bảng sản phẩm
    const itemsTable = `
        <table class="order-items-table">
            <thead>
                <tr>
                    <th style="width: 50%;">Sản phẩm</th>
                    <th style="width: 15%;">Số lượng</th>
                    <th style="width: 20%;">Đơn giá</th>
                    <th style="width: 15%;">Thành tiền</th>
                </tr>
            </thead>
            <tbody>
                ${order.items.map(item => `
                    <tr>
                        <td><span class="item-name">${item.name}</span></td>
                        <td><span class="item-qty">${item.quantity}</span></td>
                        <td><span class="item-price">${formatMoney(item.price)}</span></td>
                        <td><span class="item-price">${formatMoney(item.price * item.quantity)}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    // Tính toán chi phí
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = order.shipping || 30000;
    const discount = order.discount || 0;
    const total = subtotal + shipping - discount;

    const paymentSummary = `
        <div class="payment-summary">
            <div class="summary-row">
                <span class="summary-label">Tạm tính</span>
                <span class="summary-value">${formatMoney(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Phí vận chuyển</span>
                <span class="summary-value">${formatMoney(shipping)}</span>
            </div>
            ${discount > 0 ? `
                <div class="summary-row">
                    <span class="summary-label">Giảm giá</span>
                    <span class="summary-value" style="color: #2ecc71;">-${formatMoney(discount)}</span>
                </div>
            ` : ''}
            <div class="summary-row">
                <span class="summary-label">Tổng cộng</span>
                <span class="summary-value">${formatMoney(total)}</span>
            </div>
        </div>
    `;

    modalBody.innerHTML = `
        <div class="detail-section">
            <div class="detail-section-title">Thông Tin Giao Hàng</div>
            <div class="detail-info">
                <div class="detail-item">
                    <div class="detail-item-label">Tên khách hàng</div>
                    <div class="detail-item-value">${order.customerName}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Email</div>
                    <div class="detail-item-value">${order.customerEmail}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Điện thoại</div>
                    <div class="detail-item-value">${order.customerPhone}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-label">Địa chỉ</div>
                    <div class="detail-item-value">${order.customerAddress}</div>
                </div>
            </div>
        </div>

        <div class="detail-section">
            <div class="detail-section-title">Chi Tiết Đơn Hàng</div>
            ${itemsTable}
            ${paymentSummary}
        </div>

        <div class="detail-section">
            <div class="detail-section-title">Trạng Thái Giao Hàng</div>
            ${statusTimeline}
        </div>
    `;

    modal.classList.add('active');
}

// Đóng modal chi tiết đơn hàng
function closeOrderDetail() {
    document.getElementById('orderDetailModal').classList.remove('active');
}

// Hủy đơn hàng
function cancelOrder(orderId) {
    if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex > -1) {
        orders[orderIndex].status = 'cancelled';
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('✅ Đơn hàng đã được hủy!');
        renderOrders();
    }
}

// Hàm format ngày tháng
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Hàm lấy label trạng thái
function getStatusLabel(status) {
    const labels = {
        'pending': '⏳ Đang chờ',
        'processing': '⚙️ Xử lý',
        'shipping': '📦 Gửi hàng',
        'completed': '✅ Hoàn thành',
        'cancelled': '❌ Hủy'
    };
    return labels[status] || status;
}

// Đóng modal khi click overlay
document.addEventListener('click', function(e) {
    const modal = document.getElementById('orderDetailModal');
    if (e.target === modal.querySelector('.modal-overlay')) {
        closeOrderDetail();
    }
});
