// File: js/loader.js - Đã cập nhật để dùng id="header-container"

document.addEventListener("DOMContentLoaded", function () {
  // 1. Tìm vị trí giữ chỗ với ID là "header-container"
  const headerPlaceholder = document.getElementById("header-container");

  // 2. Kiểm tra xem vị trí đó có tồn tại không
  if (headerPlaceholder) {
    const headerPath = '/webtruyen/Home/header.html'; // Đảm bảo đường dẫn này đúng

    fetch(headerPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        // 3. Chèn HTML của header vào trang
        headerPlaceholder.innerHTML = html;

        // 4. Gọi main.js để cập nhật các nút Đăng nhập/Đăng xuất
        const mainScript = document.createElement('script');
        mainScript.src = '/webtruyen/Home/js/main.js';
        document.body.appendChild(mainScript);
      })
      .catch(error => {
        console.error('Không thể tải header:', error);
        headerPlaceholder.innerHTML = "<p style='color:red; text-align:center;'>Lỗi: Không thể tải header.</p>";
      });
  } else {
    // Báo lỗi nếu không tìm thấy đúng ID
    console.error("Lỗi: Không tìm thấy thẻ <div id='header-container'></div> trên trang.");
  }
});