// load-menu.js
fetch("form_login_register.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("form_login_register").innerHTML = data;
  });

//   <script src="load-menu.js"></script>

//   <div id="menu"></div>
{/* <script>
  fetch("menu.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("menu").innerHTML = data;
    });
</script> */}
