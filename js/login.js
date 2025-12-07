// ============================================
// LOGIN MANAGER - Quản lý đăng nhập/đăng ký
// File: js/login.js
// ============================================

// Hiển thị form đăng ký
function showRegister() {
    document.getElementById('loginfrom').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Hiển thị form đăng nhập
function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginfrom').style.display = 'block';
}

// Đăng ký tài khoản
function register() {
    const fullName = document.querySelector('#registerForm input[placeholder="Nhập họ tên"]').value.trim();
    const email = document.querySelector('#registerForm input[placeholder="Nhập email"]').value.trim();
    const username = document.querySelector('#registerForm input[placeholder="Nhập tài khoản"]').value.trim();
    const password = document.querySelector('#registerForm input[placeholder="Nhập mật khẩu"]').value;
    const confirmPassword = document.querySelector('#registerForm input[placeholder="Nhập lại mật khẩu"]').value;

    // Kiểm tra các trường có rỗng không
    if (!fullName || !email || !username || !password || !confirmPassword) {
        alert("⚠️ Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("⚠️ Email không hợp lệ!");
        return;
    }

    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
        alert("⚠️ Mật khẩu không khớp!");
        return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
        alert("⚠️ Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    // Không cho phép đăng ký tài khoản admin
    if (username.toLowerCase() === 'admin') {
        alert("⚠️ Tên đăng nhập này đã được sử dụng!");
        return;
    }

    // Lấy danh sách users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra username đã tồn tại
    if (users.some(u => u.username === username)) {
        alert("⚠️ Tên đăng nhập đã tồn tại!");
        return;
    }

    // Kiểm tra email đã tồn tại
    if (users.some(u => u.email === email)) {
        alert("⚠️ Email đã được sử dụng!");
        return;
    }

    // Tạo user mới - thêm các field profile
    const newUser = { 
        fullName, 
        email, 
        username, 
        password,
        phone: '',
        address: '',
        birthday: '',
        gender: '',
        registeredAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Đăng ký thành công!\nBây giờ bạn có thể đăng nhập.");
    
    // Xóa form và chuyển sang đăng nhập
    document.querySelector('#registerForm input[placeholder="Nhập họ tên"]').value = '';
    document.querySelector('#registerForm input[placeholder="Nhập email"]').value = '';
    document.querySelector('#registerForm input[placeholder="Nhập tài khoản"]').value = '';
    document.querySelector('#registerForm input[placeholder="Nhập mật khẩu"]').value = '';
    document.querySelector('#registerForm input[placeholder="Nhập lại mật khẩu"]').value = '';
    
    showLogin();
}

// Đăng nhập
function login() {
    const username = document.querySelector('#loginfrom input[placeholder="Nhập tài khoản"]').value.trim();
    const password = document.querySelector('#loginfrom input[placeholder="Nhập mật khẩu"]').value;

    if (!username || !password) {
        alert("⚠️ Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Kiểm tra tài khoản ADMIN
    if (username === 'admin' && password === '1') {
        const adminInfo = {
            fullName: 'Administrator',
            email: 'admin@truongsport.com',
            username: 'admin',
            loginAt: new Date().toISOString(),
            role: 'admin'
        };
        localStorage.setItem("currentUser", JSON.stringify(adminInfo));
        
        // Clear cart for admin (admin không cần cart)
        localStorage.removeItem('cart_admin');
        
        alert(`✅ Đăng nhập thành công!\nChào mừng Admin!`);
        
        // Chuyển đến trang quản trị
        window.location.href = "./admin.html";
        return;
    }

    // Kiểm tra tài khoản thường
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
        // Lưu thông tin user đang đăng nhập
        const userInfo = {
            fullName: foundUser.fullName,
            email: foundUser.email,
            username: foundUser.username,
            loginAt: new Date().toISOString(),
            role: 'user'
        };
        localStorage.setItem("currentUser", JSON.stringify(userInfo));
        
        alert(`✅ Đăng nhập thành công!\nXin chào ${foundUser.fullName}!`);
        
        // Chuyển về trang chủ
        window.location.href = "./index.html";
    } else {
        alert("❌ Sai tài khoản hoặc mật khẩu!");
    }
}

// Đăng xuất
function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        alert('✅ Đăng xuất thành công!');
        updateUserDisplay();
        window.location.reload();
    }
}

// Cập nhật hiển thị tên người dùng
function updateUserDisplay() {
    const currentUser = localStorage.getItem('currentUser');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userAccountLink = document.getElementById('userAccountLink');
    
    if (!userNameDisplay || !userAccountLink) return;
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        // Lấy tên đầu tiên của người dùng
        const firstName = user.fullName.split(' ')[0];
        
        // Cập nhật tên hiển thị
        userNameDisplay.textContent = firstName;
        userNameDisplay.style.color = '#ff6b35';
        userNameDisplay.style.fontWeight = 'bold';
        
        // Đổi link thành đăng xuất
        userAccountLink.href = '#';
        userAccountLink.title = `Xin chào ${user.fullName}! Click để đăng xuất`;
        userAccountLink.onclick = function(e) {
            e.preventDefault();
            logout();
        };
    } else {
        // Chưa đăng nhập
        userNameDisplay.textContent = 'Tài Khoản';
        userNameDisplay.style.color = '';
        userNameDisplay.style.fontWeight = '';
        
        // Chuyển về trang login
        const currentPath = window.location.pathname;
        if (currentPath.includes('/html/')) {
            userAccountLink.href = '../html/login.html';
        } else {
            userAccountLink.href = 'html/login.html';
        }
        userAccountLink.title = 'Đăng nhập';
        userAccountLink.onclick = null;
    }
}

// Khi tải trang login
document.addEventListener("DOMContentLoaded", function () {
    // Cập nhật hiển thị user trên tất cả các trang
    updateUserDisplay();
    
    // Nếu đang ở trang login
    const loginForm = document.getElementById("loginfrom");
    const registerForm = document.getElementById("registerForm");
    
    if (loginForm && registerForm) {
        // Kiểm tra nếu đã đăng nhập thì chuyển về trang chủ
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            if (confirm(`Bạn đã đăng nhập với tài khoản: ${user.fullName}\n\nChuyển về trang chủ?`)) {
                if (user.role === 'admin') {
                    window.location.href = '/html/admin.html';
                } else {
                    window.location.href = '/index.html';
                }
            }
        }
        
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    }
});