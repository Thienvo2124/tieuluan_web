// Khi trang tải xong
document.addEventListener("DOMContentLoaded", function () {
  // Bắt sự kiện nút "+ Thêm truyện"
  document.querySelector(".btn-add").addEventListener("click", function () {
    const form = document.getElementById("form-them-truyen");
    form.style.display = (form.style.display === "none") ? "block" : "none";
  });

  // Gắn sự kiện xóa cho các truyện có sẵn
  document.querySelectorAll(".btn-delete").forEach(function (button) {
    button.addEventListener("click", function () {
      if (confirm("Bạn có chắc muốn xóa truyện này không?")) {
        this.closest("tr").remove();
      }
    });
  });

  // ✅ Gắn sự kiện đăng xuất bên trong DOMContentLoaded
  const logoutBtn = document.getElementById("btnLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        window.location.href = "../trangchu_index.html";
      }
    });
  }
});


// Hàm thêm truyện
function themTruyen() {
  const tenTruyen = document.getElementById("tenTruyen").value;
  const tacGia = document.getElementById("tacGia").value;
  const soChuong = document.getElementById("soChuong").value;
  const trangThai = document.getElementById("trangThai").value;
  const linkAnh = document.getElementById("linkAnh").value;

  // Kiểm tra nếu thiếu thông tin
  if (!tenTruyen || !tacGia || !soChuong || !trangThai || !linkAnh) {
    alert("Vui lòng điền đầy đủ thông tin truyện.");
    return;
  }

  const table = document.querySelector(".truyen-table tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${linkAnh}" width="60" alt="${tenTruyen}"></td>
    <td>${tenTruyen}</td>
    <td>${tacGia}</td>
    <td>${soChuong}</td>
    <td>${trangThai}</td>
    <td class="action-buttons">
      <button class="btn-edit">Sửa</button>
      <button class="btn-delete">Xóa</button>
    </td>
  `;

  table.appendChild(row);

  // Gắn sự kiện xóa cho nút Xóa vừa tạo
  row.querySelector(".btn-delete").addEventListener("click", function () {
    if (confirm("Bạn có chắc muốn xóa truyện này không?")) {
      this.closest("tr").remove();
    }
  });

  // Reset form
  document.getElementById("tenTruyen").value = "";
  document.getElementById("tacGia").value = "";
  document.getElementById("soChuong").value = "";
  document.getElementById("trangThai").value = "";
  document.getElementById("linkAnh").value = "";

  alert("Đã thêm truyện mới!");
}
