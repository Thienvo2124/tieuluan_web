document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('history-list-container');
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        historyContainer.innerHTML = `<p class="history-notice">Bạn cần <a href="/login.html" style="color: #ff6600;">đăng nhập</a> để xem lịch sử.</p>`;
        return;
    }

    const allStories = JSON.parse(localStorage.getItem('stories_db')) || [];
    const history_db = JSON.parse(localStorage.getItem('history_db')) || {};
    const userHistory = history_db[loggedInUser.username] || [];

    if (userHistory.length === 0) {
        historyContainer.innerHTML = `<p class="history-notice">Lịch sử đọc của bạn trống.</p>`;
        return;
    }

    // Tạo HTML cho mỗi mục trong lịch sử
    const resultsHTML = userHistory.map(historyEntry => {
        // Tìm thông tin đầy đủ của truyện từ 'database' chính
        const story = allStories.find(s => s.id === historyEntry.storyId);

        // Nếu truyện không còn tồn tại, bỏ qua
        if (!story) return '';

        return `
            <a href="${story.link}" class="truyen-item">
                <img src="${story.coverImage}" alt="${story.title}">
                <p class="ten">${story.title}</p>
                <p class="chuong">Đã xem: Chương ${historyEntry.chapterName}</p>
            </a>
        `;
    }).join('');

    historyContainer.innerHTML = resultsHTML;
});