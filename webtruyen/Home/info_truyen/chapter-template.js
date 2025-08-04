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
