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
                <button class="action-btn btn-view" onclick="alert('Email: ${user.email}\nTên: ${user.fullName}\nTài khoản: ${user.username}')">Xem</button>
                <button class="action-btn btn-delete" onclick="deleteUser('${user.username}')">Xóa</button>
            </td>
        </tr>
    `).join('');
}

function deleteUser(username) {
    if (confirm('Bạn có chắc muốn xóa khách hàng này?')) {
        let users = getJSON('users', []);
        users = users.filter(u => u.username !== username);
        setJSON('users', users);
        renderUsers();
        updateStats();
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
    if (idHidden) {
        // Update
        const idx = products.findIndex(p => String(p.id) === String(idHidden));
        if (idx > -1) {
            products[idx] = { ...products[idx], name, price, category, sport, stock, image, description };
        }
        saveProducts(products);
        alert('✅ Cập nhật sản phẩm thành công!');
    } else {
        // Create
        const newId = Date.now();
        products.push({ id: newId, name, price, category, sport, stock, image, description, createdAt: new Date().toISOString() });
        saveProducts(products);
        alert('✅ Thêm sản phẩm thành công!');
    }
    renderProducts();
    closeAddProductModal();
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
    alert(`Tên: ${p.name}\nGiá: ${formatMoney(p.price)}\nDanh mục: ${p.category}\nMôn: ${p.sport || '-'}\nTồn: ${p.stock ?? 0}`);
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
                    <td>${o.user.fullName}</td>
                    <td>${o.user.email}</td>
                    <td>${formatMoney(o.total)}</td>
                    <td>
                        <select onchange="updateOrderStatus('${o.id}', this.value)">
                            ${['pending','processing','shipped','completed','canceled'].map(s => `<option value="${s}" ${o.status===s?'selected':''}>${s}</option>`).join('')}
                        </select>
                    </td>
                    <td>${new Date(o.createdAt).toLocaleString('vi-VN')}</td>
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
                    <td>${o.user.fullName}</td>
                    <td>${o.items.length} SP</td>
                    <td>${formatMoney(o.total)}</td>
                    <td>${o.status}</td>
                    <td>${new Date(o.createdAt).toLocaleDateString('vi-VN')}</td>
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
    const itemsText = o.items.map(it => `• ${it.name} x ${it.quantity} — ${formatMoney(it.price * it.quantity)}`).join('\n');
    alert(`ĐH #${o.id}\nKhách: ${o.user.fullName} (${o.user.email})\nTrạng thái: ${o.status}\nNgày: ${new Date(o.createdAt).toLocaleString('vi-VN')}\n\nSản phẩm:\n${itemsText}\n\nTổng: ${formatMoney(o.total)}`);
}

function deleteOrder(id) {
    if (!confirm('Xóa đơn hàng này?')) return;
    let orders = loadOrders();
    orders = orders.filter(o => String(o.id) !== String(id));
    saveOrders(orders);
    renderOrders();
    updateStats();
}

// STATS
function updateStats() {
    const orders = loadOrders();
    const revenue = orders
        .filter(o => o.status === 'completed' || o.status === 'shipped' || o.status === 'processing')
        .reduce((sum, o) => sum + (o.total || 0), 0);
    const totalRevenueEl = document.getElementById('totalRevenue');
    if (totalRevenueEl) totalRevenueEl.textContent = formatMoney(revenue);
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

// INIT
function loadData() {
    if (!ensureAdmin()) return;
    renderUsers();
    renderProducts();
    renderOrders();
    updateStats();
}

document.addEventListener('DOMContentLoaded', loadData);
