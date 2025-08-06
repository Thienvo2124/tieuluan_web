// File: js/main.js - Phiên bản có thêm dòng kiểm tra

document.addEventListener('DOMContentLoaded', () => {
    console.log("Bắt đầu chạy main.js..."); // KIỂM TRA 1: Script có chạy không?

    const loggedOutElements = document.querySelectorAll('.logged-out-only');
    const loggedInElements = document.querySelectorAll('.logged-in-only');
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutButton = document.getElementById('logout-button');
    const adminLink = document.getElementById('admin-link');

    const loggedInUserJSON = sessionStorage.getItem('loggedInUser');
    console.log("Dữ liệu từ sessionStorage:", loggedInUserJSON); // KIỂM TRA 2: Có lấy được dữ liệu không?

    const loggedInUser = JSON.parse(loggedInUserJSON);

    if (loggedInUser) {
        console.log("Phát hiện người dùng đã đăng nhập:", loggedInUser.username); // KIỂM TRA 3: Logic if có chạy không?

        loggedOutElements.forEach(el => el.classList.add('hidden'));
        loggedInElements.forEach(el => el.classList.remove('hidden'));

        if (welcomeMessage) {
            welcomeMessage.textContent = `Chào, ${loggedInUser.username}`;
        }

        if (adminLink && loggedInUser.role === 'admin') {
            adminLink.classList.remove('hidden');
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('loggedInUser');
                alert('Bạn đã đăng xuất thành công!');
                window.location.href = '/index.html';
            });
        }
    } else {
        console.log("Không phát hiện người dùng đăng nhập. Hiển thị nút Đăng Nhập/Kí."); // KIỂM TRA 4: Logic else có chạy không?

        loggedOutElements.forEach(el => el.classList.remove('hidden'));
        loggedInElements.forEach(el => el.classList.add('hidden'));
    }
});