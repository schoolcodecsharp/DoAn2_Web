// Hàm tải sản phẩm từ 2 nguồn: Sample data + Admin thêm vào
function loadCategoryProducts(pageName) {
    // Lấy sản phẩm được thêm từ admin
    const adminProducts = JSON.parse(localStorage.getItem(`category_${pageName}`) || '[]');
    
    // Lấy tất cả sản phẩm từ admin
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Lọc sản phẩm phù hợp dựa trên tên trang
    const filteredProducts = allProducts.filter(p => {
        // Áp dụng logic lọc dựa trên tên trang
        const pageLower = pageName.toLowerCase();
        
        if (pageLower.includes('quan-bong-da')) return p.category === 'quan' && p.sport === 'bongda';
        if (pageLower.includes('quan-bong-ro')) return p.category === 'quan' && p.sport === 'bongro';
        if (pageLower.includes('quan-chay-bo')) return p.category === 'quan' && p.sport === 'chaybo';
        if (pageLower.includes('quan-tap-gym')) return p.category === 'quan' && p.sport === 'gym';
        if (pageLower.includes('quan-dap-xe')) return p.category === 'quan' && p.sport === 'dapxe';
        if (pageLower.includes('quan-cau-long')) return p.category === 'quan' && p.sport === 'caulongbadminton';
        
        if (pageLower.includes('ao-bong-da')) return p.category === 'ao' && p.sport === 'bongda';
        if (pageLower.includes('ao-bong-ro')) return p.category === 'ao' && p.sport === 'bongro';
        if (pageLower.includes('ao-tap-luyen')) return p.category === 'ao' && (p.sport === 'yoga' || p.sport === 'gym');
        if (pageLower.includes('ao-dong-phuc')) return p.category === 'ao' && p.sport === 'dongphuc';
        if (pageLower.includes('ao-thoi-trang')) return p.category === 'ao' && p.sport === 'chaybo';
        if (pageLower.includes('ao-lifestyle')) return p.category === 'ao' && p.sport === 'lifestyle';
        
        if (pageLower.includes('giay-bong-da')) return p.category === 'giay' && p.sport === 'bongda';
        if (pageLower.includes('giay-bong-ro')) return p.category === 'giay' && p.sport === 'bongro';
        if (pageLower.includes('giay-chay-bo')) return p.category === 'giay' && p.sport === 'chaybo';
        if (pageLower.includes('giay-tap-gym')) return p.category === 'giay' && p.sport === 'gym';
        if (pageLower.includes('giay-da-ngoai')) return p.category === 'giay' && p.sport === 'dapxe';
        if (pageLower.includes('giay-casual')) return p.category === 'giay' && p.sport === 'casual';
        
        if (pageLower.includes('phukien')) {
            if (pageLower.includes('bong-dungcu')) return p.category === 'phukien' && p.sport === 'bongdungcu';
            if (pageLower.includes('tui-balo')) return p.category === 'phukien' && p.sport === 'tuibalo';
            if (pageLower.includes('bao-ho')) return p.category === 'phukien' && p.sport === 'baoho';
            if (pageLower.includes('vo-gang')) return p.category === 'phukien' && p.sport === 'vogang';
            if (pageLower.includes('yoga')) return p.category === 'phukien' && p.sport === 'yoga';
            if (pageLower.includes('khac')) return p.category === 'phukien' && p.sport === 'khac';
        }
        
        return false;
    });
    
    // Kết hợp và trả về
    return [...filteredProducts, ...adminProducts];
}

function renderCategoryProducts(pageName) {
    const grid = document.getElementById('hotProducts');
    if (!grid) return;
    
    const products = loadCategoryProducts(pageName);
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1;padding:40px;">Chưa có sản phẩm nào</p>';
        return;
    }
    
    grid.innerHTML = products.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div class="product-image">
                <img src="${p.image || '#'}" alt="${p.name}" onerror="this.src='../img/placeholder.png'">
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="product-price">${formatMoney(p.price)}</div>
                <div class="product-actions">
                    <button class="btn-details" onclick="viewDetails('${p.id}')">
                        <i class="fas fa-eye"></i> Chi Tiết
                    </button>
                    <button class="btn-cart" onclick="addToCart('${p.id}')">
                        <i class="fas fa-shopping-cart"></i> Thêm
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function formatMoney(amount) {
    return (amount || 0).toLocaleString('vi-VN') + '₫';
}

// Auto load khi trang load
document.addEventListener('DOMContentLoaded', () => {
    const pageName = document.title.split(' - ')[0];
    renderCategoryProducts(pageName);
});
