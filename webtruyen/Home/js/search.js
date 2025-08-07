// File: js/search.js

document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('search-results-container');
    const resultsTitle = document.getElementById('search-results-title');

    // Lấy từ khóa (query) từ thanh địa chỉ URL
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');

    // Nếu không có từ khóa, báo cho người dùng
    if (!query) {
        resultsTitle.textContent = "Vui lòng nhập từ khóa để tìm kiếm.";
        resultsContainer.innerHTML = '';
        return;
    }

    // ==========================================================
    // === ĐÂY LÀ PHẦN THỰC HIỆN YÊU CẦU CỦA BẠN ===
    // ==========================================================
    document.title = `Tìm kiếm: ${query}`;
    // Cập nhật thẻ h1 với từ khóa tìm kiếm
    resultsTitle.innerHTML = `Kết quả: "<strong>${query}</strong>"`;
    // ==========================================================

    // Tải "database" truyện từ localStorage
    const allStories = JSON.parse(localStorage.getItem('stories_db')) || [];

    // Lọc kết quả: Tìm tất cả truyện có tên chứa từ khóa
    const results = allStories.filter(story =>
        story.title.toLowerCase().includes(query.toLowerCase())
    );

    // Hiển thị kết quả
    if (results.length > 0) {
        const resultsHTML = results.map(story => {
            const latestChapterName = (story.chapters && story.chapters.length > 0)
                ? story.chapters[story.chapters.length - 1].name
                : 'N/A';
            // Dùng link tĩnh đã có trong database
            const storyLink = story.link;

            return `
                <a href="${storyLink}" class="truyen-item">
                    <img src="${story.coverImage}" alt="${story.title}">
                    <p class="ten">${story.title}</p>
                    <p class="chuong">Chương ${latestChapterName}</p>
                </a>
            `;
        }).join('');
        resultsContainer.innerHTML = resultsHTML;
    } else {
        // Nếu không tìm thấy truyện nào
        resultsContainer.innerHTML = `<p class="search-notice">Không tìm thấy kết quả nào phù hợp với từ khóa "${query}".</p>`;
    }
});