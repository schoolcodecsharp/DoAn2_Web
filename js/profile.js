document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    const accountBtn = document.getElementById('accountBtn');
    const accountMenu = document.querySelector('.account-menu');
    
    // Toggle account menu
    accountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        accountMenu.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!accountBtn.contains(e.target) && !accountMenu.contains(e.target)) {
            accountMenu.classList.remove('show');
        }
    });
    
    // Check login status
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = 'login.html';
            return;
        }

        const currentUser = localStorage.getItem('currentUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userProfile = users.find(user => user.username === currentUser);

        if (userProfile) {
            accountBtn.innerHTML = `
                <i class="fas fa-user"></i>
                <span>${userProfile.fullName || currentUser}</span>
            `;
        } else {
            accountBtn.innerHTML = `
                <i class="fas fa-user"></i>
                <span>${currentUser}</span>
            `;
        }
    }

    // Load user profile data
    function loadProfileData() {
        const currentUser = localStorage.getItem('currentUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userProfile = users.find(user => user.username === currentUser);

        if (userProfile) {
            document.getElementById('fullName').value = userProfile.fullName || '';
            document.getElementById('email').value = userProfile.email || '';
            document.getElementById('phone').value = userProfile.phone || '';
            document.getElementById('address').value = userProfile.address || '';
            document.getElementById('birthday').value = userProfile.birthday || '';
            
            if (userProfile.gender) {
                document.querySelector(`input[name="gender"][value="${userProfile.gender}"]`).checked = true;
            }
        }
    }

    // Check if required profile fields are filled
    window.isProfileComplete = function(username) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username);
        
        if (!user) return false;
        
        // Check required fields
        return !!(
            user.fullName &&
            user.email &&
            user.phone
        );
    };

    // Save profile data
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const currentUser = localStorage.getItem('currentUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.username === currentUser);

        if (userIndex !== -1) {
            // Update user data
            users[userIndex] = {
                ...users[userIndex],
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                birthday: document.getElementById('birthday').value,
                gender: document.querySelector('input[name="gender"]:checked')?.value
            };

            localStorage.setItem('users', JSON.stringify(users));
            
            // Check if all required fields are filled
            if (isProfileComplete(currentUser)) {
                alert('✅ Thông tin cá nhân đã được cập nhật thành công!');
            } else {
                alert('⚠️ Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại để có thể đặt hàng.');
            }
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