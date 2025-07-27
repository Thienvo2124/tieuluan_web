fetch('data/truyen.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('list-truyen');
    data.forEach(truyen => {
      const item = document.createElement('div');
      item.innerHTML = `
        <h2>${truyen.ten}</h2>
        <img src="${truyen.hinhanh}" width="150">
        <p>${truyen.mota}</p>
        <a href="chitiettruyen.html?id=${truyen.id}">Xem chi tiết</a>
        <hr>
      `;
      container.appendChild(item);
    });
  });
