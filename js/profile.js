document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');

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
            const adminNav = document.createElement('div');
            adminNav.className = 'admin-nav';
            adminNav.innerHTML = `
                <a href="admin.html" class="admin-back-btn">
                    <i class="fas fa-arrow-left"></i> Quay lại trang Admin
                </a>
            `;
            document.querySelector('.profile-card').insertBefore(adminNav, document.querySelector('.profile-card h1'));
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
        
        const statusElement = document.createElement('div');
        statusElement.className = 'profile-status ' + (missingFields.length === 0 ? 'complete' : 'incomplete');
        
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

        const existingStatus = document.querySelector('.profile-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        document.querySelector('.profile-card h1').after(statusElement);
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
            
            // Update current user info
            const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
            currentUserData.fullName = updatedProfile.fullName;
            currentUserData.email = updatedProfile.email;
            localStorage.setItem('currentUser', JSON.stringify(currentUserData));

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

    // Initialize
    checkLoginStatus();
    loadProfileData();
});