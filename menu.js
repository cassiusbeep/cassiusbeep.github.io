function menuToggle(x, menu) {
  x.classList.toggle("open");
  menu.classList.toggle("open");
}

const menuBut = document.getElementById("menu-button-container");
const menu = document.getElementById("menu");
if (menuBut && menu) {
  menuBut.addEventListener("click", function () {
    menuToggle(menuBut, menu);
  });
} else {
  console.log("menu not working");
}
