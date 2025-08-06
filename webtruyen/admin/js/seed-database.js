// File: js/seed-database.js
(function () {
    console.log("Kiểm tra database truyện...");
    // Kiểm tra xem 'stories_db' đã có trong localStorage chưa
    if (!localStorage.getItem('stories_db')) {
        // Nếu chưa có, lấy dữ liệu từ biến initialStoriesData (trong file database.js)
        // và lưu vào localStorage.
        console.log("Database truyện trống. Đang tiến hành nhập dữ liệu ban đầu...");
        localStorage.setItem('stories_db', JSON.stringify(initialStoriesData));
        console.log("Nhập dữ liệu thành công!");
    } else {
        console.log("Database truyện đã tồn tại. Bỏ qua việc nhập dữ liệu.");
    }
})();