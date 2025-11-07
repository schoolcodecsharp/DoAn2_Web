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