// File: js/quanlynguoidung.js - PHIÊN BẢN NÂNG CẤP CÓ CHỨC NĂNG SỬA

document.addEventListener("DOMContentLoaded", function () {
    // === KHỞI TẠO ===
    const userListBody = document.getElementById("user-list-body");
    const addUserForm = document.getElementById("form-add-user");
    const addUserButton = document.querySelector(".btn-add");

    // Các phần tử của Modal Sửa
    const editModal = document.getElementById('edit-user-modal');
    const editForm = document.getElementById('form-edit-user');
    const closeModalButton = document.querySelector('.close-button');

    let users = JSON.parse(localStorage.getItem('users_db')) || [];
    const saveUsers = () => localStorage.setItem('users_db', JSON.stringify(users));

    // === HÀM HIỂN THỊ DỮ LIỆU (READ) ===
    function renderUserTable() {
        userListBody.innerHTML = '';
        const loggedInAdmin = JSON.parse(sessionStorage.getItem('loggedInUser'));

        users.forEach(user => {
            const row = document.createElement("tr");
            const deleteButtonDisabled = (loggedInAdmin && loggedInAdmin.username === user.username) ? 'disabled' : '';

            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td class="action-buttons">
                    <button class="btn-edit" data-username="${user.username}">Sửa</button>
                    <button class="btn-delete" data-username="${user.username}" ${deleteButtonDisabled}>Xóa</button>
                </td>
            `;
            userListBody.appendChild(row);
        });
        attachEventListeners();
    }

    // === CÁC HÀM XỬ LÝ SỰ KIỆN ===

    // HÀM GÁN LẠI CÁC SỰ KIỆN SAU MỖI LẦN RENDER
    function attachEventListeners() {
        // Sự kiện Xóa
        document.querySelectorAll(".btn-delete").forEach(button => {
            button.addEventListener("click", function () {
                const usernameToDelete = this.dataset.username;
                if (confirm(`Bạn có chắc muốn xóa người dùng "${usernameToDelete}" không?`)) {
                    users = users.filter(user => user.username !== usernameToDelete);
                    saveUsers();
                    renderUserTable();
                }
            });
        });

        // Sự kiện Sửa
        document.querySelectorAll(".btn-edit").forEach(button => {
            button.addEventListener("click", function () {
                const usernameToEdit = this.dataset.username;
                openEditModal(usernameToEdit);
            });
        });
    }

    // HÀM MỞ MODAL VÀ ĐIỀN DỮ LIỆU
    function openEditModal(username) {
        const user = users.find(u => u.username === username);
        if (user) {
            document.getElementById('edit-username-hidden').value = user.username;
            document.getElementById('edit-username-display').value = user.username;
            document.getElementById('edit-password').value = ''; // Luôn để trống mật khẩu
            document.getElementById('edit-role').value = user.role;
            editModal.classList.remove('hidden');
        }
    }

    // HÀM ĐÓNG MODAL
    function closeEditModal() {
        editModal.classList.add('hidden');
    }

    // Sự kiện submit form Thêm
    addUserForm.addEventListener('submit', function (e) { /* ... code cũ không đổi ... */ });

    // === CÁC SỰ KIỆN CỦA MODAL ===
    // Nút X để đóng
    closeModalButton.addEventListener('click', closeEditModal);
    // Click ra ngoài để đóng
    window.addEventListener('click', function (event) {
        if (event.target == editModal) {
            closeEditModal();
        }
    });

    // Sự kiện submit form Sửa (UPDATE)
    editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('edit-username-hidden').value;
        const newPassword = document.getElementById('edit-password').value;
        const newRole = document.getElementById('edit-role').value;

        // Tìm vị trí của user trong mảng
        const userIndex = users.findIndex(u => u.username === username);

        if (userIndex > -1) {
            // Chỉ cập nhật mật khẩu nếu người dùng nhập mật khẩu mới
            if (newPassword.trim() !== '') {
                users[userIndex].password = newPassword.trim();
            }
            // Cập nhật vai trò
            users[userIndex].role = newRole;

            saveUsers();
            alert(`Đã cập nhật thông tin cho người dùng "${username}"!`);
            closeEditModal();
            renderUserTable();
        }
    });

    // ... Các sự kiện khác như nút "+ Thêm người dùng" (giữ nguyên code cũ) ...
    addUserButton.addEventListener("click", function () {
        addUserForm.style.display = (addUserForm.style.display === "none") ? "block" : "none";
    });

    // === CHẠY LẦN ĐẦU TIÊN ===
    renderUserTable();
});