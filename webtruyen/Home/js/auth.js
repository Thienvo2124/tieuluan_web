// File: js/auth.js

document.addEventListener('DOMContentLoaded', () => {

    // === BƯỚC 1: KHỞI TẠO VÀ KIỂM TRA DATABASE ===

    // Lấy mảng users từ localStorage
    let users = JSON.parse(localStorage.getItem('users_db'));

    // KIỂM TRA: Nếu localStorage trống (lần đầu tiên chạy ứng dụng)
    // thì tự tạo ra một mảng mới với tài khoản admin
    if (!users) {
        console.log('Chưa có database, đang khởi tạo với tài khoản admin...');
        users = [
            {
                username: 'admin',
                password: '123',
                role: 'admin'
            }
        ];
        // Lưu mảng vừa tạo vào localStorage
        localStorage.setItem('users_db', JSON.stringify(users));
    }

    // Hàm tiện ích để lưu lại mảng users sau mỗi lần thay đổi
    const saveUsers = () => {
        localStorage.setItem('users_db', JSON.stringify(users));
    };


    // === BƯỚC 2: GÁN SỰ KIỆN CHO FORM (Không có gì thay đổi ở đây) ===

    // LOGIC CHO TRANG ĐĂNG KÝ
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            if (password !== confirmPassword) {
                alert('Mật khẩu xác nhận không khớp!');
                return;
            }
            if (users.some(user => user.username === username)) {
                alert('Tên đăng nhập này đã tồn tại!');
                return;
            }

            // User mới đăng ký luôn có vai trò là 'user'
            const newUser = { username, password, role: 'user' };

            // Thêm user mới vào mảng và lưu lại
            users.push(newUser);
            saveUsers();

            alert(`Đăng ký tài khoản "${username}" thành công!`);
            window.location.href = 'login.html';
        });
    }

    // LOGIC CHO TRANG ĐĂNG NHẬP
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                alert(`Đăng nhập thành công! Chào mừng ${user.role} ${user.username}.`);

                if (user.role === 'admin') {
                    window.location.href = '../admin/admin.html';
                } else {
                    // Trỏ về file index.html ở thư mục gốc
                    window.location.href = '../../../index.html';
                }
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        });
    }
});