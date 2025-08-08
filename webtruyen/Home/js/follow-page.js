document.addEventListener('DOMContentLoaded', () => {
    const followedContainer = document.getElementById('followed-list-container');
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // BƯỚC 1: KIỂM TRA XEM NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP CHƯA
    if (!loggedInUser) {
        followedContainer.innerHTML = `<p class="follow-notice">Bạn cần <a href="/webtruyen/Home/login.html" style="color: #ff6600;">đăng nhập</a> để xem danh sách truyện đã theo dõi.</p>`;
        return; // Dừng script nếu chưa đăng nhập
    }

    // BƯỚC 2: TẢI CÁC "DATABASE" CẦN THIẾT
    const allStories = JSON.parse(localStorage.getItem('stories_db')) || [];
    const follows_db = JSON.parse(localStorage.getItem('follows_db')) || {};

    // Lấy danh sách ID truyện mà user này đã theo dõi
    const userFollowedIDs = follows_db[loggedInUser.username] || [];

    // BƯỚC 3: KIỂM TRA XEM USER CÓ THEO DÕI TRUYỆN NÀO KHÔNG
    if (userFollowedIDs.length === 0) {
        followedContainer.innerHTML = `<p class="follow-notice">Bạn chưa theo dõi truyện nào.</p>`;
        return;
    }

    // BƯỚC 4: LỌC RA DANH SÁCH TRUYỆN ĐÃ THEO DÕI
    const followedStories = allStories.filter(story => userFollowedIDs.includes(story.id));

    // BƯỚC 5: HIỂN THỊ KẾT QUẢ
    // Tái sử dụng lại logic tạo card truyện quen thuộc
    const resultsHTML = followedStories.map(story => {
        const latestChapterName = (story.chapters && story.chapters.length > 0)
            ? story.chapters[story.chapters.length - 1].name
            : 'N/A';
        const storyLink = story.link; // Dùng link tĩnh đã có

        // Phiên bản đã sửa lỗi cú pháp, không có khoảng trắng thừa và thẻ đóng đúng
        return `
        <a href="${storyLink}" class="truyen-item">
            <img src="${story.coverImage}" alt="${story.title}">
            <p class="ten">${story.title}</p>
            <p class="chuong">Chương ${latestChapterName}</p>
        </a>
    `;
    }).join('');
    followedContainer.innerHTML = resultsHTML;
});