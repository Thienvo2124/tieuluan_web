
fetch('/webtruyen/Home/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;
  });