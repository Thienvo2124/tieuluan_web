// js/quanlytruyen.js

document.addEventListener("DOMContentLoaded", function () {
  // === KHAI BÁO BIẾN ===
  const storyListBody = document.getElementById("story-list-body");
  const storyForm = document.getElementById("story-form");
  const showAddFormBtn = document.getElementById("show-add-form-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const formTitle = document.getElementById("form-title");

  // Lấy dữ liệu từ localStorage
  let stories = JSON.parse(localStorage.getItem('stories_db')) || [];
  const saveStories = () => localStorage.setItem('stories_db', JSON.stringify(stories));

  // === CÁC HÀM ===

  // Hàm hiển thị bảng
  function renderTable() {
    storyListBody.innerHTML = '';
    stories.forEach(story => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${story.id}</td>
                <td><img src="${story.coverImage}" alt="${story.title}"></td>
                <td>${story.title}</td>
                <td>${story.author}</td>
                <td class="action-buttons">
                    <button class="btn-edit" data-id="${story.id}">Sửa</button>
                    <button class="btn-delete" data-id="${story.id}">Xóa</button>
                </td>
            `;
      storyListBody.appendChild(row);
    });
    attachActionListeners();
  }

  // Gán sự kiện cho nút Sửa/Xóa
  function attachActionListeners() {
    document.querySelectorAll(".btn-delete").forEach(button => {
      button.addEventListener("click", (e) => {
        const storyId = Number(e.target.dataset.id);
        if (confirm("Bạn có chắc muốn xóa truyện này không?")) {
          stories = stories.filter(story => story.id !== storyId);
          saveStories();
          renderTable();
        }
      });
    });

    document.querySelectorAll(".btn-edit").forEach(button => {
      button.addEventListener("click", (e) => {
        const storyId = Number(e.target.dataset.id);
        const storyToEdit = stories.find(story => story.id === storyId);
        if (storyToEdit) {
          formTitle.textContent = "Sửa truyện";
          document.getElementById("story-id").value = storyToEdit.id;
          document.getElementById("story-title").value = storyToEdit.title;
          document.getElementById("story-author").value = storyToEdit.author;
          document.getElementById("story-cover").value = storyToEdit.coverImage;
          document.getElementById("story-desc").value = storyToEdit.description;
          storyForm.classList.remove('hidden');
          showAddFormBtn.classList.add('hidden');
        }
      });
    });
  }

  // Sự kiện submit form (cho cả Thêm và Sửa)
  storyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("story-id").value);
    const storyData = {
      title: document.getElementById("story-title").value,
      author: document.getElementById("story-author").value,
      coverImage: document.getElementById("story-cover").value,
      description: document.getElementById("story-desc").value,
      // (Bạn có thể thêm các trường khác ở đây)
    };

    if (id) { // Nếu có ID -> Sửa
      const storyIndex = stories.findIndex(story => story.id === id);
      stories[storyIndex] = { ...stories[storyIndex], ...storyData };
      alert("Đã cập nhật truyện thành công!");
    } else { // Nếu không có ID -> Thêm mới
      storyData.id = new Date().getTime(); // Tạo ID mới
      storyData.status = "Đang tiến hành";
      storyData.chapters = [];
      stories.push(storyData);
      alert("Đã thêm truyện mới thành công!");
    }

    saveStories();
    renderTable();
    storyForm.reset();
    storyForm.classList.add('hidden');
    showAddFormBtn.classList.remove('hidden');
    document.getElementById("story-id").value = '';
  });

  // Hiện form khi nhấn nút "+ Thêm"
  showAddFormBtn.addEventListener('click', () => {
    formTitle.textContent = "Thêm truyện mới";
    storyForm.reset();
    document.getElementById("story-id").value = '';
    storyForm.classList.remove('hidden');
    showAddFormBtn.classList.add('hidden');
  });

  // Hủy và ẩn form
  cancelBtn.addEventListener('click', () => {
    storyForm.reset();
    storyForm.classList.add('hidden');
    showAddFormBtn.classList.remove('hidden');
  });

  // === CHẠY BAN ĐẦU ===
  renderTable();
});