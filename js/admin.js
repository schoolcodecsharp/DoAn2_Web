// ============================================
// ADMIN DASHBOARD - Quản trị sản phẩm/đơn hàng/khách hàng
// ============================================

// Utils
function formatMoney(amount) {
    return (amount || 0).toLocaleString('vi-VN') + '₫';
}

function getJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
}

function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Guards
function ensureAdmin() {
    const current = localStorage.getItem('currentUser');
    if (!current) {
        alert('Bạn cần đăng nhập Admin để truy cập trang này.');
        window.location.href = '../html/login.html';
        return false;
    }
    const user = JSON.parse(current);
    if (user.role !== 'admin') {
        alert('Chỉ Admin mới có quyền truy cập.');
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

// USERS
function renderUsers() {
    const users = getJSON('users', []);
    const usersTable = document.getElementById('usersTable');
    document.getElementById('totalUsers').textContent = users.length;
    if (!usersTable) return;
    if (users.length === 0) {
        usersTable.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #7f8c8d;">Chưa có khách hàng nào</td></tr>';
        return;
    }
    usersTable.innerHTML = users.map(user => `
        <tr>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${new Date(user.registeredAt).toLocaleDateString('vi-VN')}</td>
            <td>
                <button class="action-btn btn-view" onclick="viewUser('${user.username}')">Xem</button>
                <button class="action-btn btn-delete" onclick="deleteUserConfirm('${user.username}')">Xóa</button>
            </td>
        </tr>
    `).join('');
}

function viewUser(username) {
    const users = getJSON('users', []);
    const user = users.find(u => u.username === username);
    if (!user) return;

    // Populate modal
    document.getElementById('viewUserFullName').value = user.fullName || '';
    document.getElementById('viewUserUsername').value = user.username || '';
    document.getElementById('viewUserEmail').value = user.email || '';
    document.getElementById('viewUserPhone').value = user.phone || 'Chưa cập nhật';
    document.getElementById('viewUserAddress').value = user.address || 'Chưa cập nhật';
    document.getElementById('viewUserBirthday').value = user.birthday || 'Chưa cập nhật';
    document.getElementById('viewUserGender').value = user.gender || 'Chưa cập nhật';
    document.getElementById('viewUserRegisteredAt').value = new Date(user.registeredAt).toLocaleDateString('vi-VN');

    // Store username for delete
    window.currentViewUserId = username;

    // Show modal
    document.getElementById('viewUserModal').classList.add('active');
}

function closeViewUserModal() {
    document.getElementById('viewUserModal').classList.remove('active');
}

function deleteUserFromView() {
    deleteUserConfirm(window.currentViewUserId);
}

function deleteUserConfirm(username) {
    if (confirm('Bạn có chắc muốn xóa khách hàng này? Hành động này không thể hoàn tác!')) {
        let users = getJSON('users', []);
        users = users.filter(u => u.username !== username);
        setJSON('users', users);
        renderUsers();
        updateStats();
        closeViewUserModal();
        alert('✅ Đã xóa khách hàng!');
    }
}

// PRODUCTS
function loadProducts() { return getJSON('products', []); }
function saveProducts(list) { setJSON('products', list); }

function renderProducts() {
    const tbody = document.getElementById('productsTable');
    if (!tbody) return;
    const products = loadProducts();
    document.getElementById('totalProducts').textContent = products.length;
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#7f8c8d;">Chưa có sản phẩm nào</td></tr>';
        return;
    }
    tbody.innerHTML = products.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.sport || '-'}</td>
            <td>${formatMoney(p.price)}</td>
            <td>${p.stock ?? 0}</td>
            <td>
                <button class="action-btn btn-view" onclick="viewProduct('${p.id}')">Chi tiết</button>
                <button class="action-btn btn-edit" onclick="editProduct('${p.id}')">Sửa</button>
                <button class="action-btn btn-delete" onclick="deleteProduct('${p.id}')">Xóa</button>
            </td>
        </tr>
    `).join('');
}

function openAddProductModal(editing = false) {
    document.getElementById('addProductModal').classList.add('active');
    document.getElementById('productModalTitle').textContent = editing ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới';
}

function closeAddProductModal() {
    document.getElementById('addProductModal').classList.remove('active');
    clearProductForm();
}

function clearProductForm() {
    document.getElementById('productIdInput').value = '';
    document.getElementById('productNameInput').value = '';
    document.getElementById('productPriceInput').value = '';
    document.getElementById('productCategorySelect').value = 'Áo';
    document.getElementById('productSportSelect').value = 'Bóng Đá';
    document.getElementById('productStockInput').value = '';
    document.getElementById('productImageInput').value = '';
    document.getElementById('productDescriptionInput').value = '';
}

function getCategoryPageMapping() {
    return {
        'quan-bong-da': 'quan-bong-da-nam.html',
        'quan-bong-ro': 'quan-bong-ro-nam.html',
        'quan-chay-bo': 'quan-chay-bo.html',
        'quan-tap-gym': 'quan-tap-gym.html',
        'quan-dap-xe': 'quan-dap-xe.html',
        'quan-cau-long': 'quan-cau-long.html',
        'ao-bong-da': 'ao-bong-da-nam.html',
        'ao-bong-ro': 'ao-bong-ro-nam.html',
        'ao-tap-luyen': 'ao-tap-luyen.html',
        'ao-dong-phuc': 'ao-dong-phuc.html',
        'ao-thoi-trang': 'ao-thoi-trang-the-thao.html',
        'ao-lifestyle': 'ao-lifestyle.html',
        'giay-bong-da': 'giay-bong-da-nam.html',
        'giay-bong-ro': 'giay-bong-ro-nam.html',
        'giay-chay-bo': 'giay-chay-bo.html',
        'giay-tap-gym': 'giay-tap-gym.html',
        'giay-da-ngoai': 'giay-da-ngoai.html',
        'giay-casual': 'giay-casual.html',
        'phukien-bong-dungcu': 'phukien-bong-dungcu.html',
        'phukien-tui-balo': 'phukien-tui-balo.html',
        'phukien-bao-ho': 'phukien-bao-ho.html',
        'phukien-vo-gang': 'phukien-vo-gang.html',
        'phukien-yoga-fitness': 'phukien-yoga-fitness.html',
        'phukien-khac': 'phukien-khac.html'
    };
}

function createProductCard(product) {
    return `<div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">${formatMoney(product.price)}</div>
                    <div class="product-actions">
                        <button class="btn-details" onclick="viewDetails('${product.id}')">
                            <i class="fas fa-eye"></i> Chi Tiết
                        </button>
                        <button class="btn-cart" onclick="addToCart('${product.id}')">
                            <i class="fas fa-shopping-cart"></i> Thêm
                        </button>
                    </div>
                </div>
            </div>`;
}

function addOrUpdateProduct() {
    const idHidden = document.getElementById('productIdInput').value;
    const name = document.getElementById('productNameInput').value.trim();
    const price = parseInt(document.getElementById('productPriceInput').value || '0', 10);
    const category = document.getElementById('productCategorySelect').value;
    const sport = document.getElementById('productSportSelect').value;
    const stock = parseInt(document.getElementById('productStockInput').value || '0', 10);
    const image = document.getElementById('productImageInput').value.trim() || '../img/logo2.png';
    const description = document.getElementById('productDescriptionInput').value.trim();

    if (!name || price <= 0) {
        alert('Vui lòng nhập tên và giá hợp lệ.');
        return;
    }

    let products = loadProducts();
    const isNew = !idHidden;
    
    if (idHidden) {
        // Update
        const idx = products.findIndex(p => String(p.id) === String(idHidden));
        if (idx > -1) {
            products[idx] = { ...products[idx], name, price, category, sport, stock, image, description };
        }
        saveProducts(products);
        alert('✅ Cập nhật sản phẩm thành công!');
    } else {
        // Create - Thêm vào trang category tương ứng
        const newId = Date.now();
        const newProduct = { id: newId, name, price, category, sport, stock, image, description, createdAt: new Date().toISOString() };
        products.push(newProduct);
        saveProducts(products);
        
        // Ghi thêm sản phẩm vào trang danh mục
        addProductToCategoryPage(newProduct);
        
        alert('✅ Thêm sản phẩm thành công!');
    }
    renderProducts();
    closeAddProductModal();
}

function addProductToCategoryPage(product) {
    // Tạo key từ category + sport
    const categoryKey = (product.category.toLowerCase() + '-' + (product.sport ? product.sport.toLowerCase().replace(/\s+/g, '-') : 'general')).substring(0, 50);
    const mapping = getCategoryPageMapping();
    
    // Tìm trang phù hợp
    let targetPage = null;
    for (let [key, page] of Object.entries(mapping)) {
        if (categoryKey.includes(key) || page.includes(product.category.toLowerCase())) {
            targetPage = page;
            break;
        }
    }
    
    if (!targetPage) targetPage = 'quan-bong-da-nam.html'; // Default
    
    const productCard = createProductCard(product);
    
    // Lưu vào localStorage để trang category sử dụng
    let categoryProducts = getJSON(`category_${targetPage}`, []);
    categoryProducts.push(product);
    setJSON(`category_${targetPage}`, categoryProducts);
}

function getSportCategoryName(category, sport) {
    if (category === 'quan') {
        if (sport === 'bongda') return 'quan-bong-da-nam.html';
        if (sport === 'bongro') return 'quan-bong-ro-nam.html';
        if (sport === 'chaybo') return 'quan-chay-bo.html';
        if (sport === 'gym') return 'quan-tap-gym.html';
        if (sport === 'dapxe') return 'quan-dap-xe.html';
        if (sport === 'caulongbadminton') return 'quan-cau-long.html';
    }
    if (category === 'ao') {
        if (sport === 'bongda') return 'ao-bong-da-nam.html';
        if (sport === 'bongro') return 'ao-bong-ro-nam.html';
        if (sport === 'yoga') return 'ao-tap-luyen.html';
        if (sport === 'gym') return 'ao-tap-luyen.html';
        if (sport === 'chaybo') return 'ao-thoi-trang-the-thao.html';
    }
    if (category === 'giay') {
        if (sport === 'bongda') return 'giay-bong-da-nam.html';
        if (sport === 'bongro') return 'giay-bong-ro-nam.html';
        if (sport === 'chaybo') return 'giay-chay-bo.html';
        if (sport === 'gym') return 'giay-tap-gym.html';
        if (sport === 'dapxe') return 'giay-da-ngoai.html';
    }
    return 'quan-bong-da-nam.html';
}

function editProduct(id) {
    const products = loadProducts();
    const p = products.find(x => String(x.id) === String(id));
    if (!p) return;
    document.getElementById('productIdInput').value = p.id;
    document.getElementById('productNameInput').value = p.name;
    document.getElementById('productPriceInput').value = p.price;
    document.getElementById('productCategorySelect').value = p.category;
    document.getElementById('productSportSelect').value = p.sport || 'Bóng Đá';
    document.getElementById('productStockInput').value = p.stock ?? 0;
    document.getElementById('productImageInput').value = p.image || '';
    document.getElementById('productDescriptionInput').value = p.description || '';
    openAddProductModal(true);
}

function deleteProduct(id) {
    if (!confirm('Xóa sản phẩm này?')) return;
    let products = loadProducts();
    products = products.filter(p => String(p.id) !== String(id));
    saveProducts(products);
    renderProducts();
    updateStats();
}

function viewProduct(id) {
    const products = loadProducts();
    const p = products.find(x => String(x.id) === String(id));
    if (!p) return;
    
    // Populate modal
    document.getElementById('viewProductId').value = p.id;
    document.getElementById('viewProductImage').src = p.image;
    document.getElementById('viewProductName').textContent = p.name;
    document.getElementById('viewProductCategory').textContent = p.category;
    document.getElementById('viewProductSport').textContent = p.sport || 'N/A';
    document.getElementById('viewProductPrice').value = formatMoney(p.price);
    document.getElementById('viewProductStock').value = p.stock ?? 0;
    document.getElementById('viewProductDescription').value = p.description || 'Không có mô tả';
    document.getElementById('viewProductCreatedAt').value = p.createdAt ? new Date(p.createdAt).toLocaleDateString('vi-VN') : 'N/A';
    
    // Store product ID for edit
    window.currentViewProductId = p.id;
    
    // Show modal
    document.getElementById('viewProductModal').classList.add('active');
}

function closeViewProductModal() {
    document.getElementById('viewProductModal').classList.remove('active');
}

function editProductFromView() {
    closeViewProductModal();
    editProduct(window.currentViewProductId);
}

// ORDERS
function loadOrders() { return getJSON('orders', []); }
function saveOrders(list) { setJSON('orders', list); }

function renderOrders() {
    const tbody = document.getElementById('ordersTable');
    const recent = document.getElementById('recentOrders');
    const orders = loadOrders();
    document.getElementById('totalOrders').textContent = orders.length;
    if (tbody) {
        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#7f8c8d;">Chưa có đơn hàng nào</td></tr>';
        } else {
            tbody.innerHTML = orders.map(o => `
                <tr>
                    <td>${o.id}</td>
                    <td>${o.customerName || (o.user && o.user.fullName) || 'N/A'}</td>
                    <td>${o.customerEmail || (o.user && o.user.email) || 'N/A'}</td>
                    <td>${formatMoney(o.total)}</td>
                    <td>
                        <select onchange="updateOrderStatus('${o.id}', this.value)">
                            ${['pending','processing','shipping','completed','cancelled'].map(s => `<option value="${s}" ${o.status===s?'selected':''}>${s}</option>`).join('')}
                        </select>
                    </td>
                    <td>${new Date(o.date || o.createdAt).toLocaleString('vi-VN')}</td>
                    <td>
                        <button class="action-btn btn-view" onclick="viewOrder('${o.id}')">Chi tiết</button>
                        <button class="action-btn btn-delete" onclick="deleteOrder('${o.id}')">Xóa</button>
                    </td>
                </tr>
            `).join('');
        }
    }
    if (recent) {
        if (orders.length === 0) {
            recent.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#7f8c8d;">Chưa có đơn hàng nào</td></tr>';
        } else {
            const latest = orders.slice(-5).reverse();
            recent.innerHTML = latest.map(o => `
                <tr>
                    <td>${o.id}</td>
                    <td>${o.customerName || (o.user && o.user.fullName) || 'N/A'}</td>
                    <td>${o.items.length} SP</td>
                    <td>${formatMoney(o.total)}</td>
                    <td>${o.status}</td>
                    <td>${new Date(o.date || o.createdAt).toLocaleDateString('vi-VN')}</td>
                </tr>
            `).join('');
        }
    }
}

function updateOrderStatus(id, status) {
    const orders = loadOrders();
    const idx = orders.findIndex(o => String(o.id) === String(id));
    if (idx > -1) {
        orders[idx].status = status;
        saveOrders(orders);
        updateStats();
    }
}

function viewOrder(id) {
    const orders = loadOrders();
    const o = orders.find(x => String(x.id) === String(id));
    if (!o) return;

    // Set order status
    const statusLabels = {
        'pending': '⏳ Đang Chờ Xử Lý',
        'processing': '⚙️ Đang Xử Lý',
        'shipping': '📦 Đang Gửi',
        'completed': '✅ Hoàn Thành',
        'cancelled': '❌ Đã Hủy'
    };

    // Populate modal
    document.getElementById('viewOrderId').textContent = `Mã đơn hàng: ${o.id}`;
    document.getElementById('viewOrderStatus').textContent = statusLabels[o.status] || o.status;
    
    // Customer info - hỗ trợ cả hai định dạng cũ và mới
    document.getElementById('viewOrderCustomerName').value = o.customerName || (o.user && o.user.fullName) || '';
    document.getElementById('viewOrderCustomerEmail').value = o.customerEmail || (o.user && o.user.email) || '';
    document.getElementById('viewOrderCustomerPhone').value = o.customerPhone || (o.user && o.user.phone) || '';
    document.getElementById('viewOrderCustomerAddress').value = o.customerAddress || (o.user && o.user.address) || '';
    
    // Payment details
    document.getElementById('viewOrderSubtotal').value = formatMoney(o.subtotal);
    document.getElementById('viewOrderShipping').value = o.shipping === 0 ? 'Miễn phí' : formatMoney(o.shipping);
    document.getElementById('viewOrderDiscount').value = o.discount > 0 ? formatMoney(o.discount) : 'Không';
    document.getElementById('viewOrderTotal').value = formatMoney(o.total);
    
    // Status select
    document.getElementById('viewOrderStatusSelect').value = o.status;

    // Items list
    const itemsHtml = o.items.map(it => `
        <div style="padding: 12px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <p style="margin: 0 0 5px; font-weight: 600;">${it.name}</p>
                <p style="margin: 0; font-size: 13px; color: #666;">x${it.quantity} • Size: ${it.size}</p>
            </div>
            <p style="margin: 0; font-weight: 600; color: #ff6b35;">${formatMoney(it.price * it.quantity)}</p>
        </div>
    `).join('');
    document.getElementById('viewOrderItems').innerHTML = itemsHtml;

    // Store order ID for update
    window.currentViewOrderId = o.id;

    // Show modal
    document.getElementById('viewOrderModal').classList.add('active');
}

function closeViewOrderModal() {
    document.getElementById('viewOrderModal').classList.remove('active');
}

function updateOrderStatusFromView() {
    const newStatus = document.getElementById('viewOrderStatusSelect').value;
    updateOrderStatus(window.currentViewOrderId, newStatus);
    closeViewOrderModal();
    alert('✅ Cập nhật trạng thái thành công!');
}

function deleteOrder(id) {
    if (!confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;
    let orders = loadOrders();
    orders = orders.filter(o => String(o.id) !== String(id));
    saveOrders(orders);
    renderOrders();
    updateStats();
}

// STATS
function updateStats() {
    const orders = loadOrders();
    const products = loadProducts();
    
    // Doanh thu tổng
    const revenue = orders
        .filter(o => o.status === 'completed' || o.status === 'shipped' || o.status === 'processing')
        .reduce((sum, o) => sum + (o.total || 0), 0);
    const totalRevenueEl = document.getElementById('totalRevenue');
    if (totalRevenueEl) totalRevenueEl.textContent = formatMoney(revenue);
    
    // Update stats page
    updateDetailedStats(orders, products);
}

function updateDetailedStats(orders, products) {
    // Thống kê tổng
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
    const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.total || 0), 0);
    
    if (document.getElementById('statsRevenue')) {
        document.getElementById('statsRevenue').textContent = formatMoney(totalRevenue);
        document.getElementById('statsCompletedOrders').textContent = completedOrders;
        document.getElementById('statsPendingOrders').textContent = pendingOrders;
    }
    
    // Sản phẩm bán chạy
    const topProduct = getTopProduct(orders);
    if (document.getElementById('statsTopProduct')) {
        document.getElementById('statsTopProduct').textContent = topProduct || 'N/A';
    }
    
    // Danh mục
    renderStatsByCategory(products);
    
    // Môn thể thao
    renderStatsBySport(products);
    
    // Doanh thu theo trạng thái
    renderRevenueByStatus(orders);
}

function getTopProduct(orders) {
    const productCounts = {};
    orders.forEach(o => {
        if (o.items) {
            o.items.forEach(item => {
                productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
            });
        }
    });
    
    let topName = null;
    let maxCount = 0;
    for (let name in productCounts) {
        if (productCounts[name] > maxCount) {
            maxCount = productCounts[name];
            topName = name;
        }
    }
    return topName ? `${topName} (${maxCount}x)` : 'N/A';
}

function renderStatsByCategory(products) {
    const tbody = document.getElementById('statsCategoryTable');
    if (!tbody) return;
    
    const categoryCount = {};
    products.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    
    tbody.innerHTML = Object.entries(categoryCount).map(([cat, count]) => `
        <tr>
            <td>${cat}</td>
            <td>${count}</td>
        </tr>
    `).join('');
}

function renderStatsBySport(products) {
    const tbody = document.getElementById('statsSportTable');
    if (!tbody) return;
    
    const sportCount = {};
    products.forEach(p => {
        const sport = p.sport || 'Khác';
        sportCount[sport] = (sportCount[sport] || 0) + 1;
    });
    
    tbody.innerHTML = Object.entries(sportCount).map(([sport, count]) => `
        <tr>
            <td>${sport}</td>
            <td>${count}</td>
        </tr>
    `).join('');
}

function renderRevenueByStatus(orders) {
    const tbody = document.getElementById('statsOrderStatusTable');
    if (!tbody) return;
    
    const statusStats = {};
    orders.forEach(o => {
        if (!statusStats[o.status]) {
            statusStats[o.status] = { count: 0, revenue: 0 };
        }
        statusStats[o.status].count += 1;
        statusStats[o.status].revenue += o.total || 0;
    });
    
    tbody.innerHTML = Object.entries(statusStats).map(([status, stats]) => `
        <tr>
            <td><strong>${status}</strong></td>
            <td>${stats.count}</td>
            <td>${formatMoney(stats.revenue)}</td>
        </tr>
    `).join('');
}

// SECTIONS
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.sidebar-item').classList.add('active');
}

function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        window.location.href = '../index.html';
    }
}

// VOUCHERS
function loadVouchers() { return getJSON('vouchers', []); }
function saveVouchers(list) { setJSON('vouchers', list); }

function renderVouchers() {
    const tbody = document.getElementById('vouchersTable');
    if (!tbody) return;
    
    const vouchers = loadVouchers();
    if (vouchers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#7f8c8d;">Chưa có mã giảm giá nào</td></tr>';
        return;
    }

    tbody.innerHTML = vouchers.map(v => `
        <tr>
            <td>${v.code}</td>
            <td>${v.description}</td>
            <td>${v.type === 'percent' ? v.value + '%' : formatMoney(v.value)}</td>
            <td>${v.minOrder > 0 ? 'Từ ' + formatMoney(v.minOrder) : 'Không'}</td>
            <td>${new Date(v.expiry).toLocaleDateString('vi-VN')}</td>
            <td>
                <span class="badge ${getVoucherStatusClass(v)}">${getVoucherStatus(v)}</span>
            </td>
            <td>
                <button class="action-btn btn-edit" onclick="editVoucher('${v.code}')">Sửa</button>
                <button class="action-btn btn-delete" onclick="deleteVoucher('${v.code}')">Xóa</button>
            </td>
        </tr>
    `).join('');
}

function getVoucherStatus(voucher) {
    const now = new Date();
    const expiry = new Date(voucher.expiry);
    
    if (expiry < now) return 'Hết hạn';
    if (voucher.quantity <= 0) return 'Đã dùng hết';
    return 'Có hiệu lực';
}

function getVoucherStatusClass(voucher) {
    const now = new Date();
    const expiry = new Date(voucher.expiry);
    
    if (expiry < now) return 'badge-expired';
    if (voucher.quantity <= 0) return 'badge-depleted';
    return 'badge-active';
}

function openAddVoucherModal(editing = false) {
    document.getElementById('addVoucherModal').classList.add('active');
    document.getElementById('voucherModalTitle').textContent = editing ? 'Cập Nhật Mã Giảm Giá' : 'Thêm Mã Giảm Giá Mới';
}

function closeAddVoucherModal() {
    document.getElementById('addVoucherModal').classList.remove('active');
    clearVoucherForm();
}

function clearVoucherForm() {
    document.getElementById('voucherIdInput').value = '';
    document.getElementById('voucherCodeInput').value = '';
    document.getElementById('voucherDescriptionInput').value = '';
    document.getElementById('voucherTypeSelect').value = 'percent';
    document.getElementById('voucherValueInput').value = '';
    document.getElementById('voucherMinOrderInput').value = '';
    document.getElementById('voucherExpiryInput').value = '';
    document.getElementById('voucherQuantityInput').value = '';
}

function addOrUpdateVoucher() {
    const code = document.getElementById('voucherCodeInput').value.trim();
    const description = document.getElementById('voucherDescriptionInput').value.trim();
    const type = document.getElementById('voucherTypeSelect').value;
    const value = parseFloat(document.getElementById('voucherValueInput').value || '0');
    const minOrder = parseInt(document.getElementById('voucherMinOrderInput').value || '0', 10);
    const expiryDate = document.getElementById('voucherExpiryInput').value;
    const quantity = parseInt(document.getElementById('voucherQuantityInput').value || '0', 10);

    // Validation
    if (!code || !description || !value || !expiryDate || quantity <= 0) {
        alert('Vui lòng điền đầy đủ thông tin mã giảm giá.');
        return;
    }

    if (type === 'percent' && (value <= 0 || value > 100)) {
        alert('Giá trị phần trăm phải từ 1-100%');
        return;
    }

    if (type === 'fixed' && value <= 0) {
        alert('Giá trị giảm giá phải lớn hơn 0');
        return;
    }

    // Convert date to ISO format (add 23:59:59)
    const expiryDateTime = new Date(expiryDate + 'T23:59:59').toISOString();

    let vouchers = loadVouchers();
    // Case-insensitive comparison for code (but store original case)
    const existingIndex = vouchers.findIndex(v => v.code && v.code.toLowerCase() === code.toLowerCase());

    const voucherData = {
        code: code,
        description: description,
        type: type,
        value: value,
        minOrder: minOrder,
        expiry: expiryDateTime,
        quantity: quantity,
        createdAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
        // Update existing voucher - preserve createdAt if it exists
        if (vouchers[existingIndex].createdAt) {
            voucherData.createdAt = vouchers[existingIndex].createdAt;
        }
        vouchers[existingIndex] = voucherData;
        alert('✅ Cập nhật mã giảm giá thành công!');
    } else {
        // Add new voucher
        vouchers.push(voucherData);
        alert('✅ Thêm mã giảm giá thành công!');
    }

    saveVouchers(vouchers);
    renderVouchers();
    closeAddVoucherModal();
}

function editVoucher(code) {
    const vouchers = loadVouchers();
    // Case-insensitive comparison for code
    const voucher = vouchers.find(v => v.code && v.code.toLowerCase() === code.toLowerCase());
    if (!voucher) return;

    document.getElementById('voucherCodeInput').value = voucher.code;
    document.getElementById('voucherDescriptionInput').value = voucher.description;
    document.getElementById('voucherTypeSelect').value = voucher.type;
    document.getElementById('voucherValueInput').value = voucher.value;
    document.getElementById('voucherMinOrderInput').value = voucher.minOrder;
    document.getElementById('voucherExpiryInput').value = voucher.expiry.split('T')[0];
    document.getElementById('voucherQuantityInput').value = voucher.quantity;

    openAddVoucherModal(true);
}

function deleteVoucher(code) {
    if (!confirm('Bạn có chắc muốn xóa mã giảm giá này?')) return;
    let vouchers = loadVouchers();
    // Case-insensitive comparison for code
    vouchers = vouchers.filter(v => !(v.code && v.code.toLowerCase() === code.toLowerCase()));
    saveVouchers(vouchers);
    renderVouchers();
}

// INIT
function loadData() {
    if (!ensureAdmin()) return;
    renderUsers();
    renderProducts();
    renderOrders();
    renderVouchers();
    updateStats();
}

document.addEventListener('DOMContentLoaded', loadData);
