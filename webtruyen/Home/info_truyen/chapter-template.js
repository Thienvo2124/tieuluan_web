
function recordReadingHistory(storyId, chapterName) {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // Nếu người dùng chưa đăng nhập, không làm gì cả
    if (!loggedInUser) {
        return;
    }

    let history_db = JSON.parse(localStorage.getItem('history_db')) || {};
    const username = loggedInUser.username;

    // Lấy danh sách lịch sử của user, nếu chưa có thì tạo mảng rỗng
    let userHistory = history_db[username] || [];

    // TÌM VÀ XÓA BẢN GHI CŨ: Để đảm bảo mỗi truyện chỉ xuất hiện 1 lần trong lịch sử
    const existingEntryIndex = userHistory.findIndex(entry => entry.storyId === storyId);
    if (existingEntryIndex > -1) {
        userHistory.splice(existingEntryIndex, 1);
    }

    // THÊM BẢN GHI MỚI VÀO ĐẦU DANH SÁCH:
    // Bản ghi mới nhất sẽ luôn nằm ở đầu
    userHistory.unshift({
        storyId: storyId,
        chapterName: chapterName,
        viewedAt: new Date().getTime() // Lưu lại thời gian xem
    });

    // Giới hạn lịch sử ở 50 mục gần nhất (tùy chọn)
    if (userHistory.length > 50) {
        userHistory = userHistory.slice(0, 50);
    }

    // Cập nhật lại history_db và lưu vào localStorage
    history_db[username] = userHistory;
    localStorage.setItem('history_db', JSON.stringify(history_db));
    console.log(`Đã ghi lịch sử: User ${username} đọc chapter ${chapterName} của truyện ${storyId}`);
}


const dataProvider = document.getElementById('chapter-data-provider');

// Lấy dữ liệu từ data attributes
const seriesName = dataProvider.dataset.seriesName;
const currentChapter = dataProvider.dataset.currentChapter; // ví dụ "1.1"
const totalChapters = JSON.parse(dataProvider.dataset.totalChapters); // ["1.1", "1.2"]
const totalPages = parseInt(dataProvider.dataset.totalPages, 10);

const homeLink = dataProvider.dataset.homeLink;
const seriesLink = dataProvider.dataset.seriesLink;

// BREADCRUMB
const breadcrumbContainer = document.getElementById('breadcrumb-container');
breadcrumbContainer.innerHTML = `
  <a href="${homeLink}">Trang Chủ</a> / 
  <a href="${seriesLink}">${seriesName}</a> / 
  Chương ${currentChapter}
`;

// TIÊU ĐỀ
const titleContainer = document.getElementById('main-title-container');
if (titleContainer) {
    const timeUpdateSpan = titleContainer.querySelector('.time-update');
    titleContainer.innerHTML = `
        ${seriesName} - Chapter ${currentChapter}
        ${timeUpdateSpan ? timeUpdateSpan.outerHTML : ''}
    `;
}

// CHUYỂN CHAPTER
const currentIndex = totalChapters.indexOf(currentChapter);
const prevLinks = [document.getElementById('prev-chap-link'), document.getElementById('prev-chap-link-bottom')];
const nextLinks = [document.getElementById('next-chap-link'), document.getElementById('next-chap-link-bottom')];

// Chap trước
if (currentIndex > 0) {
    const prevChapter = totalChapters[currentIndex - 1];
    prevLinks.forEach(link => link && (link.href = `chapter${prevChapter}.html`));
} else {
    prevLinks.forEach(link => link && link.classList.add('disabled'));
}

// Chap sau
if (currentIndex < totalChapters.length - 1) {
    const nextChapter = totalChapters[currentIndex + 1];
    nextLinks.forEach(link => link && (link.href = `chapter${nextChapter}.html`));
} else {
    nextLinks.forEach(link => link && link.classList.add('disabled'));
}

// HIỂN THỊ ẢNH TRUYỆN
const imageContainer = document.querySelector('.chapter-images');
const imagePath = `../../../img/img_truyen/${seriesName}/chapter/chapter_${currentChapter}/`;

for (let i = 0; i <= totalPages; i++) {
    const img = document.createElement('img');
    img.src = `${imagePath}${i}.jpg`;
    img.alt = `Trang ${i} - ${seriesName} - Chapter ${currentChapter}`;
    imageContainer.appendChild(img);
}

const storyId = Number(dataProvider.dataset.storyId);
const chapterNameForHistory = dataProvider.dataset.currentChapter;

// Tự động gọi hàm để ghi lại lịch sử đọc
if (storyId && chapterNameForHistory) {
    recordReadingHistory(storyId, chapterNameForHistory);
}