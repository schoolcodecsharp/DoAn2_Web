document.addEventListener('DOMContentLoaded', function() {
    const accountBtn = document.getElementById('accountBtn');
    const accountMenu = document.querySelector('.account-menu');
    const userNameDisplay = document.getElementById('userNameDisplay');
    
    function updateAccountMenu() {
        const currentUser = localStorage.getItem('currentUser');
        
        if (currentUser) {
            // User is logged in
            const user = JSON.parse(currentUser);
            const firstName = user.fullName.split(' ')[0];
            
            // Update display name
            if (userNameDisplay) {
                userNameDisplay.textContent = firstName;
                userNameDisplay.style.color = '#ff6b35';
                userNameDisplay.style.fontWeight = 'bold';
            }
            
            // Show dropdown menu on click
            if (accountBtn && accountMenu) {
                accountBtn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    accountMenu.classList.toggle('show');
                };
                
                // Update menu content
                accountMenu.innerHTML = `
                    <div class="account-menu-header">
                        <div class="user-name">${user.fullName}</div>
                        <div class="user-email">${user.email}</div>
                    </div>
                    <a href="${window.location.pathname.includes('/html/') ? '' : 'html/'}donhang.html" class="account-menu-item">
                        <i class="fas fa-box"></i>
                        <span>Đơn hàng của tôi</span>
                    </a>
                    <a href="${window.location.pathname.includes('/html/') ? '' : 'html/'}profile.html" class="account-menu-item">
                        <i class="fas fa-user-circle"></i>
                        <span>Thông tin cá nhân</span>
                    </a>
                    ${user.role === 'admin' ? `
                        <div class="account-menu-divider"></div>
                        <a href="${window.location.pathname.includes('/html/') ? '' : 'html/'}admin.html" class="account-menu-item admin-link">
                            <i class="fas fa-cog"></i>
                            <span>Quản lý Admin</span>
                        </a>
                    ` : ''}
                    <div class="account-menu-divider"></div>
                    <a href="#" class="account-menu-item logout" onclick="logout()">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Đăng xuất</span>
                    </a>
                `;
                
                // Show menu
                accountMenu.style.display = 'block';
            }
        } else {
            // User is not logged in
            if (userNameDisplay) {
                userNameDisplay.textContent = 'Tài Khoản';
                userNameDisplay.style.color = '';
                userNameDisplay.style.fontWeight = '';
            }
            
            // Redirect to login page on click
            if (accountBtn) {
                accountBtn.onclick = function(e) {
                    e.preventDefault();
                    // Determine correct path to login page
                    const currentPath = window.location.pathname;
                    const loginPath = currentPath.includes('/html/') ? 'login.html' : 'html/login.html';
                    window.location.href = loginPath;
                };
            }
            
            // Hide menu
            if (accountMenu) {
                accountMenu.style.display = 'none';
            }
        }
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (accountMenu && accountMenu.classList.contains('show') && 
            !accountBtn.contains(e.target) && !accountMenu.contains(e.target)) {
            accountMenu.classList.remove('show');
        }
    });

    // Initial update
    updateAccountMenu();

    // Listen for login/logout events
    window.addEventListener('storage', function(e) {
        if (e.key === 'currentUser') {
            updateAccountMenu();
        }
    });
});