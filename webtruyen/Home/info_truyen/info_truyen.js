// File: js/info-truyen.js
document.addEventListener('DOMContentLoaded', () => {
    const dataProvider = document.getElementById('story-data-provider');
    const storyId = Number(dataProvider.dataset.storyId); // Lấy ID từ data attribute

    const stories = JSON.parse(localStorage.getItem('stories_db')) || [];
    const story = stories.find(s => s.id === storyId);

    const storyContentContainer = document.getElementById('story-info-content');

    if (!story) {
        document.title = "Không tìm thấy truyện";
        storyContentContainer.innerHTML = `<h1>404 - Không tìm thấy truyện</h1>`;
        return;
    }

    document.title = story.title;

    let chapterLinksHTML = story.chapters.map(chapter => {
        const chapterLink = `/data_chapter/${story.title.replace(/\s+/g, '-')}/chapter/chapter${chapter.name}.html`;
        return `<a href="${chapterLink}" class="chapter-item">Chương ${chapter.name}</a>`;
    }).join('');
    if (story.chapters.length === 0) {
        chapterLinksHTML = "<p>Truyện chưa có chương nào.</p>";
    }

    const storyHTML = `
        <div class="detail-header">
            <img src="${story.coverImage}" alt="${story.title}" class="detail-image">
            <div class="detail-info">
                <h1 class="detail-title">${story.title}</h1>
                <p class="detail-author">Tác giả: ${story.author}</p>
                <p class="detail-status">Trạng thái: ${story.status}</p>
            </div>
        </div>
        <div class="detail-description">
            <h2>Nội dung</h2>
            <p>${story.description}</p>
        </div>
        <div class="detail-chapters">
            <h2>Danh sách chương</h2>
            <div class="chapter-list">${chapterLinksHTML}</div>
        </div>
    `;
    storyContentContainer.innerHTML = storyHTML;
});