// File: /js/chapter-template.js

// ================================================================
// =========== ĐỌC DỮ LIỆU TỪ CÁC THUỘC TÍNH DATA-* ===============
// ================================================================
const dataProvider = document.getElementById('chapter-data-provider');

const seriesName = dataProvider.dataset.seriesName;
// Dùng parseInt để chuyển chuỗi thành số
const currentChapter = parseInt(dataProvider.dataset.currentChapter, 10);
const totalPages = parseInt(dataProvider.dataset.totalPages, 10);
const totalChapters = parseInt(dataProvider.dataset.totalChapters, 10);

const homeLink = dataProvider.dataset.homeLink;
const seriesLink = dataProvider.dataset.seriesLink;

// ================================================================
// =========== LOGIC XỬ LÝ CHUNG (Không cần sửa) ===================
// ================================================================

// ------ CẬP NHẬT BREADCRUMB ------
const breadcrumbContainer = document.getElementById('breadcrumb-container');
breadcrumbContainer.innerHTML = `
  <a href="${homeLink}">Trang Chủ</a> / 
  <a href="${seriesLink}">${seriesName}</a> / 
  Chương ${currentChapter}
`;
//------CẬP NHẬT TIÊU ĐỀ CHÍNH------
const titleContainer = document.getElementById('main-title-container');
if (titleContainer) {
    // Lấy nội dung của thẻ span thời gian ra để không bị mất
    const timeUpdateSpan = titleContainer.querySelector('.time-update');
    // Tạo tiêu đề mới và ghép với thẻ span đã có
    titleContainer.innerHTML = `
        ${seriesName} - Chapter ${currentChapter}
        ${timeUpdateSpan.outerHTML} 
    `;
}
// ------ CẬP NHẬT NÚT CHUYỂN CHAP ------
const prevLinks = [document.getElementById('prev-chap-link'), document.getElementById('prev-chap-link-bottom')];
const nextLinks = [document.getElementById('next-chap-link'), document.getElementById('next-chap-link-bottom')];

// Xử lý nút "Chap trước"
if (currentChapter <= 1) {
    prevLinks.forEach(link => link && link.classList.add('disabled'));
} else {
    prevLinks.forEach(link => link && (link.href = `chapter${currentChapter - 1}.html`));
}

// Xử lý nút "Chap sau"
if (currentChapter >= totalChapters) {
    nextLinks.forEach(link => link && link.classList.add('disabled'));
} else {
    nextLinks.forEach(link => link && (link.href = `chapter${currentChapter + 1}.html`));
}

// ------ TẢI ẢNH TRUYỆN ------
const imageContainer = document.querySelector('.chapter-images');
// Chú ý: đường dẫn tương đối này được tính từ file chapterX.html, không phải từ file js
const imagePath = `../../../img/img_truyen/${seriesName}/chapter/chapter_${currentChapter}/`;

for (let i = 1; i <= totalPages; i++) {
    const imgElement = document.createElement('img');
    imgElement.src = `${imagePath}${i}.jpg`;
    imgElement.alt = `Trang ${i} - ${seriesName} - Chapter ${currentChapter}`;
    imageContainer.appendChild(imgElement);
}