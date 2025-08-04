// File: /js/chapter-template.js

const dataProvider = document.getElementById('chapter-data-provider');

const seriesName = dataProvider.dataset.seriesName;
// Dùng parseInt để chuyển chuỗi thành số
// const currentChapter = parseInt(dataProvider.dataset.currentChapter, 10);
const currentChapter = parseFloat(dataProvider.dataset.currentChapter);

const totalPages = parseInt(dataProvider.dataset.totalPages, 10);
// const totalChapters = parseInt(dataProvider.dataset.totalChapters, 10);
const totalChapters = parseFloat(dataProvider.dataset.totalChapters);


const homeLink = dataProvider.dataset.homeLink;
const seriesLink = dataProvider.dataset.seriesLink;

//  XỬ LÝ CHUNG 
//  BREADCRUMB
const breadcrumbContainer = document.getElementById('breadcrumb-container');
breadcrumbContainer.innerHTML = `
  <a href="${homeLink}">Trang Chủ</a> / 
  <a href="${seriesLink}">${seriesName}</a> / 
  Chương ${currentChapter}
`;

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

const prevLinks = [document.getElementById('prev-chap-link'), document.getElementById('prev-chap-link-bottom')];
const nextLinks = [document.getElementById('next-chap-link'), document.getElementById('next-chap-link-bottom')];

// chaptruoc
if (currentChapter <= 1) {
    prevLinks.forEach(link => link && link.classList.add('disabled'));
} else {
    prevLinks.forEach(link => link && (link.href = `chapter${currentChapter - 1}.html`));
}

//chapsau
if (currentChapter >= totalChapters) {
    nextLinks.forEach(link => link && link.classList.add('disabled'));
} else {
    nextLinks.forEach(link => link && (link.href = `chapter${currentChapter + 1}.html`));
}

// ------ TẢI ẢNH TRUYỆN ------
const imageContainer = document.querySelector('.chapter-images');
const imagePath = `../../../img/img_truyen/${seriesName}/chapter/chapter_${currentChapter}/`;

for (let i = 0; i <= totalPages; i++) {
    const imgElement = document.createElement('img');
    imgElement.src = `${imagePath}${i}.jpg`;
    imgElement.alt = `Trang ${i} - ${seriesName} - Chapter ${currentChapter}`;
    imageContainer.appendChild(imgElement);
}