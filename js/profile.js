document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');

    // Check login status
    function checkLoginStatus() {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }

        const user = JSON.parse(currentUser);
        
        // If admin user, show admin navigation
        if (user.role === 'admin') {
            document.getElementById('admin-nav').style.display = 'block';
        }

        return user;
    }

    // Load user profile data
    function loadProfileData() {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) return;

        const user = JSON.parse(currentUser);
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userProfile = users.find(u => u.username === user.username);

        if (userProfile) {
            document.getElementById('fullName').value = userProfile.fullName || '';
            document.getElementById('email').value = userProfile.email || '';
            document.getElementById('phone').value = userProfile.phone || '';
            document.getElementById('address').value = userProfile.address || '';
            document.getElementById('birthday').value = userProfile.birthday || '';
            
            if (userProfile.gender) {
                document.querySelector(`input[name="gender"][value="${userProfile.gender}"]`).checked = true;
            }

            // Update profile completion status
            updateProfileStatus(userProfile);
        }
    }

    function updateProfileStatus(profile) {
        const requiredFields = ['fullName', 'email', 'phone'];
        const missingFields = requiredFields.filter(field => !profile[field]);
        
        const statusElement = document.getElementById('profile-status');
        statusElement.className = missingFields.length === 0 ? 'complete' : 'incomplete';
        
        if (missingFields.length === 0) {
            statusElement.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Hồ sơ đã hoàn thành</span>
            `;
        } else {
            statusElement.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <span>Vui lòng điền đầy đủ: ${missingFields.map(field => {
                    switch(field) {
                        case 'fullName': return 'Họ tên';
                        case 'email': return 'Email';
                        case 'phone': return 'Số điện thoại';
                        default: return field;
                    }
                }).join(', ')}</span>
            `;
        }
    }

    // Check if required profile fields are filled
    window.isProfileComplete = function(username) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username);
        
        if (!user) return false;
        
        return !!(user.fullName && user.email && user.phone);
    };

    // Save profile data
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) return;

        const user = JSON.parse(currentUser);
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.username === user.username);

        if (userIndex !== -1) {
            // Get form values
            const updatedProfile = {
                ...users[userIndex],
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                address: document.getElementById('address').value.trim(),
                birthday: document.getElementById('birthday').value,
                gender: document.querySelector('input[name="gender"]:checked')?.value,
                updatedAt: new Date().toISOString()
            };

            // Validate email
            if (updatedProfile.email && !isValidEmail(updatedProfile.email)) {
                alert('⚠️ Email không hợp lệ! Vui lòng kiểm tra lại.');
                return;
            }

            // Validate phone
            if (updatedProfile.phone && !isValidPhone(updatedProfile.phone)) {
                alert('⚠️ Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại 10 số.');
                return;
            }

            // Update user data
            users[userIndex] = updatedProfile;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Update current user info and show in header
            const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
            currentUserData.fullName = updatedProfile.fullName;
            currentUserData.email = updatedProfile.email;
            localStorage.setItem('currentUser', JSON.stringify(currentUserData));
            
            // Update display name in header if it exists
            const userNameDisplay = document.getElementById('userNameDisplay');
            if (userNameDisplay) {
                userNameDisplay.textContent = updatedProfile.fullName || 'Tài Khoản';
            }

            // Update status display
            updateProfileStatus(updatedProfile);

            // Show success message
            const isComplete = isProfileComplete(user.username);
            alert(isComplete ? 
                '✅ Thông tin cá nhân đã được cập nhật thành công!' : 
                '⚠️ Đã lưu thông tin. Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại để có thể đặt hàng.'
            );
        }
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[0-9]{10}$/.test(phone);
    }

    // Initialize
    const user = checkLoginStatus();
    if (user) {
        loadProfileData();
    }

    // Xử lý redirect từ buyNow() với param redirect=checkout
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('redirect') === 'checkout') {
        // Thêm thông báo và nút quay lại giỏ hàng
        const profileSection = document.querySelector('.profile-section');
        if (profileSection) {
            const warningDiv = document.createElement('div');
            warningDiv.style.cssText = `
                background-color: #fff3cd;
                border: 1px solid #ffc107;
                border-radius: 4px;
                padding: 15px;
                margin-bottom: 20px;
                color: #856404;
            `;
            warningDiv.innerHTML = `
                <i class="fas fa-info-circle"></i> 
                <strong>Bạn cần cập nhật thông tin cá nhân để tiếp tục mua hàng.</strong>
                <p style="margin-top: 10px;">Vui lòng điền đầy đủ các trường: Họ tên, Email, Số điện thoại</p>
            `;
            profileSection.insertBefore(warningDiv, profileSection.firstChild);
        }

        // Thêm sự kiện cho form submit để quay lại checkout
        profileForm.addEventListener('submit', function(e) {
            // Kiểm tra xem đã điền đầy đủ chưa
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();

            if (fullName && email && phone) {
                // Sau khi lưu, quay lại giỏ hàng để checkout
                setTimeout(() => {
                    window.location.href = 'giohang.html?checkout=true';
                }, 1500);
            }
        });
    }
});

// Logout function
window.logout = function(event) {
    if (event) {
        event.preventDefault();
    }
    
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
};