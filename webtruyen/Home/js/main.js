// File: js/main.js - Phiên bản có thêm dòng kiểm tra

console.log("Bắt đầu chạy main.js..."); // KIỂM TRA 1: Script có chạy không?

const loggedOutElements = document.querySelectorAll('.logged-out-only');
const loggedInElements = document.querySelectorAll('.logged-in-only');
const logoutButton = document.getElementById('logout-button');
const adminLink = document.getElementById('admin-link');

const loggedInUserJSON = sessionStorage.getItem('loggedInUser');
console.log("Dữ liệu từ sessionStorage:", loggedInUserJSON); // KIỂM TRA 2: Có lấy được dữ liệu không?

const loggedInUser = JSON.parse(loggedInUserJSON);

if (loggedInUser) {
    console.log("Phát hiện người dùng đã đăng nhập:", loggedInUser.username); // KIỂM TRA 3: Logic if có chạy không?

    loggedOutElements.forEach(el => el.classList.add('hidden'));
    loggedInElements.forEach(el => el.classList.remove('hidden'));



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


// ==================================================
// === THÊM MỚI: LOGIC XỬ LÝ TÌM KIẾM ===
// ==================================================
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn trang tải lại

        const query = searchInput.value.trim(); // Lấy từ khóa và xóa khoảng trắng thừa

        if (query) {
            // Chuyển hướng đến trang tìm kiếm với từ khóa là một tham số URL
            window.location.href = `/webtruyen/Home/timtruyen.html?q=${encodeURIComponent(query)}`;
        }
    });
}


// ==========================================================
// === LOGIC CHO NÚT THEO DÕI (TRÊN TRANG INFO TRUYỆN) ===
// ==========================================================
const followBtn = document.getElementById('follow-btn');

// Chỉ chạy code này nếu tìm thấy nút "Theo dõi" trên trang
if (followBtn) {
    // BƯỚC 1: LẤY TÊN TRUYỆN TỪ DATA ATTRIBUTE CỦA HTML
    const storyTitle = followBtn.dataset.storyTitle;

    // BƯỚC 2: TÌM TRUYỆN TRONG DATABASE ĐỂ LẤY ĐÚNG ID
    const stories = JSON.parse(localStorage.getItem('stories_db')) || [];
    const story = stories.find(s => s.title === storyTitle);

    // Dừng lại nếu vì lý do nào đó không tìm thấy truyện trong DB
    if (!story) {
        console.error("Lỗi: Không tìm thấy truyện có tên '" + storyTitle + "' trong database!");
        followBtn.textContent = 'Lỗi Dữ liệu';
        followBtn.disabled = true;
    } else {
        const storyId = story.id; // Bây giờ chúng ta đã có ID của truyện này!
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        let follows_db = JSON.parse(localStorage.getItem('follows_db')) || {};

        // Hàm cập nhật giao diện nút
        function updateFollowStatus() {
            if (loggedInUser && follows_db[loggedInUser.username]?.includes(storyId)) {
                followBtn.textContent = 'X Huỷ theo dõi';
                followBtn.classList.add('followed');
            } else {
                followBtn.textContent = '❤ Theo dõi';
                followBtn.classList.remove('followed');
            }
        }

        // Gán sự kiện click cho nút
        followBtn.addEventListener('click', () => {
            if (!loggedInUser) {
                alert("Bạn cần đăng nhập để sử dụng chức năng này!");
                window.location.href = '/webtruyen/Home/login.html';
                return;
            }

            const username = loggedInUser.username;
            if (!follows_db[username]) {
                follows_db[username] = [];
            }

            const userFollowList = follows_db[username];
            const storyIndexInFollowList = userFollowList.indexOf(storyId);

            if (storyIndexInFollowList > -1) {
                // Nếu đã theo dõi -> Bỏ theo dõi
                userFollowList.splice(storyIndexInFollowList, 1);
            } else {
                // Nếu chưa theo dõi -> Thêm theo dõi
                userFollowList.push(storyId);
            }

            localStorage.setItem('follows_db', JSON.stringify(follows_db));
            updateFollowStatus();
        });

        // Cập nhật trạng thái nút khi trang vừa tải xong
        updateFollowStatus();
    }
}

