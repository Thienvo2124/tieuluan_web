document.addEventListener("DOMContentLoaded", function () {
    // === KHAI BÁO BIẾN ===
    const userListBody = document.getElementById("user-list-body");
    const userForm = document.getElementById("user-form");
    const showAddFormBtn = document.getElementById("show-add-form-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const formTitle = document.getElementById("form-title");

    // Lấy dữ liệu từ localStorage
    let users = JSON.parse(localStorage.getItem('users_db')) || [];
    const saveUsers = () => localStorage.setItem('users_db', JSON.stringify(users));

    // === CÁC HÀM ===

    // Hàm hiển thị lại bảng
    function renderTable() {
        userListBody.innerHTML = '';
        const loggedInAdmin = JSON.parse(sessionStorage.getItem('loggedInUser'));
        users.forEach(user => {
            const row = document.createElement("tr");
            const isCurrentUserAdmin = loggedInAdmin && loggedInAdmin.username === user.username;
            const deleteButtonState = isCurrentUserAdmin ? 'disabled' : '';
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td class="action-buttons">
                    <button class="btn-edit" data-username="${user.username}">Sửa</button>
                    <button class="btn-delete" data-username="${user.username}" ${deleteButtonState}>Xóa</button>
                </td>
            `;
            userListBody.appendChild(row);
        });
        attachActionListeners();
    }

    // Gán sự kiện cho các nút Sửa/Xóa trong bảng
    function attachActionListeners() {
        document.querySelectorAll(".btn-delete").forEach(button => {
            button.addEventListener("click", (e) => {
                const username = e.target.dataset.username;
                if (confirm(`Bạn có chắc muốn xóa người dùng "${username}" không?`)) {
                    users = users.filter(user => user.username !== username);
                    saveUsers();
                    renderTable();
                }
            });
        });

        document.querySelectorAll(".btn-edit").forEach(button => {
            button.addEventListener("click", (e) => {
                const username = e.target.dataset.username;
                openForm('edit', username);
            });
        });
    }

    // Hàm mở form (cho cả Thêm và Sửa)
    function openForm(mode, username = null) {
        formTitle.textContent = mode === 'add' ? "Thêm người dùng mới" : "Sửa thông tin người dùng";
        const usernameInput = document.getElementById("user-username");

        if (mode === 'edit') {
            const user = users.find(u => u.username === username);
            document.getElementById("user-username-hidden").value = user.username;
            usernameInput.value = user.username;
            usernameInput.disabled = true; // Không cho sửa username
            document.getElementById("user-password").placeholder = "Để trống nếu không đổi";
            document.getElementById("user-role").value = user.role;
        } else {
            userForm.reset();
            usernameInput.disabled = false;
            document.getElementById("user-password").placeholder = "";
            document.getElementById("user-username-hidden").value = '';
        }

        userForm.classList.remove('hidden');
        showAddFormBtn.classList.add('hidden');
    }

    // Hàm đóng và reset form
    function closeForm() {
        userForm.reset();
        userForm.classList.add('hidden');
        showAddFormBtn.classList.remove('hidden');
    }

    // === GÁN SỰ KIỆN ===

    // Nút "+ Thêm người dùng mới"
    showAddFormBtn.addEventListener('click', () => openForm('add'));

    // Nút "Hủy" trên form
    cancelBtn.addEventListener('click', closeForm);

    // Sự kiện submit form (Xử lý cả Thêm và Sửa)
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameHidden = document.getElementById("user-username-hidden").value;
        const username = document.getElementById("user-username").value;
        const password = document.getElementById("user-password").value;
        const role = document.getElementById("user-role").value;

        if (usernameHidden) { // --- Chế độ SỬA ---
            const userIndex = users.findIndex(u => u.username === usernameHidden);
            if (password.trim() !== '') {
                users[userIndex].password = password.trim();
            }
            users[userIndex].role = role;
            alert(`Đã cập nhật người dùng "${usernameHidden}"!`);
        } else { // --- Chế độ THÊM ---
            if (users.some(user => user.username === username.trim())) {
                alert("Tên đăng nhập này đã tồn tại!");
                return;
            }
            users.push({ username: username.trim(), password: password.trim(), role });
            alert(`Đã thêm người dùng "${username.trim()}"!`);
        }

        saveUsers();
        renderTable();
        closeForm();
    });

    // === CHẠY BAN ĐẦU ===
    renderTable();
});