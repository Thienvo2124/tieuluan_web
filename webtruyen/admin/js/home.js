// File: js/home.js - Phiên bản tự động khởi tạo database

document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    // === KHỐI KHỞI TẠO DATABASE (LOGIC MỚI) ===
    // ==================================================
    let stories = JSON.parse(localStorage.getItem('stories_db'));

    // Kiểm tra nếu database chưa tồn tại trong localStorage
    if (!stories) {
        console.log("Database truyện trống. Tự động khởi tạo dữ liệu từ database.js...");
        // Kiểm tra xem biến 'initialStoriesData' (từ file database.js) có tồn tại không
        if (typeof initialStoriesData !== 'undefined') {
            // Gán dữ liệu gốc cho biến stories
            stories = initialStoriesData;
            // Lưu vào localStorage để những lần sau không cần khởi tạo lại
            localStorage.setItem('stories_db', JSON.stringify(stories));
            console.log("Khởi tạo database truyện thành công!");
        } else {
            console.error("Lỗi: Không tìm thấy biến 'initialStoriesData'. Hãy đảm bảo file database.js đã được tải TRƯỚC file home.js.");
            return; // Dừng script nếu không có dữ liệu gốc
        }
    }
    // ==================================================
    // === KẾT THÚC KHỐI KHỞI TẠO ===
    // ==================================================


    // Tìm vị trí để chèn truyện trên HTML
    const hotListContainer = document.getElementById('danh-sach-truyen-hot');
    const newListContainer = document.getElementById('danh-sach-truyen-moi');

    // Nếu không có dữ liệu hoặc không tìm thấy container, dừng lại
    if (!stories || !hotListContainer || !newListContainer) {
        console.error("Không thể tải danh sách truyện. Vui lòng kiểm tra lại HTML.");
        return;
    }

    // Hàm để tạo HTML cho một card truyện (giữ nguyên như cũ)
    function createStoryCard(story) {
        let latestChapterName = 'Chưa có';
        if (story.chapters && story.chapters.length > 0) {
            const latestChapter = story.chapters[story.chapters.length - 1];
            latestChapterName = latestChapter.name;
        }
        const coverImage = story.coverImage.replace(/\\/g, '/');
        const storyInfoLink = `/info_truyen/truyen-${story.title.replace(/\s+/g, '-')}.html`;

        return `
            <a href="${storyInfoLink}" class="truyen-item">
                <img src="${coverImage}" alt="${story.title}">
                <p class="ten">${story.title}</p>
                <p class="chuong">Chương ${latestChapterName}</p>
            </a>
        `;
    }

    // Hiển thị 6 truyện đầu tiên vào mục "Truyện Hot"
    const hotStories = stories.slice(0, 6);
    hotListContainer.innerHTML = hotStories.map(story => createStoryCard(story)).join('');

    // Hiển thị tất cả truyện vào mục "Truyện Mới Cập Nhật"
    newListContainer.innerHTML = stories.map(story => createStoryCard(story)).join('');
});