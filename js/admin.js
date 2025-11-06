 function loadData() {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            document.getElementById('totalUsers').textContent = users.length;

            // Hiển thị danh sách users
            const usersTable = document.getElementById('usersTable');
            if (users.length === 0) {
                usersTable.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #7f8c8d;">Chưa có khách hàng nào</td></tr>';
            } else {
                usersTable.innerHTML = users.map(user => `
                    <tr>
                        <td>${user.fullName}</td>
                        <td>${user.email}</td>
                        <td>${user.username}</td>
                        <td>${new Date(user.registeredAt).toLocaleDateString('vi-VN')}</td>
                        <td>
                            <button class="action-btn btn-view">Xem</button>
                            <button class="action-btn btn-delete" onclick="deleteUser('${user.username}')">Xóa</button>
                        </td>
                    </tr>
                `).join('');
            }
        }

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

        function openAddProductModal() {
            document.getElementById('addProductModal').classList.add('active');
        }

        function closeAddProductModal() {
            document.getElementById('addProductModal').classList.remove('active');
        }

        function deleteUser(username) {
            if (confirm('Bạn có chắc muốn xóa khách hàng này?')) {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                users = users.filter(u => u.username !== username);
                localStorage.setItem('users', JSON.stringify(users));
                loadData();
                alert('✅ Đã xóa khách hàng!');
            }
        }

        function logout() {
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                window.location.href = '../index.html';
            }
        }

        // Load dữ liệu khi trang được tải
        document.addEventListener('DOMContentLoaded', loadData);