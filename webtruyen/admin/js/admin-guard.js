// File: js/admin-guard.js
// Mục đích: Bảo vệ các trang chỉ dành cho admin.
// Script này phải được chèn vào thẻ <head> của trang cần bảo vệ.

(function () {
    // Lấy thông tin người dùng đã đăng nhập từ sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // KIỂM TRA 1: Người dùng đã đăng nhập chưa?
    if (!loggedInUser) {
        // Nếu chưa, thông báo và đá về trang đăng nhập
        alert('Bạn cần đăng nhập để truy cập trang này!');
        // Chuyển về trang login ở thư mục gốc. Dùng ../ để đi lùi 1 cấp từ /admin/ ra ngoài
        window.location.href = '../login.html';
        return; // Dừng script ngay lập tức
    }

    // KIỂM TRA 2: Người dùng có phải là admin không?
    if (loggedInUser.role !== 'admin') {
        // Nếu không phải admin, thông báo và đá về trang chủ
        alert('Bạn không có quyền truy cập vào trang quản trị!');
        // Chuyển về trang chủ ở thư mục gốc.
        window.location.href = '../index.html';
        return; // Dừng script ngay lập tức
    }

    // Nếu vượt qua cả 2 kiểm tra, người dùng là admin và đã đăng nhập.
    // Script không làm gì cả, cho phép trang tiếp tục tải.
    console.log('Xác thực Admin thành công. Chào mừng!');

})(); // Dùng IIFE (Immediately Invoked Function Expression) để script tự chạy ngay lập tức// File: js/admin-guard.js
// Mục đích: Bảo vệ các trang chỉ dành cho admin.
// Script này phải được chèn vào thẻ <head> của trang cần bảo vệ.

(function () {
    // Lấy thông tin người dùng đã đăng nhập từ sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // KIỂM TRA 1: Người dùng đã đăng nhập chưa?
    if (!loggedInUser) {
        // Nếu chưa, thông báo và đá về trang đăng nhập
        alert('Bạn cần đăng nhập để truy cập trang này!');
        // Chuyển về trang login ở thư mục gốc. Dùng ../ để đi lùi 1 cấp từ /admin/ ra ngoài
        window.location.href = '/webtruyen/Home/login.html';
        return; // Dừng script ngay lập tức
    }

    // KIỂM TRA 2: Người dùng có phải là admin không?
    if (loggedInUser.role !== 'admin') {
        // Nếu không phải admin, thông báo và đá về trang chủ
        alert('Bạn không có quyền truy cập vào trang quản trị!');
        // Chuyển về trang chủ ở thư mục gốc.
        window.location.href = '../index.html.html';
        return; // Dừng script ngay lập tức
    }

    // Nếu vượt qua cả 2 kiểm tra, người dùng là admin và đã đăng nhập.
    // Script không làm gì cả, cho phép trang tiếp tục tải.
    console.log('Xác thực Admin thành công. Chào mừng!');

})(); // Dùng IIFE (Immediately Invoked Function Expression) để script tự chạy ngay lập tức