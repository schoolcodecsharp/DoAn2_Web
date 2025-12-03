// ============================================
// VOUCHER PAGE - Mã giảm giá khách hàng
// ============================================

let currentVoucherFilter = 'all';
let updateCheckInterval;

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    renderVouchers();
    startAutoRefresh();
});

// Dừng auto refresh khi rời khỏi trang
window.addEventListener('beforeunload', function() {
    if (updateCheckInterval) {
        clearInterval(updateCheckInterval);
    }
});

// Bắt đầu tự động kiểm tra cập nhật từ admin
function startAutoRefresh() {
    let lastVouchersData = JSON.stringify(localStorage.getItem('vouchers'));
    
    updateCheckInterval = setInterval(function() {
        const currentVouchersData = JSON.stringify(localStorage.getItem('vouchers'));
        
        // Nếu dữ liệu vouchers thay đổi, render lại
        if (currentVouchersData !== lastVouchersData) {
            lastVouchersData = currentVouchersData;
            renderVouchers();
        }
    }, 2000); // Check mỗi 2 giây
}

// Lấy danh sách mã giảm giá
function getActiveVouchers() {
    const vouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
    const now = new Date();
    
    // Lọc những mã giảm giá còn hoạt động
    return vouchers.filter(v => {
        const expiry = new Date(v.expiry);
        return expiry >= now && v.quantity > 0;
    });
}

// Render mã giảm giá
function renderVouchers() {
    const vouchers = getActiveVouchers();
    const vouchersContent = document.getElementById('vouchersContent');
    const emptyState = document.getElementById('emptyState');

    // Lọc theo loại
    let filteredVouchers = vouchers;
    if (currentVoucherFilter !== 'all') {
        filteredVouchers = vouchers.filter(v => v.type === currentVoucherFilter);
    }

    // Sắp xếp theo ngày hết hạn
    filteredVouchers.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));

    if (filteredVouchers.length === 0) {
        vouchersContent.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    vouchersContent.style.display = 'grid';
    emptyState.style.display = 'none';

    vouchersContent.innerHTML = filteredVouchers.map(voucher => {
        const status = getVoucherStatus(voucher);
        const statusClass = getVoucherStatusClass(voucher);
        const minOrderText = voucher.minOrder > 0 ? `Từ ${formatMoney(voucher.minOrder)}` : 'Không có';
        
        return `
            <div class="voucher-card">
                <div class="voucher-card-header">
                    <div class="voucher-code">${voucher.code}</div>
                    <div class="voucher-discount">
                        ${voucher.type === 'percent' ? voucher.value + '%' : formatMoney(voucher.value)}
                    </div>
                    <div class="voucher-description">${voucher.description}</div>
                </div>

                <div class="voucher-card-body">
                    <div class="voucher-status status-${statusClass}">${status}</div>
                    
                    <div class="voucher-detail">
                        <span class="voucher-detail-label">Điều kiện:</span>
                        <span class="voucher-detail-value voucher-min-order">${minOrderText}</span>
                    </div>

                    <div class="voucher-detail">
                        <span class="voucher-detail-label">Hết hạn:</span>
                        <span class="voucher-detail-value voucher-expiry">${new Date(voucher.expiry).toLocaleDateString('vi-VN')}</span>
                    </div>

                    <div class="voucher-detail">
                        <span class="voucher-detail-label">Còn lại:</span>
                        <span class="voucher-detail-value">${voucher.quantity} cái</span>
                    </div>
                </div>

                <div class="voucher-card-footer">
                    <button class="voucher-btn voucher-btn-copy" onclick="useVoucherNow('${voucher.code}')">
                        <i class="fas fa-shopping-cart"></i> Dùng Ngay
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Lọc mã giảm giá
function filterVouchers(type) {
    currentVoucherFilter = type;
    
    // Cập nhật active class
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderVouchers();
}

// Sao chép mã giảm giá
function copyVoucherCode(code) {
    // Copy vào clipboard
    navigator.clipboard.writeText(code).then(() => {
        // Hiển thị toast thông báo
        showCopyToast(`Đã sao chép mã: ${code}`);
        
        // Thay đổi nút
        const btn = event.target.closest('.voucher-btn-copy');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Đã Sao Chép';
        btn.disabled = true;
        
        // Khôi phục nút sau 2 giây
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.disabled = false;
        }, 2000);
        
        // Redirect to cart after 1 second
        setTimeout(() => {
            showCopyToast('🛒 Chuyển đến giỏ hàng...');
            setTimeout(() => {
                window.location.href = 'giohang.html';
            }, 500);
        }, 1000);
    }).catch(() => {
        alert('Lỗi khi sao chép mã!');
    });
}

// Dùng mã giảm giá ngay
function useVoucherNow(code) {
    // Lưu mã giảm giá vào sessionStorage để trang giohang.html dùng
    sessionStorage.setItem('voucherToApply', code);
    
    // Hiển thị toast thông báo
    showCopyToast(`✅ Sẽ áp dụng mã ${code} khi tới giỏ hàng`);
    
    // Redirect to cart
    setTimeout(() => {
        window.location.href = 'giohang.html';
    }, 500);
}

// Hiển thị toast thông báo
function showCopyToast(message) {
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(toast);
    
    // Xóa toast sau 2 giây
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// Lấy trạng thái mã giảm giá
function getVoucherStatus(voucher) {
    const now = new Date();
    const expiry = new Date(voucher.expiry);
    
    if (expiry < now) return 'Hết hạn';
    if (voucher.quantity <= 0) return 'Đã dùng hết';
    return 'Có hiệu lực';
}

// Lấy class trạng thái
function getVoucherStatusClass(voucher) {
    const now = new Date();
    const expiry = new Date(voucher.expiry);
    
    if (expiry < now) return 'expired';
    if (voucher.quantity <= 0) return 'depleted';
    return 'active';
}

// Format tiền
function formatMoney(amount) {
    return (amount || 0).toLocaleString('vi-VN') + '₫';
}

// Lắng nghe sự thay đổi từ localStorage (cập nhật cross-tab)
window.addEventListener('storage', function(e) {
    if (e.key === 'vouchers') {
        renderVouchers();
    }
});
